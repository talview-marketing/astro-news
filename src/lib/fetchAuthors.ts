
import { sanity } from './sanityClient'

export async function getAllAuthors() {
  return await sanity.fetch(`*[_type == "author"] {
    _id,
    name,
    slug,
    bio, 
    "image": {
      "url": image.asset->url,
      "alt": coalesce(image.alt, name, "Author image")
    }
  }`)
}

export async function getAuthorBySlug(slug: string) {
  return await sanity.fetch(`
    *[_type == "author" && (slug.current == $slug || _id == $slug)][0] {
      _id,
      name,
      slug,
      "image": {
      "url": image.asset->url,
      "alt": coalesce(image.alt, name, "Author image")
    },
      bio,
      "articles": *[_type == "post" && author._ref == ^._id] | order(publishedAt desc) {
        title,
        slug,
        publishedAt,
       "image": {
          "url": image.asset->url,
          "alt": coalesce(image.alt, title, "Post image")
        },
        body[]{
        ...,
        _type == "image" => {
          ...,
          "url": asset->url,
          "alt": coalesce(alt, "Image")
        }
      },
        description
      }
    }
  `, { slug })
}