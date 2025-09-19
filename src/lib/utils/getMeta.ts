// import { SITE } from "@/lib/config";
// import type { ArticleMeta, Meta } from "@/lib/types";
// import defaultImage from "@/assets/images/default-image.jpg";
// import { capitalizeFirstLetter } from "@/lib/utils/letter";
// import { normalizeDate } from "@/lib/utils/date";
// import { getAllAuthors } from "@/lib/fetchAuthors";

// interface SanityAuthor {
//   _id: string;
//   name: string;
//   slug?: { current: string };
// }

// interface SanityImage {
//   url: string;
//   alt?: string;
// }

// interface SanityPost {
//   _type: "post";
//   _id: string;
//   title: string;
//   description?: string;
//   image?: SanityImage;
//   slug: { current: string };
//   publishedAt?: string;
//   _updatedAt?: string;
//   author?: { _ref: string };
//   authors?: { _ref: string }[];
// }

// export const getMeta = async (
//   article: SanityPost,
//   categorySlug?: string
// ): Promise<Meta | ArticleMeta> => {
//   if (article?._type === "post") {
//     const authorsList = await getAllAuthors();
//     const postAuthors: SanityAuthor[] = authorsList.filter((a: SanityAuthor) =>
//       article.author?._ref
//         ? a._id === article.author._ref
//         : article.authors?.some(ref => ref._ref === a._id)
//     );

//     const meta: ArticleMeta = {
//       title: `${capitalizeFirstLetter(article.title)} - ${SITE.title}`,
//       metaTitle: capitalizeFirstLetter(article.title),
//       description: article.description ?? "",
//       ogImage: article.image?.url ?? defaultImage.src,
//       ogImageAlt: article.image?.alt ?? article.title,
//       publishedTime: article.publishedAt
//         ? normalizeDate(article.publishedAt)
//         : new Date().toISOString(),
//       lastModified: article._updatedAt ?? new Date().toISOString(),
//       authors: postAuthors.map((author) => ({
//         name: author.name,
//         link: `/authors/${author.slug?.current ?? author._id}`,
//       })),
//       type: "article",
//     };

//     return meta;
//   }
//   const fallbackMeta: Meta = {
//     title: SITE.title,
//     metaTitle: SITE.title,
//     description: "Default page description",
//     ogImage: defaultImage.src,
//     ogImageAlt: SITE.title,
//     type: "website",
//   };

//   return fallbackMeta;
// };
// src/lib/meta.ts (or getMeta.ts)
import { SITE } from "@/lib/config";
import type { ArticleMeta, Meta } from "@/lib/types";
import defaultImage from "@/assets/images/default-image.jpg";
import { capitalizeFirstLetter } from "@/lib/utils/letter";
import { normalizeDate } from "@/lib/utils/date";
import { getAllAuthors } from "@/lib/fetchAuthors";


export const getMeta = async (
  article: any,
  _categorySlug?: string
): Promise<Meta | ArticleMeta> => {

  if (!article) {
    return getFallbackMeta();
  }
  if (article._type !== "post") {
    return getFallbackMeta();
  }
  const articleTitle = getArticleTitle(article);
  const articleDescription = getArticleDescription(article);
  const ogUrl: string = article.image?.url ?? defaultImage.src;
  const ogAlt: string = article.image?.alt ?? articleTitle ?? SITE.title;
  const publishedTime = article.publishedAt
    ? normalizeDate(article.publishedAt)
    : new Date().toISOString();

  const lastModified =
    article._updatedAt ??
    article.publishedAt ??
    new Date().toISOString();

  let authors: Array<{ name: string; link: string }> = [];
  if (article.authorData?.name) {
    const a = article.authorData;
    const linkSlug = a.slug?.current ?? a._id ?? "author";
    authors = [{ name: a.name, link: `/authors/${linkSlug}` }];
  } else {

    const hasRefs = !!article.author?._ref || (Array.isArray(article.authors) && article.authors.length > 0);
    if (hasRefs) {
      try {
        const authorsList = await getAllAuthors();
        const refIds = article.author?._ref
          ? [article.author._ref]
          : (article.authors || []).map((r: any) => r?._ref).filter(Boolean);

        authors = authorsList
          .filter((a: any) => refIds.includes(a._id))
          .map((a: any) => ({
            name: a.name,
            link: `/authors/${a.slug?.current ?? a._id}`,
          }));
      } catch (error) {
        console.warn("Failed to fetch authors:", error);
      }
    }
  }

  const meta: ArticleMeta = {
    type: "article",
    title: articleTitle,
    metaTitle: articleTitle,
    description: articleDescription,
    ogImage: ogUrl,
    ogImageAlt: ogAlt,
    publishedTime,
    lastModified,
    authors,
  };
  return meta;
};


function getArticleTitle(article: any): string {

  const possibleTitles = [
    article.title,
    article.name,
    article.heading,
    article.postTitle
  ];

  for (const title of possibleTitles) {
    if (title && typeof title === "string" && title.trim().length > 0) {
      return title.trim();
    }
  }
  return SITE.title;
}

function getArticleDescription(article: any): string {
  const possibleDescriptions = [
    article.description,
    article.excerpt,
    article.summary,
    article.metaDescription,
    article.seoDescription
  ];

  for (const desc of possibleDescriptions) {
    if (desc && typeof desc === "string" && desc.trim().length > 0) {
      return desc.trim();
    }
  }
  return SITE.description;
}

function getFallbackMeta(): Meta {
  return {
    type: "website",
    title: SITE.title,
    metaTitle: SITE.title,
    description: SITE.description,
    ogImage: defaultImage.src,
    ogImageAlt: SITE.title,
  };
}