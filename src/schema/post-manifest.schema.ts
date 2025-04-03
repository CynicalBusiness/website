import { FromSchema, JSONSchema } from "json-schema-to-ts";

export const postManifestSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://cynical.business/api/v1/schema/post-manifest",

    type: "object",

    properties: {
        title: {
            type: "string",
            description: "The title of the post",
        },
        summary: {
            type: "string",
            description: "A short summary of the post",
        },
        published: {
            oneOf: [
                {
                    type: "string",
                    format: "date-time",
                },
                {
                    type: "string",
                    format: "date",
                },
                {
                    type: "boolean",
                },
            ],
            description:
                "The date the post was published. May be unset for drafts, or set in the future to schedule a post.",
        },
        updated: {
            type: "string",
            description: "The date the post was last updated, if any.",
            format: "date-time",
        },
        body: {
            oneOf: [
                {
                    type: "string",
                    description: "The path to the post content",
                },
                {
                    const: false,
                },
            ],
            default: "document.md",
        },
        assets: {
            description: "Additional public assets for the post",
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        description: "The name of the asset",
                        type: "string",
                    },
                    path: {
                        description:
                            "The path to the asset, relative to the post's directory. Uses the name if not set.",
                        type: "string",
                    },
                    contentType: {
                        description: "Override the content type of the asset",
                        type: "string",
                    },
                    role: {
                        description: "Special role this asset serves, if any",
                        type: "string",
                        enum: ["thumb"],
                    },
                },
                required: ["name"],
            },
        },
    },

    required: ["title"],
} as const satisfies JSONSchema;

export type PostManifest = FromSchema<typeof postManifestSchema>;

export type PublishedPostManifest = Exclude<
    PostManifest,
    { published: false | undefined }
>;

export interface PostInfo {
    slug: string;
    manifest: PublishedPostManifest;
    parent?: PostInfo;
}
