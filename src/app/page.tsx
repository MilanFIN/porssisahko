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

//todo: add suspense or some other loading indicator to newslist

interface PriceData {
    date: string;
    data: any;
}

export default async function Home() {
    const yleArticles = await getYleContent(false);
    const hsArticles = await getHsContent(false);
    const isArticles = await getIsContent(false);
    const ilArticles = await getIlContent(false);

    return (
        <main
            className="w-full justify-items-center grid 
            bg-gradient-to-b from-amber-200 to-amber-100 
            min-h-screen"
        >
            <div className="xl:max-w-[1300px]  ">
                <h1 className="text-4xl  text-center text-white bg-zinc-700 mt-2 mx-2 rounded-lg py-4">
                    Pörssisähkön hinta
                </h1>
                <div className="w-full  xl:flex px-2 xl:px-0">
                    <div className="xl:w-[70%] w-full  bg-zinc-700 text-white  rounded-lg xl:m-2 mt-2 pb-4">
                        <div className="w-full  grid text-center">
                            <div className="xl:w-2/3 w-5/6 justify-self-center mt-8 ">
                                <p>
                                    Tämän sivun tarkoitus on näyttää
                                    pörssisähkön hinta seuraavalle päivälle ja
                                    edeltävälle 3 kuukaudelle. Sivulla näkyvän
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
                                <Suspense fallback={<LineChartSkeleton/>}>
                                    <LineChartWrapper/>
                                </Suspense>
                            </div>
                        </div>
                    </div>

                    <div className="xl:w-[30%] xl:m-2 mt-2  w-full  items-top ">
                        <h2 className="w-full  grow text-center text-2xl bg-zinc-700 py-2 rounded-lg text-white">
                            Aiheeseen liittyviä uutisia
                        </h2>

                        <div className="h-[600px] w-full rounded-lg">
                            <News
                                articles={[
                                    yleArticles,
                                    hsArticles,
                                    ilArticles,
                                    isArticles,
                                ]}
                                apiSources={["yle", "hs", "il", "is"]}
                                sources={["Yle", "HS", "IL", "IS"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
