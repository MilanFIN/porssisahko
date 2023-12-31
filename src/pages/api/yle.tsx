import { getYleContent } from "@/app/utils/newsgetters";
import { NextApiRequest, NextApiResponse } from "next";

const yle = async (req: NextApiRequest, res: NextApiResponse) => {
    const results = await getYleContent(true);

    res.status(200).json(results);
};

export default yle;
