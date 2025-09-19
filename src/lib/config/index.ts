import type { Link } from "../types";
import { getAllCategories } from '../../lib/fetchCategories';

export const SITE = {
  title: "Talent Integrity",
  description: "Blogs ",
  url: "https://talentintegrity.org",
  locale: "en-US",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 4,
};

export async function getNavigationLinks(): Promise<Link[]> {
  const categories = await getAllCategories();

  return categories.map((category: any) => ({
    href: `/categories/${category.slug.current}`,
    text: category.title,
  }));
}


export const OTHER_LINKS: Link[] = [

  {
    href: "/authors",
    text: "Authors",
  },

];

export const SOCIAL_LINKS: Link[] = [
  {
    href: "https://github.com",
    text: "GitHub",
    icon: "github",
  },
  {
    href: "httpe://www.t.me",
    text: "Telegram",
    icon: "telegram",
  },
  {
    href: "https://twitter.com",
    text: "Twitter",
    icon: "newTwitter",
  },
  {
    href: "https://www.facebook.com",
    text: "Facebook",
    icon: "facebook",
  },
];
