import { useSuspenseQuery } from "@tanstack/react-query";
import { queries } from "~/client/client.js";
import { Markup } from "../markup.js";

export interface PostBodyProps {
    slug: string;
}

export function PostBody({ slug }: PostBodyProps) {
    const { data: body } = useSuspenseQuery(queries.posts.body(slug));

    return <Markup>{body}</Markup>;
}
