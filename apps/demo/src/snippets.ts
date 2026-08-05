export const snippets = {
  "install-npm": `npm install mediaq`,
  "install-pnpm": `pnpm add mediaq`,
  "install-yarn": `yarn add mediaq`,
  mediaq: `import { Mediaq } from "mediaq";

const mediaq = Mediaq({
  mediaQueries: [
    { name: "desktop", media: "(min-width: 768px)" },
    { name: "dark", media: "(prefers-color-scheme: dark)" },
  ],
  onUpdate: (state) => {
    console.log(state.matches);
  },
});

mediaq.start();`,
} as const;
