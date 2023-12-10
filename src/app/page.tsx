import Image from "next/image";
import { useEffect, useState } from "react";

import NewsList from "@/components/newslist";
import {
    getHsContent,
    getIlContent,
    getIsContent,
    getPriceData,
    getYleContent,
} from "./utils/newsgetters";
import LineChart from "@/components/linechart";
import News from "@/components/news";

export default async function Home() {
    const yleArticles = await getYleContent();
    const hsArticles = await getHsContent();
    const isArticles = await getIsContent();
    const ilArticles = await getIlContent();

    const priceData = await getPriceData();

    const chartData = {
        labels: priceData.map((data: any) => data.Timestamp), //Data.map((data) => data.year),
        datasets: [
            {
                label: "Hinta " + priceData.map((data: any) => data.Timestamp),
                data: priceData.map((data: any) => data.Value), //[Data.map((data) => data.userGain)],
                /*backgroundColor: [
          "rgba(75,192,192,1)",
        ],*/
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    };

    //Math.max(chartData.datasets[0].data)}
    return (
        <main className="w-full h-full  ">
            <div className="w-full h-[800px] xl:flex ">
                <div className="xl:w-[70%] w-full">
                    <div className="w-full h-[20%] grid text-center">
                        <h1 className="text-4xl justify-center text-gray-800 ">
                            Pörssisähkön hinta
                        </h1>
                        <p className="xl:w-2/3 w-5/6 justify-self-center mt-8">
                            Tämän sivun tarkoitus on näyttää pörssisähkön hinta
                            seuraavalle päivälle ja edeltävälle 3 kuukaudelle.
                            Sivulla näkyvän kuvaajan lisäksi on listattuna
                            jonkin verran asiaan liityviä uutisia. Lähdekoodi on
                            näkyvissä{" "}
                            <a
                                href="https://github.com/MilanFIN/porssisahko"
                                className="text-blue-500"
                            >
                                Githubissa
                            </a>
                        </p>
                    </div>
                    <div className="w-full">
                        <LineChart chartData={chartData} />
                    </div>
                </div>

                <div className="xl:w-[30%] w-full items-top flex">
                    <div className="flex flex-wrap w-full h-full items-center justify-center align-top">
                        <h1 className="w-full h-[10%] grow text-center text-4xl mb-8">
                            Aiheeseen liittyviä uutisia
                        </h1>

                        <div className="h-[90%]">
                            <News
                                articles={[
                                    yleArticles,
                                    hsArticles,
                                    isArticles,
                                    ilArticles,
                                ]}
                                sources={["YLE", "HS", "IS", "IL"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
