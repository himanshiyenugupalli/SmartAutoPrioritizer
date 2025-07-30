"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
      onClick={toggleTheme}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Moon className="h-4 w-4 transition-all" /> : <Sun className="h-4 w-4 transition-all" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
