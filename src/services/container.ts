import { asClass, createContainer } from "awilix";
import { ContentService } from "./content.service.js";
import { PostsService } from "./posts.service.js";
import { SchemaService } from "./schema.service.js";

export interface AppServices {
    contentService: ContentService;
    schemaService: SchemaService;
    postsService: PostsService;
}

function createServiceContainer() {
    const container = createContainer<AppServices>();

    container.register({
        contentService: asClass(ContentService).singleton(),
        schemaService: asClass(SchemaService).singleton(),
        postsService: asClass(PostsService).singleton(),
    });

    return container;
}

async function createAndSetupServices() {
    const container = createServiceContainer();

    const { contentService, schemaService } = container.cradle;

    await contentService.init();
    await schemaService.init();

    return container;
}

export const services = await createAndSetupServices();
