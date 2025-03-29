import { isServer } from "@tanstack/react-query";
import { shuffle } from "lodash-es";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Markup } from "../markup.js";
import { BLURBS } from "~/const.js";

export function Blurb() {
    const [blurbIdx, setBlurbIdx] = useState(-1);
    const shuffledBlurbs = useMemo(
        () => (isServer ? BLURBS : shuffle(BLURBS)),
        [],
    );

    const nextBlurb = useCallback(() => {
        setBlurbIdx((prev) => (prev + 1) % shuffledBlurbs.length);
    }, [shuffledBlurbs]);

    // this silliness ensures the server never displays a blurb because it's probably going to cause a hydration mismatch
    // I might fix this in the future, but it's perhaps better crawlers don't see the blurbs anyway
    useEffect(() => {
        nextBlurb();
    }, []);
    const [blurb1, blurb2] =
        blurbIdx >= 0 ? shuffledBlurbs[blurbIdx] : ["", ""];

    return (
        <button
            onClick={nextBlurb}
            type="button"
            className="inline-block plain cursor-pointer p-0 [text-align:inherit]"
        >
            <h5>
                <Markup inline>{blurb1}</Markup>&nbsp;
            </h5>
            <h6>
                <Markup inline>{blurb2}</Markup>&nbsp;
            </h6>
        </button>
    );
}
