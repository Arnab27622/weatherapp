/**
 * Theme Dropdown Component
 * A simple button that toggles between light and dark themes using next-themes.
 * Features a smooth icon transition between the sun and moon.
 */

"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

/**
 * ThemeDropdown component
 * Provides a UI trigger to switch the application's visual theme.
 */
function ThemeDropdown() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme} className="cursor-pointer">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 text-yellow-500 transition-all dark:scale-0 dark:rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 text-blue-500 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

export default ThemeDropdown
