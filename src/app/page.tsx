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
    <main className=" h-full ">
      <div className="w-full h-[800px] ">

        <LineChart chartData={chartData} />

        <h2 className="text-xl text-center w-full">Aiheeseen liittyviä uutisia</h2>
        <div className="flex flex-wrap h-full items-center justify-center">
          <div className="min-w-[430px] w-1/6 h-full m-2">
            <NewsList source="YLE" articles={yleArticles} />
          </div>
          <div className="min-w-[430px] w-1/6 h-full m-2">
            <NewsList source="HS" articles={hsArticles} />
          </div>      
          <div className="min-w-[430px] w-1/6 h-full m-2">
            <NewsList source="IS" articles={isArticles} />
          </div>      
          <div className="min-w-[430px] w-1/6 h-full m-2">
            <NewsList source="IL" articles={ilArticles} />
          </div>


        </div>
      </div>
    </main>
  );
}

