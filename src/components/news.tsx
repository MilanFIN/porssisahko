"use client";
import React, { useEffect, useState } from "react";
import NewsList from "./newslist";
import { Article } from "@/common/common";

interface NewsProps {
    apiSources: string[];
    sources: string[];
    articles: Array<Array<Article>>;
}

function News(props: NewsProps) {
    const [activeSource, setActiveSource] = useState(0);

    return (
        <div className="h-full w-full rounded-lg mt-2 transparent">
            <div className="flex w-full justify-center ">
                {props.sources.map((source: String, index: number) => (
                    <button
                        key={source.toString()}
                        className={` grow text-lg  hover:text-black hover:bg-yellow-400 text-center h-12 ${
                            index == activeSource
                                ? "bg-yellow-400 text-black"
                                : "bg-zinc-700 text-white "
                        }`}
                        onClick={() => setActiveSource(index)}
                    >
                        <span>{source}</span>
                    </button>
                ))}
            </div>

            <div className="w-full h-full ">
                <NewsList
                    articles={props.articles[activeSource]}
                    apiSource={props.apiSources[activeSource]}
                    source={props.sources[activeSource]}
                />
            </div>
        </div>
    );
}

export default News;
/*

*/
