import { NextApiRequest, NextApiResponse } from "next";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import cacheData from "memory-cache";

const CACHEDURATION = 1; //hours
const NEWSURL = "http://yle.fi"
const IMAGEURL = "https://images.cdn.yle.fi/image/upload/w_196,h_110,ar_1.7777777777777777,dpr_1,c_fill/q_auto:eco,f_auto,fl_lossy/v420/"

const yle = async (req: NextApiRequest, res: NextApiResponse) => {
  const value = cacheData.get("yle");
  if (value) {
    res.status(200).json(value);
  } else {
    const response = await fetch("https://yle.fi/uutiset/18-205950");
    let data = await response.text();
    let results: any = [];

    let lineContent = data.split("\n");
    let initialScript = lineContent[lineContent.length - 5];
    let removedStart = initialScript.substring(initialScript.indexOf("{"));
    let removedEnd = removedStart.substring(
      0,
      removedStart.lastIndexOf("}") + 1
    );
    let initialState = JSON.parse(removedEnd);

    initialState.pageData.layout.forEach((element: any) => {
      let result = {
        header: element.texts.headline.text,
        url: NEWSURL+ element.url,
        image: IMAGEURL + element.image.id,
        imagealt: element.image.alt,
      };
      results.push(result);
    });

    cacheData.put("yle", results, CACHEDURATION * 1000 * 60 * 60);
    res.status(200).json(results);
  }
};

export default yle;

/*
//converting raw string html to a dom
const dom = new JSDOM(data);
//fetching all article links
let tags = dom.window.document.getElementsByClassName("underlay-link")
let tagsArray = [...tags]
tagsArray.forEach((element:any) => {
    let result = {
        "header" : element.textContent,
        "href": element.href,
        "image": "tbd"
    }
    results.push(result)
});
*/
