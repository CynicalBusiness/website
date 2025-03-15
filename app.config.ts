import { defineConfig } from "@tanstack/react-start/config";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    vite: {
        plugins: [
            tsConfigPaths({
                projects: ["./tsconfig.json"],
            }),
            svgr(),
        ],
    },
    server: {
        watchOptions: {
            ignored: ["**/node_modules/**", "**/.git/**", "**/dist/**"],
        },
    },
    tsr: {
        appDirectory: "src",
        quoteStyle: "double",
        semicolons: true,
    },
});
