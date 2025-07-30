"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { Bell, Eye, LogOut, FolderSyncIcon as Sync, Timer, CheckCircle } from "lucide-react"
import { SettingsThemeSection } from "./settings-theme-section"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SettingsPage() {
  const router = useRouter()
  const [emailReminders, setEmailReminders] = useState(true)
  const [pushAlerts, setPushAlerts] = useState(false)
  const [taskView, setTaskView] = useState("kanban")
  const [googleCalendarSync, setGoogleCalendarSync] = useState(false)
  const [defaultEstimatedTime, setDefaultEstimatedTime] = useState(60)
  const [timeAlerts, setTimeAlerts] = useState(true)
  const [autoStartTimer, setAutoStartTimer] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)

  // Update all the onChange handlers to set hasChanges to true
  const handleSettingChange = (setter: any) => (value: any) => {
    setter(value)
    setHasChanges(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    localStorage.removeItem("rememberToken")
    localStorage.removeItem("rememberUser")
    router.push("/")
  }

  const handleSaveChanges = () => {
    // Save all settings to localStorage
    const settings = {
      emailReminders,
      pushAlerts,
      taskView,
      googleCalendarSync,
      defaultEstimatedTime,
      timeAlerts,
      autoStartTimer,
    }

    localStorage.setItem("userSettings", JSON.stringify(settings))
    setHasChanges(false)
    setShowSaveSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSaveSuccess(false)
    }, 3000)
  }

  // Load settings on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setEmailReminders(settings.emailReminders ?? true)
      setPushAlerts(settings.pushAlerts ?? false)
      setTaskView(settings.taskView ?? "kanban")
      setGoogleCalendarSync(settings.googleCalendarSync ?? false)
      setDefaultEstimatedTime(settings.defaultEstimatedTime ?? 60)
      setTimeAlerts(settings.timeAlerts ?? true)
      setAutoStartTimer(settings.autoStartTimer ?? false)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      <Separator />

      {/* Success Alert */}
      {showSaveSuccess && (
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Settings saved successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced Theme Preferences */}
      <SettingsThemeSection />

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Configure how you want to be notified about tasks and deadlines.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-reminders">Email Reminders</Label>
              <p className="text-sm text-muted-foreground">Receive email notifications for upcoming deadlines</p>
            </div>
            <Switch
              id="email-reminders"
              checked={emailReminders}
              onCheckedChange={handleSettingChange(setEmailReminders)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-alerts">Push Alerts</Label>
              <p className="text-sm text-muted-foreground">Get browser notifications for urgent tasks</p>
            </div>
            <Switch id="push-alerts" checked={pushAlerts} onCheckedChange={handleSettingChange(setPushAlerts)} />
          </div>
        </CardContent>
      </Card>

      {/* Task View Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Task View Preference
          </CardTitle>
          <CardDescription>Choose how you want to view your tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="task-view">Default View</Label>
            <Select value={taskView} onValueChange={handleSettingChange(setTaskView)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kanban">Kanban View</SelectItem>
                <SelectItem value="list">List View</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sync Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sync className="h-4 w-4" />
            Sync Settings
          </CardTitle>
          <CardDescription>Connect and sync with external services.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="google-calendar">Google Calendar Sync</Label>
              <p className="text-sm text-muted-foreground">Sync your tasks with Google Calendar</p>
            </div>
            <Switch
              id="google-calendar"
              checked={googleCalendarSync}
              onCheckedChange={handleSettingChange(setGoogleCalendarSync)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Time Tracking Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            Time Tracking Preferences
          </CardTitle>
          <CardDescription>Configure how time tracking works for your tasks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="default-time">Default Estimated Time</Label>
              <p className="text-sm text-muted-foreground">Default time estimate for new tasks (minutes)</p>
            </div>
            <Select
              value={defaultEstimatedTime.toString()}
              onValueChange={handleSettingChange((value: string) => setDefaultEstimatedTime(Number(value)))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 min</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="time-alerts">Time Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified when tasks exceed estimated time</p>
            </div>
            <Switch id="time-alerts" checked={timeAlerts} onCheckedChange={handleSettingChange(setTimeAlerts)} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-start">Auto-start Timer</Label>
              <p className="text-sm text-muted-foreground">
                Automatically start timer when marking task as in-progress
              </p>
            </div>
            <Switch id="auto-start" checked={autoStartTimer} onCheckedChange={handleSettingChange(setAutoStartTimer)} />
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>

      {/* Save Changes */}
      <Card>
        <CardContent className="p-4">
          <Button
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            className={`w-full ${hasChanges ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-400"}`}
          >
            {hasChanges ? "Save Changes" : "No Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
