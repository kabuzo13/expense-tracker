import React, { useState } from 'react'
import * as styles from '../container.css'

export const modeswitch = () => {
    // State variable to track the current mode (true for dark mode, false for light mode)
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to toggle between light and dark modes
    const toggleMode = () => {
        setIsDarkMode(prevMode => !prevMode); // Toggle the mode
    };

    // Apply styles based on the selected mode
    const appStyles = {
        backgroundColor: isDarkMode ? '#333' : '#fff', // Background color
        color: isDarkMode ? '#fff' : '#333' // Text color
        // Add more styles as needed for each mode
    };

    return (
        <div className="app" style={appStyles}>
            <h1>My Application</h1>
            {/* Toggle mode button */}
            <button className="toggle-button" onClick={toggleMode}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <p>This is a paragraph in my application.</p>
        </div>
    );
};

export default modeswitch;
