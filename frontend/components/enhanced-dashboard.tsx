"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FocusModeModal } from "./focus-mode-modal"
import {
  Clock,
  Play,
  CheckCircle,
  Plus,
  Calendar,
  Target,
  Zap,
  TrendingUp,
  AlertCircle,
  Timer,
  Focus,
  ChevronRight,
} from "lucide-react"

// Mock data for today's tasks
const mockTodayTasks = [
  {
    id: 1,
    title: "Complete project proposal",
    priority: "high",
    estimatedTime: 120,
    status: "completed",
    actualTime: 95,
    completedAt: "10:30 AM",
  },
  {
    id: 2,
    title: "Review client feedback",
    priority: "high",
    estimatedTime: 60,
    status: "in-progress",
    timeSpent: 35,
    startedAt: "2:00 PM",
  },
  {
    id: 3,
    title: "Team meeting preparation",
    priority: "medium",
    estimatedTime: 45,
    status: "pending",
    scheduledTime: "3:30 PM",
  },
  {
    id: 4,
    title: "Update portfolio website",
    priority: "medium",
    estimatedTime: 90,
    status: "pending",
    scheduledTime: "4:30 PM",
  },
  {
    id: 5,
    title: "Plan next week's tasks",
    priority: "low",
    estimatedTime: 30,
    status: "pending",
    scheduledTime: "5:30 PM",
  },
]

// Mock calendar events
const mockCalendarEvents = [
  { id: 1, title: "Daily Standup", time: "09:00", duration: 30, type: "meeting" },
  { id: 2, title: "Client Call", time: "11:00", duration: 60, type: "call" },
  { id: 3, title: "Lunch Break", time: "12:30", duration: 60, type: "break" },
  { id: 4, title: "Team Meeting", time: "15:30", duration: 90, type: "meeting" },
  { id: 5, title: "Focus Time", time: "17:00", duration: 120, type: "focus" },
]

// Mock insights
const mockInsights = [
  "You complete most tasks 15% faster in the morning. Try scheduling complex work before 11 AM.",
  "Yesterday you saved 28 minutes by staying focused. Keep it up!",
  "Your high-priority tasks have 92% completion rate this week.",
  "Consider breaking down tasks over 2 hours for better time management.",
]

