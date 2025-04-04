import { Link } from "@tanstack/react-router";
import { BrandText } from "../branding/brand-text.js";

export function MainNav() {
    return (
        <nav
            id="mainNav"
            className="container flex flex-col lg:flex-row items-center justify-center py-2 lg:py-4 gap-x-12 mb-4 sticky top-0 z-10 bg-background/90 shadow-lg shadow-background/90"
        >
            <Link
                to="/"
                className="plain text-xl flex-1"
            >
                <BrandText />
            </Link>
            <nav className="flex flex-2 justify-center md:gap-8 mx-auto">
                <Link
                    to="/posts/$"
                    params={{ _splat: "blog" }}
                >
                    Blog
                </Link>
                <Link
                    to="/posts/$"
                    params={{ _splat: "tales" }}
                >
                    Tales
                </Link>
                <Link to="/about">About</Link>
            </nav>
            <div className="flex-1" />
        </nav>
    );
}
