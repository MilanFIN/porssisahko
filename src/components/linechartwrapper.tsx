import { getDayAheadData } from "@/app/actions";
import LineChart from "./linechart";
import { PriceData, TimeSeriesPrice } from "@/common/common";

async function LineChartWrapper() {
    const dayAheadData = await getDayAheadData(false, 0);
    const priceData = dayAheadData as PriceData;

    const chartData =
        priceData.data.length != 0
            ? {
                  labels: priceData.data.map((data: TimeSeriesPrice) => data.Timestamp),
                  datasets: [
                      {
                          label:
                              "Hinta " +
                              priceData.data.map((data: TimeSeriesPrice) => data.Timestamp),
                          data: priceData.data.map((data: TimeSeriesPrice) => data.Value),
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

    return <LineChart chartData={chartData} date={chartDate} />;
}

export default LineChartWrapper;
