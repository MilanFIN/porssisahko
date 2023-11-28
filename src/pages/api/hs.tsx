import { NextApiRequest, NextApiResponse } from "next";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import cacheData from "memory-cache";

const CACHEDURATION = 1; //hours
const NEWSURL = "https://www.hs.fi/art-"
const NEWSENDURL = ".html"

const hs = async (req: NextApiRequest, res: NextApiResponse) => {
	const value = cacheData.get("hs");
	if (value) {
	  res.status(200).json(value);
	} else {
		const response = await fetch("https://www.hs.fi/aihe/sahko/");
		let data = await response.text();
		let results: any = [];

		const dom = new JSDOM(data);
		//fetching all article links
		let tags = dom.window.document.getElementsByClassName("teaser-m__border");
		
		
		let tagsArray = [...tags];
		tagsArray.forEach((element:any, index:number) => {

			let headerDom = element.getElementsByClassName("teaser-title-30");
			let imgDom = element.getElementsByTagName("img");
			if (headerDom.length != 0 && imgDom.length != 0) {
				let result = {
					"header" : headerDom[0].getElementsByTagName("span")[2].textContent,
					"href": NEWSURL + element.getAttribute('data-id') + NEWSENDURL,
					"image": imgDom[0].src
				}
				results.push(result)
			}
		});
		

		cacheData.put("hs", results, CACHEDURATION * 1000 * 60 * 60);
		res.status(200).json({data:results});
	
	}

  
};

export default hs;

