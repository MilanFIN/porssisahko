"use server";

import { TimeSeriesPrice, zeroPad } from "@/common/common";
import { TIMEOUT } from "dns";
import cacheData from "memory-cache";
import { revalidateTag } from "next/cache";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var convert = require("xml-js");

const CACHESECONDS = 3600;

export interface Result {
    header: string;
    href: string;
    image: string;
    imagealt?: string;
    date?: string;
}

export const getNews = async (type: string) => {
    if (type == "yle") {
        return getYleContent(true);
    } else if (type == "is") {
        return getIsContent(true);
    } else if (type == "il") {
        return getIlContent(true);
    } else if (type == "hs") {
        return getHsContent(true);
    } else {
        return [];
    }
};

export const parseYleContent = (data: string) => {
    const NEWSURL = "http://yle.fi";
    const IMAGEURL =
        "https://images.cdn.yle.fi/image/upload/w_196,h_110,ar_1.7777777777777777,dpr_1,c_fill/q_auto:eco,f_auto,fl_lossy/v420/";

    let results = new Array<Result>();

    let lineContent = data.split("\n");
    let initialScript = lineContent[lineContent.length - 5];
    let removedStart = initialScript.substring(initialScript.indexOf("{"));
    let removedEnd = removedStart.substring(
        0,
        removedStart.lastIndexOf("}") + 1
    );
    let initialState = JSON.parse(removedEnd);

    initialState.pageData.layout.forEach((element: any) => {
        let result: Result = {
            header: element.texts.headline.text,
            href: NEWSURL + element.url,
            image: IMAGEURL + element.image.id,
            imagealt: element.image.alt,
            date: element.publishedAt,
        };
        results.push(result);
    });
    return results;
};

export const getYleContent = async (wait: boolean) => {
    const url = "https://yle.fi/uutiset/18-205950";
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else if (wait) {
        try {
            const response = await fetch(url, { cache: "no-store" });
            let results = parseYleContent(await response.text());
            cacheData.put(url, results, 1000 * CACHESECONDS);

            return results;
        } catch (e) {
            return [];
        }
    } else {
        return [];
    }
};

export const parseHsContent = (data: string) => {
    const NEWSURL = "https://www.hs.fi/art-";
    const NEWSENDURL = ".html";

    let results = new Array<Result>();

    const dom = new JSDOM(data);
    //fetching all article links
    let tags = dom.window.document.getElementsByClassName("teaser-m__border");

    let tagsArray = [...tags];
    tagsArray.forEach((element: any, index: number) => {
        let headerDom = element.getElementsByClassName("teaser-title-30");
        let imgDom = element.getElementsByTagName("img");
        if (headerDom.length != 0 && imgDom.length != 0) {
            let result: Result = {
                header: headerDom[0].getElementsByTagName("span")[2]
                    .textContent,
                href: NEWSURL + element.getAttribute("data-id") + NEWSENDURL,
                image: imgDom[0].src,
            };
            results.push(result);
        }
    });
    return results;
};

export const getHsContent = async (wait: boolean) => {
    const url = "https://www.hs.fi/aihe/sahko/";
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else if (wait) {
        try {
            const response = await fetch(url, { cache: "no-store" });
            let results = parseHsContent(await response.text());

            cacheData.put(url, results, 1000 * CACHESECONDS);

            return results;
        } catch (e) {
            return [];
        }
    } else {
        return [];
    }
};

export const parseIsContent = (data: string) => {
    const NEWSURL = "https://www.is.fi/art-";
    const NEWSENDURL = ".html";

    let results = new Array<Result>();

    const dom = new JSDOM(data);
    //fetching all article links
    let tags = dom.window.document.getElementsByClassName("teaser-m__border");
    let images = dom.window.document.getElementsByTagName("img");

    let tagsArray = [...tags];
    tagsArray.forEach((element: any, index: number) => {
        let headerDom = element.getElementsByClassName("teaser-title-30");
        let timeLabel =
            element.getElementsByClassName("timestamp-label")[0].textContent;

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
            let result: Result = {
                header: headerDom[0].textContent,
                href: NEWSURL + element.getAttribute("data-id") + NEWSENDURL,
                image: imgDom[0].src,
                date: date.toISOString(),
            };
            results.push(result);
        }
    });

    return results;
};

