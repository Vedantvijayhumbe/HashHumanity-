"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create theme context
const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    // Check if user has a theme preference in localStorage or prefers dark mode
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme) {
            return savedTheme
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        }
        return "light" // Default theme
    })

    // Update theme in localStorage and apply to document when theme changes
    useEffect(() => {
        if (typeof window !== "undefined") {
        localStorage.setItem("theme", theme)
        document.documentElement.setAttribute("data-theme", theme)

        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
        }
    }, [theme])

    // Toggle theme function
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
    }

    // Custom hook to use the theme context
    export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

