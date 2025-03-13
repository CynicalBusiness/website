import { createFileRoute, Link } from "@tanstack/react-router";
import { TbArrowRight, TbBook, TbCode, TbNews } from "react-icons/tb";
import { BrandText } from "~/components/branding/brand-text.js";
import { Blurb } from "~/components/branding/blurb.js";
import { Icon } from "~/components/icon.js";
import { TAGLINE, TAGLINE2 } from "~/const.js";

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex flex-row justify-between mt-2 md:mt-8 lg:mt-16">
            <div className="flex flex-col justify-center float-left">
                <h1 className="text-8xl mt-0">
                    <BrandText bar />
                </h1>
                <div className="float-left">
                    <hgroup>
                        <h2 className="mt-2">{TAGLINE}</h2>
                        <h5>{TAGLINE2}</h5>
                    </hgroup>
                    <div className="md:my-8 lg:my-12" />
                    <p className="">
                        <Blurb />
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-start items-end gap-4 mt-8">
                <Link
                    to="/posts/$"
                    params={{ _splat: "blog" }}
                    className="button large"
                >
                    <Icon Type={TbNews} />
                    <span>Read My Ramblings</span>
                    <Icon Type={TbArrowRight} />
                </Link>
                <Link
                    to="/posts/$"
                    params={{ _splat: "tales" }}
                    className="button"
                >
                    <Icon Type={TbBook} />
                    <span>Embrace Storytime</span>
                    <Icon Type={TbArrowRight} />
                </Link>
                <a
                    href="https://lab.vevox.io"
                    className="button"
                    target="_blank"
                >
                    <Icon Type={TbCode} />
                    <span>See My Stuff</span>
                    <Icon Type={TbArrowRight} />
                </a>
            </div>
        </div>
    );
}
