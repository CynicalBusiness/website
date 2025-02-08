import { useMemo } from "react";
import { Logo } from "../components/media/logo";

const minorTaglines = [
    [
        "I'm also quite good at breaking things.",
        "...especially when I'm not trying to.",
    ],
    [
        "A little light cynicism keeps one sane.",
        "Is 'light cynicism' an oxymoron?",
    ],
    [
        "I'm not a pessimist, I'm a realist.",
        "Now give me that half-empty glass, I'm thirsty.",
    ],
    [
        "Fear not for the future, for it fears you.",
        "'Bring it on, cotton-ears!'",
    ],
    [
        "Roses are red, the screen is blue,",
        "That's just my bootloader, I use Arch, btw.",
    ],

    // "...but if you're going to fail, at least make it spectacular."
] satisfies Array<[string, string]>;

export function HomeView() {
    const minorTagline = useMemo(() => {
        // TODO I'd like to rotate this every so often and/or on click
        const index = Math.floor(Math.random() * minorTaglines.length);
        return minorTaglines[index];
    }, []);

    return (
        <>
            <div className="text-center">
                <Logo className="inline-block size-128 my-8" />
            </div>
            <div className="flex text-center justify-center">
                <h1 className="text-8xl font-extralight text-primary-500">
                    Cynical
                </h1>
                <h1 className="text-8xl px-4">|</h1>
                <h1 className="text-8xl font-extrabold">Business</h1>
            </div>
            <br />
            <div className="text-center">
                <h1>I like to make things.</h1>
                <br />
                <h3 className="opacity-60">{minorTagline[0]}</h3>
                <h4 className="opacity-40">{minorTagline[1]}</h4>
            </div>
        </>
    );
}
