"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Clock,
  Target,
  TrendingUp,
  CalendarIcon,
  Zap,
  Play,
  Pause,
  Timer,
  CheckCircle,
  AlertTriangle,
  TrendingDown,
  BarChart3,
  CalendarDays,
} from "lucide-react"
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns"

// Enhanced mock data with dates
const mockTasksData = [
  // Today's tasks
  {
    id: 1,
    title: "Complete project proposal",
    priority: "high",
    estimatedTime: 120,
    actualTime: 95,
    status: "completed",
    completedAt: new Date().toISOString(),
    timeVariance: -25,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 2,
    title: "Review client feedback",
    priority: "high",
    estimatedTime: 60,
    actualTime: 75,
    status: "completed",
    completedAt: new Date().toISOString(),
    timeVariance: 15,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 3,
    title: "Team meeting preparation",
    priority: "medium",
    estimatedTime: 45,
    actualTime: 0,
    status: "in-progress",
    timeSpent: 28,
    startedAt: new Date().toISOString(),
    date: new Date().toISOString().split("T")[0],
  },
  // Yesterday's tasks
  {
    id: 4,
    title: "Update portfolio website",
    priority: "medium",
    estimatedTime: 90,
    actualTime: 85,
    status: "completed",
    completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    timeVariance: -5,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  {
    id: 5,
    title: "Plan next week's tasks",
    priority: "low",
    estimatedTime: 30,
    actualTime: 35,
    status: "completed",
    completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    timeVariance: 5,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  // Week ago tasks
  {
    id: 6,
    title: "Database optimization",
    priority: "high",
    estimatedTime: 180,
    actualTime: 165,
    status: "completed",
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    timeVariance: -15,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  {
    id: 7,
    title: "Client presentation",
    priority: "high",
    estimatedTime: 120,
    actualTime: 140,
    status: "completed",
    completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    timeVariance: 20,
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  // Month ago tasks
  {
    id: 8,
    title: "System architecture review",
    priority: "medium",
    estimatedTime: 240,
    actualTime: 220,
    status: "completed",
    completedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    timeVariance: -20,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
]

interface TimerState {
  taskId: number | null
  isRunning: boolean
  startTime: number | null
  elapsedTime: number
}

export function EnhancedProgressPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewPeriod, setViewPeriod] = useState<"day" | "week" | "month">("day")
  const [tasks, setTasks] = useState(mockTasksData)
  const [timer, setTimer] = useState<TimerState>({
    taskId: null,
    isRunning: false,
    startTime: null,
    elapsedTime: 0,
  })

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (timer.isRunning && timer.startTime) {
      interval = setInterval(() => {
        setTimer((prev) => ({
          ...prev,
          elapsedTime: Date.now() - (prev.startTime || 0),
        }))
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timer.isRunning, timer.startTime])

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const formatTimerDisplay = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const getTimeVarianceColor = (variance: number) => {
    if (variance < 0) return "text-green-600 dark:text-green-400"
    if (variance > 0) return "text-red-600 dark:text-red-400"
    return "text-muted-foreground"
  }

  const getTimeVarianceIcon = (variance: number) => {
    if (variance < 0) return <TrendingDown className="h-3 w-3" />
    if (variance > 0) return <TrendingUp className="h-3 w-3" />
    return null
  }

  // Filter tasks based on selected period
  const getFilteredTasks = () => {
    const selectedDateStr = selectedDate.toISOString().split("T")[0]

    switch (viewPeriod) {
      case "day":
        return tasks.filter((task) => task.date === selectedDateStr)

      case "week":
        const weekStart = startOfWeek(selectedDate)
        const weekEnd = endOfWeek(selectedDate)
        return tasks.filter((task) => {
          const taskDate = parseISO(task.date)
          return isWithinInterval(taskDate, { start: weekStart, end: weekEnd })
        })

      case "month":
        const monthStart = startOfMonth(selectedDate)
        const monthEnd = endOfMonth(selectedDate)
        return tasks.filter((task) => {
          const taskDate = parseISO(task.date)
          return isWithinInterval(taskDate, { start: monthStart, end: monthEnd })
        })

      default:
        return tasks
    }
  }

  const filteredTasks = getFilteredTasks()
  const completedTasks = filteredTasks.filter((t) => t.status === "completed")
  const totalTasks = filteredTasks.length
  const totalEstimated = filteredTasks.reduce((sum, task) => sum + task.estimatedTime, 0)
  const totalActual = completedTasks.reduce((sum, task) => sum + (task.actualTime || 0), 0)
  const totalSaved = completedTasks.reduce((sum, task) => sum + (task.timeVariance || 0), 0)
  const completionRate = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0

  const getPeriodLabel = () => {
    switch (viewPeriod) {
      case "day":
        return format(selectedDate, "MMMM d, yyyy")
      case "week":
        return `Week of ${format(startOfWeek(selectedDate), "MMM d")} - ${format(endOfWeek(selectedDate), "MMM d, yyyy")}`
      case "month":
        return format(selectedDate, "MMMM yyyy")
      default:
        return ""
    }
  }

  const startTimer = (taskId: number) => {
    setTimer({
      taskId,
      isRunning: true,
      startTime: Date.now(),
      elapsedTime: 0,
    })

    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: "in-progress" as const } : task)))
  }

  const pauseTimer = () => {
    if (timer.taskId) {
      const currentTask = tasks.find((t) => t.id === timer.taskId)
      if (currentTask) {
        const totalTimeSpent = (currentTask.timeSpent || 0) + Math.floor(timer.elapsedTime / 1000 / 60)

        setTasks((prev) =>
          prev.map((task) => (task.id === timer.taskId ? { ...task, timeSpent: totalTimeSpent } : task)),
        )
      }
    }

    setTimer((prev) => ({
      ...prev,
      isRunning: false,
      startTime: null,
      elapsedTime: 0,
    }))
  }

  const completeTask = (taskId: number) => {
    const currentTask = tasks.find((t) => t.id === taskId)
    if (currentTask) {
      const finalTimeSpent =
        timer.taskId === taskId
          ? (currentTask.timeSpent || 0) + Math.floor(timer.elapsedTime / 1000 / 60)
          : currentTask.actualTime || currentTask.timeSpent || 0

      const timeVariance = finalTimeSpent - currentTask.estimatedTime

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: "completed" as const,
                actualTime: finalTimeSpent,
                timeVariance,
                completedAt: new Date().toISOString(),
              }
            : task,
        ),
      )

      if (timer.taskId === taskId) {
        setTimer({
          taskId: null,
          isRunning: false,
          startTime: null,
          elapsedTime: 0,
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Progress Analytics</h3>
          <p className="text-sm text-muted-foreground">Track your productivity and time management insights</p>
        </div>

        {/* Date and Period Selection */}
        <div className="flex items-center gap-4">
          <Select value={viewPeriod} onValueChange={(value: "day" | "week" | "month") => setViewPeriod(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Daily
                </div>
              </SelectItem>
              <SelectItem value="week">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Weekly
                </div>
              </SelectItem>
              <SelectItem value="month">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Monthly
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {getPeriodLabel()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Enhanced Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedTasks.length}/{totalTasks}
            </div>
            <p className="text-xs text-muted-foreground">{completionRate.toFixed(0)}% completion rate</p>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(totalActual)}</div>
            <p className="text-xs text-muted-foreground">of {formatTime(totalEstimated)} estimated</p>
            <Progress value={totalEstimated > 0 ? (totalActual / totalEstimated) * 100 : 0} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Variance</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getTimeVarianceColor(totalSaved)}`}>
              {totalSaved < 0 ? "−" : "+"}
              {formatTime(Math.abs(totalSaved))}
            </div>
            <p className="text-xs text-muted-foreground">{totalSaved < 0 ? "time saved" : "time overrun"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalActual > 0 ? Math.round((1 - Math.abs(totalSaved) / totalActual) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">time accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Task Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {viewPeriod === "day" ? "Daily" : viewPeriod === "week" ? "Weekly" : "Monthly"} Task Breakdown
          </CardTitle>
          <CardDescription>Detailed view of tasks for {getPeriodLabel()}</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tasks found for the selected period.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => {
                const isActiveTimer = timer.taskId === task.id && timer.isRunning
                const currentTimeSpent =
                  task.status === "in-progress"
                    ? (task.timeSpent || 0) + (isActiveTimer ? Math.floor(timer.elapsedTime / 1000 / 60) : 0)
                    : task.actualTime || task.timeSpent || 0

                const remainingTime = task.estimatedTime - currentTimeSpent
                const isOvertime = remainingTime < 0

                return (
                  <div key={task.id} className="border rounded-lg p-4 space-y-3">
                    {/* Task Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={
                                task.priority === "high"
                                  ? "destructive"
                                  : task.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {task.priority}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                task.status === "completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : task.status === "in-progress"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                              }
                            >
                              {task.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {format(parseISO(task.date), "MMM d")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Timer Controls */}
                      <div className="flex items-center gap-2">
                        {task.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startTimer(task.id)}
                            className="flex items-center gap-1"
                          >
                            <Play className="h-3 w-3" />
                            Start
                          </Button>
                        )}

                        {task.status === "in-progress" && (
                          <>
                            {isActiveTimer ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={pauseTimer}
                                className="flex items-center gap-1 bg-transparent"
                              >
                                <Pause className="h-3 w-3" />
                                Pause
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startTimer(task.id)}
                                className="flex items-center gap-1"
                              >
                                <Play className="h-3 w-3" />
                                Resume
                              </Button>
                            )}

                            <Button
                              size="sm"
                              onClick={() => completeTask(task.id)}
                              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Complete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Time Information */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Estimated</p>
                        <p className="font-medium">{formatTime(task.estimatedTime)}</p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">{task.status === "completed" ? "Actual" : "Spent"}</p>
                        <p className="font-medium">
                          {formatTime(currentTimeSpent)}
                          {isActiveTimer && (
                            <span className="ml-2 text-blue-600 dark:text-blue-400">
                              (+{formatTimerDisplay(timer.elapsedTime)})
                            </span>
                          )}
                        </p>
                      </div>

                      {task.status === "completed" && task.timeVariance !== undefined && (
                        <div>
                          <p className="text-muted-foreground">Variance</p>
                          <p
                            className={`font-medium flex items-center gap-1 ${getTimeVarianceColor(task.timeVariance)}`}
                          >
                            {getTimeVarianceIcon(task.timeVariance)}
                            {task.timeVariance < 0 ? "−" : "+"}
                            {formatTime(Math.abs(task.timeVariance))}
                          </p>
                        </div>
                      )}

                      {task.status === "in-progress" && (
                        <div>
                          <p className="text-muted-foreground">Remaining</p>
                          <p
                            className={`font-medium flex items-center gap-1 ${
                              isOvertime ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                            }`}
                          >
                            {isOvertime && <AlertTriangle className="h-3 w-3" />}
                            {isOvertime ? "+" : ""}
                            {formatTime(Math.abs(remainingTime))}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar for In-Progress Tasks */}
                    {task.status === "in-progress" && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{Math.round((currentTimeSpent / task.estimatedTime) * 100)}%</span>
                        </div>
                        <Progress
                          value={(currentTimeSpent / task.estimatedTime) * 100}
                          className={`h-2 ${isOvertime ? "[&>div]:bg-red-500" : "[&>div]:bg-green-500"}`}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Smart Insights */}
      <Card className="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900 border-teal-200 dark:border-teal-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Smart Insights for {getPeriodLabel()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {totalSaved < 0 && (
              <p className="text-teal-800 dark:text-teal-200">
                🎉 Great job! You completed tasks {formatTime(Math.abs(totalSaved))} faster than estimated.
              </p>
            )}
            {totalSaved > 0 && (
              <p className="text-teal-800 dark:text-teal-200">
                ⏰ Tasks took {formatTime(totalSaved)} longer than estimated. Consider breaking down complex tasks.
              </p>
            )}
            {completedTasks.length >= 2 && (
              <p className="text-teal-800 dark:text-teal-200">
                📈 Your completion rate is {completionRate.toFixed(0)}% for this period. Keep up the great work!
              </p>
            )}
            {completedTasks.length === 0 && totalTasks > 0 && (
              <p className="text-teal-800 dark:text-teal-200">
                🚀 You have {totalTasks} task{totalTasks > 1 ? "s" : ""} planned. Time to get started!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
