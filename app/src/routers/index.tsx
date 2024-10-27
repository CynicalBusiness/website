import { createBrowserRouter } from "react-router-dom";
import { HomeView } from "../views/home.view";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                element: <HomeView />,
            },
        ],
    },
]);
