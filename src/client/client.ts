import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import {
    PostInfo,
    PublishedPostManifest,
} from "~/schema/post-manifest.schema.js";

export const BASE_URL = "/api/v1";

export const api = axios.create({
    baseURL: BASE_URL,
});

const clientApi = axios.create({
    ...api.defaults,
});

function flattenSlug(slug: string) {
    return slug.replace("/", "__");
}

export const queries = {
    posts: {
        manifest: (slug: string) =>
            queryOptions({
                queryKey: ["posts", "manifest", slug],
                queryFn: async ({ signal }) =>
                    (
                        await api.get<{ manifest: PublishedPostManifest }>(
                            `post/${flattenSlug(slug)}/manifest`,
                            { signal },
                        )
                    ).data.manifest,
            }),
        body: (slug: string) =>
            queryOptions({
                queryKey: ["posts", "body", slug],
                queryFn: async ({ signal }) =>
                    (
                        await api.get<string>(
                            `post/${flattenSlug(slug)}/body`,
                            {
                                headers: {
                                    Accept: "text/markdown",
                                },
                                signal,
                            },
                        )
                    ).data,
            }),
        children: (slug: string) =>
            queryOptions({
                queryKey: ["posts", "children", slug],
                queryFn: async ({ signal }) =>
                    (
                        await api.get<{
                            children: Array<PostInfo>;
                        }>(`post/${flattenSlug(slug)}/children`, { signal })
                    ).data.children,
            }),
    },
} as const;

export function getPostAssetURI(slug: string, asset: string) {
    return clientApi.getUri({
        url: `post/${flattenSlug(slug)}/asset/${asset}`,
    });
}
