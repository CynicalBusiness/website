import { parseISO } from "date-fns";
import { PublishedPostManifest } from "~/schema/post-manifest.schema.js";

export interface PostTitleProps {
    manifest: PublishedPostManifest;
    hideTitle?: boolean;
}

export function PostTitle({ hideTitle, manifest }: PostTitleProps) {
    return (
        <>
            {!hideTitle && (
                <h1>
                    {manifest.title}{" "}
                    <small className="text-[60%]">
                        by CynicalBusiness &nbsp;
                        {typeof manifest.published === "string" && (
                            <span
                                className="chip small"
                                title={
                                    "Originally Published " +
                                    parseISO(
                                        manifest.published,
                                    ).toLocaleDateString()
                                }
                            >
                                {manifest.updated ? "Updated" : "Published"}{" "}
                                {parseISO(
                                    manifest.updated ?? manifest.published,
                                ).toLocaleDateString()}
                            </span>
                        )}
                    </small>
                </h1>
            )}
            {manifest.summary && (
                <h5 className="opacity-50">{manifest.summary}</h5>
            )}
        </>
    );
}
