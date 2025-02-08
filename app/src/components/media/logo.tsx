import { SVGProps } from "react";

export interface LogoProps extends SVGProps<SVGElement> {}

export function Logo(props: LogoProps) {
    return (
        <svg
            fill="currentColor"
            width="400"
            height="400"
            viewBox="0 0 100 100"
            {...props}
            ref={undefined}
        >
            <use href="/assets/logo.svg#layer1" />
        </svg>
    );
}
