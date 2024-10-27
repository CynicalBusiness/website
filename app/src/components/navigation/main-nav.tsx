import { Link, NavLink } from "react-router-dom";

const navItems = [
    {
        to: "/",
        label: "About",
    },
    {
        to: "/portfolio",
        label: "Portfolio",
    },
    {
        to: "/blog",
        label: "Blog",
    },
    {
        to: "/tales",
        label: "Tales",
    },
] as const;

export function MainNav() {
    const navLinks = navItems.map((item) => (
        <NavLink key={item.to} to={item.to} className="text-l">
            {item.label}
        </NavLink>
    ));

    return (
        <nav
            id="mainNav"
            className="flex justify-center align-middle gap-4 my-4"
        >
            <Link to="/">
                <img src="/assets/logo.svg" alt="Home" className="size-6" />
            </Link>
            {navLinks}
        </nav>
    );
}
