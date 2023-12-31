"use client";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import annotationPlugin from "chartjs-plugin-annotation";
import Annotation from "chartjs-plugin-annotation";

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
    scales,
} from "chart.js";
import { useEffect, useState } from "react";
import { zeroPad } from "@/common/utils";
import { InfoBox } from "./infobox";

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
    Tooltip,
    //annotationPlugin,
    Annotation
);

interface ChartData {
    chartData: any;
}

function LineChart(props: ChartData) {
    const [tax, setTax] = useState(0.24);
    const [history, setHistory] = useState(7);

    const [totalChartData, setTotalChartData] = useState(JSON.parse(JSON.stringify(props.chartData)));

    const [chartData, setChartData] = useState(
        JSON.parse(JSON.stringify(props.chartData))
    );

    useEffect(() => {

        const getPriceData = async () => {
            let priceData = await fetch("/api/price");
            let parsedData = await priceData.json();

            const newChartData = {
                labels: parsedData.map((data: any) => data.Timestamp),
                datasets: [
                    {
                        label: parsedData.map((data: any) => data.Timestamp),
                        data: parsedData.map((data: any) => data.Value),
                        borderColor: "black",
                        borderWidth: 2,
                    },
                ],
            }
            setTotalChartData(newChartData);
        

        };
        if (totalChartData.labels.length == 0) {
            console.log("NOT FOUND")
            getPriceData();

        }
    }, []);

    useEffect(() => {
        let newChartData = JSON.parse(JSON.stringify(totalChartData));

        let count = totalChartData.labels.length;

        let includedDayCount = history;
        if (history == 1) {
            let latestDate = new Date(
                newChartData.labels[newChartData.labels.length - 2]
            );
            let now = new Date();
            if (latestDate.getDay() != now.getDay()) {
                includedDayCount = 2;
            }
        }

        newChartData.datasets[0].data = newChartData.datasets[0].data.slice(
            count - 24 * includedDayCount,
            count
        );
        newChartData.labels = newChartData.labels.slice(
            count - 24 * includedDayCount,
            count
        );
        newChartData.datasets[0].data.forEach((value: any, index: number) => {
            if (tax !== 0 && value > 0) {
                newChartData.datasets[0].data[index] = value + value * tax;
            }
        });
        setChartData(newChartData);
        console.log("updated chart data")
    }, [tax, history, totalChartData]);

    const parseCustomDate = (dateString: string) => {
        const parts = dateString.split(" "); // Split date and time
        const datePart = parts[0].split("."); // Split day and month
        const timePart = parts[1];

        // Parsing day, month, year manually
        const day = parseInt(datePart[0], 10);
        const month = parseInt(datePart[1], 10) - 1; // Months in JavaScript start from 0 (January is 0)
        const currentYear = new Date().getFullYear(); // You might want to set a year here
        const year = currentYear;

        // Parsing hours and minutes from timePart
        const [hours, minutes] = timePart
            .split(":")
            .map((part) => parseInt(part, 10));

        // Create a new Date object with the parsed values
        const parsedDate = new Date(year, month, day, hours, minutes);

        return parsedDate;
    };

    const calculateProgress = (start: Date, end: Date, now: Date) => {
        const totalDuration = end.getTime() / 1000 - start.getTime() / 1000;
        const elapsedTime = now.getTime() / 1000 - start.getTime() / 1000;
        let progress = elapsedTime / totalDuration;
        return progress;
    };

    const plugins = [
        {
            id: "backgroundColor",
            beforeDraw: (
                chart: { ctx?: any; width?: number; height?: number },
                args: any,
                options: any
            ) => {
                const { ctx } = chart;
                ctx.save();
                ctx.globalCompositeOperation = "destination-over";
                ctx.fillStyle = options.color || "#fafafac0";
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            },
        },

        {
            id: "cursorHoverVerticalLine",
            afterDraw: (chart: { tooltip?: any; scales?: any; ctx?: any }) => {
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    const activePoint = chart.tooltip._active[0];
                    const { ctx } = chart;
                    let { x } = activePoint.element;

                    const topY = chart.scales.y.top;
                    const bottomY = chart.scales.y.bottom;

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "black";
                    ctx.stroke();
                    ctx.restore();
                }
            },
        },
    ];

    const calculateAverage = (hInPast:number) => {

        const now = new Date();
        const ticks = totalChartData.labels;
        let latestIndex = ticks.findIndex((timestamp:string) => new Date(timestamp) > now) -1;
        //not found
        if (latestIndex < 0) {
            return 0.0;
        }
        //console.log(latestIndex)
        
        let historyData = totalChartData.datasets[0].data.slice(Math.max(0, latestIndex - hInPast), latestIndex + 1);
        let avg =  historyData.reduce((acc:number, val:number) => acc + val, 0)  / (hInPast + 1);
        return avg / 10.0;
    }

    return (
        <div className="w-full">

            <div className="w-full flex flex-wrap justify-center mb-4">
                <InfoBox tax={tax} description={"Hinta nyt"} price={calculateAverage(0)}/>
                <InfoBox tax={tax} description={"Keskihinta 1pv"} price={calculateAverage(23)}/>
                <InfoBox tax={tax} description={"Keskihinta 1vk"} price={calculateAverage(167)}/>
                <InfoBox tax={tax} description={"Keskihinta 1kk"} price={calculateAverage(719)}/>
            </div>

            <div
                className={`chart-container 
            w-full`}
            >
                <div className="flex mb-2">
                    <button
                        className={`rounded-xl mx-1 py-1 px-2 hover:bg-yellow-400  ${
                            tax == 0 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        onClick={() => setTax(0)}
                    >
                        alv 0%
                    </button>
                    <button
                        className={`rounded-xl mx-1 py-1 px-2 hover:bg-yellow-400 ${
                            tax !== 0 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        onClick={() => setTax(0.24)}
                    >
                        alv 24%
                    </button>

                    <span className="grow"></span>
                    <button
                        className={`rounded-xl mx-1 py-1 px-2 hover:bg-yellow-400 ${
                            history == 1 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        onClick={() => setHistory(1)}
                    >
                        1pv
                    </button>
                    <button
                        className={`rounded-xl mx-1 py-1 px-2 hover:bg-yellow-400 ${
                            history == 7 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        onClick={() => setHistory(7)}
                    >
                        1vk
                    </button>
                    <button
                        className={`rounded-xl mx-1 py-1 px-2 hover:bg-yellow-400 ${
                            history == 30 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        onClick={() => setHistory(30)}
                    >
                        1kk
                    </button>
                    <button
                        className={`rounded-xl mx-1 py-1 px-2 hover:bg-yellow-400 ${
                            history == 90 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        onClick={() => setHistory(90)}
                    >
                        3kk
                    </button>
                </div>

                <Line
                    data={chartData}
                    plugins={plugins}
                    options={{
                        interaction: {
                            mode: "nearest",
                            axis: "x",
                            intersect: false,
                        },
                        animation: false,
                        elements: {
                            point: {
                                radius: 0,
                                backgroundColor: "black",
                            },
                        },
                        plugins: {
                            title: {
                                display: false,
                                text: "Hinta snt/kWh",
                            },
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                displayColors: false,
                                backgroundColor: "#fef08a",
                                titleColor: "black",
                                bodyColor: "black",
                                callbacks: {
                                    label: function (context) {
                                        let value = (
                                            context.parsed.y / 10
                                        ).toFixed(2);

                                        return value + " snt/kWh";
                                    },
                                    title: function (context) {
                                        let title = context[0].label;
                                        let date = new Date(title);
                                        return (
                                            date.getDate() +
                                            "." +
                                            (date.getMonth() + 1) +
                                            " " +
                                            zeroPad(date.getHours()) +
                                            ":" +
                                            zeroPad(date.getMinutes())
                                        );
                                    },
                                },
                            },
                        },
                        scales: {
                            x: {
                                offset: false,
                                ticks: {
                                    callback: function (
                                        value: any,
                                        index,
                                        ticks: any
                                    ) {
                                        let date = new Date(
                                            chartData.labels[index]
                                        );
                                        return (
                                            date.getDate() +
                                            "." +
                                            (date.getMonth() + 1) +
                                            " " +
                                            zeroPad(date.getHours()) +
                                            ":" +
                                            zeroPad(date.getMinutes())
                                        );
                                    },
                                },
                            },
                            y: {
                                //min: Math.min(...props.chartData.datasets[0].data) >= 0 ? 0 : Math.min(...props.chartData.datasets[0].data) * 1.24*1.1,
                                //max: Math.max(...props.chartData.datasets[0].data) * 1.24*1.1,
                                ticks: {
                                    callback: function (
                                        value: any,
                                        index,
                                        ticks
                                    ) {
                                        return parseInt(value) / 10;
                                    },
                                    stepSize: 100,
                                },
                                title: {
                                    display: true,
                                    text: "c/kWh",
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}
export default LineChart;