export function EnhancedDashboard() {
  const [quickTaskTitle, setQuickTaskTitle] = useState("")
  const [quickTaskPriority, setQuickTaskPriority] = useState("medium")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showFocusMode, setShowFocusMode] = useState(false)

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Calculate today's progress
  const completedTasks = mockTodayTasks.filter((task) => task.status === "completed")
  const totalTasks = mockTodayTasks.length
  const completionPercentage = (completedTasks.length / totalTasks) * 100

  const totalEstimated = mockTodayTasks.reduce((sum, task) => sum + task.estimatedTime, 0)
  const totalActual = completedTasks.reduce((sum, task) => sum + (task.actualTime || 0), 0)
  const inProgressTime = mockTodayTasks
    .filter((task) => task.status === "in-progress")
    .reduce((sum, task) => sum + (task.timeSpent || 0), 0)
  const totalSpent = totalActual + inProgressTime

  const timeVariance = totalActual - completedTasks.reduce((sum, task) => sum + task.estimatedTime, 0)

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const handleQuickAdd = () => {
    if (quickTaskTitle.trim()) {
      console.log("Adding quick task:", { title: quickTaskTitle, priority: quickTaskPriority })
      setQuickTaskTitle("")
      setQuickTaskPriority("medium")
    }
  }

  const handleStartTimer = (taskId: number) => {
    console.log("Starting timer for task:", taskId)
  }

  const handleMarkDone = (taskId: number) => {
    console.log("Marking task as done:", taskId)
  }

  const handleStartFocus = () => {
    setShowFocusMode(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 dark:text-green-400"
      case "in-progress":
        return "text-blue-600 dark:text-blue-400"
      case "pending":
        return "text-gray-600 dark:text-gray-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const currentHour = currentTime.getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 17 ? "Good afternoon" : "Good evening"

  return (
    <>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{greeting}! Ready to tackle your day?</h2>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Button
            onClick={handleStartFocus}
            className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
          >
            <Focus className="h-4 w-4" />
            Start Focus Session
          </Button>
        </div>

        {/* Quick Add Task Widget */}
        <Card className="border-dashed border-2 border-teal-200 dark:border-teal-800 bg-gradient-to-r from-teal-50/50 to-teal-100/50 dark:from-teal-950/20 dark:to-teal-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Quick add a task for today..."
                value={quickTaskTitle}
                onChange={(e) => setQuickTaskTitle(e.target.value)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-teal-500"
                onKeyPress={(e) => e.key === "Enter" && handleQuickAdd()}
              />
              <Select value={quickTaskPriority} onValueChange={setQuickTaskPriority}>
                <SelectTrigger className="w-[120px] border-0 bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleQuickAdd} size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Today's Progress Summary */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Today's Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">
                  {completedTasks.length}/{totalTasks}
                </div>
                <p className="text-sm text-muted-foreground">tasks completed</p>
              </div>

              <Progress value={completionPercentage} className="h-3" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Time spent:</span>
                  <span className="font-medium">{formatTime(totalSpent)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated:</span>
                  <span className="font-medium">{formatTime(totalEstimated)}</span>
                </div>
                {timeVariance !== 0 && (
                  <div className="flex justify-between">
                    <span>Variance:</span>
                    <span
                      className={`font-medium ${
                        timeVariance < 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {timeVariance < 0 ? "−" : "+"}
                      {formatTime(Math.abs(timeVariance))}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm text-center text-muted-foreground">
                  You are <span className="font-semibold text-teal-600">{Math.round(completionPercentage)}%</span>{" "}
                  through today's workload
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Today's Tasks Overview */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Today's Tasks
                </div>
                <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                  View All
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTodayTasks.slice(0, 4).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-12 rounded-full ${getPriorityColor(task.priority)}`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(task.estimatedTime)}
                          </span>
                          {task.scheduledTime && (
                            <span className="text-xs text-muted-foreground">@ {task.scheduledTime}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {task.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStartTimer(task.id)}
                          className="h-8 px-2"
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                      {task.status === "in-progress" && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            {formatTime(task.timeSpent || 0)}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => handleMarkDone(task.id)}
                            className="h-8 px-2 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {task.status === "completed" && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs text-muted-foreground">{task.completedAt}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mini Calendar Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Today's Schedule
                </div>
                <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                  Full Calendar
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockCalendarEvents.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-muted-foreground w-12">{event.time}</div>
                      <div>
                        <div className="text-sm font-medium">{event.title}</div>
                        <div className="text-xs text-muted-foreground">{event.duration} minutes</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-3 text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Time Slot
              </Button>
            </CardContent>
          </Card>

          {/* Smart Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Smart Insights
              </CardTitle>
              <CardDescription>AI-powered productivity tips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInsights.slice(0, 2).map((insight, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900 border border-teal-200 dark:border-teal-800"
                  >
                    <p className="text-sm text-teal-800 dark:text-teal-200">{insight}</p>
                  </div>
                ))}

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Productivity Streak</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">7 days</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Focus Mode Shortcut */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200">Focus Mode</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-300">Start a 25-minute focused work session</p>
                </div>
                <Button onClick={handleStartFocus} className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Timer className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Task Alert */}
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200">Up Next</h3>
                  <p className="text-sm text-orange-600 dark:text-orange-300">Team meeting preparation in 30 mins</p>
                </div>
                <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>

          {/* Motivational Quote */}
          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900 border-teal-200 dark:border-teal-800">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-teal-800 dark:text-teal-200 mb-1">
                  "Success is the sum of small efforts repeated day in and day out."
                </p>
                <p className="text-xs text-teal-600 dark:text-teal-400">- Robert Collier</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FocusModeModal open={showFocusMode} onOpenChange={setShowFocusMode} />
    </>
  )
}
