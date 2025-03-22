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
        build: {
            target: "es2022",
        },
    },
    server: {
        watchOptions: {
            ignored: ["**/node_modules/**", "**/.git/**", "**/dist/**"],
        },
        preset: "node-server",
        esbuild: {
            options: {
                target: "es2024",
                supported: {
                    "top-level-await": true,
                },
            },
        },
    },
    tsr: {
        appDirectory: "src",
        quoteStyle: "double",
        semicolons: true,
    },
});
