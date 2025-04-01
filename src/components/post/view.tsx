import { Suspense } from "react";
import { Spinner } from "../spinner.js";
import { PostTitle } from "./title.js";
import { PostBody } from "./body.js";
import { PostChildren } from "./post-children.js";
import { PostInfo } from "~/schema/post-manifest.schema.js";

export interface PostViewProps extends Pick<PostInfo, "slug" | "manifest"> {}

export function PostView({ slug, manifest }: PostViewProps) {
    return (
        <>
            <PostTitle manifest={manifest} />
            <PostChildren
                slug={slug}
                body={!!manifest.body}
            />

            <section className="post-body">
                {manifest.body && (
                    <div className="panel">
                        <Suspense fallback={<Spinner />}>
                            <PostBody slug={slug} />
                        </Suspense>
                    </div>
                )}
            </section>
        </>
    );
}
