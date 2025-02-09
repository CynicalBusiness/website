import Link from "next/link";
import { PropsWithChildren } from "react";

export interface PostLayoutProps {
    params: Promise<{ post?: string[] }>;
}

export default async function PostLayout({
    children,
    params,
}: PropsWithChildren<PostLayoutProps>) {
    const { post = [] } = await params;

    const crumbs = post.map((path, index, arr) => {
        const href =
            index < arr.length - 1
                ? index < arr.length - 2
                    ? "../".repeat(arr.length - index - 2)
                    : "./"
                : "";

        return (
            <Link
                key={index}
                href={href}
                className="before:content-['/'] before:px-2 no-underline hint"
            >
                {path}
            </Link>
        );
    });

    return (
        <div>
            {crumbs}
            {children}
        </div>
    );
}
