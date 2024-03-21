import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

function CategoryChart() {
  const { transactions, balance } = useContext(GlobalContext);
  const [activeIndex, setActiveIndex] = useState(null);

  const data = transactions.map(transaction => ({
    name: transaction.name,
    value: Math.abs(transaction.amount),
    id: transaction.id,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Example colors

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="category-chart-container">
      <div className="category-chart">
      <h1>Spending Breakdown</h1>
      <PieChart width={400} height={400}>
        <Pie
        width={400} height={400}
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
          onMouseEnter={onPieEnter}
          
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { name, value } = payload[0].payload;
              const percentage = ((value / balance) * 100).toFixed(2);
              return (
                <div className="custom-tooltip">
                  <p>{`Category: ${name}`}</p>
                  <p>{`Amount: ${value}`}</p>
                  <p>{`Percentage of Balance: ${percentage}%`}</p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
      </div>
    </div>
  );
}

export default CategoryChart;
