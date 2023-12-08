"use client"

import React, { useEffect, useState } from "react";

interface NewsListProps {
	articles: [];
  source: String;
}

function NewsList(props: NewsListProps) {

  const formatDate = (articleDate:Date) => {

    if (Number.isNaN(articleDate.getDate())) {
      return ""
    }

    let current = new Date().getTime();
    const diffTime = Math.abs(current - articleDate.getTime());

    if (diffTime < 24*60*60*1000) {
      return articleDate.getHours() + ":" + articleDate.getMinutes()
    }
    else {
      return articleDate.getDate() + "." + (articleDate.getMonth()+1);
    }
  }

  return (
    <div className="h-full bg-gray-300 p-2">
      <ul className="h-full overflow-y-auto rounded-lg bg-gray-300">
          {props.articles.slice(0, 20).map((item:any) =>
            <li key={item.header} 
            className="mb-2 bg-gray-100 rounded-lg p-2 hover:bg-yellow-200">
              <a  className="w-full flex" 
              
                href={item.href}>
                <img className="w-[177px] h-[100px] object-cover rounded-lg mr-2"
                  src={item.image}></img>
                  <div>
                    <span className="">{item.header}</span>
                    <br/>
                    <span>{formatDate(new Date(item.date))}</span>

                  </div>

              </a>
            </li>
          )}
          </ul>

    </div>
  );
}

export default NewsList;
