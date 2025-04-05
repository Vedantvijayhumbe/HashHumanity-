"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import "./ThemeToggle.css"

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        >
        {theme === "light" ? <Moon size={20} className="theme-icon" /> : <Sun size={20} className="theme-icon" />}
        </button>
    )
}

export default ThemeToggle

