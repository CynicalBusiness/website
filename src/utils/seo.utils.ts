import { AUTHOR, PUBLIC_URL } from "~/const.js";

export const pageMiscMeta = [
    // { name: "keywords", content: "" },
    { property: "twitter:creator", content: "@cynicalbusiness" },
    { property: "twitter:site", content: AUTHOR },
    { property: "twitter:url", content: PUBLIC_URL },
    { property: "og:type", content: "website" },
    { property: "og:url", content: PUBLIC_URL },
];

export const getPageTitleMeta = (title: string) => {
    return [
        { title },
        { name: "title", content: title },
        { property: "twitter:title", content: title },
        { property: "og:title", content: title },
    ];
};

export const getPageDescriptionMeta = (description: string) => {
    return [
        { name: "description", content: description },
        { property: "twitter:description", content: description },
        { property: "og:description", content: description },
    ];
};

export const getPageImageMeta = (image: string) => {
    return [
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:image", content: image },
        { property: "og:image", content: image },
    ];
};
