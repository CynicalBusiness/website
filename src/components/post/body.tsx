import { useSuspenseQuery } from "@tanstack/react-query";
import { Markup } from "../markup.js";
import { queries } from "~/client/client.js";

export interface PostBodyProps {
    slug: string;
}

export function PostBody({ slug }: PostBodyProps) {
    const { data: body } = useSuspenseQuery(queries.posts.body(slug));

    return <Markup>{body}</Markup>;
}
