import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { normalize } from "node:path/posix";
import { compareDesc, isPast, parseISO } from "date-fns";
import yaml from "yaml";
import NodeCache from "node-cache";
import { isString } from "lodash-es";
import { AppServices } from "./container.js";
import { ContentService } from "./content.service.js";
import { SchemaService } from "./schema.service.js";
import { isNodeError } from "~/utils/validation.utils.js";
import {
    PostInfo,
    PostManifest,
    PublishedPostManifest,
} from "~/schema/post-manifest.schema.js";
import { DEBUG, IS_DEV, POST_INDEX, ZeroDate } from "~/const.js";

const debug = DEBUG.extend("posts");

interface PostCacheEntry {
    readonly slug: string;
    readonly manifest?: PostManifest | null;
    readonly body?: string | null;
    readonly children?: readonly string[];
}

type PostCacheStore = Map<string, PostCacheEntry>;
export const PostCacheStoreKey = Symbol("PostCacheStore");

declare module "./context.js" {
    interface RequestContextStore {
        [PostCacheStoreKey]?: PostCacheStore;
    }
}

const POST_CACHE_PREFIX = "post";
const CHILDREN_CACHE_PREFIX = "children";

export class PostsService {
    public static normalizeSlug(slug: string | null | undefined): string {
        if (!slug || slug === POST_INDEX) return "";
        slug = slug.replace(/__+/g, "/");
        return normalize(slug);
    }

    public readonly postsDir: string;

    private readonly postCache = new NodeCache({
        stdTTL: IS_DEV ? 10 : 60 * 60 * 5,
        checkperiod: 60,
    });
    private readonly contentService: ContentService;
    private readonly schemaService: SchemaService;

    constructor({ contentService, schemaService }: AppServices) {
        this.contentService = contentService;
        this.schemaService = schemaService;

        this.postsDir = this.contentService.getContentPath("posts");
        debug("Posts directory available from:", this.postsDir);
    }

    public getPostPath(slug: string): string {
        return this.contentService.getContentPath(
            "posts",
            PostsService.normalizeSlug(slug),
        );
    }

    public async getPost(slug: string): Promise<PostInfo | null> {
        const cached = this.postCache.get<PostInfo | null>(
            `${POST_CACHE_PREFIX}:${slug}`,
        );
        if (cached !== undefined) {
            return cached;
        }

        const info = await this.readPostManifest(slug);
        this.postCache.set(`${POST_CACHE_PREFIX}:${slug}`, info);
        return info;
    }

    private async readPostManifest(slug: string): Promise<PostInfo | null> {
        const postDir = this.getPostPath(slug);

        try {
            const postDirStats = await stat(postDir);

            if (!postDirStats.isDirectory()) {
                debug("Post directory found but not a directory:", slug);
                return null;
            }

            const manifestData = await readFile(
                join(postDir, "manifest.yaml"),
                "utf-8",
            );
            const manifest = yaml.parse(manifestData);
            if (!this.schemaService.validatePostManifest(manifest)) {
                debug("Post manifest failed validation:", slug);
                return null;
            }

            if (!this.isManifestPublic(manifest)) {
                debug("Post manifest is not public:", slug);
                return null;
            }

            const slugLastSlash = slug.lastIndexOf("/");
            const parent =
                slugLastSlash > 0
                    ? await this.readPostManifest(slug.slice(0, slugLastSlash))
                    : undefined;

            if (parent === null) {
                debug("No public parent post manifest:", slug);
                return null;
            }

            debug("Successfully fetched post manifest:", slug);
            return { slug, manifest, parent };
        } catch (error) {
            if (isNodeError(error) && error.code === "ENOENT") {
                debug("No such post directory or has no manifest:", slug);
                return null;
            }
            throw error;
        }
    }

    private isManifestPublic(
        manifest: PostManifest | null,
    ): manifest is PublishedPostManifest {
        return (
            !!manifest?.published &&
            (manifest.published === true ||
                isPast(parseISO(manifest.published)))
        );
    }

    public async readRawPostBody({
        slug,
        manifest,
    }: PostInfo): Promise<string | null> {
        const postDir = this.getPostPath(slug);

        if (!this.isManifestPublic(manifest) || !manifest.body) {
            debug("No public post body:", slug);
            return null;
        }

        const bodyPath = join(postDir, manifest.body);
        const relativeBodyPath =
            this.contentService.getRelativeToContentPath(bodyPath);

        try {
            const bodyData = await readFile(bodyPath, "utf-8");
            debug("Successfully fetched post body:", relativeBodyPath);
            return bodyData;
        } catch (error) {
            if (isNodeError(error) && error.code === "ENOENT") {
                debug("No such post body:", relativeBodyPath);
                return null;
            }
            throw error;
        }
    }

    public async getPostChildren({ slug }: PostInfo) {
        const cached = this.postCache.get<PostInfo[] | null>(
            `${CHILDREN_CACHE_PREFIX}:${slug}`,
        );
        if (cached !== undefined) {
            return cached;
        }

        const children = await this.readPostChildren(slug);
        this.postCache.set(`${CHILDREN_CACHE_PREFIX}:${slug}`, children);
        return children;
    }

    private async readPostChildren(slug: string): Promise<PostInfo[] | null> {
        const postDir = this.getPostPath(slug);
        try {
            const entries = await readdir(postDir, { withFileTypes: true });
            const manifestPromises = Iterator.from(entries)
                .filter((entry) => entry.isDirectory())
                .map(async (entry) => {
                    const childSlug = slug
                        ? `${slug}/${entry.name}`
                        : entry.name;
                    return await this.getPost(childSlug);
                })
                .toArray();

            return Iterator.from(await Promise.allSettled(manifestPromises))
                .map((result) => {
                    if (result.status === "rejected") {
                        debug("Failed to read post manifest:", result.reason);
                        return null;
                    }

                    return result.value &&
                        this.isManifestPublic(result.value.manifest)
                        ? result.value
                        : null;
                })
                .filter((m) => !!m)
                .toArray()
                .sort(
                    ({ manifest: a }, { manifest: b }) =>
                        compareDesc(
                            isString(a.published)
                                ? parseISO(a.published)
                                : ZeroDate,
                            isString(b.published)
                                ? parseISO(b.published)
                                : ZeroDate,
                        ) || a.title.localeCompare(b.title),
                );
        } catch (error) {
            if (isNodeError(error) && error.code === "ENOENT") {
                debug("No such post directory or has no manifest:", slug);
                return null;
            }
            throw error;
        }
    }
}
