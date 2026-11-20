import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile({ outputFileName: "company.html" })],
  build: {
    outDir: "release",
    emptyOutDir: true,
  },
});
