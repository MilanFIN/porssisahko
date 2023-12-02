"use client";
import { Line } from "react-chartjs-2";

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

interface ChartData {
  chartData: any;
}

function LineChart(props: ChartData) {

  const [tax, setTax] = useState(0);
  const [history, setHistory] = useState(7);

  const [chartData, setChartData] = useState(props.chartData);


  useEffect(() => {

	let newChartData = JSON.parse(JSON.stringify(props.chartData));

	let count = props.chartData.labels.length;
	
	newChartData.datasets[0].data = newChartData.datasets[0].data.slice(count - 24*history, count);
	newChartData.labels = newChartData.labels.slice(count - 24*history, count)
	newChartData.datasets[0].data.forEach((value:any, index:number) => {
		if (tax !== 0 && value > 0) {
			newChartData.datasets[0].data[index] = value + value*tax;
		}
	});
	setChartData(newChartData)
  }, [tax, history]);

  
  const zeroPad = function(value:number) {
	let strValue = value.toString();
	if (strValue.length < 2) {
		strValue = "0"+strValue;
	}
	return strValue;
  }

  return (
    <div className={`chart-container
					lg:w-1/2 w-[90%]`}>
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
	  <div className="flex">		
	  	<button className="bg-yellow-500 mx-1 px-2" onClick={() => setTax(0)}>alv 0%</button>
		<button className="bg-yellow-500 mx-1 px-2" onClick={() => setTax(0.24)}>alv 24%</button>

		<span className="grow"></span>

		<button className="bg-yellow-500 mx-1 px-2" onClick={() => setHistory(7)}>1vk</button>
		<button className="bg-yellow-500 mx-1 px-2" onClick={() => setHistory(31)}>1kk</button>
		<button className="bg-yellow-500 mx-1 px-2" onClick={() => setHistory(90)}>3kk</button>

	  </div>

      <Line
        data={chartData}
        options={{
			elements: {
				point: {
					radius: 0
				}
			},
          plugins: {
            title: {
              display: false,
              text: "Hinta snt/kWh",
            },
            legend: {
              display: false,
            },
          },
		  scales: {
            x: {
                ticks: {
					
                    callback: function(value:any, index, ticks:any) {
						let date = new Date(chartData.labels[index]);
                        return date.getDate() + "." + (date.getMonth()+1) + " " + zeroPad(date.getHours()) + ":" + zeroPad(date.getMinutes());
                    }
					
                }
            },
			y: {
                ticks: {
                    callback: function(value:any, index, ticks) {
                        return parseInt(value)/10 + "snt";
                    }
                }
            }
        },
        }}
      />
    </div>
  );
}
export default LineChart;
