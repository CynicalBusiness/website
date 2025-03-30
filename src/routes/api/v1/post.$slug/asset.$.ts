import { FileHandle, open } from "node:fs/promises";
import { resolve } from "node:path";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import mime from "mime-types";
import { HTTPStatus } from "~/const.js";
import { services } from "~/services/container.js";
import { PostsService } from "~/services/posts.service.js";
import { readHandleToStream } from "~/utils/fs.utils.js";

export const APIRoute = createAPIFileRoute("/api/v1/post/$slug/asset/$")({
    GET: async ({ params: { _splat: assetName, slug } }) => {
        slug = PostsService.normalizeSlug(slug);

        if (!assetName) {
            return new Response("Missing path", {
                status: HTTPStatus.BAD_REQUEST,
            });
        }

        const { postsService } = services.cradle;
        const post = await postsService.getPost(slug);
        if (!post) {
            return new Response("No such public post: " + slug, {
                status: HTTPStatus.NOT_FOUND,
            });
        }

        const asset = post.manifest.assets?.find((a) => a.name === assetName);
        if (!asset) {
            return new Response(`No such asset: ${slug}:${assetName}`, {
                status: HTTPStatus.NOT_FOUND,
            });
        }

        const assetPath = asset.path || assetName;
        const contentType =
            asset.contentType || mime.lookup(assetPath) || "text/plain";
        const postDir = postsService.getPostPath(post.slug);

        let handle: FileHandle | undefined;

        try {
            handle = await open(resolve(postDir, assetPath), "r");

            return new Response(readHandleToStream(handle), {
                status: HTTPStatus.OK,
                headers: {
                    "Content-Type": contentType,
                },
            });
        } catch (err) {
            await handle?.close();
            return new Response(
                `Error reading asset: ${slug}:${assetName} (${err})`,
                {
                    status: HTTPStatus.INTERNAL_SERVER_ERROR,
                },
            );
        }
    },
});
