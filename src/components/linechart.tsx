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
import { zeroPad } from "@/common/utils";

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
    const [tax, setTax] = useState(0.24);
    const [history, setHistory] = useState(7);

    const [chartData, setChartData] = useState(
        JSON.parse(JSON.stringify(props.chartData))
    );

    useEffect(() => {
        let newChartData = JSON.parse(JSON.stringify(props.chartData));

        let count = props.chartData.labels.length;

        newChartData.datasets[0].data = newChartData.datasets[0].data.slice(
            count - 24 * history,
            count
        );
        newChartData.labels = newChartData.labels.slice(
            count - 24 * history,
            count
        );
        newChartData.datasets[0].data.forEach((value: any, index: number) => {
            if (tax !== 0 && value > 0) {
                newChartData.datasets[0].data[index] = value + value * tax;
            }
        });
        setChartData(newChartData);
    }, [tax, history]);



    return (
        <div className="w-full">
            <div
                className={`chart-container 
            w-full`}
            >
                <div className="flex">
                    <button
                        className={`rounded-2xl mx-1 py-2 px-4 hover:bg-yellow-200  ${
                            tax == 0 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        onClick={() => setTax(0)}
                    >
                        alv 0%
                    </button>
                    <button
                        className={`rounded-2xl mx-1 py-2 px-4 hover:bg-yellow-200 ${
                            tax !== 0 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        onClick={() => setTax(0.24)}
                    >
                        alv 24%
                    </button>

                    <span className="grow"></span>

                    <button
                        className={`rounded-2xl mx-1 py-2 px-4 hover:bg-yellow-200 ${
                            history == 7 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        onClick={() => setHistory(7)}
                    >
                        1vk
                    </button>
                    <button
                        className={`rounded-2xl mx-1 py-2 px-4 hover:bg-yellow-200 ${
                            history == 30 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        onClick={() => setHistory(30)}
                    >
                        1kk
                    </button>
                    <button
                        className={`rounded-2xl mx-1 py-2 px-4 hover:bg-yellow-200 ${
                            history == 90 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                        onClick={() => setHistory(90)}
                    >
                        3kk
                    </button>
                </div>

                <Line
                    data={chartData}
                    options={{
                        interaction: {
                            mode: 'nearest',
                            axis: 'x',
                            intersect: false
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
                                        ).toFixed(1);

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
