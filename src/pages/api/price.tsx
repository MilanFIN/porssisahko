import { getDayAheadData } from "@/app/utils/newsgetters";
import { zeroPad } from "@/common/utils";
import { NextApiRequest, NextApiResponse } from "next";
var convert = require("xml-js");

const price = async (req: NextApiRequest, res: NextApiResponse) => {
    let timeData = await getDayAheadData();
    res.status(200).json({ data: timeData });
};

export default price;
