"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LandingPage } from "@/components/landing-page"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { TasksPage } from "@/components/tasks-page"
import { CalendarPage } from "@/components/calendar-page"
import { ProgressPage } from "@/components/progress-page"
import { SettingsPage } from "@/components/settings-page"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ProfilePage } from "@/components/profile-page"

export default function Home({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState("dashboard")
  
  useEffect(() => {
    const getSearchParams = async () => {
      const params = await searchParams
      setCurrentTab(params.tab || "dashboard")
    }
    
    getSearchParams();
  }, [searchParams])

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated")
      const rememberToken = localStorage.getItem("rememberToken")

      if (authStatus === "true" || rememberToken) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  // Show landing page for non-authenticated users
  if (!isAuthenticated) {
    return <LandingPage />
  }

  const renderContent = () => {
    switch (currentTab) {
      case "tasks":
        return <TasksPage />
      case "calendar":
        return <CalendarPage />
      case "progress":
        return <ProgressPage />
      case "profile":
        return <ProfilePage />
      case "settings":
        return <SettingsPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">{renderContent()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
