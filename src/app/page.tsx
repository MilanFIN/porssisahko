import Image from "next/image";
import { useEffect, useState } from "react";

import NewsList from "@/components/newslist";
import { getHsContent, getIlContent, getIsContent, getPriceData, getYleContent } from "./utils/newsgetters";
import LineChart from "@/components/linechart";

const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234
  }
];

export default async function Home() {
  const yleArticles = await getYleContent();
  const hsArticles = await getHsContent();
  const isArticles = await getIsContent();
  const ilArticles = await getIlContent();

  const priceData = await getPriceData();

  const chartData = {
    labels: priceData.map((data:any) => data.Timestamp),//Data.map((data) => data.year), 
    datasets: [
      {
        label: "Hinta " + priceData.map((data:any) => data.Timestamp),
        data: priceData.map((data:any) => data.Value),//[Data.map((data) => data.userGain)],
        /*backgroundColor: [
          "rgba(75,192,192,1)",
        ],*/
        borderColor: "black",
        borderWidth: 2
      }
    ]
  };

 
  //Math.max(chartData.datasets[0].data)}
  return (
    <main className="w-full h-full  ">


      <div className="w-full h-[800px] xl:flex ">
        <div className="xl:w-[50%] w-full">
          <div className="w-full grid text-center">
          <h1 className="text-4xl justify-center text-gray-800">Pörssisähkön hinta</h1>
            <p className="xl:w-2/3 w-5/6 justify-self-center mt-8">
              Tämän sivun tarkoitus on näyttää pörssisähkön hinta seuraavalle päivälle ja edeltävälle 3 kuukaudelle.
              Sivulla näkyvän kuvaajan lisäksi on listattuna jonkin verran asiaan liityviä uutisia.

              Lähdekoodi on näkyvissä <a href="https://github.com/MilanFIN/porssisahko" className="text-blue-500">Githubissa</a>
            </p>
          </div>
          <div className="w-full mt-8">

            <LineChart chartData={chartData} />
          </div>

        </div>

        <div className="xl:w-[50%] w-full h-full items-top flex">
        <div className="flex flex-wrap h-full items-center justify-center align-top">

          <h1 className="w-full grow text-center text-4xl mb-8">Aiheeseen liittyviä uutisia</h1>

            <div className="w-[430px] h-full mx-2 my-3">
              <NewsList source="YLE" articles={yleArticles} />
            </div>
            <div className="w-[430px] h-full mx-2 my-3">
              <NewsList source="HS" articles={hsArticles} />
            </div>      
            <div className="w-[430px] h-full mx-2 my-3">
              <NewsList source="IS" articles={isArticles} />
            </div>      
            <div className="w-[430px] h-full mx-2 my-3">
              <NewsList source="IL" articles={ilArticles} />
            </div>

        </div>


        </div>
      </div>
    </main>
  );
}

