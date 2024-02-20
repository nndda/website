const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// const FaviconsWebpackPlugin = require("favicons-webpack-plugin");


module.exports = {
  mode: "development",
  entry: {
    vendor: "./src/vendor.ts",
    index: "./src/index.ts",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(html)$/i,
        loader: "html-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
            filename: "./fonts/[name][ext]",
        },
      },
      {
        test: /\.(png|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          }
        ],
      },
      {
        test: /\.s?css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      filename: "index.html",
      templateParameters: {
        icons: require("./src/vendor/icons.js"),
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/arts"),
          to: path.resolve(__dirname, "dist/arts"),
        },
      ],
    }),
    // new FaviconsWebpackPlugin({
    //   logo: "/path/to/logo.png",
    //   outputPath: '/icons',
    // }),
  ],
}