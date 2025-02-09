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
        // const pathname = "../" + arr.slice(0, index + 1).join("/");
        const pathname =
            index < arr.length - 1
                ? "../".repeat(arr.length - index - 1)
                : "./";

        return (
            <Link
                key={index}
                href={{ pathname }}
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
