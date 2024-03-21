import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import './balance.css';

const balance = () => {
  const { transactions } = useContext(GlobalContext);
    const amounts = transactions.map(transaction => transaction.amount);
    console.log("Transaction Amounts:", amounts);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0) 
        .toFixed(2);
        const expense = (
          amounts
              .filter(item => item < 0) 
              .reduce((acc, item) => acc + item, 0) * -1 
      ).toFixed(2);

      console.log("Income:", income);
      console.log("Expense:", expense);

  useEffect(() => {
    const data = {
      datasets: [{
        data: [Math.abs(income - expense), Math.abs(expense)],
        backgroundColor: ['green', 'red'],
        borderWidth: 1,
        circumference: 180,
        rotation: 270,
        cutout: '80%',
        needleValue: Math.abs(income - expense), //set to balance - expenses value
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
                const totalValue = data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentageValue = ((needleValue / totalValue) * 100);

                console.log(percentageValue);
    
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
  }, [transactions, income, expense]);

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
