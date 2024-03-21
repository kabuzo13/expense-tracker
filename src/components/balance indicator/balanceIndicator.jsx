import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import './balance.css';

const balance = () => {
  useEffect(() => {
    const data = {
      datasets: [{
        data: [20, 10],
        backgroundColor: ['green', 'red'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
        circumference: 180,
        rotation: 270,
        cutout: '80%',
        needleValue: 20, //set to balance - expenses value
      }]
    };

    const gaugeNeedle = {
      id: 'gaugeNeedle',
      afterDatasetsDraw(chart, args, plugins) {
        const {ctx, data} = chart;
    
        ctx.save();
        const xCenter = chart.getDatasetMeta(0).data[0].x;
        const yCenter = chart.getDatasetMeta(0).data[0].y;
        const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
        const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
        const widthSlice = (outerRadius - innerRadius)/2;
        const radius = 15;
        const angle = Math.PI / 180;

        const needleValue = data.datasets[0].needleValue;
        const dataTotal = data.datasets[0].data.reduce((a, b) => 
        a + b, 0);

        const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

        ctx.translate(xCenter, yCenter);
        ctx.rotate(Math.PI * (circumference + 1.5));

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'grey';
        ctx.moveTo(0 - 15, 0);
        ctx.lineTo(0, 0 - innerRadius - widthSlice);
        ctx.lineTo(0 + 15, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, angle * 360, false)
        ctx.fill();
        ctx.restore();
      }
    };

    const gaugeFlowMeter = {
      id: 'gaugeFlowMeter',
      afterDatasetsDraw(chart, args, plugins) {
        const { ctx, data } = chart;
    
                ctx.save();
                const needleValue = data.datasets[0].needleValue;
                const xCenter = chart.getDatasetMeta(0).data[0].x;
                const yCenter = chart.getDatasetMeta(0).data[0].y;
    
                const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;
                const percentageValue = circumference * 100;
    
                console.log(circumference);
    
                ctx.font = 'bold 30px sans-serif';
                ctx.fillStyle = 'grey';
                ctx.textAlign = 'center';
                ctx.fillText(`${percentageValue.toFixed(1)}%`, xCenter, yCenter + 45);
      }
    };

    const gaugeLabels = {
      id: 'gaugeLabels',
      afterDatasetsDraw(chart, args, plugins) {
        const { ctx, data, chartArea: {left, right} } = chart;
        const xCenter = chart.getDatasetMeta(0).data[0].x;
        const yCenter = chart.getDatasetMeta(0).data[0].y;
        const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
        const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
        const widthSlice = (outerRadius - innerRadius)/2;
        
        ctx.translate(xCenter, yCenter)
        ctx.font = 'bold 15px sans-serif';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText('Success', 0 - innerRadius - widthSlice, 0 + 20);
        ctx.fillText('Danger', 0 + innerRadius + widthSlice, 0 + 20);

        ctx.restore();
      }
    };

    const config = {
      type: 'doughnut',
      data,
      options: {
        aspectRatio: 1.5,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      plugins: [gaugeNeedle, gaugeFlowMeter, gaugeLabels]
    };

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, config);

    // Clean up function
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <div className="chartCard">
        <div className="chartBox">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default balance;
