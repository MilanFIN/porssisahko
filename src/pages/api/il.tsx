import { NextApiRequest, NextApiResponse } from "next";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import cacheData from "memory-cache";

const CACHEDURATION = 1; //hours
const NEWSURL = "https://www.iltalehti.fi/";

const il = async (req: NextApiRequest, res: NextApiResponse) => {
    const value = cacheData.get("il");
    if (value) {
        res.status(200).json(value);
    } else {
        const response = await fetch(
            "https://api.il.fi/v1/articles/search?q=s%C3%A4hk%C3%B6&limit=10&image_sizes[]=size138"
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
                date: element.published_at
            };
            results.push(result);
        });

        cacheData.put("il", results, CACHEDURATION * 1000 * 60 * 60);
        res.status(200).json(results);
    }
};

export default il;
