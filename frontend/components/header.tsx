"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { useSearchParams } from "next/navigation"

const pageTitles = {
  dashboard: "Dashboard",
  tasks: "Tasks",
  calendar: "Calendar",
  progress: "Progress",
  settings: "Settings",
}

export function Header() {
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab") || "dashboard"
  const pageTitle = pageTitles[currentTab as keyof typeof pageTitles] || "Dashboard"

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold">{pageTitle}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
