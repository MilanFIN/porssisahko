import { zeroPad } from "@/common/utils";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var convert = require("xml-js");

export const getYleContent = async () => {
    const NEWSURL = "http://yle.fi";
    const IMAGEURL =
        "https://images.cdn.yle.fi/image/upload/w_196,h_110,ar_1.7777777777777777,dpr_1,c_fill/q_auto:eco,f_auto,fl_lossy/v420/";

    const response = await fetch("https://yle.fi/uutiset/18-205950", {
        next: { revalidate: 3600 },
    });
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

    return results;
};

export const getHsContent = async () => {
    const NEWSURL = "https://www.hs.fi/art-";
    const NEWSENDURL = ".html";

    const response = await fetch("https://www.hs.fi/aihe/sahko/", {
        next: { revalidate: 3600 },
    });
    let data = await response.text();
    let results: any = [];

    const dom = new JSDOM(data);
    //fetching all article links
    let tags = dom.window.document.getElementsByClassName("teaser-m__border");

    let tagsArray = [...tags];
    tagsArray.forEach((element: any, index: number) => {
        let headerDom = element.getElementsByClassName("teaser-title-30");
        let imgDom = element.getElementsByTagName("img");
        if (headerDom.length != 0 && imgDom.length != 0) {
            let result = {
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

export const getIsContent = async () => {
    const NEWSURL = "https://www.is.fi/art-";
    const NEWSENDURL = ".html";

    const response = await fetch("https://www.is.fi/aihe/sahko/", {
        next: { revalidate: 3600 },
    });
    let data = await response.text();
    let results: any = [];

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
            let result = {
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

export const getIlContent = async () => {
    const NEWSURL = "https://www.iltalehti.fi/";

    const response = await fetch(
        "https://api.il.fi/v1/articles/search?q=s%C3%A4hk%C3%B6&limit=10&image_sizes[]=size138",
        { next: { revalidate: 3600 } }
    );
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

    return results;
};

export const getPriceData = async () => {
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
    const response = await fetch(source, { next: { revalidate: 3600 } });
    let data = await response.json();

    return data[0].Values;
};

export const getDayAheadData = async () => {
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

    let token = process.env.ENTSOE_SECURITY_TOKEN;

    let url = `https://web-api.tp.entsoe.eu/api?documentType=A44&out_Domain=10YFI-1--------U&in_Domain=10YFI-1--------U&periodStart=${threeMonthStamp}&periodEnd=${tomorrowStamp}&securityToken=${token}`;
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data = await response.text();

    let jsonData = JSON.parse(
        convert.xml2json(data, { compact: true, spaces: 4 })
    );
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

    return timeData;
};
