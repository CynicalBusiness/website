import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
    globalIgnores(["node_modules/", ".output/", ".vinxi/"]),

    js.configs.recommended,
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
            "import/order": "warn",
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
]);
