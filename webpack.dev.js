const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      filename: "index.html",
      templateParameters: {
        icons: require("./src/vendor/icons.js"),
        // coverBackground: "./arts/cover_bg2.png",
      },
    }),
    // new FaviconsWebpackPlugin({
    //   logo: "/path/to/logo.png",
    //   outputPath: '/icons',
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/i,
        loader: "html-loader",
      },
      // {
      //   loader: "file-loader",
      //   options: {
      //     esModule: false,
      //   }
      // },
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
        // type: "asset/resource",
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          }
        ],
      },
      // {
      //   test: /\.svg$/,
      //   loader: "svg-inline-loader",
      // },
      {
        test: /\.s?css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ]
  },
}