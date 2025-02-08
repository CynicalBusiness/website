const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const stylistic = require("@stylistic/eslint-plugin");
const unusedImports = require("eslint-plugin-unused-imports");
const eslintConfigPrettier = require("eslint-config-prettier");
const importPlugin = require("eslint-plugin-import");

module.exports = [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: { "unused-imports": unusedImports },
        rules: {
            "unused-imports/no-unused-imports": "error",
        },
    },

    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    {
        settings: {
            "import/resolver": {
                typescript: true,
                node: true,
            },
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
            "import/extensions": ["error", "ignorePackages"],
            "import/no-unresolved": "off", // handled by typescript
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
