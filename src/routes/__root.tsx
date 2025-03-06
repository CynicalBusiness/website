import {
    HeadContent,
    Outlet,
    Scripts,
    createRootRoute,
} from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import styles from "~/styles/styles.css?url";
import { seo } from "src/utils/seo.utils";

export const Route = createRootRoute({
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
            // {
            //     rel: "apple-touch-icon",
            //     sizes: "180x180",
            //     href: "/apple-touch-icon.png",
            // },
            // {
            //     rel: "icon",
            //     type: "image/png",
            //     sizes: "32x32",
            //     href: "/favicon-32x32.png",
            // },
            // {
            //     rel: "icon",
            //     type: "image/png",
            //     sizes: "16x16",
            //     href: "/favicon-16x16.png",
            // },
            // { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
            { rel: "icon", href: "/favicon.ico" },
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
