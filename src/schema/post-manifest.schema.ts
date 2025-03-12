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
            type: "string",
            description:
                "The date the post was published. May be unset for drafts, or set in the future to schedule a post.",
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
    },

    required: ["title"],
} as const satisfies JSONSchema;

export type PostManifest = FromSchema<typeof postManifestSchema>;

export type PublishedPostManifest = PostManifest & { published: string };
