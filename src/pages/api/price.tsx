import { zeroPad } from "@/common/utils";
import { NextApiRequest, NextApiResponse } from "next";



const price = async (req: NextApiRequest, res: NextApiResponse) => {
    // Get tomorrow's date
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    tomorrow.setHours(0,0,0,0); 
    let tomorrowStamp = tomorrow.getFullYear().toString() + zeroPad(tomorrow.getMonth()+1)
                            + zeroPad(tomorrow.getDate())+ zeroPad(tomorrow.getHours()) + zeroPad(tomorrow.getMinutes());

    
    
    let threeMonthsAgo = new Date();
    threeMonthsAgo.setDate(threeMonthsAgo.getDate() -90);
    threeMonthsAgo.setHours(0, 0, 0, 0);


    let threeMonthStamp = threeMonthsAgo.getFullYear().toString() + zeroPad(threeMonthsAgo.getMonth()+1)
                + zeroPad(threeMonthsAgo.getDate()) + zeroPad(threeMonthsAgo.getHours()) + zeroPad(threeMonthsAgo.getMinutes());

    let token = process.env.ENTSOE_SECURITY_TOKEN;

    let url = `https://web-api.tp.entsoe.eu/api?documentType=A44&out_Domain=10YFI-1--------U&in_Domain=10YFI-1--------U&periodStart=${threeMonthStamp}&periodEnd=${tomorrowStamp}&securityToken=${token}`
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data = await response.text();

    res.status(200).json({ data: data });
};



export default price;

