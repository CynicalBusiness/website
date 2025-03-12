import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { postManifestSchema } from "~/schema/post-manifest.schema.js";

export const APIRoute = createAPIFileRoute("/api/v1/schema/post-manifest")({
    GET: () => {
        return json(postManifestSchema);
    },
});
