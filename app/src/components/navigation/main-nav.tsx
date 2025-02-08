import { Link, NavLink } from "react-router-dom";
import { Logo } from "../media/logo";
import { ThemeToggle } from "../controls/theme-toggle";

const navItems = [
    {
        to: "/",
        label: "Home",
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
    {
        to: "/about",
        label: "About",
    },
] as const;

export function MainNav() {
    const navLinks = navItems.map((item) => (
        <NavLink key={item.to} to={item.to} className="text-l">
            {item.label}
        </NavLink>
    ));

    return (
        <div className="flex justify-between align-middle gap-8 mx-16 my-4 text-lg">
            <div className="flex justify-left align-middle">
                <Link to="/">
                    <Logo className="size-8" />
                </Link>
            </div>

            <div className="flex justify-center align-middle gap-8">
                {navLinks}
            </div>

            <ThemeToggle />
        </div>
    );
}
