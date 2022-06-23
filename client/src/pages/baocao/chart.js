import React from "react";
import { Bar, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

export default function ChartDoanhso(props) {
  return (
<Line
    data={{
      labels: [...props.arrayDay],
      datasets: props.data
    }}
    options={{
      title: {
        display: true,
        text: "World population per region (in millions)"
      },
      legend: {
        display: true,
        position: "bottom"
      }
    }}
  />

  );
}
