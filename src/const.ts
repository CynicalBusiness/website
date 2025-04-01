import debug, { Debugger } from "debug";
import pkg from "../package.json" with { type: "json" };

export {
    ReasonPhrases as HTTPReason,
    StatusCodes as HTTPStatus,
} from "http-status-codes";

export const APP_NAME = pkg.productName;
export const APP_VERSION = pkg.version;

export const DEBUG_NAMESPACE = "cynicalbusiness:website";
export const DEBUG = debug(DEBUG_NAMESPACE);
DEBUG.extend ??= function (this: Debugger, namespace: string, delimiter = ":") {
    // the bundler has a real bad time with this for some reason
    const newDebug = debug(this.namespace + delimiter + namespace);
    newDebug.extend = this.extend;
    return newDebug;
};

export const ENV =
    process.env.NODE_ENV ?? process.env.VITE_ENV ?? "development";
export const IS_DEV = ENV === "development";

export const POST_INDEX = "index";

export const PUBLIC_URL = "https://cynical.business";

export const AUTHOR = "CynicalBusiness";
export const TAGLINE = "I like to make things and share the knowledge.";
export const TAGLINE2 =
    "Full-stack Web & Indie Game Developer and amateur wordsmith.";
export const SUMMARY = `${TAGLINE} ${TAGLINE2}`;

export const BLURBS: Array<[string, string]> = [
    [
        "I quite like to make things.",
        "I just seem to be much better at breaking them...",
    ],
    [
        "I lost the game, and so did you.",
        "Yeah, you know the one. You're welcome.",
    ],
    [
        "Roses are red, my screen is blue,",
        "That's just my bootloader, I use Arch, btw.",
    ],
    [
        "If at first you don't succeed, try, try again.",
        "But also, '*Do or do not, there is no try.*' So, uh, what do?",
    ],
    [
        "I'm not a pessimist, I'm a cynic.",
        "Now hand me that half-empty glass, I'm thirsty.",
    ],
    [
        "Cynical (adj.) `/ˈsɪnɪkl/`",
        "Distrustful of human sincerity or integrity.",
    ],
];

export const SOCIALS = {
    github: {
        name: "@CynicalBusiness",
        url: "https://github.com/CynicalBusiness",
    },
    bsky: {
        name: "@cynicalbusiness.bsky.social",
        url: "https://cynicalbusiness.bsky.social/",
    },
    discord: {
        name: "@cynicalbusiness",
    },
} as const satisfies Record<string, { name: string; url?: string }>;

export const COPYRIGHT_HOLDER = "CynicalBusiness";
export const COPYRIGHT_YEAR = "2025";
export const COPYRIGHT_LICENSE = "CC BY-NC-SA 4.0";
export const COPYRIGHT_LICENSE_URL =
    "https://creativecommons.org/licenses/by-nc-sa/4.0/";

export const SITE_SOURCE_URL = "https://lab.vevox.io/CynicalBusiness/website";

export const ZeroDate = new Date(0);
export const EmptyArray: never[] = [];
