const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");

module.exports = {
  mode: "production",

  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: "./src/index.html",
      },
      js: {
        filename: "js/[contenthash].js",
      },
      css: {
        filename: "css/[contenthash].css",
      },
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
      },
      // preload: [
      //   {
      //     test: /\.(woff|woff2|eot|ttf|otf)$/,
      //     attributes: { as: "font", crossorigin: true },
      //   },
      // ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext][query]",
        },
      },
      {
        test: /\.(ico|png|jp?g|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[contenthash][ext][query]",
        },
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
      {
        test: /\.s?css$/i,
        use: ["css-loader", "sass-loader"],
      },
    ]
  },
}