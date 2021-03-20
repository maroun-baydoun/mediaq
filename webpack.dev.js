const { resolve } = require("path");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",

  devServer: {
    contentBase: [
      resolve(__dirname, "src"),
      resolve(__dirname, "src", "favicon"),
    ],
    compress: true,
    port: 8000,
  },
});
