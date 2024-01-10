import { getHsContent } from "@/app/actions";
import { NextApiRequest, NextApiResponse } from "next";

const hs = async (req: NextApiRequest, res: NextApiResponse) => {

    let results = await getHsContent(true);

    res.status(200).json(results);
};

export default hs;
