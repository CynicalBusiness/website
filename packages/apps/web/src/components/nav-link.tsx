"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, PropsWithChildren, useMemo } from "react";

export type NavLinkMatchMode = "prefix" | "exact";

export interface NavLinkProps
    extends LinkProps,
        Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
    href: string;
    mode?: NavLinkMatchMode | ((pathname: string) => boolean);
}

export const NavLink = forwardRef<
    HTMLAnchorElement,
    PropsWithChildren<NavLinkProps>
>(function NavLink({ children, mode, href, ...props }, ref) {
    const pathname = usePathname();

    const active = useMemo(() => {
        if (typeof mode === "function") {
            return mode(pathname);
        }

        switch (mode) {
            case "exact":
                return pathname === href;
            case "prefix":
            default:
                return pathname.startsWith(href);
        }
    }, [pathname, href, mode]);

    return (
        <Link
            {...props}
            href={href}
            data-status={active ? "active" : undefined}
            ref={ref}
        >
            {children}
        </Link>
    );
});
