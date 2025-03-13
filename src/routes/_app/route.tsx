import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { Footer } from "~/components/layout/footer.js";
import { MainNav } from "~/components/layout/main-nav.js";
import { Spinner } from "~/components/spinner.js";

export const Route = createFileRoute("/_app")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <MainNav />
            <main className="container">
                <Suspense fallback={<Spinner />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
