
import { sanity } from './sanityClient'

export async function getAllAuthors() {
  return await sanity.fetch(`*[_type == "author"] {
    _id,
    name,
    slug,
    bio, 
    "image": image {
      "url": asset->url,
      alt
    }
  }`)
}

export async function getAuthorBySlug(slug: string) {
  return await sanity.fetch(`
    *[_type == "author" && (slug.current == $slug || _id == $slug)][0] {
      _id,
      name,
      slug,
      "image": image {
        "url": asset->url,
        alt
      },
      bio,
      "articles": *[_type == "post" && author._ref == ^._id] | order(publishedAt desc) {
        title,
        slug,
        publishedAt,
       "image": image {
        "url": asset->url,
        alt
      },
        body,
        description
      }
    }
  `, { slug })
}