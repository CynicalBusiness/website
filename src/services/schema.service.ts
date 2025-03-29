import { mkdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import Ajv, { Schema } from "ajv";
import addFormats from "ajv-formats";
import {
    wrapCompilerAsTypeGuard,
    wrapValidatorAsTypeGuard,
} from "json-schema-to-ts";
import { AppServices } from "./container.js";
import { ContentService } from "./content.service.js";
import { DEBUG } from "~/const.js";
import { postManifestSchema } from "~/schema/post-manifest.schema.js";

const debug = DEBUG.extend("schema");

export class SchemaService {
    public readonly schemaDir: string;
    public readonly validator;
    public readonly validatePostManifest;

    private readonly contentService: ContentService;

    constructor({ contentService }: AppServices) {
        this.contentService = contentService;

        this.schemaDir = contentService.getContentPath("schema");
        this.validator = new Ajv({
            useDefaults: true,
        });
        addFormats(this.validator);

        this.validatePostManifest = this.compile(postManifestSchema);
    }

    public async init() {
        await mkdir(this.schemaDir, { recursive: true });

        await this.writeSchema("post-manifest", postManifestSchema);
    }

    public compile = wrapCompilerAsTypeGuard((schema) => {
        const c = this.validator.compile(schema);
        return (data) => c(data) && this.updateSchemaPath(schema, data);
    });

    public validate = wrapValidatorAsTypeGuard(
        (schema, data) =>
            this.validator.validate(schema, data) &&
            this.updateSchemaPath(schema, data),
    );

    public async writeSchema(name: string, schema: object) {
        const schemaPath = join(this.schemaDir, `${name}.schema.json`);
        await writeFile(schemaPath, JSON.stringify(schema, null, 2));

        debug(
            "Wrote schema:",
            relative(this.contentService.getContentPath(), schemaPath),
        );
        return schemaPath;
    }

    private updateSchemaPath(source: Schema, target: unknown) {
        if (
            typeof source === "object" &&
            typeof target === "object" &&
            !!target
        ) {
            Object.assign(target, {
                $schema: source.$id,
            });
        }
        return true;
    }
}
