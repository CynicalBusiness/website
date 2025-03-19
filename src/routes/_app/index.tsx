import { createFileRoute, Link } from "@tanstack/react-router";
import {
    TbArrowRight,
    TbBook,
    TbBrandBluesky,
    TbBrandDiscord,
    TbBrandGithub,
    TbCode,
    TbUserQuestion,
} from "react-icons/tb";
import { BrandText } from "~/components/branding/brand-text.js";
import { Blurb } from "~/components/branding/blurb.js";
import { Icon } from "~/components/icon.js";
import { SOCIALS, TAGLINE, TAGLINE2 } from "~/const.js";
import { Social } from "~/components/branding/social.js";

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col justify-center float-left">
                <h1 className="lg:text-4xl xl:text-6xl 2xl:text-8xl mt-0">
                    <BrandText bar />
                </h1>
                <hgroup>
                    <h2 className="mt-2">{TAGLINE}</h2>
                    <h5>{TAGLINE2}</h5>
                </hgroup>
                <fieldset className="not-sm:flex-col">
                    <Social
                        icon={TbBrandBluesky}
                        url={SOCIALS.bsky.url}
                    >
                        {SOCIALS.bsky.name}
                    </Social>
                    <span className="not-sm:hidden">-</span>
                    <Social
                        icon={TbBrandGithub}
                        url={SOCIALS.github.url}
                    >
                        {SOCIALS.github.name}
                    </Social>
                    <span className="not-sm:hidden">-</span>
                    <Social icon={TbBrandDiscord}>
                        {SOCIALS.discord.name}
                    </Social>
                </fieldset>
                <div className="my-1" />
                <p className="">
                    <Blurb />
                </p>
            </div>
            <div className="flex flex-col justify-start items-end gap-4 mt-8">
                <Link
                    to="/about"
                    className="button large"
                >
                    <Icon Type={TbUserQuestion} />
                    <span>Learn About Me</span>
                    <Icon Type={TbArrowRight} />
                </Link>
                <Link
                    to="/posts"
                    className="button"
                >
                    <Icon Type={TbBook} />
                    <span>Read My Ramblings</span>
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
