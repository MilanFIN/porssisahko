import { getIlContent } from "@/app/utils/newsgetters";
import { NextApiRequest, NextApiResponse } from "next";


const il = async (req: NextApiRequest, res: NextApiResponse) => {

    const results = await getIlContent();
    res.status(200).json(results);
};

export default il;
