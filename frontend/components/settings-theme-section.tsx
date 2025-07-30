"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { Palette, Sun, Moon } from "lucide-react"

export function SettingsThemeSection() {
  const { theme, setTheme } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Theme Preference
        </CardTitle>
        <CardDescription>Choose how TaskNeuron looks to you.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="theme-select">Appearance</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  Light Mode
                </div>
              </SelectItem>
              <SelectItem value="dark">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-blue-400" />
                  Dark Mode
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Theme Preview */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
              theme === "light" ? "border-teal-500 bg-teal-50" : "border-gray-200 bg-white"
            }`}
            onClick={() => setTheme("light")}
          >
            <div className="w-full h-8 bg-gray-100 rounded mb-2"></div>
            <div className="w-3/4 h-2 bg-gray-300 rounded mb-1"></div>
            <div className="w-1/2 h-2 bg-gray-300 rounded"></div>
            <p className="text-xs text-center mt-2 font-medium">Light</p>
          </div>

          <div
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
              theme === "dark" ? "border-teal-500 bg-teal-50" : "border-gray-200 bg-gray-900"
            }`}
            onClick={() => setTheme("dark")}
          >
            <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
            <div className="w-3/4 h-2 bg-gray-600 rounded mb-1"></div>
            <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
            <p className="text-xs text-center mt-2 font-medium text-white">Dark</p>
          </div>
        </div>

        {/* Theme Description */}
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            {theme === "light" && "🌞 Light mode with comfortable colors and good contrast."}
            {theme === "dark" && "🌙 Dark mode that's easy on your eyes during long work sessions."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
