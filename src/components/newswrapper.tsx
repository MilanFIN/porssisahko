import React, { useEffect, useState } from "react";
import NewsList from "./newslist";
import { Article } from "@/common/common";
import {
    getHsContent,
    getIlContent,
    getIsContent,
    getYleContent,
} from "@/app/actions";
import News from "./news";

export const dynamic = "force-dynamic";
//todo: remove async await from here, and pass getcontent result as a promise instead
//that way results won't 

export async function NewsWrapper() {
    const yleArticles = getYleContent(true);
    const hsArticles = getHsContent(true);
    const isArticles = getIsContent(true);
    const ilArticles = getIlContent(true);

    return (
        <News
            articles={[yleArticles, hsArticles, ilArticles, isArticles]}
            apiSources={["yle", "hs", "il", "is"]}
            sources={["Yle", "HS", "IL", "IS"]}
        />
    );
}
