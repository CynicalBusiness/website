import { useSuspenseQuery } from "@tanstack/react-query";
import { queries } from "~/client/client.js";
import { PostTitle } from "./title.js";
import { PostBody } from "./body.js";
import { Suspense } from "react";
import { Spinner } from "../spinner.js";
import { PostChildren } from "./post-children.js";

export interface PostViewProps {
    slug: string;
}

export function PostView({ slug }: PostViewProps) {
    const { data: manifest } = useSuspenseQuery(queries.posts.manifest(slug));

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
