/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer, dev }) {
    config.output.webassemblyModuleFilename =
      isServer && !dev
        ? "../static/wasm/[modulehash].wasm"
        : "static/wasm/[modulehash].wasm";

    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    return config;
  },

  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  reactStrictMode: false,
};

const removeImports = require("next-remove-imports")();
module.exports = removeImports({});

module.exports = nextConfig;
