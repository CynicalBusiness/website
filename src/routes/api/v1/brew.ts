import { createAPIFileRoute } from "@tanstack/react-start/api";
import { HttpStatusCode } from "axios";

export const APIRoute = createAPIFileRoute("/api/v1/brew")({
    GET: () => {
        // this has gotta be the dumbest API route
        // but who am I to refuse to implement an HTTP standard?
        return new Response("Cannot GET /brew: I'm a teapot", {
            status: HttpStatusCode.ImATeapot,
        });
    },
});
