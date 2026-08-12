import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { renderHighlightedCode } from "./src/highlight";
import { snippets } from "./src/snippets";

function demoCodePlugin() {
  return {
    name: "demo-code-plugin",
    transformIndexHtml(html: string) {
      return html.replace(
        /<code([^>]*data-code="([^"]+)"[^>]*)><\/code>/g,
        (_match, attrs: string, key: string) => {
          const snippet = snippets[key as keyof typeof snippets];
          const languageMatch = attrs.match(/data-language="([^"]+)"/);
          const language =
            languageMatch?.[1] === "shell" ? "shell" : "typescript";

          if (!snippet) {
            return `<code${attrs}></code>`;
          }

          return `<code${attrs}>${renderHighlightedCode(snippet, language)}</code>`;
        },
      );
    },
  };
}

export default defineConfig({
  base: "/mediaq/",
  plugins: [tailwindcss(), demoCodePlugin()],
  resolve: {
    alias: {
      mediaq: fileURLToPath(
        new URL("../../packages/mediaq/src/mediaq.ts", import.meta.url),
      ),
    },
  },
});
