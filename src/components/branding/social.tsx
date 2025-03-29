import { IconType } from "react-icons";
import { ReactNode, useMemo } from "react";
import classNames from "classnames";
import { Icon, IconProps } from "../icon.js";

export interface SocialProps {
    children: ReactNode;
    name?: string;
    url?: string;
    icon: IconProps | IconType;
}

export function Social({ children, url, name, icon }: SocialProps) {
    const { className: iconClassName, ...iconProps } = useMemo(
        () => (icon instanceof Function ? { Type: icon } : icon),
        [icon],
    );

    return (
        <span className="inline-block">
            <Icon
                {...iconProps}
                className={classNames("text-brand", iconClassName)}
            />{" "}
            {name && <strong>{name}: </strong>}
            {url ? (
                <a
                    href={url}
                    target="_blank"
                >
                    {children}
                </a>
            ) : (
                <span>{children}</span>
            )}
        </span>
    );
}
