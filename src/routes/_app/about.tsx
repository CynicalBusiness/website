import { createFileRoute } from "@tanstack/react-router";
import {
    TbBrandBluesky,
    TbBrandDiscord,
    TbBrandGithub,
    TbBrandGitlab,
    TbMail,
} from "react-icons/tb";
import { BrandText } from "~/components/branding/brand-text.js";
import { Social } from "~/components/branding/social.js";
import { PostBody } from "~/components/post/body.js";
import {
    COPYRIGHT_HOLDER,
    COPYRIGHT_LICENSE,
    COPYRIGHT_LICENSE_URL,
    SOCIALS,
    TAGLINE2,
} from "~/const.js";

export const Route = createFileRoute("/_app/about")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <h1 className="lg:text-4xl xl:text-6xl 2xl:text-8xl mt-0">
                <BrandText bar />
            </h1>
            <h2>{TAGLINE2}</h2>
            <div className="flex flex-row not-lg:flex-wrap justify-stretch gap-4">
                <div className="grow">
                    <div className="panel">
                        <PostBody slug="about" />
                    </div>
                </div>
                <div className="relative flex flex-col grow">
                    <div className="panel">
                        <h5>Links & Socials</h5>
                        <ul className="list-none ml-0 *:whitespace-nowrap">
                            <li>
                                <Social
                                    icon={TbBrandGitlab}
                                    url="https://lab.vevox.io"
                                    name="GitLab"
                                >
                                    The Vevox Lab
                                </Social>
                            </li>
                            <li>
                                <Social
                                    icon={TbBrandGithub}
                                    url={SOCIALS.github.url}
                                    name="GitHub"
                                >
                                    {SOCIALS.github.name}
                                </Social>
                            </li>
                            <li>
                                <Social
                                    icon={TbBrandBluesky}
                                    url={SOCIALS.bsky.url}
                                    name="BlueSky"
                                >
                                    {SOCIALS.bsky.name}
                                </Social>
                            </li>
                            <li>
                                <Social
                                    icon={TbBrandDiscord}
                                    name="Discord"
                                >
                                    {SOCIALS.discord.name}
                                </Social>
                            </li>
                        </ul>
                    </div>
                    <div className="panel">
                        <h5>Business Contact</h5>
                        <p>
                            <Social
                                icon={TbMail}
                                url="mailto:contact@cynical.business"
                            >
                                <del>contact@cynical.business</del>
                            </Social>
                            <br />
                            <span className="inline-block text-xs opacity-75 relative -top-2">
                                (Temporarily Unavailable)
                            </span>
                        </p>
                        <p className="text-sm max-w-100 opacity-50">
                            Business contacts are for business and professional
                            inquiries only.
                            <br />
                            For comments, questions, or general matters, please
                            reach out via BlueSky or Discord.
                        </p>
                    </div>
                    <div className="panel">
                        <h5>Licensing</h5>
                        <p className="text-sm">
                            I am generally open to sharing my works, but please
                            respect the time and effort I put in.
                        </p>
                        <p className="text-sm opacity-75">
                            All content on this site is licensed to{" "}
                            {COPYRIGHT_HOLDER} under{" "}
                            <a
                                href={COPYRIGHT_LICENSE_URL}
                                target="_blank"
                            >
                                {COPYRIGHT_LICENSE}
                            </a>
                            .
                            <br />
                            Please contact me for any licensing inquiries or
                            exceptions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
