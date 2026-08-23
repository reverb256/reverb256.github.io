// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { resolve } from "node:path";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://reverb256.ca",

  // Preserve old whitespace behavior (Astro 7 changed default from HTML-aware to JSX rules)
  compressHTML: true,

  integrations: [
    react(),
    sitemap(),
  ],

  build: {
    assets: "_assets",
    inlineStylesheets: "auto",
  },

  vite: {
    plugins: [tailwindcss()],
    // Astro 7 — Rolldown requires environments.client for client build config
    environments: {
      client: {
        build: {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes("/node_modules/react/"))   return "vendor";
                if (id.includes("/node_modules/react-dom/"))return "vendor";
                if (id.includes("gsap")) return "gsap";
              },
            },
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve("./src"),
      },
    },
  },
});
