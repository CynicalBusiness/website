import { useSuspenseQuery } from "@tanstack/react-query";
import { queries } from "~/client/client.js";
import { PostCard } from "./post-card.js";

export interface PostChildrenProps {
    slug: string;
}

export function PostChildren({ slug }: PostChildrenProps) {
    const { data: children } = useSuspenseQuery(queries.posts.children(slug));

    const postCards = children.map(([childSlug, child]) => (
        <PostCard
            key={childSlug}
            slug={childSlug}
            manifest={child}
        />
    ));

    return postCards.length ? (
        <>
            <hr />
            <section className="post-children">{postCards}</section>
        </>
    ) : null;
}
