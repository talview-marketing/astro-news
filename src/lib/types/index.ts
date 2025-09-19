
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

  title: string;


  metaTitle?: string;


  description: string;


  type: "article" | "website";


  ogImage?: string;


  ogImageAlt?: string;


  canonical?: string;
};

export type ArticleMeta = Meta & {

  publishedTime: string;
  lastModified: string;


  authors: Author[];
};


export const isArticleMeta = (meta: Meta | ArticleMeta): meta is ArticleMeta =>
  meta.type === "article";
