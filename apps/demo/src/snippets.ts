export const snippets = {
  "install-npm": `npm install mediaq`,
  "install-pnpm": `pnpm add mediaq`,
  "install-yarn": `yarn add mediaq`,
  mediaq: `import { mediaq } from "mediaq";

const listener = mediaq({
  mediaQueries: [
    { name: "desktop", media: "(min-width: 768px)" },
    { name: "dark", media: "(prefers-color-scheme: dark)" },
  ],
  onUpdate: (state) => {
    console.log(state.matches);
  },
});

listener.start();`,
} as const;
