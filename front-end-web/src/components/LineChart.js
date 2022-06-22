import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


function LineChart({ chartData }) {
  let options = { 
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 16
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: "white",
          font: {
            size: 10,
          },
        },
        grid: {
          color: "#000000"
        },
      },
      x: {
        ticks: {
          color: "white",
          font: {
            size: 12
          },
        },
        grid: {
          color: "#000000"
        },
      }
    }
  }
  return <Line data={chartData} options={options}/>;
}

export default LineChart;