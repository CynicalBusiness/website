const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const unusedImports = require("eslint-plugin-unused-imports");
const importPlugin = require("eslint-plugin-import");
const prettierPluginRecommended = require("eslint-plugin-prettier/recommended");

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
    importPlugin.flatConfigs.react,
    importPlugin.flatConfigs.typescript,

    // eslintConfigPrettier,
    prettierPluginRecommended,

    {
        rules: {
            "no-undef": "off", // https://eslint.org/docs/latest/rules/no-undef#handled_by_typescript
            "import/extensions": ["error", "ignorePackages"],
            "import/no-unresolved": "off", // handled by typescript
            "@typescript-eslint/no-empty-object-type": [
                "error",
                {
                    allowInterfaces: "always",
                },
            ],
        },
    },
    {
        files: ["**/*.cjs", "**/*.cts"],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
        },
    },
];
