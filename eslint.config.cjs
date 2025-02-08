const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
// const eslintImport = require("eslint-plugin-import");
const stylistic = require("@stylistic/eslint-plugin");
const unusedImports = require("eslint-plugin-unused-imports");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    // eslintImport.flatConfigs.recommended,
    // eslintImport.flatConfigs.typescript,
    {
        plugins: { "unused-imports": unusedImports },
        rules: {
            "unused-imports/no-unused-imports": "error",
        },
    },

    stylistic.configs.customize({
        indent: 4,
        quotes: "double",
        semi: true,
        commaDangle: "only-multiline",
    }),

    {
        rules: {
            "no-undef": "off", // https://eslint.org/docs/latest/rules/no-undef#handled_by_typescript
            "@stylistic/arrow-parens": "off",
            "@stylistic/quotes": [
                "warn",
                "double",
                { avoidEscape: true, allowTemplateLiterals: true },
            ],
        },
    },
    {
        files: ["**/*.cjs", "**/*.cts"],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
        },
    },

    eslintConfigPrettier,
];
