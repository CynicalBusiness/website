import classNames from "classnames";
import { Icon } from "./icon.js";
import { IconType } from "react-icons";
import { TbLoader } from "react-icons/tb";

export interface SpinnerProps {
    inline?: boolean;
    icon?: IconType;
}

export function Spinner({ inline, icon = TbLoader }: SpinnerProps) {
    return (
        <div className={classNames(inline ? "inline-block" : "mx-auto")}>
            <Icon
                className="
                animate-spin"
                Type={icon}
            />
        </div>
    );
}
