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
        filename: "js/[name].[contenthash].js",
      },
      css: {
        filename: "css/[name].[contenthash].css",
      },
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
      },
      preload: [
        {
          test: /\.s?css$/,
          as: "style",
        },
        {
          test: /\.(js|ts)$/,
          as: "script",
        },
      //   {
      //     test: /\.(woff|woff2|eot|ttf|otf)$/,
      //     attributes: { as: "font", crossorigin: true },
      //   },
      ],
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
        test: /\.(ico|png|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "./assets/[contenthash][ext][query]",
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
      {
        test: /\.txt$/,
        // type: "asset/resource",
        generator: {
          filename: "./[name][ext]",
        },
      },
    ]
  },

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      maxSize: 640000,
      cacheGroups: {
        app: {
          test: /\.(js|ts|css)$/,
          chunks: "all",
          name({ context }, chunks, groupName) {
            if (/[\\/]node_modules[\\/]/.test(context)) {
              const moduleName = context.match(/[\\/]node_modules[\\/](.*?)(?:[\\/]|$)/)[1].replace('@', '');
              return `npm.${moduleName}`;
            }
            return groupName;
          },
        },
      },
    },
  },
}