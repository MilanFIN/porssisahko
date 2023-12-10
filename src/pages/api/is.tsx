import { NextApiRequest, NextApiResponse } from "next";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const cacheData = require("memory-cache");

const CACHEDURATION = 1; //hours
const NEWSURL = "https://www.is.fi/art-";
const NEWSENDURL = ".html";

const IS = async (req: NextApiRequest, res: NextApiResponse) => {
    const value = cacheData.get("is");
    if (value) {
        res.status(200).json(value);
    } else {
        const response = await fetch("https://www.is.fi/aihe/sahko/");
        let data = await response.text();
        let results: any = [];

        const dom = new JSDOM(data);
        //fetching all article links
        let tags =
            dom.window.document.getElementsByClassName("teaser-m__border");
        let images = dom.window.document.getElementsByTagName("img");

        let tagsArray = [...tags];
        tagsArray.forEach((element: any, index: number) => {
            let headerDom = element.getElementsByClassName("teaser-title-30");
            let timeLabel =
                element.getElementsByClassName("timestamp-label")[0]
                    .textContent;

            let content = timeLabel.split(" ");
            let date = new Date();
            if (content.length == 1) {
                //eg. 15:10
                let time = timeLabel.split(":");
                date.setHours(time[0]);
                date.setMinutes(time[1]);
            } else if (content.length == 2) {
                //eg. 6.12. 15:10
                let dayAndMonth = content[0].split(".");
                let time = content[1].split(":");
                date.setMonth(dayAndMonth[1] - 1);
                date.setDate(dayAndMonth[0]);
                date.setHours(time[0]);
                date.setMinutes(time[1]);
            }

            let imgDom = element.getElementsByTagName("img");
            if (headerDom.length != 0 && imgDom.length != 0) {
                let result = {
                    header: headerDom[0].textContent,
                    href:
                        NEWSURL + element.getAttribute("data-id") + NEWSENDURL,
                    image: imgDom[0].src,
                    date: date.toISOString(),
                };
                results.push(result);
            }
        });

        //cacheData.put("is", results, CACHEDURATION * 1000 * 60 * 60);
        res.status(200).json({ results });
    }
};

export default IS;
