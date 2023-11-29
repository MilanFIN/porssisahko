import React, { useEffect, useState } from "react";

interface NewsListProps {
	yleArticles: []
}

function NewsList(props: NewsListProps) {


  return (
		<ul>
        {props.yleArticles.map((item:any) =>
          <li key={item.header}>{item.header}</li>
        )}
        </ul>
  );
}

export default NewsList;
