import { PostInfo } from "~/schema/post-manifest.schema.js";

export function* getPostAncestors(
    post: PostInfo,
    includeCurrent = true,
): Generator<PostInfo> {
    if (includeCurrent) {
        yield post;
    }
    if (post.parent) {
        yield* getPostAncestors(post.parent);
    }
}
