import { NextApiRequest, NextApiResponse } from "next";
const jsdom = require("jsdom");
import cacheData from "memory-cache";

const CACHEDURATION = 1; //hours

const price = async (req: NextApiRequest, res: NextApiResponse) => {


  
	const response = await fetch("https://www.fingrid.fi/api/graph/dataset?variableId[]=244&variableId[]=106&start=2023-11-27T00:00:00%2B02:00&end=2023-12-03T23:59:59%2B02:00");
	let data = await response.text();

	var tomorrow = new Date();
	let isoToday = tomorrow.toISOString();

	tomorrow.setDate(tomorrow.getDate()+1);
	let isoTomorrow = tomorrow.toISOString();


	res.status(200).json({data:isoTomorrow});

  
};

export default price;

