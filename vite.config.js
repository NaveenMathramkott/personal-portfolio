import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "./",
  root: "src/",
  publicDir: "../public/",
  plugins: [wasm(), topLevelAwait()],
  build: {
    outDir: "../dist",
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"], // Split three.js into its own chunk
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size warning limit
    emptyOutDir: true, // Ensure the output directory is emptied before building
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
