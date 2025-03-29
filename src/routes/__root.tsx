import {
    HeadContent,
    Outlet,
    Scripts,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import { seo } from "src/utils/seo.utils";
import { QueryClient } from "@tanstack/react-query";
import styles from "~/styles/styles.css?url";

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
            ...seo({
                title: "CynicalBusiness",
            }),
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
