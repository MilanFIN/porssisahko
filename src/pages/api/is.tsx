import { getIsContent } from "@/app/actions";
import { NextApiRequest, NextApiResponse } from "next";

const IS = async (req: NextApiRequest, res: NextApiResponse) => {
    let results = await getIsContent(true);
    res.status(200).json(results);
};

export default IS;
