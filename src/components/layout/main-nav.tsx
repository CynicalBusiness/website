import { Link } from "@tanstack/react-router";
import { BrandText } from "../branding/brand-text.js";

export function MainNav() {
    return (
        <nav
            id="mainNav"
            className="container flex items-center py-1 md:py-2 lg:py-4 gap-12 mb-4"
        >
            <Link
                to="/"
                className="plain text-xl flex-1"
            >
                <BrandText />
            </Link>
            <nav className="flex flex-2 justify-center gap-8">
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
