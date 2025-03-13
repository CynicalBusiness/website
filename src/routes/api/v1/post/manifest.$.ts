import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { HTTPStatus } from "~/const.js";
import { services } from "~/services/container.js";
import { PostsService } from "~/services/posts.service.js";

export const APIRoute = createAPIFileRoute("/api/v1/post/manifest/$")({
    GET: async ({ params }) => {
        const slug = PostsService.normalizeSlug(params._splat);

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
