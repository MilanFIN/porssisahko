import Image from "next/image";
import { useEffect, useState } from "react";

import NewsList from "@/components/newslist";
import { getHsContent, getIlContent, getIsContent, getYleContent } from "./utils/newsgetters";


export default async function Home() {
  const yleArticles = await getYleContent();
  const hsArticles = await getHsContent();
  const isArticles = await getIsContent();
  const ilArticles = await getIlContent();
  
  return (
    <main className=" h-full ">
      <div className="w-full h-[800px] ">

        <h2 className="text-xl text-center w-full">Aiheeseen liittyviä uutisia</h2>
        <div className="flex h-full justify-between">
          <div className="w-1/4 h-full m-2">
            <NewsList source="YLE" articles={yleArticles} />
          </div>
          <div className="w-1/4 h-full m-2">
            <NewsList source="HS" articles={hsArticles} />
          </div>      
          <div className="w-1/4 h-full m-2">
            <NewsList source="IS" articles={isArticles} />
          </div>      
          <div className="w-1/4 h-full m-2">
            <NewsList source="IL" articles={ilArticles} />
          </div>


        </div>
      </div>
    </main>
  );
}

