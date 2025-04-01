import { Link } from "@tanstack/react-router";
import { Fragment, Suspense, useMemo } from "react";
import { PostInfo } from "~/schema/post-manifest.schema.js";
import { getPostAncestors } from "~/utils/posts.utils.js";

export interface PostCrumbsProps {
    post: PostInfo;
}

export function PostCrumbs({ post }: PostCrumbsProps) {
    const slugElements = useMemo(
        () =>
            Array.from(getPostAncestors(post))
                .reverse()
                .map((p) => (
                    <Fragment key={p.slug}>
                        <span className="px-2">/</span>
                        <PostCrumbs.Entry post={p} />
                    </Fragment>
                )),
        [post],
    );

    return slugElements.length ? (
        <div>
            <Link
                to="/posts"
                activeOptions={{ exact: true }}
            >
                Posts
            </Link>
            <Suspense>{slugElements}</Suspense>
        </div>
    ) : null;
}

PostCrumbs.Entry = function PostCrumbsEntry({
    post: { slug, manifest },
}: PostCrumbsProps) {
    return (
        <Link
            to="/posts/$"
            params={{ _splat: slug }}
            activeOptions={{ exact: true }}
        >
            {manifest.title}
        </Link>
    );
};
