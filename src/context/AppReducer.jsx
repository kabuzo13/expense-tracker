// Reducer function for managing application state
const AppReducer = (state, action) => {
    // Switch statement to handle different action types
    switch (action.type) {
        // Case for deleting a transaction
        case 'DELETE_TRANSACTION':
            // Return a new state object with the specified transaction removed
            return {
                ...state, // Spread operator to include all other state properties
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload) // Filter out the transaction with the specified ID
            };
        // Case for adding a transaction
        case 'ADD_TRANSACTION':
            // Return a new state object with the new transaction added
            return {
                ...state, // Spread operator to include all other state properties
                transactions: [action.payload, ...state.transactions] // Add the new transaction to the beginning of the transactions array
            };
        // Default case for returning the current state if the action type is not recognized
        default:
            return state;
    }
};

export default AppReducer; // Export the reducer function
