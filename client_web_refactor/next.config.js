const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const EslintFriendlyFormatter = require("eslint-friendly-formatter");

const config = {
  webpack: (c) => {
    // Fixes npm packages that depend on `fs` module
    c.node = {
      fs: "empty",
    };
    if (c.resolve.plugins) {
      c.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      c.resolve.plugins = [new TsconfigPathsPlugin()];
    }
    c.module.rules.push({
      test: /\.(jsx?|tsx?)/,
      loader: "eslint-loader",
      enforce: "pre",
      exclude: /node_modules/,
      options: {
        formatter: EslintFriendlyFormatter,
      },
    });

    return c;
  },
};

module.exports = withSass(
  withCSS(config),
);
