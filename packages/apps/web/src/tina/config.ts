import { Collection, defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "develop";

// ! This file gets loaded on the client, so do not use node libs or __dirname here!

function createSlugify(
    field: string,
): Exclude<
    Exclude<Collection["ui"], undefined>["filename"],
    undefined
>["slugify"] {
    return (values) => {
        const fieldValue = values[field];
        if (typeof fieldValue !== "string") return "";
        return fieldValue.toLowerCase().replace(/\s+/g, "-");
    };
}

function createSplatRouter(
    basePath: string,
): Exclude<Collection["ui"], undefined>["router"] {
    return ({ document }) =>
        `${basePath}/${document._sys.breadcrumbs.join("/")}`;
}

export default defineConfig({
    branch,

    // Get this from tina.io
    // clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    // Get this from tina.io
    // token: process.env.TINA_TOKEN,

    build: {
        outputFolder: "admin",
        publicFolder: "../public",
    },
    media: {
        tina: {
            mediaRoot: "media",
            publicFolder: "../public",
        },
    },

    localContentPath:
        process.env.REMOTE_CONTENT_PATH || "../../data/website-contents", // ! Relative paths here are relative to the config *file*, not the localRoot, unlike everything else

    // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
    schema: {
        collections: [
            {
                name: "post",
                label: "Posts",
                path: "content/posts",
                format: "md",
                templates: [
                    {
                        name: "post",
                        label: "Post",
                        fields: [
                            {
                                type: "string",
                                name: "title",
                                label: "Title",
                                required: true,
                            },
                            {
                                type: "string",
                                name: "description",
                                label: "Description",
                            },
                            {
                                type: "datetime",
                                name: "publishTime",
                                label: "Publish Time",
                                description:
                                    "The time this post should be published. If in the future, it will be scheduled. If unset, will be considered a 'draft' and not be visible.",
                                ui: {
                                    dateFormat: "YYYY-MM-DD",
                                    timeFormat: "HH:mm",
                                },
                            },
                            {
                                type: "rich-text",
                                name: "body",
                                label: "Body",
                                isBody: true,
                            },
                        ],
                        ui: {
                            defaultItem: () => ({
                                publishTime: new Date(),
                            }),
                        },
                    },
                ],
                ui: {
                    router: createSplatRouter("/posts"),
                    filename: {
                        slugify: createSlugify("title"),
                    },
                },
            },
            {
                name: "tag",
                label: "Tags",
                path: "content/tags",
                format: "json",
                fields: [
                    {
                        type: "string",
                        name: "name",
                        label: "Name",
                        required: true,
                        isTitle: true,
                    },
                ],
                ui: {
                    filename: {
                        slugify: createSlugify("name"),
                    },
                },
            },
        ],
    },
});
