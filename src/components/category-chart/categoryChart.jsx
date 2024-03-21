import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import IncomeExpenses from '../container/IncomeExpenses';
import TransactionList from '../container/TransactionList';

// import { Pie } from 'react-chartjs-2';
import { PieChart, Pie, Tooltip } from "recharts";

function CategoryChart() {
  const { transactions } = useContext(GlobalContext);
  const data = transactions.map(transaction => ({
    name: transaction.name,
    value: Math.abs(transaction.amount)
  }));
  return (
    <div className='category-chart-container'>
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