import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainNav } from "~/components/layout/main-nav";

export const Route = createFileRoute("/_app")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <MainNav />
            <main className="container">
                <Outlet />
            </main>
        </>
    );
}
