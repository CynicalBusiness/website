import debug from "debug";

import pkg from "../package.json" with { type: "json" };

export {
    ReasonPhrases as HTTPReason,
    StatusCodes as HTTPStatus,
} from "http-status-codes";

export const APP_NAME = pkg.productName;
export const APP_VERSION = pkg.version;

export const DEBUG_NAMESPACE = "cynicalbusiness:website";
export const DEBUG = debug(DEBUG_NAMESPACE);
