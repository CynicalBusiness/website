import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import rehypeUrlInspector, { UrlMatch } from "@jsdevtools/rehype-url-inspector";
import { Markup, RehypePluginList } from "../markup.js";
import { getPostAssetURI, queries } from "~/client/client.js";

export interface PostBodyProps {
    slug: string;
}

export function PostBody({ slug }: PostBodyProps) {
    const { data: body } = useSuspenseQuery(queries.posts.body(slug));

    const rehypePlugins = useMemo(
        (): RehypePluginList => [
            [
                rehypeUrlInspector,
                {
                    inspectEach: ({ url, node, propertyName }: UrlMatch) => {
                        if (!url.startsWith("http")) {
                            node.properties![propertyName!] = getPostAssetURI(
                                slug,
                                url,
                            );
                        }
                    },
                    selectors: ["img[src]"] satisfies string[],
                },
            ],
        ],
        [slug],
    );

    return <Markup rehypePlugins={rehypePlugins}>{body}</Markup>;
}
