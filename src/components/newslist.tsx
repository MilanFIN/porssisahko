"use client";

import React, { useEffect, useState } from "react";

interface NewsListProps {
    articles: [];
    source: String;
}

function NewsList(props: NewsListProps) {
    const formatDate = (articleDate: Date) => {
        if (Number.isNaN(articleDate.getDate())) {
            return "";
        }

        let current = new Date().getTime();
        const diffTime = Math.abs(current - articleDate.getTime());

        if (diffTime < 24 * 60 * 60 * 1000) {
            return articleDate.getHours() + ":" + articleDate.getMinutes();
        } else {
            return articleDate.getDate() + "." + (articleDate.getMonth() + 1);
        }
    };

    return (
        <div className="h-full w-full bg-gray-300 p-2">
            <ul className="h-full w-full overflow-y-auto rounded-lg transparent">
                {props.articles.slice(0, 20).map((item: any) => (
                    <li
                        key={item.header}
                        className="w-full mb-2 bg-gray-100 rounded-lg p-2 hover:bg-yellow-200"
                    >
                        <a className="w-full flex " href={item.href}>
                            <img
                                className=" h-[100px] flex-none object-cover rounded-lg mr-2" //w-[177px]
                                src={item.image}
                            ></img>
                            <div className=" grow">
                                <span className="w-full">{item.header}</span>
                                <br />
                                <span>{formatDate(new Date(item.date))}</span>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NewsList;
