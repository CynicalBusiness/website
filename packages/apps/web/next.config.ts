// @ts-check

import { composePlugins, withNx } from "@nx/next";
import type { WithNxOptions } from "@nx/next/plugins/with-nx";
import type { Configuration as WebpackConfiguration } from "webpack";

const nextConfig: WithNxOptions = {
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    webpack: (config: WebpackConfiguration) => ({
        ...config,

        resolve: {
            ...config.resolve,
            extensionAlias: {
                ...config.resolve?.extensionAlias,
                ".js": [".ts", ".tsx", ".js"],
            },
        },
    }),
    trailingSlash: false,
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
