// @ts-check
import commonJs from "@rollup/plugin-commonjs";
import jsonPlugin from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";

/** @type {import('rollup').RollupOptions} */
const rollupConfig = {
  input: "api/api.js",
  output: {
    file: "api/index.js",
    format: "cjs",
    exports: "auto",
  },
  external: ["fs/promises", "fs", "https", "path", "crypto", "stream", "http", "zlib", "os", "child_process"],
  plugins: [
    commonJs(),
    resolve({
      moduleDirectories: ["node_modules"],
      preferBuiltins: false,
    }),
    jsonPlugin(),
  ],
};

export default rollupConfig;
