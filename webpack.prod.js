const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  //env
  mode: "production",
  // entry point for webpack as the default
  // does not suit us
  entry: "./src/client/index.js",
  // allow to use minimizing actions on certain files
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        // chainable orders, one loader uses the output of another
        // NB: chained loaders run in order from right to left
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "index.html",
    }),
    // instead of going into main.js, split our css in its own main.css
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    //service workers
    new WorkboxPlugin.GenerateSW(),
  ],
};
