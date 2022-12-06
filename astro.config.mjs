import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import NetlifyCMS from 'astro-netlify-cms';


// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://reeceatkinson.com/",
  integrations: [
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    NetlifyCMS({
      config: {
        logo_url: "https://reeceatkinson.com/backstage.png",
        media_folder: "public/images",
        public_folder: "/images",
        display_url: "https://reeceatkinson.com",
        backend: {
          name: 'github',
          repo: 'reeceatkinson/projectwebsite',
          branch: 'main',
        },
        collections: [
          // Define a blog post collection
          {
            name: 'posts',
            label: 'Blog Posts',
            folder: 'src/pages/posts',
            create: true,
            delete: true,
            fields: [
              { name: 'title', widget: 'string', label: 'Post Title' },
              { name: 'body', widget: 'markdown', label: 'Post Body' },
            ],
          },
        ],
      },
    }),
    sitemap(),
  ],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
