const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const colors = require("tailwindcss/colors");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "selector",
    content: [
        join(
            __dirname,
            "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
        ),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        fontFamily: {
            sans: ['"Raleway"', "sans-serif"],
        },
        extend: {
            colors: {
                default: colors.neutral,
                primary: colors.blue,
            },
        },
    },
    plugins: [],
    safelist: ["active"],
};
