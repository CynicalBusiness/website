import { PublishedPostManifest } from "~/schema/post-manifest.schema.js";
import { Markup } from "../markup.js";
import { parseISO } from "date-fns";

export interface PostTitleProps {
    manifest: PublishedPostManifest;
    hideTitle?: boolean;
}

export function PostTitle({ hideTitle, manifest }: PostTitleProps) {
    return (
        <>
            {!hideTitle && (
                <h1 className="text-6xl">
                    {manifest.title}{" "}
                    <small className="text-2xl">
                        by CynicalBusiness &nbsp;
                        <span className="chip small">
                            Published{" "}
                            {parseISO(manifest.published).toLocaleDateString()}
                        </span>
                    </small>
                </h1>
            )}
            {manifest.summary && (
                <h5 className="opacity-50">
                    <Markup>{manifest.summary}</Markup>
                </h5>
            )}
        </>
    );
}
