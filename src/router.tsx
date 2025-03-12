import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.js";
import { isServer, QueryClient } from "@tanstack/react-query";
import { DEBUG } from "./const.js";
import { getRequestURL } from "@tanstack/react-start/server";

const debug = DEBUG.extend("router");

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

            defaultErrorComponent: function DefaultError({ error }) {
                return (
                    <div>
                        <h4>Error</h4>
                        <pre className="overflow-x-scroll">
                            {JSON.stringify(error, null, 2)}
                        </pre>
                    </div>
                );
            },
        }),
        queryClient,
    );

    if (isServer) {
        debug("Web request:", getRequestURL().href);
    }

    return router;
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof createRouter>;
    }
}
