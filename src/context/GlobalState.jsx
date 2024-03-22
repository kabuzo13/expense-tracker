import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'; // Import the reducer

// Initial state for the context
const initialState = {
    transactions: [], 
    balance: 0
};

// Create the global context
export const GlobalContext = createContext(initialState);

// Provider component for the global context
export const GlobalProvider = ({ children }) => {
    // Use the useReducer hook to manage state with the provided reducer
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Define actions to manipulate the state
    // Action to delete a transaction by ID
    const deleteTransaction = (id) => {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    };

    // Action to add a new transaction
    const addTransaction = (transaction) => {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        });
    };

    // Make the actions available to the child components through the context value
    const contextValue = {
        transactions: state.transactions,
        deleteTransaction,
        addTransaction
    };

    // Render the provider with the context value and its children
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};
