const { resolve } = require("path");
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const common = require("./webpack.common.js");
const variables = require("./src/variables");

module.exports = merge(common, {
  mode: "production",

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, "src", "sitemap.xml"),
          to: resolve(__dirname, "dist", "sitemap.xml"),
        },
        {
          from: resolve(__dirname, "src", "favicon"),
          to: resolve(__dirname, "dist"),
        },
        {
          from: resolve(__dirname, "src", "site.webmanifest"),
          to: resolve(__dirname, "dist"),
          transform: (content) => {
            return content
              .toString()
              .replace(`"name": "",`, `"name": "${variables.title}",`)
              .replace(
                `"short_name": "",`,
                `"short_name": "${variables.title}",`
              )
              .replace(
                `"description": "",`,
                `"description": "${variables.description}",`
              );
          },
        },
      ],
    }),
  ],
});
