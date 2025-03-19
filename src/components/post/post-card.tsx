import { PublishedPostManifest } from "~/schema/post-manifest.schema.js";
import { Link } from "@tanstack/react-router";
import { Markup } from "../markup.js";
import { Icon } from "../icon.js";
import { TbArrowRight, TbNews } from "react-icons/tb";
import { parseISO } from "date-fns";

export interface PostCardProps {
    slug: string;
    manifest: PublishedPostManifest;
}

export function PostCard({ slug, manifest }: PostCardProps) {
    return (
        <Link
            className="plain card post-card"
            to={"/posts/$"}
            params={{ _splat: slug }}
        >
            <aside>
                <span className="chip primary aspect-square">
                    <Icon
                        Type={TbNews}
                        className="text-4xl bottom-0"
                    />
                </span>
            </aside>
            <header>{manifest.title}</header>
            {manifest.summary && (
                <div>
                    <Markup>{manifest.summary}</Markup>
                </div>
            )}
            <footer className="flex justify-between items-center">
                {typeof manifest.published === "string" && (
                    <div className="chip small">
                        {parseISO(manifest.published).toLocaleDateString()}
                    </div>
                )}
                <span>
                    Read Post <Icon Type={TbArrowRight} />
                </span>
            </footer>
        </Link>
    );
}
