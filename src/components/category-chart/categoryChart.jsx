import React from 'react'
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend
// } from 'chart.js';

// import { Pie } from 'react-chartjs-2';
import { PieChart, Pie, Tooltip } from "recharts";

// ChartJS.register(
//     ArcElement,
//     Tooltip,
//     Legend
// );

function CategoryChart() {
  const data = [
    {name: 'housing', value: 750},
    {name: 'clothing', value: 100},
    {name: 'bills', value: 150},
    {name: 'holidays', value: 500}
  ];
  return (
    <div>
    <h1>Spending Breakdown</h1>
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  </div>
  )
}

export default CategoryChart