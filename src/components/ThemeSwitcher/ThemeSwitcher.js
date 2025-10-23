import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import iconMoon from "../Icons/IconMoon";
import iconSun from "../Icons/IconSun";
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme} className="theme-switcher-btn">
            {theme === 'light' ? (
                iconMoon
            ) : (
                iconSun
            )}
        </button>
    );
};

export default ThemeSwitcher;