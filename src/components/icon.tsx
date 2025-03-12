import classNames from "classnames";
import { HTMLAttributes } from "react";
import { IconType } from "react-icons";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
    Type: IconType;
}

export function Icon({ Type, className, ...props }: IconProps) {
    return (
        <span
            className={classNames("icon", className)}
            {...props}
        >
            <Type />
        </span>
    );
}
