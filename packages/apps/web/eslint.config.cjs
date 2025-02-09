const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const { fixupConfigRules } = require("@eslint/compat");
// const nx = require("@nx/eslint-plugin");
const baseConfig = require("../../../eslint.config.cjs");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

module.exports = [
    // ...fixupConfigRules(compat.extends("next")),
    // ...fixupConfigRules(compat.extends("next/core-web-vitals")),

    ...fixupConfigRules(compat.extends("plugin:@next/next/recommended")),

    ...baseConfig,
    // ...nx.configs["flat/react-typescript"],

    {
        ignores: [".next/**/*", "next.config.*"],
    },
];
