import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState'; 
import { PieChart, Pie, Tooltip, Cell } from 'recharts'; 

const CategoryChart = () => {
    const { transactions } = useContext(GlobalContext); // Accessing transactions from the global context
    const [activeIndex, setActiveIndex] = useState(null); // State for tracking active index on hover

    // Extracting amounts from transactions
    const amounts = transactions.map(transaction => transaction.amount);
    // Calculating total balance
    const total = amounts.reduce((acc, item) => acc + Math.abs(item), 0).toFixed(2);

    // Mapping transactions data to include category name, value, and percentage
    const data = transactions.map(transaction => ({
        categoryName: transaction.text,
        value: Math.abs(transaction.amount),
        percentage: ((Math.abs(transaction.amount) / total) * 100).toFixed(2),
    }));

    // Define color options for the pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Function to handle mouse hover event on the pie chart
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <div className="category-chart-container">
            <div className="category-chart">
                <h1>Transaction Breakdown</h1>
                {/* Render the PieChart component */}
                <PieChart width={400} height={400}>
                    <Pie
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
                        {/* Render cells with different colors */}
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    {/* Render tooltip on hover */}
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const { categoryName, value, percentage } = payload[0].payload;
                                return (
                                    <div className="custom-tooltip">
                                        <p>{`Category: ${categoryName}`}</p>
                                        <p>{`Amount: £${value}`}</p>
                                        <p>{`Percentage of Transaction: ${percentage}%`}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                </PieChart>
            </div>
            {/* Render message beneath the chart */}
            <div className="chart-message">
                <p>Hover over the chart to see breakdown!</p>
            </div>
        </div>
    );
};

export default CategoryChart;
