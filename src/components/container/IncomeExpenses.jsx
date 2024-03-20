
import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import * as styles from './container.css'


export const IncomeExpenses = () => {
    // Accessing transactions from the global context
    const { transactions } = useContext(GlobalContext);

    // Extracting amounts from transactions
    const amounts = transactions.map(transaction => transaction.amount);
    
    // Calculating total income
    const income = amounts
        .filter(item => item > 0) // Filtering positive amounts for income
        .reduce((acc, item) => acc + item, 0) // Summing up income amounts
        .toFixed(2); // Formatting income as a fixed decimal number
    
    // Calculating total expenses
    const expense = (
        amounts
            .filter(item => item < 0) // Filtering negative amounts for expenses
            .reduce((acc, item) => acc + item, 0) * -1 // Summing up expense amounts and converting to positive
    ).toFixed(2); // Formatting expenses as a fixed decimal number

    // Rendering income and expenses components
    return (
        <div className="income-expenses">
            <div className="income"> {/* Apply 'income' class */}
                <h4>Income</h4>
                <p className='money-added'>£{income}</p>
            </div>
            <div className="expenses"> {/* Apply 'expenses' class */}
                <h4>Expenses</h4>
                <p className='money-subtract'>£{expense}</p>
            </div>
        </div>
    );
};

export default IncomeExpenses; // Exporting the IncomeExpenses component
