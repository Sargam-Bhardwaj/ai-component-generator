import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the context
const ThemeContext = createContext();

// 2. Create a custom hook to make it easy to use the context
export const useTheme = () => useContext(ThemeContext);

// 3. Create the Provider component that will wrap your entire app
export const ThemeProvider = ({ children }) => {
  // State to hold the current theme, defaulting to 'dark' or what's in localStorage
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // Effect that runs when the theme state changes
  useEffect(() => {
    const root = window.document.documentElement; // This is the <html> tag

    // Remove the old theme class and add the new one
    const oldTheme = theme === 'dark' ? 'light' : 'dark';
    root.classList.remove(oldTheme);
    root.classList.add(theme);

    // Save the user's preference to their browser's local storage
    localStorage.setItem('theme', theme);
  }, [theme]); // Only re-run if the theme changes

  // The function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Provide the theme state and the toggle function to all children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

