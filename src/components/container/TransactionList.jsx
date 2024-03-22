import React, { useContext } from 'react';
import { Transaction } from '../Transaction.jsx';
import { GlobalContext } from '../../context/GlobalState.jsx';
import * as styles from './container.css'

export const TransactionList = () => {
    // Accessing transactions from the global context
    const { transactions } = useContext(GlobalContext);
    
    return (
        <>
            {/* Displaying header for the transaction list */}
            <h3>Transactions List</h3>

            {/* Rendering the list of transactions */}
            <ul className="list">
                {/* Mapping through transactions and rendering Transaction component for each */}
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction} />
                ))}
            </ul>
        </>
    );
};


