"use client";
import { createContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme } from "../styles/themes/light";
import { darkTheme } from "../styles/themes/dark";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const initialContext: ThemeContextType = {
  isDarkMode: true,
  toggleTheme: () => undefined,
};

export const ThemeContext = createContext<ThemeContextType>(initialContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
  }

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
