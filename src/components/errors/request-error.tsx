import { AxiosError } from "axios";
import { HTTPReason, HTTPStatus } from "~/const.js";

export interface RequestErrorProps {
    error: AxiosError;
}

export function RequestError({ error }: RequestErrorProps) {
    const reason =
        HTTPReason[HTTPStatus[error.status ?? 400] as keyof typeof HTTPReason];

    return (
        <>
            <h2 className="mb-0">
                {reason}{" "}
                <small className="text-sm opacity-75">
                    Request to: <code>{error.config?.url}</code>
                </small>
            </h2>
            <p>
                Request could not be completed because the server responded with
                code:{" "}
                <strong>
                    {" "}
                    {error.status} {reason}
                </strong>
                .
            </p>
        </>
    );
}
