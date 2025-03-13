import { createFileRoute } from "@tanstack/react-router";
import { PostView } from "~/components/post/view.js";
import { POST_INDEX } from "~/const.js";

export const Route = createFileRoute("/_app/posts/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <PostView slug={POST_INDEX} />;
}
