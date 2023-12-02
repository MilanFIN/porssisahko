import { NextApiRequest, NextApiResponse } from "next";

const price = async (req: NextApiRequest, res: NextApiResponse) => {
	
	var currentDate = new Date();
	// Get tomorrow's date
	let tomorrow = new Date(currentDate);
	tomorrow.setDate(currentDate.getDate() + 1);
	tomorrow.setHours(23, 59, 59, 999); // Set to the end of the day
	let isoTomorrow = tomorrow.toISOString();

	let sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
	sevenDaysAgo.setHours(0, 0, 0, 0);
	let isoSevenDaysAgo = sevenDaysAgo.toISOString();

	let source = `https://www.fingrid.fi/api/graph/dataset?variableId[]=106&start=${isoSevenDaysAgo}&end=${isoTomorrow}`;
	const response = await fetch(source);
	let data = await response.json();

	

	res.status(200).json({data:data});

  
};

export default price;

