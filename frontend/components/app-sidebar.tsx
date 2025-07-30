"use client"

import type * as React from "react"
import { Calendar, Home, Settings, CheckSquare, TrendingUp, Brain, User } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/?tab=dashboard",
      icon: Home,
      tab: "dashboard",
    },
    {
      title: "Tasks",
      url: "/?tab=tasks",
      icon: CheckSquare,
      tab: "tasks",
    },
    {
      title: "Calendar",
      url: "/?tab=calendar",
      icon: Calendar,
      tab: "calendar",
    },
    {
      title: "Progress",
      url: "/?tab=progress",
      icon: TrendingUp,
      tab: "progress",
    },
    {
      title: "Profile",
      url: "/?tab=profile",
      icon: User,
      tab: "profile",
    },
    {
      title: "Settings",
      url: "/?tab=settings",
      icon: Settings,
      tab: "settings",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab") || "dashboard"

  const handleNavigation = (url: string) => {
    router.push(url)
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                <Brain className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">TaskNeuron</span>
                <span className="truncate text-xs text-muted-foreground">Intelligent Tasks</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={currentTab === item.tab}
                    tooltip={item.title}
                    onClick={() => handleNavigation(item.url)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
