import { createFileRoute } from "@tanstack/react-router";
import { PostView } from "~/components/post/view.js";

export const Route = createFileRoute("/_app/posts/$")({
    component: RouteComponent,
});

function RouteComponent() {
    const { _splat: slug } = Route.useParams();

    return <PostView slug={slug!} />;
}
