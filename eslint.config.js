import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintImport from "eslint-plugin-import";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
    eslint.configs.recommended,
    // eslint-disable-next-line import/no-named-as-default-member
    ...tseslint.configs.recommended,
    eslintImport.flatConfigs.recommended,
    eslintImport.flatConfigs.typescript,
    stylistic.configs.customize({
        indent: 4,
        quotes: "double",
        semi: true,
        commaDangle: "only-multiline",
    }),
    {
        settings: {
            "import/resolver": {
                typescript: true,
                node: true,
            },
        },
    }
);
