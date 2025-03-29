import { useSuspenseQuery } from "@tanstack/react-query";
import { PostCard } from "./post-card.js";
import { queries } from "~/client/client.js";

export interface PostChildrenProps {
    slug: string;
    body?: boolean;
}

export function PostChildren({ slug, body = true }: PostChildrenProps) {
    const { data: children } = useSuspenseQuery(queries.posts.children(slug));

    const postCards = children.map(([childSlug, child]) => (
        <PostCard
            key={childSlug}
            slug={childSlug}
            manifest={child}
        />
    ));

    return (
        <section className="post-children">
            {postCards.length
                ? postCards
                : !body && <h5 className="text-center">Nothing here yet.</h5>}
        </section>
    );
}
