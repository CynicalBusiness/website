import { createAPIFileRoute } from "@tanstack/react-start/api";
import { HTTPStatus } from "~/const.js";
import { services } from "~/services/container.js";
import { PostsService } from "~/services/posts.service.js";

export const APIRoute = createAPIFileRoute("/api/v1/post/body/$")({
    GET: async ({ params }) => {
        const slug = PostsService.normalizeSlug(params._splat);

        const { postsService } = services.cradle;

        const body = await postsService.readRawPostBody(slug);

        if (!body) {
            return new Response(
                "No such public post or post has no body: " + slug,
                {
                    status: HTTPStatus.NOT_FOUND,
                },
            );
        }

        return new Response(body, {
            headers: {
                ["Content-Type"]: "text/markdown",
            },
        });
    },
});
