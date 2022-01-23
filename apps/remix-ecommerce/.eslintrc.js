const eslintPresetThatsFerntastic = require("eslint-preset-thatsferntastic");

module.exports = {
  ...eslintPresetThatsFerntastic,
  rules: {
    ...eslintPresetThatsFerntastic.rules,
    "@next/next/no-head-element": "off",
    "@next/next/no-img-element": "off",
  },
};
