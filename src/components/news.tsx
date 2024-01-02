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
        <div className="h-full w-full">
            <div className="flex w-full justify-center bg-gray-100 rounded-t-xl">
                {props.sources.map((source: String, index: number) => (
                    <button
                        key={source.toString()}
                        className={`rounded-t-xl grow text-lg hover:bg-gray-300 text-center h-12 ${
                            index == activeSource
                                ? "bg-gray-300"
                                : "bg-gray-100 "
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
