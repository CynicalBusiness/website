import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { HTTPStatus } from "~/const.js";
import { services } from "~/services/container.js";
import { PostsService } from "~/services/posts.service.js";

export const APIRoute = createAPIFileRoute("/api/v1/post/$slug/manifest")({
    GET: async ({ params: { slug } }) => {
        slug = PostsService.normalizeSlug(slug);

        const { postsService } = services.cradle;
        const post = await postsService.getPost(slug);
        if (!post) {
            return new Response("No such public post: " + slug, {
                status: HTTPStatus.NOT_FOUND,
            });
        }

        return json({ manifest: post.manifest });
    },
});
