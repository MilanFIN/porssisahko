import { getDayAheadData } from "@/app/actions";
import { NextApiRequest, NextApiResponse } from "next";
var convert = require("xml-js");

const price = async (req: NextApiRequest, res: NextApiResponse) => {
    let timeData = await getDayAheadData(true, 9500);
    res.status(200).json(timeData);
};

export default price;
