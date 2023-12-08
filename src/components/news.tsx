"use client"
import React, { useEffect, useState } from "react";
import NewsList from "./newslist";

interface NewsProps {
  articles:any;
  sources:String[];
}

function News(props: NewsProps) {

	const [activeSource, setActiveSource] = useState(0);

	const setActive = (source:String) => {
		console.log(source)
	}

  return (
	<div className="h-full w-full">
		<div className="flex justify-center">
		{props.sources.map((source:String, index:number) => 
			<div key={source.toString()}
					className={`grow w-full text-lg hover:bg-gray-300 text-center pt-2 h-12 ${index == activeSource ? "bg-gray-300" : "bg-gray-100 "}`}
					onClick={() => setActiveSource(index)}>
				<span>
					{source}
				</span>
			</div>
		)
		}

		</div>

		<div className="w-full h-full ">
			<NewsList source={props.sources[activeSource]} articles={props.articles[activeSource]} />
		</div>

		
    </div>
  );
}

export default News;
/*

*/