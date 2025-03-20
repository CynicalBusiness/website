import {
    createStartAPIHandler,
    defaultAPIFileRouteHandler,
} from "@tanstack/react-start/api";

import "./services/container.js";

export default createStartAPIHandler(defaultAPIFileRouteHandler);
