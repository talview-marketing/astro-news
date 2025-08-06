import { sanity } from './sanityClient'
export async function getAllCategories() {
  return await sanity.fetch(`
    *[_type == "category"]{
      title,
      description,
      slug,
      "articles": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...3] {
        title,
        publishedAt,
        slug,  
        description,  
        body,image {
      "url": asset->url,
      alt
    },
      }
    }
  `)
}

export async function getCategoryBySlug(slug:any) {
  return await sanity.fetch(
    `*[_type == "category" && slug.current == $slug][0]{
      title,
      description,
      "articles": *[_type == "post" && references(^._id)] | order(publishedAt desc){
        title,
        slug,
        description,
        publishedAt,
        image {
      "url": asset->url,
      alt
    },
        body
      }
    }`,
    { slug }
  );
}