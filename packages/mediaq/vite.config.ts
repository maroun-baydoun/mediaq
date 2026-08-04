import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/mediaq.ts", import.meta.url)),
      fileName: "mediaq",
      formats: ["es"],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
