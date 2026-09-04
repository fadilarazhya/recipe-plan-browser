// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require("eslint-config-expo/flat")
const stylistic = require("@stylistic/eslint-plugin")

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
      semi: ["error", "never"],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/member-delimiter-style": [
        "error",
        {
          multiline: { delimiter: "none", requireLast: false },
          singleline: { delimiter: "comma", requireLast: false },
        },
      ],
    },
  },
])
