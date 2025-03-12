import { HTMLAttributes, PropsWithChildren } from "react";

export function Card({
    children,
    ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
    return <article {...props}>{children}</article>;
}
