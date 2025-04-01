import { createFileRoute } from "@tanstack/react-router";
import { queries } from "~/client/client.js";
import { PostCrumbs } from "~/components/post/post-crumbs.js";
import { PostView } from "~/components/post/view.js";
import { AUTHOR, PUBLIC_URL } from "~/const.js";
import { getPostAncestors } from "~/utils/posts.utils.js";
import { getPageDescriptionMeta, getPageTitleMeta } from "~/utils/seo.utils.js";

export const Route = createFileRoute("/_app/posts/$")({
    component: RouteComponent,

    loader: async ({
        params: { _splat: slug = "" },
        context: { queryClient },
    }) => {
        const post = await queryClient.fetchQuery(queries.posts.manifest(slug));
        return {
            post,
        } as const;
    },

    head: ({ loaderData: { post } }) => ({
        meta: [
            ...getPageTitleMeta(
                `${Array.from(getPostAncestors(post))
                    .reverse()
                    .map((p) => p.manifest.title)
                    .join(" / ")} — Posts by ${AUTHOR}`,
            ),
            ...getPageDescriptionMeta(
                `${post.manifest.summary ? post.manifest.summary + " — " : ""}Read more on ${PUBLIC_URL}.`,
            ),
        ],
    }),
});

function RouteComponent() {
    const { post } = Route.useLoaderData();

    return (
        <>
            <PostCrumbs post={post} />
            <PostView {...post} />
        </>
    );
}
