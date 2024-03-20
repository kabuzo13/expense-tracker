import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({ transaction }) => {

    const { deleteTransaction } = useContext(GlobalContext); // Accessing deleteTransaction function from the global context

    const sign = transaction.amount < 0 ? '-' : '+'; // Determining the sign based on the transaction amount

    // Rendering transaction item with text, amount, and delete button
    return (
        <li className={transaction.amount < 0 ? "minus" : "plus"}>
            {transaction.text} <span>{sign}£{Math.abs(transaction.amount)}</span>
            <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">-</button>
        </li>
    );
};


