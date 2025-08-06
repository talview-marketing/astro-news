import { SITE } from "@/lib/config";
import type { ArticleMeta, Meta } from "@/lib/types";
import defaultImage from "@/assets/images/default-image.jpg";
import { capitalizeFirstLetter } from "@/lib/utils/letter";
import { normalizeDate } from "@/lib/utils/date";
import { getAllAuthors } from "@/lib/fetchAuthors";

// Define SanityPost type
interface SanityAuthor {
  _id: string;
  name: string;
  slug?: { current: string };
}

interface SanityImage {
  url: string;
  alt?: string;
}

interface SanityPost {
  _type: "post";
  _id: string;
  title: string;
  description?: string;
  image?: SanityImage;
  slug: { current: string };
  publishedAt?: string;
  _updatedAt?: string;
  author?: { _ref: string };
  authors?: { _ref: string }[];
}

export const getMeta = async (
  article: SanityPost,
  categorySlug?: string
): Promise<Meta | ArticleMeta> => {
  if (article?._type === "post") {
    const authorsList = await getAllAuthors();
    const postAuthors: SanityAuthor[] = authorsList.filter((a: SanityAuthor) =>
      article.author?._ref
        ? a._id === article.author._ref
        : article.authors?.some(ref => ref._ref === a._id)
    );

    const meta: ArticleMeta = {
      title: `${capitalizeFirstLetter(article.title)} - ${SITE.title}`,
      metaTitle: capitalizeFirstLetter(article.title),
      description: article.description ?? "",
      ogImage: article.image?.url ?? defaultImage.src,
      ogImageAlt: article.image?.alt ?? article.title,
      publishedTime: article.publishedAt
        ? normalizeDate(article.publishedAt)
        : new Date().toISOString(),
      lastModified: article._updatedAt ?? new Date().toISOString(),
      authors: postAuthors.map((author) => ({
        name: author.name,
        link: `/authors/${author.slug?.current ?? author._id}`,
      })),
      type: "article",
    };

    return meta;
  }

  // fallback for other page types if needed
  const fallbackMeta: Meta = {
    title: SITE.title,
    metaTitle: SITE.title,
    description: "Default page description",
    ogImage: defaultImage.src,
    ogImageAlt: SITE.title,
    type: "website",
  };

  return fallbackMeta;
};
