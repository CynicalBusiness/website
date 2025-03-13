import { isObject } from "lodash-es";

export interface GenericErrorProps {
    error: unknown;
}

export function GenericError({ error }: GenericErrorProps) {
    const errorMsg = String(
        (isObject(error) && "message" in error && error.message) ||
            "An unexpected error occurred.",
    );

    return (
        <>
            <h2>Unexpected Error</h2>
            <p>The page or object could not be displayed: {errorMsg}</p>
            <details>
                <summary>View Full Error</summary>
                <pre className="text-xs scroll-auto">
                    {JSON.stringify(error, null, 2)}
                </pre>
            </details>
        </>
    );
}
