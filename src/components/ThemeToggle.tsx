"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-10 w-10" />;
    }

    return (
        <button
            type="button"
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EAE5DF] bg-white text-[#242321] transition hover:bg-[#F0ECE6] dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Light Mode" : "Dark Mode"}
        >
            {theme === "dark" ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
        </button>
    );
};

export default ThemeToggle;