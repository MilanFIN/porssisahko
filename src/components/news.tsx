"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import NewsList from "./newslist";
import { Article, Result } from "@/common/common";

interface NewsProps {
    apiSources: string[];
    sources: string[];
    articles: Promise<Array<Result>>[];
}

interface NewsCategoryProps {
    source: String;
    index: number;
    activeSource: number;
    setActiveSource: (index: number) => void;
}

function NewsCategory(props: NewsCategoryProps) {
    return (
        <button
            className={`grow text-lg hover:text-black hover:bg-yellow-400 dark:hover:bg-yellow-400 text-center h-12 ${
                props.index == props.activeSource
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-700 dark:bg-zinc-300 text-white dark:text-black"
            }`}
            onClick={() => props.setActiveSource(props.index)}
        >
            <span>{props.source}</span>
        </button>
    );
}

function News(props: NewsProps) {
    const [activeSource, setActiveSource] = useState(0);

    return (
        <div className="h-full w-full rounded-lg mt-2 transparent">
            <div className="flex w-full justify-center ">
                {props.sources.map((source: String, index: number) => (
                    <NewsCategory
                        key={source.toString()}
                        source={source}
                        index={index}
                        activeSource={activeSource}
                        setActiveSource={setActiveSource}
                    />
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
