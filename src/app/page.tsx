import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

import NewsList from "@/components/newslist";
import {
    getHsContent,
    getIlContent,
    getIsContent,
    getYleContent,
    getDayAheadData,
} from "./actions";
import LineChart from "@/components/linechart";
import News from "@/components/news";
import LineChartWrapper from "@/components/linechartwrapper";
import { LineChartSkeleton } from "@/components/linechartskeleton";
import { NewsWrapper } from "@/components/newswrapper";
import { NewsSkeleton } from "@/components/newsskeleton";
import Link from "next/link";

export default async function Home() {
    return (
        <main
            className="w-full justify-items-center grid 
                        bg-zinc-800"
        >
            <header className="sticky top-0 grid h-16 justify-items-center w-full bg-zinc-900 text-white">
                <h1 className="xl:max-w-[1300px] px-2 py-3 align-middle h-16 w-full text-2xl font-semibold">
                    <Link className="" href="/">
                        Pörssisähkön hinta
                    </Link>
                </h1>
            </header>
            <div className="xl:max-w-[1300px] min-h-screen">
                <div className="w-full xl:flex xl:px-0">
                    <div className="xl:w-[70%] w-full  bg-zinc-600 text-white  pb-4">
                        <div className="w-full  grid text-center">
                            <div className="xl:w-2/3 w-5/6 justify-self-center mt-8 ">
                                <p>
                                    Tämän sivun tarkoitus on näyttää
                                    pörssisähkön hinta seuraavalle päivälle ja
                                    edeltävälle kuukaudelle. Sivulla näkyvän
                                    kuvaajan lisäksi on listattuna jonkin verran
                                    asiaan liityviä uutisia. Lähdekoodi on
                                    näkyvissä{" "}
                                    <a
                                        href="https://github.com/MilanFIN/porssisahko"
                                        className="text-blue-500"
                                    >
                                        Githubissa
                                    </a>
                                </p>
                                <p>
                                    Hintadatan lähde:{" "}
                                    <a
                                        href="https://transparency.entsoe.eu"
                                        className="text-blue-500"
                                    >
                                        ENTSO-E
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="w-full grid justify-items-center  ">
                            <div className="w-[95%]">
                                <LineChartWrapper />
                            </div>
                        </div>
                    </div>

                    <div className="xl:w-[30%]  pt-2  w-full bg-zinc-700 items-top ">
                        <h2 className="w-full  grow text-center text-2xl text-white">
                            Aiheeseen liittyviä uutisia
                        </h2>

                        <div className="h-[625px] w-full rounded-lg">
                            <Suspense fallback={<NewsSkeleton />}>
                                <NewsWrapper />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
