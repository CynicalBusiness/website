import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    vite: {
        plugins: [
            tsConfigPaths({
                projects: ["./tsconfig.json"],
            }),
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
