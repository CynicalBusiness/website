import express from "express";
import morgan from "morgan";
import { createAppRouter } from "./routers/index.js";
import { isProduction } from "./utils.js";

const port = 3000; // TODO

export function createApp() {
    const app = express();

    app.set("view engine", "pug");
    app.use(morgan(isProduction ? "combined" : "dev"));

    app.use("/assets", express.static("public"));
    app.use(createAppRouter());

    return app;
}

export async function startServer() {
    const app = createApp();

    const server = app.listen(port, () => {
        const address = server.address();
        if (!address || typeof address === "string") {
            throw new Error("Server failed to start or was misconfigured");
        }
        console.log(`* Server listening: ${address.address}:${address.port}`);
    });

    return [app, server];
}
