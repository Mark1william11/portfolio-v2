import { createContext, useContext } from 'react';
import { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';

// Create the context
const ThemeContext = createContext(null);

// Create the provider component
const ThemeProvider = ({ children }) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    // The value prop passes down the current color scheme and the function to toggle it
    <ThemeContext.Provider value={{ colorScheme: computedColorScheme, toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to easily use our theme context in other components
const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === null) {
        // This error will be thrown if a component tries to use the context
        // without being wrapped in the ThemeProvider. It's a great debugging tool.
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export { useTheme, ThemeProvider };