import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.js";
import { QueryClient } from "@tanstack/react-query";
import { HandleError } from "./components/errors/handle-error.js";

export function createRouter() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
            mutations: {
                retry: false,
            },
        },
    });

    const router = routerWithQueryClient(
        createTanStackRouter({
            routeTree,
            context: {
                queryClient,
            },
            scrollRestoration: true,

            defaultErrorComponent: HandleError,
        }),
        queryClient,
    );

    return router;
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof createRouter>;
    }
}
