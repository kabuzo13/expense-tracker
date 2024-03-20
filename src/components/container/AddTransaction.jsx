import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const { addTransaction } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        // Trim whitespace from text and amount
        const trimmedText = text.trim();
        const trimmedAmount = amount.trim();

        // Check if text or amount is empty after trimming
        if (!trimmedText || !trimmedAmount) {
            setError('Please enter both text and amount.');
            return;
        }

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text: trimmedText,
            amount: +trimmedAmount // Convert amount to number
        };

        addTransaction(newTransaction);

        // Clear input fields and error after submission
        setText('');
        setAmount('');
        setError('');
    };

    return (
        <div className="add-transaction">
            <h3 className="add-transaction-heading">Add Transaction</h3>
            <form onSubmit={onSubmit} className="transaction-form">
                <div className="form-control">
                    <label htmlFor="text" className="form-label">Purchase</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text..."
                        className="form-input"
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount..."
                        className="form-input"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Transaction
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AddTransaction;
