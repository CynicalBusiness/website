import {
    HeadContent,
    Outlet,
    Scripts,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import {
    getPageDescriptionMeta,
    getPageImageMeta,
    getPageTitleMeta,
    pageMiscMeta,
} from "src/utils/seo.utils";
import { QueryClient } from "@tanstack/react-query";
import styles from "~/styles/styles.css?url";
import { AUTHOR, PUBLIC_URL, TAGLINE2 } from "~/const.js";

export interface RootRouteContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
    component: RootComponent,

    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            ...pageMiscMeta,
            ...getPageTitleMeta(AUTHOR),
            ...getPageDescriptionMeta(TAGLINE2),
            ...getPageImageMeta(`${PUBLIC_URL}/favicon.png`),
        ],
        links: [
            {
                rel: "stylesheet",
                href: styles,
            },
            {
                rel: "apple-touch-icon",
                sizes: "152x152",
                href: "/apple-touch-icon.png",
            },
            { rel: "icon", href: "/favicon.ico" },
            { rel: "icon", sizes: "96x96", href: "/favicon.png" },
            // { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
        ],
    }),
});

export function RootDocument({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    );
}

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    );
}
