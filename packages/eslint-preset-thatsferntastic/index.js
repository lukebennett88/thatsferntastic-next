const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  plugins: ["simple-import-sort", "import"],
  rules: {
    "@next/next/no-html-link-for-pages": OFF,
    "import/first": ERROR,
    "import/newline-after-import": ERROR,
    "import/no-duplicates": ERROR,
    "no-unused-vars": WARN,
    "react/no-unescaped-entities": OFF,
    "simple-import-sort/exports": ERROR,
    "simple-import-sort/imports": ERROR,
  },
  settings: { next: { rootDir: ["./apps/*/", "./packages/*/"] } },
};
