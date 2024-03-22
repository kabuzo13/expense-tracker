import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const Balance = () => {
    // Accessing transactions from the global context
    const { transactions } = useContext(GlobalContext);
    
    // Extracting amounts from transactions
    const amounts = transactions.map(transaction => transaction.amount);

    // Calculating total balance
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

    // Rendering balance component
    return (
        <>
            <div className="balance-container">
            <h2 className="balance-heading">Current Balance</h2>
            <div className="balance-amount">
                <span className="currency-symbol">£</span>
                <span className="balance-value">{total}</span>
            </div>
        </div>
        </>
    );
};


