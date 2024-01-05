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

interface PriceData {
    date: string;
    data: any;
}

export default async function Home() {
    const yleArticles = await getYleContent(false);
    const hsArticles = await getHsContent(false);
    const isArticles = await getIsContent(false);
    const ilArticles = await getIlContent(false);

    const dayAheadData = await getDayAheadData(false);
    const priceData = dayAheadData as PriceData;

    const chartData =
        priceData.data.length != 0
            ? {
                  labels: priceData.data.map((data: any) => data.Timestamp),
                  datasets: [
                      {
                          label:
                              "Hinta " +
                              priceData.data.map((data: any) => data.Timestamp),
                          data: priceData.data.map((data: any) => data.Value),
                          borderColor: "black",
                          borderWidth: 2,
                      },
                  ],
              }
            : {
                  labels: [],
                  datasets: [
                      {
                          label: "TBD",
                          data: [],
                          borderColor: "black",
                          borderWidth: 2,
                      },
                  ],
              };

    const chartDate = priceData.date != "" ? new Date(priceData.date) : null;
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
                            <LineChart chartData={chartData} date={chartDate} />
                        </div>
                    </div>
                </div>

                <div className="xl:w-[30%] mr-[2%] w-full h-full items-top flex">
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
