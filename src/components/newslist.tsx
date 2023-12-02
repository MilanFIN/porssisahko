import React, { useEffect, useState } from "react";

interface NewsListProps {
	articles: [];
  source: String;
}

function NewsList(props: NewsListProps) {



  return (
    <div className="h-full bg-gray-400 px-2 rounded-lg pb-8">
      <h3 className="text-lg">{props.source}</h3>
      <ul className="h-full overflow-y-auto rounded-lg bg-gray-400">
          {props.articles.slice(0, 20).map((item:any) =>
            <li key={item.header} 
            className="mb-2 bg-gray-200 rounded-lg p-2">
              <a  className="w-full flex" 
              
                href={item.href}>
                <img className="w-[177px] h-[100px] object-cover rounded-lg mr-2"
                  src={item.image}></img>
                <span className="">{item.header}</span>

              </a>
            </li>
          )}
          </ul>

    </div>
  );
}

export default NewsList;
