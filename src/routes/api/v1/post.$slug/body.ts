import { createAPIFileRoute } from "@tanstack/react-start/api";
import { HTTPStatus } from "~/const.js";
import { services } from "~/services/container.js";
import { PostsService } from "~/services/posts.service.js";

export const APIRoute = createAPIFileRoute("/api/v1/post/$slug/body")({
    GET: async ({ params: { slug } }) => {
        slug = PostsService.normalizeSlug(slug);

        const { postsService } = services.cradle;

        const post = await postsService.getPost(slug);
        if (!post) {
            return new Response("No such public post: " + slug, {
                status: HTTPStatus.NOT_FOUND,
            });
        }

        const body = await postsService.readRawPostBody(post);
        if (!body) {
            return new Response("Post has no body: " + slug, {
                status: HTTPStatus.NOT_FOUND,
            });
        }

        return new Response(body, {
            headers: {
                ["Content-Type"]: "text/markdown",
            },
        });
    },
});
