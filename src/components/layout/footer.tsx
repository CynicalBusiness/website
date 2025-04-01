import { TbCode, TbCoffee, TbCopyright } from "react-icons/tb";
import { Link } from "@tanstack/react-router";
import { Icon } from "../icon.js";
import {
    COPYRIGHT_HOLDER,
    COPYRIGHT_LICENSE,
    COPYRIGHT_LICENSE_URL,
    COPYRIGHT_YEAR,
} from "~/const.js";

export function Footer() {
    return (
        <footer className="flex flex-row gap-4 container justify-between opacity-50">
            <div>
                <p>
                    <Icon Type={TbCopyright} />
                    &nbsp;
                    {COPYRIGHT_HOLDER} {COPYRIGHT_YEAR},{" "}
                    <a
                        href={COPYRIGHT_LICENSE_URL}
                        target="_blank"
                        className="inline-block"
                    >
                        {COPYRIGHT_LICENSE}
                    </a>
                </p>
            </div>
            <div>
                <p className="text-right">
                    <Icon Type={TbCode} /> with <Icon Type={TbCoffee} /> by{" "}
                    <strong>
                        <Link to="/about">CynicalBusiness</Link>
                    </strong>
                </p>
            </div>
        </footer>
    );
}
