import { dirname } from "path";
import { fileURLToPath } from "url";
import FlatCompat from "@eslint/eslintrc";
import eslintPluginCypress from "eslint-plugin-cypress";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      cypress: eslintPluginCypress,
    },
    extends: ["plugin:cypress/recommended"],
    env: {
      "cypress/globals": true,
    },
  },
];

export default eslintConfig;
