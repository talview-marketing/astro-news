// // import type { CollectionEntry } from "astro:content";

// export type Icon = {
//   size?: string;
//   width?: string;
//   height?: string;
//   color?: string;
//   strokeWidth?: string;
// };

// export type Link = {
//   href: string;
//   text: string;
//   icon?: string;
//   target?: "_blank" | "_self";
// };

// type Author = {
//   name: string;
//   link: string;
// };

// export type Meta = {
//   title: string;
//   metaTitle: string;
//   description: string;
//   type: "article" | "website";
//   ogImage: string;
//   ogImageAlt: string;
// };

// export type ArticleMeta = Meta & {
//   publishedTime: string;
//   lastModified: string;
//   authors: Author[];
// };

//  not required export type Entry = CollectionEntry<"articles" | "views">;
import type { CollectionEntry } from "astro:content";

export type Icon = {
  size?: string;
  width?: string;
  height?: string;
  color?: string;
  strokeWidth?: string;
};

export type Link = {
  href: string;
  text: string;
  icon?: string;
  target?: "_blank" | "_self";
};

export type Author = {
  name: string;
  link: string;
};

export type Meta = {
  /** From Sanity: usually the post/page title */
  title: string;

  /** Optional override for <title>. If omitted, use `title`. */
  metaTitle?: string;

  /** From Sanity: description */
  description: string;

  /** Page kind for meta handling */
  type: "article" | "website";

  /** OG image URL (optional; can be derived later) */
  ogImage?: string;

  /** Alt text for OG image */
  ogImageAlt?: string;

  /** Canonical URL override (optional). If omitted, derive from Astro.site + Astro.url */
  canonical?: string;
};

export type ArticleMeta = Meta & {
  /** ISO strings */
  publishedTime: string;
  lastModified: string;

  /** One or more authors */
  authors: Author[];
};

/** Type guard for convenience in components (e.g., Head) */
export const isArticleMeta = (meta: Meta | ArticleMeta): meta is ArticleMeta =>
  meta.type === "article";
