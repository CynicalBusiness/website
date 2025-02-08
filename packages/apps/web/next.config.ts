// @ts-check

import { composePlugins, withNx } from "@nx/next";
import type { WithNxOptions } from "@nx/next/plugins/with-nx";

const nextConfig: WithNxOptions = {
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
