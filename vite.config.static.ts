import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const BASE_PATH = "/";

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  
  root: path.resolve(import.meta.dirname, "client"),
  
  base: BASE_PATH,
  
  build: {
    outDir: path.resolve(import.meta.dirname, "dist-static"),
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["framer-motion", "lucide-react"],
        },
      },
    },
  },
  
  server: false,
  preview: false,
});
