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

export async function NewsWrapper() {
    const yleArticles = await getYleContent(true);
    const hsArticles = await getHsContent(true);
    const isArticles = await getIsContent(true);
    const ilArticles = await getIlContent(true);

    return (
        <News
            articles={[yleArticles, hsArticles, ilArticles, isArticles]}
            apiSources={["yle", "hs", "il", "is"]}
            sources={["Yle", "HS", "IL", "IS"]}
        />
    );
}
