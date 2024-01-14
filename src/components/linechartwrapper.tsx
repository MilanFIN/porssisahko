import { getDayAheadData } from "@/app/actions";
import LineChart from "./linechart";
import { PriceData } from "@/common/common";



async function LineChartWrapper() {

    const dayAheadData = await getDayAheadData(true);
    const priceData = dayAheadData as PriceData;

    const chartData =
        priceData.data.length != 0
            ? {
                  labels: priceData.data.map((data: any) => data.Timestamp),
                  datasets: [
                      {
                          label:
                              "Hinta " +
                              priceData.data.map((data: any) => data.Timestamp),
                          data: priceData.data.map((data: any) => data.Value),
                          borderColor: "black",
                          borderWidth: 2,
                      },
                  ],
              }
            : {
                  labels: [],
                  datasets: [
                      {
                          label: "TBD",
                          data: [],
                          borderColor: "black",
                          borderWidth: 2,
                      },
                  ],
              };

    const chartDate = priceData.date != "" ? new Date(priceData.date) : null;


	return (
		<LineChart chartData={chartData} date={chartDate} />
	)

}

export default LineChartWrapper;