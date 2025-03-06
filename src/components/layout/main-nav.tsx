import { Link } from "@tanstack/react-router";
import { BrandText } from "../branding/brand-text";

export function MainNav() {
    return (
        <nav
            id="mainNav"
            className="container flex justify-center items-baseline py-1 md:py-2 lg:py-4 gap-12"
        >
            <Link
                to="/"
                className="plain text-xl"
            >
                <BrandText />
            </Link>
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
    );
}
