// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { modifiedTime, readingTime } from "./src/lib/utils/remarks.mjs";
import { SITE } from "./src/lib/config";
import sanityIntegration from '@sanity/astro';
  import netlify from "@astrojs/netlify";
import react from '@astrojs/react';
import pagefind from "astro-pagefind";
export default defineConfig({
  site: SITE.url,
  base: SITE.basePath,
  markdown: {
    remarkPlugins: [readingTime, modifiedTime],
  },
  image: {},
//  output: 'server', 
//   adapter: netlify({}),
integrations: [
    mdx(),
    sitemap(),
    pagefind(),
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
