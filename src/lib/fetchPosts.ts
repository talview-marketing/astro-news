import { sanity } from './sanityClient'

export async function getAllPosts() {
  return await sanity.fetch(`*[_type == "post"]| order(publishedAt desc) {
    title,
    slug,
    description, 
    publishedAt,
    author,
    body, 
    image {
      "url": asset->url,
      alt
    },
    "authorData": author-> {
      _id,
      name,
      slug,
      "image": image {
        "url": asset->url,
        alt
      }
    },
    "categories": categories[]-> {
      _id,
      title,
      "slug": slug.current
    }
  }`)
}

export async function getPostBySlug(slug: string) {
  return await sanity.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      description,
      publishedAt,
      author,
      body,
      image {
        "url": asset->url,
        alt
      },
      "authorData": author-> {
        _id,
        name,
        slug,
        "image": image {
          "url": asset->url,
          alt
        }
      },
      "categories": categories[]-> {
        _id,
        title,
        "slug": slug.current
      }
    }
  `, { slug })
}
