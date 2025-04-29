import { createContext, useState, useEffect, ReactNode } from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Use system preference as default
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  
  useEffect(() => {
    // Update data-theme attribute when theme changes
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
