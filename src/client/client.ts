import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { PublishedPostManifest } from "~/schema/post-manifest.schema.js";

export const BASE_URL = "/api/v1";

export const api = axios.create({
    baseURL: BASE_URL,
});

export const queries = {
    posts: {
        manifest: (slug: string) =>
            queryOptions({
                queryKey: ["posts", "manifest", slug],
                queryFn: async ({ signal }) =>
                    (
                        await api.get<{ manifest: PublishedPostManifest }>(
                            `post/manifest/${slug}`,
                            { signal },
                        )
                    ).data.manifest,
            }),
        body: (slug: string) =>
            queryOptions({
                queryKey: ["posts", "body", slug],
                queryFn: async ({ signal }) =>
                    (
                        await api.get<string>(`post/body/${slug}`, {
                            headers: {
                                Accept: "text/markdown",
                            },
                            signal,
                        })
                    ).data,
            }),
        children: (slug: string) =>
            queryOptions({
                queryKey: ["posts", "children", slug],
                queryFn: async ({ signal }) =>
                    (
                        await api.get<{
                            children: Array<
                                readonly [string, PublishedPostManifest]
                            >;
                        }>(`post/children/${slug}`, { signal })
                    ).data.children,
            }),
    },
} as const;
