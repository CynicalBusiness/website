import { useCallback, useEffect, useState } from "react";
import { FiMinus, FiMoon, FiSun } from "react-icons/fi";
import classNames from "classnames";

export function ThemeToggle() {
    const [activeTheme, setActiveTheme] = useState<"light" | "dark">();

    const onSetLight = useCallback(() => {
        setActiveTheme("light");
    }, []);
    const onSetDefault = useCallback(() => {
        setActiveTheme(undefined);
    }, []);
    const onSetDark = useCallback(() => {
        setActiveTheme("dark");
    }, []);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "light" || storedTheme === "dark") {
            setActiveTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            activeTheme === "dark" ||
                (!activeTheme &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
        if (activeTheme) {
            localStorage.setItem("theme", activeTheme);
        } else {
            localStorage.removeItem("theme");
        }
    }, [activeTheme]);

    return (
        <div className="theme-toggle" data-active-theme={activeTheme}>
            <button
                type="button"
                title="Light Theme"
                className={classNames(
                    "theme-toggle-section theme-toggle-section-light",
                    { active: activeTheme === "light" }
                )}
                onClick={onSetLight}
            >
                <FiSun />
            </button>
            <button
                type="button"
                title="Default (System) Theme"
                className={classNames(
                    "theme-toggle-section theme-toggle-section-default",
                    { active: !activeTheme }
                )}
                onClick={onSetDefault}
            >
                <FiMinus />
            </button>
            <button
                type="button"
                title="Dark Theme"
                className={classNames(
                    "theme-toggle-section theme-toggle-section-dark",
                    { active: activeTheme === "dark" }
                )}
                onClick={onSetDark}
            >
                <FiMoon />
            </button>
        </div>
    );
}
