import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/", // required for Vercel SPA
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});