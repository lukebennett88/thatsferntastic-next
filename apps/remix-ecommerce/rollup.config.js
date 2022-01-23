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
  external: ["fs/promises"],
  plugins: [
    commonJs(),
    resolve({
      moduleDirectories: ["node_modules"],
      preferBuiltins: true,
    }),
    jsonPlugin(),
  ],
};

export default rollupConfig;
