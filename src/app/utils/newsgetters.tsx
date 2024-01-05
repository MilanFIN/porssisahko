import { zeroPad } from "@/common/common";
import cacheData from "memory-cache";
import { revalidateTag } from "next/cache";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var convert = require("xml-js");

//should make cache revalidation work
export const dynamic = "force-dynamic";
const CACHESECONDS = 3600;

export const getYleContent = async (wait: boolean) => {
    const url = "https://yle.fi/uutiset/18-205950";
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else if (wait) {
        const NEWSURL = "http://yle.fi";
        const IMAGEURL =
            "https://images.cdn.yle.fi/image/upload/w_196,h_110,ar_1.7777777777777777,dpr_1,c_fill/q_auto:eco,f_auto,fl_lossy/v420/";

        const response = await fetch(url, { cache: "no-store" });
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
                href: NEWSURL + element.url,
                image: IMAGEURL + element.image.id,
                imagealt: element.image.alt,
                date: element.publishedAt,
            };
            results.push(result);
        });

        cacheData.put(url, results, 1000 * CACHESECONDS);

        return results;
    } else {
        return [];
    }
};

export const getHsContent = async (wait: boolean) => {
    const url = "https://www.hs.fi/aihe/sahko/";
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else if (wait) {
        const NEWSURL = "https://www.hs.fi/art-";
        const NEWSENDURL = ".html";

        const response = await fetch(url, { cache: "no-store" });
        let data = await response.text();
        let results: any = [];

        const dom = new JSDOM(data);
        //fetching all article links
        let tags =
            dom.window.document.getElementsByClassName("teaser-m__border");

        let tagsArray = [...tags];
        tagsArray.forEach((element: any, index: number) => {
            let headerDom = element.getElementsByClassName("teaser-title-30");
            let imgDom = element.getElementsByTagName("img");
            if (headerDom.length != 0 && imgDom.length != 0) {
                let result = {
                    header: headerDom[0].getElementsByTagName("span")[2]
                        .textContent,
                    href:
                        NEWSURL + element.getAttribute("data-id") + NEWSENDURL,
                    image: imgDom[0].src,
                };
                results.push(result);
            }
        });

        cacheData.put(url, results, 1000 * CACHESECONDS);

        return results;
    } else {
        return [];
    }
};

export const getIsContent = async (wait: boolean) => {
    const url = "https://www.is.fi/aihe/sahko/";
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else if (wait) {
        const NEWSURL = "https://www.is.fi/art-";
        const NEWSENDURL = ".html";

        const response = await fetch(url);
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

        cacheData.put(url, results, 1000 * CACHESECONDS);
        return results;
    } else {
        return [];
    }
};

export const getIlContent = async (wait: boolean) => {
    const url =
        "https://api.il.fi/v1/articles/search?q=s%C3%A4hk%C3%B6&limit=10&image_sizes[]=size138";
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else if (wait) {
        const NEWSURL = "https://www.iltalehti.fi/";

        const response = await fetch(url, { cache: "no-store" });
        let data = await response.json();
        data = data.response;
        let results: any = [];

        data.forEach((element: any) => {
            let category = element.category.category_name;
            let result = {
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
        cacheData.put(url, results, 1000 * CACHESECONDS);

        return results;
    } else {
        return [];
    }
};

export const getPriceData = async () => {
    const key = "fingrid-prices";
    const value = cacheData.get(key);
    if (value) {
        return value;
    } else {
        var currentDate = new Date();
        // Get tomorrow's date
        let tomorrow = new Date(currentDate);
        tomorrow.setDate(currentDate.getDate() + 1);
        tomorrow.setHours(23, 59, 59, 999); // Set to the end of the day
        let isoTomorrow = tomorrow.toISOString();

        let threeMonthsAgo = new Date(
            currentDate.getTime() - 90 * 24 * 60 * 60 * 1000
        );
        threeMonthsAgo.setHours(0, 0, 0, 0);
        let isoThreeMonthsAgo = threeMonthsAgo.toISOString();

        let source = `https://www.fingrid.fi/api/graph/dataset?variableId[]=106&start=${isoThreeMonthsAgo}&end=${isoTomorrow}`;
        const response = await fetch(source, { cache: "no-store" });
        let data = await response.json();

        cacheData.put(key, data[0].Values, 1000 * CACHESECONDS);

        return data[0].Values;
    }
};

export const getDayAheadData = async (wait: boolean) => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    tomorrow.setHours(0, 0, 0, 0);
    let tomorrowStamp =
        tomorrow.getFullYear().toString() +
        zeroPad(tomorrow.getMonth() + 1) +
        zeroPad(tomorrow.getDate()) +
        zeroPad(tomorrow.getHours()) +
        zeroPad(tomorrow.getMinutes());

    let threeMonthsAgo = new Date();
    threeMonthsAgo.setDate(threeMonthsAgo.getDate() - 90);
    threeMonthsAgo.setHours(0, 0, 0, 0);

    let threeMonthStamp =
        threeMonthsAgo.getFullYear().toString() +
        zeroPad(threeMonthsAgo.getMonth() + 1) +
        zeroPad(threeMonthsAgo.getDate()) +
        zeroPad(threeMonthsAgo.getHours()) +
        zeroPad(threeMonthsAgo.getMinutes());

    let token = process.env.ENTSOE_SECURITY_TOKEN || "";

    let url = `https://web-api.tp.entsoe.eu/api?documentType=A44&out_Domain=10YFI-1--------U&in_Domain=10YFI-1--------U&periodStart=${threeMonthStamp}&periodEnd=${tomorrowStamp}&securityToken=${token}`;
    let response = await fetch(url, {
        next: {
            revalidate: CACHESECONDS,
            tags: ["price"],
        },
    });
    if (response.status != 200) {
        return [];
    }
    let data = await response.text();

    let jsonData = JSON.parse(
        convert.xml2json(data, { compact: true, spaces: 4 })
    );

    //aattemp
    let queryDate = new Date(
        jsonData.Publication_MarketDocument.createdDateTime._text
    );
    let now = new Date();
    let diff = Math.abs(queryDate.getTime() - now.getTime()) / 3600000;

    if (diff > 1) {
        revalidateTag("price");
        response = await fetch(url, {
            next: {
                revalidate: CACHESECONDS,
                tags: ["price"],
            },
        });
        if (response.status != 200) {
            return { date: "", data: [] };
        }
        data = await response.text();

        jsonData = JSON.parse(
            convert.xml2json(data, { compact: true, spaces: 4 })
        );
    }
    let timeSeriesData = jsonData.Publication_MarketDocument.TimeSeries;

    let timeData: any = [];

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
            });
        });
    });

    return {
        date: jsonData.Publication_MarketDocument.createdDateTime._text,
        data: timeData,
    };
};
