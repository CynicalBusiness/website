import classNames from "classnames";
import { Icon } from "./icon.js";
import { IconType } from "react-icons";
import { TbLoader2 } from "react-icons/tb";

export interface SpinnerProps {
    inline?: boolean;
    icon?: IconType;
}

export function Spinner({ inline, icon = TbLoader2 }: SpinnerProps) {
    return (
        <div
            className={classNames(
                inline
                    ? "inline-block"
                    : "block mx-auto text-4xl py-[10%] text-center",
            )}
        >
            <Icon
                className="
                animate-spin"
                Type={icon}
            />
        </div>
    );
}
