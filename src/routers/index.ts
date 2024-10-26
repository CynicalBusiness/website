import { Router } from "express";

export function createAppRouter() {
    const router = Router();

    router.get("/", (req, res) => {
        res.render("index");
    });

    return router;
}
