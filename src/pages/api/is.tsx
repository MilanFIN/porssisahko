import { getIsContent } from "@/app/utils/newsgetters";
import { NextApiRequest, NextApiResponse } from "next";

const IS = async (req: NextApiRequest, res: NextApiResponse) => {
    let results = await getIsContent();
    res.status(200).json({ results });
};

export default IS;
