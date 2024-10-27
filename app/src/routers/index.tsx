import { createBrowserRouter } from "react-router-dom";
import { HomeView } from "../views/home.view";
import { App } from "../app";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomeView />,
            },
            {
                path: "portfolio",
                element: <div>Portfolio</div>,
            },
            {
                path: "blog",
                element: <div>Blog</div>,
            },
            {
                path: "tales",
                element: <div>Tales</div>,
            },
        ],
    },
]);
