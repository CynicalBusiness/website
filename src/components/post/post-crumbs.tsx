import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Fragment, Suspense } from "react";
import { queries } from "~/client/client.js";

export interface PostCrumbsProps {
    slug: string;
}

function* getCrumbs(slug: string) {
    if (!slug) return;

    let idx = 0;
    while (true) {
        idx = slug.indexOf("/", idx ? idx + 1 : undefined);
        if (idx < 0) {
            yield slug;
            break;
        }
        yield slug.slice(0, idx);
    }
}

export function PostCrumbs({ slug }: PostCrumbsProps) {
    const slugs = Array.from(getCrumbs(slug));

    const slugElements = slugs.map((slug) => (
        <Fragment key={slug}>
            <span className="px-2">/</span>
            <PostCrumbs.Entry slug={slug} />
        </Fragment>
    ));

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

PostCrumbs.Entry = function PostCrumbsEntry({ slug }: PostCrumbsProps) {
    const {
        data: { title },
    } = useSuspenseQuery(queries.posts.manifest(slug));

    return (
        <Link
            to="/posts/$"
            params={{ _splat: slug }}
            activeOptions={{ exact: true }}
        >
            {title}
        </Link>
    );
};
