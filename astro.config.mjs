import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

export default defineConfig({
  site: "https://redsovereign.com",
  output: "static",
  trailingSlash: "always",
  adapter: cloudflare(),
  integrations: [react(), sitemap(), mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias:
        process.env.NODE_ENV === "production"
          ? { "react-dom/server": "react-dom/server.edge" }
          : {},
    },
  },
});
