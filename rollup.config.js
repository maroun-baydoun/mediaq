import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/mediaq.ts",
  output: {
    file: "dist/mediaq.js",
    format: "esm",
  },
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
    }),
    terser(),
  ],
};
