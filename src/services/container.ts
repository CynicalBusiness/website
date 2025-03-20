import { asClass, createContainer } from "awilix";
import { ContentService } from "./content.service.js";
import { ContextService } from "./context.js";
import { PostsService } from "./posts.service.js";
import { SchemaService } from "./schema.service.js";

export interface AppServices {
    contextService: ContextService;
    contentService: ContentService;
    schemaService: SchemaService;
    postsService: PostsService;
}

function createServiceContainer() {
    const container = createContainer<AppServices>();

    container.register({
        contextService: asClass(ContextService).singleton(),
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
