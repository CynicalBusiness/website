import classNames from "classnames";

export interface BrandTextProps {
    color?: boolean;
}

export function BrandText({ color = false }: BrandTextProps) {
    return (
        <span>
            <span
                className={classNames(
                    "font-black",
                    color ? "text-primary" : "text-current",
                )}
            >
                Cynical
            </span>
            <span className="font-light">|</span>
            <span className="font-extralight">Business</span>
        </span>
    );
}
