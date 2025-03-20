import {
    createStartHandler,
    defaultStreamHandler,
} from "@tanstack/react-start/server";
import { getRouterManifest } from "@tanstack/react-start/router-manifest";
import { createRouter } from "./router.js";

import "./services/container.js";

export default createStartHandler({
    createRouter,
    getRouterManifest,
})(defaultStreamHandler);
