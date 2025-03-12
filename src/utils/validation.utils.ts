import { isObject } from "lodash-es";

export function isNodeError(error: unknown): error is NodeJS.ErrnoException {
    return isObject(error) && ("code" in error || "errno" in error);
}
