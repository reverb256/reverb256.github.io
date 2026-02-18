// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://reverb256.ca",
  
  integrations: [
    react(),
    tailwind(),
  ],
  
  build: {
    assets: "_assets",
    inlineStylesheets: "auto",
  },
  
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            gsap: ["gsap"],
          },
        },
      },
    },
  },
});
