import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/posts/$")({
    component: RouteComponent,
});

function RouteComponent() {
    const { _splat: path } = Route.useParams();

    return <div>Hello "{path}"!</div>;
}
