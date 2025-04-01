import { createFileRoute } from "@tanstack/react-router";
import { queries } from "~/client/client.js";
import { PostView } from "~/components/post/view.js";
import { AUTHOR, POST_INDEX } from "~/const.js";
import { getPageTitleMeta } from "~/utils/seo.utils.js";

export const Route = createFileRoute("/_app/posts/")({
    component: RouteComponent,

    loader: async ({ context: { queryClient } }) => {
        const post = await queryClient.fetchQuery(
            queries.posts.manifest(POST_INDEX),
        );
        return {
            post,
        } as const;
    },

    head: () => ({
        meta: [...getPageTitleMeta(`Posts by ${AUTHOR}`)],
    }),
});

function RouteComponent() {
    const {
        post: { manifest },
    } = Route.useLoaderData();
    return (
        <PostView
            slug={POST_INDEX}
            manifest={manifest}
        />
    );
}
