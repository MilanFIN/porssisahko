import { getHsContent } from "@/app/utils/newsgetters";
import { NextApiRequest, NextApiResponse } from "next";

const hs = async (req: NextApiRequest, res: NextApiResponse) => {

    let results = await getHsContent();

    res.status(200).json(results);
};

export default hs;
