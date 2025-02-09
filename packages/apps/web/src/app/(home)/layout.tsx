import { PropsWithChildren, useMemo } from "react";
import { BrandText } from "../../components/brand/brand-text.js";
import Link from "next/link";
import { NavLink, NavLinkProps } from "../../components/nav-link.js";
import classNames from "classnames";

export interface NavLinkConfig extends NavLinkProps {
    label: string;
}

const navLinks: NavLinkConfig[] = [
    {
        href: "/",
        label: "Home",
        mode: "exact",
    },
    {
        href: "/posts/blog",
        label: "Blog",
    },
    {
        href: "/posts/tales",
        label: "Tales",
    },
    {
        href: "/about",
        label: "About",
    },
];

export default function HomeLayout({ children }: PropsWithChildren) {
    const links = useMemo(
        () =>
            navLinks.map(({ label, href, className, ...props }) => (
                <NavLink
                    key={href}
                    href={href}
                    className={classNames("no-underline", className)}
                    {...props}
                >
                    {label}
                </NavLink>
            )),
        [],
    );

    return (
        <>
            <nav className="container flex flex-row justify-between items-baseline py-4">
                <div className="flex flex-row flex-auto justify-start items-baseline gap-16 text-xl font-light">
                    <Link
                        href="/"
                        className="no-underline"
                    >
                        <h3>
                            <BrandText />
                        </h3>
                    </Link>
                    {links}
                </div>
                <div />
            </nav>
            <main className="container">{children}</main>
        </>
    );
}
