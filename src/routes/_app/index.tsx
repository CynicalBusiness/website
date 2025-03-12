import { createFileRoute } from "@tanstack/react-router";
import { BrandText } from "~/components/branding/brand-text.js";

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="mx-auto text-center">
            <p className="text-8xl mt-2 md:mt-8 lg:mt-16">
                <BrandText bar />
            </p>
            <p className="text-3xl mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="text-xl opacity-75">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
            </p>
        </div>
    );
}
