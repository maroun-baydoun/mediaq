const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PATHS = {
  src: resolve(__dirname, "src"),
  dist: resolve(__dirname, "dist"),
};

module.exports = {
  mode: "production",
  entry: {
    mediaq: resolve(PATHS.src, "mediaq.ts"),
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    library: "mediaq",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [PATHS.dist, resolve(__dirname, "types")],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
