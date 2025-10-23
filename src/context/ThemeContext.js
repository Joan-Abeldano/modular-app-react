import React, { createContext, useState } from 'react';

// 1. Creamos el Contexto
const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
});

// 2. Creamos el Componente "Proveedor"
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // 'light' o 'dark'
    
    // Función para cambiar el tema
    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };
    
    // 3. Pasamos el estado actual y la función para cambiarlo
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;