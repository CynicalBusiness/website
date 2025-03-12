import { createAPIFileRoute } from "@tanstack/react-start/api";
import { HTTPStatus } from "~/const.js";
import { services } from "~/services/container.js";

export const APIRoute = createAPIFileRoute("/api/v1/post/body/$")({
    GET: async ({ params }) => {
        const slug = params._splat;
        if (!slug) {
            return new Response("No post slug provided", {
                status: HTTPStatus.BAD_REQUEST,
            });
        }

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
