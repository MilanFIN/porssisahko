import Image from "next/image";
import { useEffect, useState } from "react";

import NewsList from "@/components/newslist";

const getYleContent = async () => {
  const response = await fetch("http://localhost:3000/api/yle");
  let test = await response.json();
  return test;
};

export default async function Home() {
  const yleArticles = await getYleContent();
  //const [yleArticles, setYleArticles] = useState([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="w-full h-full">
        <NewsList yleArticles={yleArticles} />
      </div>
    </main>
  );
}
