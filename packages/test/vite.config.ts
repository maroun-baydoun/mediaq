import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      mediaq: fileURLToPath(
        new URL("../../packages/mediaq/src/mediaq.ts", import.meta.url),
      ),
    },
  },
});
