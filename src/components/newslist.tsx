"use client";
import Image from "next/image";
import { zeroPad, Article, Result } from "@/common/common";
import React, { ReactNode, useEffect, useState } from "react";

interface NewsListProps {
    apiSource: string;
    source: string;
    articles: Promise<Array<Result>>;
}

interface NewsItemProps {
    item: {
        header: string;
        href: string;
        image: string;
        date: string;
    };
}

export function NewsItem(props: NewsItemProps) {
    const formatDate = (articleDate: Date) => {
        if (Number.isNaN(articleDate.getDate())) {
            return "";
        }

        let current = new Date().getTime();
        const diffTime = Math.abs(current - articleDate.getTime());

        if (diffTime < 24 * 60 * 60 * 1000) {
            return (
                articleDate.getHours() + ":" + zeroPad(articleDate.getMinutes())
            );
        } else {
            return articleDate.getDate() + "." + (articleDate.getMonth() + 1);
        }
    };

    return (
        <li
            key={props.item.header}
            className="w-full mb-2 bg-zinc-600 dark:bg-zinc-200 rounded-lg p-2 hover:bg-yellow-400
                         text-white hover:text-black dark:text-black  dark:hover:bg-yellow-400"
        >
            <a className="w-full flex " href={props.item.href} target="_blank">
                <Image
                    className=" h-[100px] flex-none object-cover rounded-lg mr-2" //w-[177px]
                    src={props.item.image}
                    alt={""}
                    width={196}
                    height={110}
                ></Image>
                <div className=" grow">
                    <span className="w-full font-bold">
                        {props.item.header}
                    </span>
                    <br />
                    <span className="w-full">
                        {formatDate(new Date(props.item.date))}
                    </span>
                </div>
            </a>
        </li>
    );
}

function NewsList(props: NewsListProps) {
    const [readyArticles, setReadyArticles] = useState<Array<Result> | null>(
        null
    );

    useEffect(() => {
        async function test(articles: Promise<Array<Result>>) {
            setReadyArticles(await articles);
        }
        test(props.articles);
    }, [props.articles]);

    return (
        <div className="h-full w-full bg-zinc-700 dark:bg-zinc-300 p-2 rounded-b-lg">
            {readyArticles != null ? (
                <ul className="h-full w-full overflow-y-auto rounded-lg transparent">
                    {readyArticles.length != 0
                        ? readyArticles
                              .slice(0, 20)
                              .map((item: Result) => (
                                  <NewsItem
                                      key={item.header + "Item"}
                                      item={item as Article}
                                  />
                              ))
                        : null}
                </ul>
            ) : null}
        </div>
    );
}

export default NewsList;