export const getIsContent = async (wait: boolean) => {
    const url = "https://www.is.fi/aihe/sahko/";
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else if (wait) {
        try {
            const response = await fetch(url);
            let results = parseIsContent(await response.text());

            cacheData.put(url, results, 1000 * CACHESECONDS);
            return results;
        } catch (e) {
            return [];
        }
    } else {
        return [];
    }
};

export const parseIlContent = (data: Record<string, any>) => {
    const NEWSURL = "https://www.iltalehti.fi/";
    let results = new Array<Result>();

    data.forEach((element: any) => {
        let category = element.category.category_name;
        let result: Result = {
            header: element.title,
            href:
                NEWSURL +
                element.category.category_name +
                "/" +
                element.article_id,
            image: element.main_image_urls["size138"],
            date: element.published_at,
        };
        results.push(result);
    });
    return results;
};

export const getIlContent = async (wait: boolean) => {
    const url =
        "https://api.il.fi/v1/articles/search?q=s%C3%A4hk%C3%B6&limit=10&image_sizes[]=size138";
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else if (wait) {
        try {
            const response = await fetch(url, { cache: "no-store" });
            let data = await response.json();
            data = data.response;

            const results = parseIlContent(data);

            cacheData.put(url, results, 1000 * CACHESECONDS);

            return results;
        } catch (e) {
            return [];
        }
    } else {
        return [];
    }
};

export const parseDayAheadData = (data: string) => {
    let jsonData = JSON.parse(
        convert.xml2json(data, { compact: true, spaces: 4 })
    );

    let timeSeriesData = jsonData.Publication_MarketDocument.TimeSeries;

    let timeData = new Array<TimeSeriesPrice>();

    timeSeriesData.forEach((element: any) => {
        let period = element.Period;
        let startTime = new Date(period.timeInterval.start._text);
        let dataPoints = period.Point;

        dataPoints.forEach((point: any) => {
            let hoursOffset = parseInt(point.position._text) - 1;
            let correspondingDate = new Date(startTime.getTime());
            correspondingDate.setHours(
                correspondingDate.getHours() + hoursOffset
            );
            let price = parseFloat(point["price.amount"]._text);
            timeData.push({
                Timestamp: correspondingDate.toISOString(),
                Value: price,
            } as TimeSeriesPrice);
        });
    });

    return {
        date: jsonData.Publication_MarketDocument.createdDateTime._text,
        data: timeData,
    };
};

export const getDayAheadData = async (wait: boolean, timeout: number) => {
    const key = "entsoe-prices";
    const value = cacheData.get(key);
    if (value) {
        return value;
    } else if (!wait) {
        return { date: null, data: [] };
    } else {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 2);
        tomorrow.setHours(0, 0, 0, 0);
        let tomorrowStamp =
            tomorrow.getFullYear().toString() +
            zeroPad(tomorrow.getMonth() + 1) +
            zeroPad(tomorrow.getDate()) +
            zeroPad(tomorrow.getHours()) +
            zeroPad(tomorrow.getMinutes());

        let oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);
        oneMonthAgo.setHours(0, 0, 0, 0);

        let oneMonthStamp =
            oneMonthAgo.getFullYear().toString() +
            zeroPad(oneMonthAgo.getMonth() + 1) +
            zeroPad(oneMonthAgo.getDate()) +
            zeroPad(oneMonthAgo.getHours()) +
            zeroPad(oneMonthAgo.getMinutes());

        let token = process.env.ENTSOE_SECURITY_TOKEN || "";

        let url = `https://web-api.tp.entsoe.eu/api?documentType=A44&out_Domain=10YFI-1--------U&in_Domain=10YFI-1--------U&periodStart=${oneMonthStamp}&periodEnd=${tomorrowStamp}&securityToken=${token}`;
        try {
            var response =
                timeout != 0
                    ? await fetch(url, {
                          cache: "no-cache",
                          signal: AbortSignal.timeout(timeout),
                      })
                    : await fetch(url, {
                          cache: "no-cache",
                      });
            if (response.status != 200) {
                return { error: "Failed to fetch price data" };
            }
            const result = parseDayAheadData(await response.text());

            cacheData.put(key, result, 1000 * CACHESECONDS);

            return result;
        } catch (e) {
            return { error: "Failed to fetch price data" };
        }
    }
};
