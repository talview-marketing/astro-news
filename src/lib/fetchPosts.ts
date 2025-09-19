import { sanity } from './sanityClient'

export async function getAllPosts() {
  return await sanity.fetch(`*[_type == "post"]| order(publishedAt desc) {
    title,
    slug,
    description, 
    publishedAt,
    author,
    body[]{
       _type == "image" => {
        ...,
        "asset": asset->,
        "url": asset->url,
        "alt": coalesce(alt, "Image"),
        link
      },
      _type == "table" => {
        caption, border, align,
        rows[]{
          cells[]{
            colSpan, rowSpan, align, bg,
            content[]{
              ...,
              _type == "image" => {
                ...,
                "asset": asset->,
                "url": asset->url,
                "alt": coalesce(alt, "Image")
              }
            }
          }
        }
      },
       _type == "separator" => { style, color, thickness, width, align },
      _type == "embed" => { provider, url, title, html },
      _type == "video" => {
        url, provider, caption,
        poster{ "asset": asset->, "url": asset->url }
      },
      _type == "faqList" => {
        items[]{
          question,
          answer[]{
            ...,
            _type == "image" => {
              ...,
              "asset": asset->,
              "url": asset->url,
              "alt": coalesce(alt, "Image")
            }
          }
        }
      }
      },
    image{
        "url": asset->url,
        "alt": coalesce(alt,"Post image")
      },
    "authorData": author-> {
      _id,
      name,
      slug,
       "image": {
          "url": image.asset->url,
          "alt": coalesce(image.alt, title, "Post image")
        },
    },
    "categories": categories[]-> {
      _id,
      title,
      "slug": slug.current
    }
  }`)
}

// export async function getPostBySlug(slug: string) {
//   return await sanity.fetch(`
//     *[_type == "post" && slug.current == $slug][0] {
//       title,
//       slug,
//       description,
//       publishedAt,
//       author,
//        body[]{
//        _type == "image" => {
//         ...,
//         "asset": asset->,
//         "url": asset->url,
//         "alt": coalesce(alt, "Image"),
//         link
//       },
//       _type == "table" => {
//         caption, border, align,
//         rows[]{
//           cells[]{
//             colSpan, rowSpan, align, bg,
//             content[]{
//               ...,
//               _type == "image" => {
//                 ...,
//                 "asset": asset->,
//                 "url": asset->url,
//                 "alt": coalesce(alt, "Image")
//               }
//             }
//           }
//         }
//       },
//        _type == "separator" => { style, color, thickness, width, align },
//       _type == "embed" => { provider, url, title, html },
//       _type == "video" => {
//         url, provider, caption,
//         poster{ "asset": asset->, "url": asset->url }
//       },
//       _type == "faqList" => {
//         items[]{
//           question,
//           answer[]{
//             ...,
//             _type == "image" => {
//               ...,
//               "asset": asset->,
//               "url": asset->url,
//               "alt": coalesce(alt, "Image")
//             }
//           }
//         }
//       }
//       },
//     image{
//         "url": asset->url,
//         "alt": coalesce(alt,"Post image")
//       },
//       "authorData": author-> {
//         _id,
//         name,
//         slug,
//         "image": image {
//           "url": asset->url,
//           "alt" : coalesce(alt,"Author image")
//         }
//       },
//       "categories": categories[]-> {
//         _id,
//         title,
//         "slug": slug.current
//       }
//     }
//   `, { slug })
// }

export async function getPostBySlug(slug: string) {
  return await sanity.fetch(`
    *[_type == "post" && slug.current == $slug][0]{
    _type,           // ← ADD THIS LINE
      _id,   
      title, slug, description, publishedAt, _updatedAt,author,

      body[]{
        ... ,                                          // ✅ keep base spans/marks/markDefs
        _type == "image" => {
          ...,
          "asset": asset->,
          "url": asset->url,
          "alt": coalesce(alt, "Image"),
          link
        },
        _type == "table" => {
          caption, border, align,
          rows[]{
            cells[]{
              colSpan, rowSpan, align, bg,
              content[]{
                ...,
                _type == "image" => {
                  ...,
                  "asset": asset->,
                  "url": asset->url,
                  "alt": coalesce(alt, "Image")
                }
              }
            }
          }
        },
        _type == "separator" => { style, color, thickness, width, align },
        _type == "embed" => { provider, url, title, html },
        _type == "video" => {
          url, provider, caption,
          poster{ "asset": asset->, "url": asset->url }
        },
        _type == "faqList" => {
          items[]{
            question,
            answer[]{
              ...,
              _type == "image" => {
                ...,
                "asset": asset->,
                "url": asset->url,
                "alt": coalesce(alt, "Image")
              }
            }
          }
        }
      },

      image{
        ...,
        "asset": asset->,
        "url": asset->url,
        "alt": coalesce(alt,"Post image")
      },

      "authorData": author->{
        _id, name, slug,
        image{
          "asset": asset->,
          "url": asset->url,
          "alt": coalesce(alt,"Author image")
        }
      },

      "categories": categories[]->{
        _id, title, "slug": slug.current
      }
    }
  `, { slug })
}
