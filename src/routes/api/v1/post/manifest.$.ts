import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { HTTPStatus } from "~/const.js";
import { services } from "~/services/container.js";

export const APIRoute = createAPIFileRoute("/api/v1/post/manifest/$")({
    GET: async ({ params }) => {
        const slug = params._splat;
        if (!slug) {
            return new Response("No post slug provided", {
                status: HTTPStatus.BAD_REQUEST,
            });
        }

        const { postsService } = services.cradle;
        const manifest = await postsService.readPostManifest(slug);

        if (!postsService.isManifestPublic(manifest)) {
            return new Response("No such public post: " + slug, {
                status: HTTPStatus.NOT_FOUND,
            });
        }

        return json({ manifest });
    },
});
