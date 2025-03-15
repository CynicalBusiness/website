import classNames from "classnames";
import { SVGProps } from "react";
import LogoSVG from "~/assets/logo2_opt.svg?react";

export interface LogoProps extends SVGProps<SVGSVGElement> {}

export function Logo({ className, ...props }: LogoProps) {
    return (
        <LogoSVG
            width=""
            height=""
            className={classNames(
                "icon aspect-square h-[1em] w-auto",
                className,
            )}
            {...props}
        />
    );
}
