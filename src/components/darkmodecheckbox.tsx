"use client";

import { useTheme } from "next-themes";
import { useState } from "react";

export default function DarkModeCheckBox() {

    const { systemTheme, theme, setTheme } = useTheme();

    const flipDarkMode = () => {
        if (theme == "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };
    
    return (
        <label className="flex cursor-pointer select-none items-center">
            <span className="mr-2">Dark Mode:</span>
            <div className="relative">
                <input
                    type="checkbox"
                    checked={theme == "dark"}
                    onChange={flipDarkMode}
                    className="sr-only"
                />
                {theme !== "dark" ? (
                    <div>
                        <div className="block h-8 w-14 rounded-full bg-zinc-600"></div>
                        <div className="dot absolute right-1 top-1 h-6 w-6 rounded-full bg-zinc-200 transition"></div>
                    </div>
                ) : (
                    <div>
                        <div className="block h-8 w-14 rounded-full bg-zinc-400"></div>
                        <div className="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-zinc-200 transition"></div>
                    </div>
                )}
            </div>
        </label>
    );
}
