import Image from "next/image";
import { useEffect, useState } from "react";

import NewsList from "@/components/newslist";
import {
    getDayAheadData,
    getHsContent,
    getIlContent,
    getIsContent,
    getPriceData,
    getYleContent,
} from "./utils/newsgetters";
import LineChart from "@/components/linechart";
import News from "@/components/news";

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic'

export default async function Home() {
    const yleArticles = await getYleContent();
    const hsArticles = await getHsContent();
    const isArticles = await getIsContent();
    const ilArticles = await getIlContent();

    const priceData = await getDayAheadData();

    const chartData = {
        labels: priceData.map((data: any) => data.Timestamp),
        datasets: [
            {
                label: "Hinta " + priceData.map((data: any) => data.Timestamp),
                data: priceData.map((data: any) => data.Value),
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    };

    //Math.max(chartData.datasets[0].data)}
    return (
        <main className="w-full h-full bg-gradient-to-b from-yellow-100 to-yellow-200 ">
            <div className="w-full h-full xl:flex min-h-screen">
                <div className="xl:w-[70%] w-full h-full">
                    <div className="w-full h-[20%] grid text-center">
                        <h1 className="text-4xl justify-center text-gray-800 mt-4">
                            Pörssisähkön hinta
                        </h1>
                        <div className="xl:w-2/3 w-5/6 justify-self-center mt-8 h-full">
                            <p>
                                Tämän sivun tarkoitus on näyttää pörssisähkön
                                hinta seuraavalle päivälle ja edeltävälle 3
                                kuukaudelle. Sivulla näkyvän kuvaajan lisäksi on
                                listattuna jonkin verran asiaan liityviä
                                uutisia. Lähdekoodi on näkyvissä{" "}
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
                    <div className="w-full grid justify-items-center h-full">
                        <div className="w-[95%] h-full">
                            <LineChart chartData={chartData} />
                        </div>
                    </div>
                </div>

                <div className="xl:w-[30%] w-full h-full items-top flex">
                    <div className="flex flex-wrap w-full h-full items-center justify-center align-top">
                        <h1 className="w-full h-[10%] grow text-center text-4xl my-4">
                            Aiheeseen liittyviä uutisia
                        </h1>

                        <div className="h-[600px] min-h-[0px] w-full">
                            <News
                                articles={[
                                    yleArticles,
                                    hsArticles,
                                    ilArticles,
                                    isArticles,
                                ]}
                                sources={["YLE", "HS", "IL", "IS"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
