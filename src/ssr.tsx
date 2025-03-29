import {
    createStartHandler,
    defaultStreamHandler,
    getRequestHost,
    getRequestProtocol,
} from "@tanstack/react-start/server";
import { getRouterManifest } from "@tanstack/react-start/router-manifest";

import { createRouter } from "./router.js";
import { api, BASE_URL } from "./client/client.js";

import "./services/container.js";

export default createStartHandler({
    createRouter,
    getRouterManifest,
})(defaultStreamHandler);

api.defaults.baseURL = new URL(
    BASE_URL,
    `${getRequestProtocol()}://${getRequestHost()}/`,
).href;
