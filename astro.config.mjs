// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/lib/config";
import sanityIntegration from '@sanity/astro';
import netlify from "@astrojs/netlify";
import react from '@astrojs/react';
export default defineConfig({
  site: 'https://talentintegrity.org',

  markdown: {
    remarkPlugins: [],
  },
  image: {},
  output: 'server',
  adapter: netlify({}),
  integrations: [
    mdx(),
    sitemap(),
    react(),
    sanityIntegration({
      projectId: '0fl11mre',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2023-01-01',
      studioBasePath: '/studio',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
