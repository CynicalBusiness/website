import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintImport from "eslint-plugin-import";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintImport.configs.recommended,
    eslintImport.configs.typescript,
    {
        settings: {
            "import/resolver": {
                typescript: true,
                node: true,
            },
        },
        rules: {
            "import/extensions": ["error", "always"],
        },
    }
);
