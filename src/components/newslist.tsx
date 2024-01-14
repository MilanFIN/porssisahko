"use client";

import { getNews } from "@/app/actions";
import { zeroPad, Article } from "@/common/common";
import React, { ReactNode, useEffect, useState } from "react";

interface NewsListProps {
    apiSource: string;
    source: string;
    articles: Array<Article>;
}

function NewsList(props: NewsListProps) {
    const [articles, setArticles] = useState<Array<Article>>([]);

    useEffect(() => {
        /*
        const getArticles = async () => {
            if (props.articles.length != 0) {
                setArticles(props.articles);
            } else {
                setArticles([]);
                let source = props.apiSource;
                let parsedArticles = await getNews(props.apiSource);

                if (props.apiSource == source) {
                    setArticles(parsedArticles);
                }
            }
        };
        getArticles();
        */
    }, [props.apiSource]);

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
        <div className="h-full w-full bg-zinc-700 p-2 rounded-b-lg">
            <ul className="h-full w-full overflow-y-auto rounded-lg transparent">
                {props.articles.length != 0
                    ? props.articles.slice(0, 20).map((item: Article) => (
                          <li
                              key={item.header}
                              className="w-full mb-2 bg-zinc-600 rounded-lg p-2 hover:bg-yellow-400 text-white hover:text-black"
                          >
                              <a className="w-full flex " href={item.href}>
                                  <img
                                      className=" h-[100px] flex-none object-cover rounded-lg mr-2" //w-[177px]
                                      src={item.image}
                                  ></img>
                                  <div className=" grow">
                                      <span className="w-full font-bold">
                                          {item.header}
                                      </span>
                                      <br />
                                      <span className="w-full">
                                          {formatDate(new Date(item.date))}
                                      </span>
                                  </div>
                              </a>
                          </li>
                      ))
                    : null}
            </ul>
        </div>
    );
}

export default NewsList;
