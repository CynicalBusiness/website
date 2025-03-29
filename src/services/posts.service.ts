import { readdir, readFile, stat } from "node:fs/promises";
import { join, normalize } from "node:path";
import { compareDesc, isPast, parseISO } from "date-fns";
import yaml from "yaml";
import { AppServices } from "./container.js";
import { ContentService } from "./content.service.js";
import { ContextService } from "./context.js";
import { SchemaService } from "./schema.service.js";
import { isNodeError } from "~/utils/validation.utils.js";
import {
    PostManifest,
    PublishedPostManifest,
} from "~/schema/post-manifest.schema.js";
import { DEBUG, POST_INDEX } from "~/const.js";

const debug = DEBUG.extend("posts");

interface PostCacheEntry {
    readonly manifest?: PublishedPostManifest | null;
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

export class PostsService {
    public static normalizeSlug(slug: string | undefined): string {
        if (!slug || slug === POST_INDEX) return "";
        return normalize(slug);
    }

    public readonly postsDir: string;

    private readonly contextService: ContextService;
    private readonly contentService: ContentService;
    private readonly schemaService: SchemaService;

    constructor({
        contextService,
        contentService,
        schemaService,
    }: AppServices) {
        this.contextService = contextService;
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

    public async readPostManifest(
        slug: string,
    ): Promise<PublishedPostManifest | null> {
        const cached = this.readCache(slug)?.manifest;
        if (cached) {
            return cached;
        }

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
            if (slugLastSlash > 0) {
                const parentManifest = await this.readPostManifest(
                    slug.slice(0, slugLastSlash),
                );
                if (!parentManifest) {
                    debug("No public parent post manifest:", slug);
                    return null;
                }
            }

            debug("Successfully fetched post manifest:", slug);
            this.writeCache(slug, { manifest });
            return manifest;
        } catch (error) {
            if (isNodeError(error) && error.code === "ENOENT") {
                debug("No such post directory or has no manifest:", slug);
                return null;
            }
            throw error;
        }
    }

    public isManifestPublic(
        manifest: PostManifest | null,
    ): manifest is PostManifest & { published: string } {
        return (
            !!manifest?.published &&
            (manifest.published === true ||
                isPast(parseISO(manifest.published)))
        );
    }

    public async readRawPostBody(slug: string): Promise<string | null> {
        const postDir = this.getPostPath(slug);

        const manifest = await this.readPostManifest(slug);
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

    public async readPostChildren(
        slug: string,
    ): Promise<Array<
        readonly [string, PostManifest & { published: string }]
    > | null> {
        const manifest = await this.readPostManifest(slug);
        if (!manifest) return null;

        const postDir = this.getPostPath(slug);
        try {
            const entries = await readdir(postDir, { withFileTypes: true });
            const manifestPromises = Iterator.from(entries)
                .filter((entry) => entry.isDirectory())
                .map(async (entry) => {
                    const childSlug = slug
                        ? `${slug}/${entry.name}`
                        : entry.name;
                    return [
                        childSlug,
                        await this.readPostManifest(childSlug),
                    ] as const;
                })
                .toArray();

            return Iterator.from(await Promise.allSettled(manifestPromises))
                .map((result) => {
                    if (result.status === "rejected") {
                        debug("Failed to read post manifest:", result.reason);
                        return null;
                    }

                    const [slug, manifest] = result.value;
                    if (this.isManifestPublic(manifest)) {
                        return [slug, manifest] as const;
                    }
                    return null;
                })
                .filter((m) => !!m)
                .toArray()
                .sort(([, a], [, b]) => compareDesc(a.published, b.published));
        } catch (error) {
            if (isNodeError(error) && error.code === "ENOENT") {
                debug("No such post directory or has no manifest:", slug);
                return null;
            }
            throw error;
        }
    }

    private getCacheStore(): PostCacheStore {
        let store = this.contextService.get(PostCacheStoreKey);
        if (!store) {
            this.contextService.set(PostCacheStoreKey, (store = new Map()));
        }
        return store;
    }

    private readCache(slug: string): PostCacheEntry | undefined {
        return this.getCacheStore().get(slug);
    }

    private writeCache(
        slug: string,
        partialEntry: Partial<PostCacheEntry>,
    ): PostCacheEntry {
        const cacheStore = this.getCacheStore();

        const entry = { ...(cacheStore.get(slug) ?? {}), ...partialEntry };
        cacheStore.set(slug, entry);
        return entry;
    }
}
