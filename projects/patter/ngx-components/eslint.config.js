// @ts-check
const tseslint = require("typescript-eslint");
const rootConfig = require("../../../eslint.config.js");

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "ptr",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "ptr",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    rules: {
      "@angular-eslint/template/interactive-supports-focus": [
        "error",
        {
          allowList: ["dialog"]
        }
      ]
    },
  }
);
