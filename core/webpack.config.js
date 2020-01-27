const path = require("path");

module.exports = env => {
  if (!env) {
    env = {};
  }

  const isProd = !!env.prod;
  const minimize = isProd;
  const watch = !isProd;
  const mode = isProd ? "production" : "development";

  return {
    target: "web",
    mode: mode,
    watch: watch,
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      libraryTarget: "umd",
      libraryExport: "default"
    },
    optimization: {
      minimize: minimize
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      modules: ["node_modules", "src"]
    },
    devtool: "source-map",
    plugins: [],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                experimentalWatchApi: true
              }
            }
          ],
          exclude: [/node_modules/, /dist/]
        }
      ]
    }
  };
};
