"use client";

import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

type Props = {
    children: string | React.JSX.Element | React.JSX.Element[];
};

export const DarkThemeProvider = ({ children }: Props) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider enableSystem={false} defaultTheme="light" attribute="class">
            {children}
        </ThemeProvider>
    );
};
