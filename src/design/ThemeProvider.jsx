// src/design/ThemeProvider.jsx
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { light, dark } from './tokens';

const ThemeContext = createContext();

/**
 * Wrap the app in this provider. initial can be 'dark' or 'light'.
 */
export function ThemeProvider({ children, initial = 'dark' }) {
  const [mode, setMode] = useState(initial); // 'light' | 'dark'

  const theme = useMemo(() => (mode === 'light' ? light : dark), [mode]);

  const toggleMode = useCallback(() => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  }, []);

  // keep legacy name too
  const toggle = toggleMode;

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggleMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the theme.
 * Returns { theme, mode, toggleMode, toggle, setMode }
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
