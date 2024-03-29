import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pörssisähkö",
    description: "Pörssisähkön hinta suomessa ja aiheeseen liittyviä uutisia",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
