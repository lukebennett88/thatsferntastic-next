const eslintPresetThatsFerntastic = require("eslint-preset-thatsferntastic");

module.exports = {
  ...eslintPresetThatsFerntastic,
  plugins: [...eslintPresetThatsFerntastic.plugins, "@ts-gql"],
  rules: {
    ...eslintPresetThatsFerntastic.rules,
    "@ts-gql/ts-gql": "error",
  },
};
