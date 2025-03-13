import { ErrorComponent } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useMemo } from "react";
import { GenericError } from "./generic-error.js";
import { RequestError } from "./request-error.js";

export const HandleError = function ({ error }) {
    return useMemo(() => {
        if (error instanceof AxiosError) {
            return <RequestError error={error} />;
        }

        return <GenericError error={error} />;
    }, [error]);
} satisfies typeof ErrorComponent;
