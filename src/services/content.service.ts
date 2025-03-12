import { mkdir } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { DEBUG } from "~/const.js";

const debug = DEBUG.extend("content");

export class ContentService {
    public static readonly contentDir = resolve(
        process.env.CYN_CONTENT_DIR || "content",
    );

    public getContentPath(...paths: string[]) {
        return resolve(ContentService.contentDir, ...paths);
    }

    public getRelativeToContentPath(path: string) {
        return relative(this.getContentPath(), path);
    }

    public async init() {
        const path = this.getContentPath();
        await mkdir(path, { recursive: true });
        debug("Content directory available from:", path);
    }
}
