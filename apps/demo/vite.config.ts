import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      mediaq: fileURLToPath(
        new URL("../../packages/mediaq/src/mediaq.ts", import.meta.url),
      ),
    },
  },
});
