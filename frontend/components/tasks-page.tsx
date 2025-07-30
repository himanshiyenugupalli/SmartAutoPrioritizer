"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { TaskCreationModal } from "./task-creation-modal"
import { CheckCircle, Edit, Filter, Search, SortAsc, Plus, Play, Pause, Timer, Clock, GripVertical } from "lucide-react"
import { TaskEditModal } from "./task-edit-modal"

const mockTasks = [
  {
    id: 1,
    rank: 1,
    title: "Complete project proposal",
    description: "Finalize the Q1 project proposal with budget estimates",
    priority: "high",
    deadline: "2024-01-15T10:00",
    type: "work",
    estimatedTime: 120,
    actualTime: 95,
    status: "completed",
    completedAt: "2024-01-14T09:30",
    timeSpent: 0,
  },
  {
    id: 2,
    rank: 2,
    title: "Review client feedback",
    description: "Go through client comments on the latest design iteration",
    priority: "high",
    deadline: "2024-01-16T14:00",
    type: "review",
    estimatedTime: 60,
    actualTime: 0,
    status: "in-progress",
    timeSpent: 35,
    startedAt: "2024-01-15T13:00",
  },
  {
    id: 3,
    rank: 3,
    title: "Update portfolio website",
    description: "Add recent projects and update skills section",
    priority: "medium",
    deadline: "2024-01-20T17:00",
    type: "personal",
    estimatedTime: 90,
    actualTime: 0,
    status: "pending",
    timeSpent: 0,
  },
  {
    id: 4,
    rank: 4,
    title: "Plan team meeting",
    description: "Prepare agenda and send calendar invites",
    priority: "medium",
    deadline: "2024-01-18T09:00",
    type: "meeting",
    estimatedTime: 30,
    actualTime: 25,
    status: "completed",
    completedAt: "2024-01-17T16:00",
    timeSpent: 0,
  },
  {
    id: 5,
    rank: 5,
    title: "Organize desk workspace",
    description: "Clean and reorganize home office setup",
    priority: "low",
    deadline: "2024-01-25T12:00",
    type: "personal",
    estimatedTime: 45,
    actualTime: 0,
    status: "pending",
    timeSpent: 0,
  },
]

const priorityColors = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
}

const typeColors = {
  work: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  review: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  personal: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  meeting: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
}

const statusIcons = {
  pending: <Clock className="h-4 w-4 text-gray-500" />,
  "in-progress": <Timer className="h-4 w-4 text-blue-500" />,
  completed: <CheckCircle className="h-4 w-4 text-green-500" />,
}

export function TasksPage() {
  const [tasks, setTasks] = useState(mockTasks)
  const [sortBy, setSortBy] = useState("rank")
  const [filterBy, setFilterBy] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeTimers, setActiveTimers] = useState<Record<number, boolean>>({})

  const [editingTask, setEditingTask] = useState<any>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleCreateTask = (newTask: any) => {
    const taskWithId = {
      ...newTask,
      id: Date.now(),
      rank: tasks.length + 1,
      actualTime: 0,
      status: "pending" as const,
      timeSpent: 0,
    }
    setTasks((prev) => [...prev, taskWithId])
  }

  const handleMarkDone = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "completed" as const,
              actualTime: task.timeSpent || task.estimatedTime,
              completedAt: new Date().toISOString(),
            }
          : task,
      ),
    )
    setActiveTimers((prev) => ({ ...prev, [taskId]: false }))
  }

  const handleStartTimer = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "in-progress" as const, startedAt: new Date().toISOString() } : task,
      ),
    )
    setActiveTimers((prev) => ({ ...prev, [taskId]: true }))
  }

  const handlePauseTimer = (taskId: number) => {
    setActiveTimers((prev) => ({ ...prev, [taskId]: false }))
  }

  const handleEditTask = (task: any) => {
    setEditingTask(task)
    setShowEditModal(true)
  }

  const handleUpdateTask = (updatedTask: any) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setShowEditModal(false)
    setEditingTask(null)
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      if (filterBy === "all") return true
      if (filterBy === "completed") return task.status === "completed"
      if (filterBy === "pending") return task.status === "pending"
      if (filterBy === "in-progress") return task.status === "in-progress"
      return task.priority === filterBy || task.type === filterBy
    })
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "deadline":
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return (
            priorityOrder[b.priority as keyof typeof priorityOrder] -
            priorityOrder[a.priority as keyof typeof priorityOrder]
          )
        case "estimatedTime":
          return b.estimatedTime - a.estimatedTime
        case "type":
          return a.type.localeCompare(b.type)
        default:
          return a.rank - b.rank
      }
    })

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Tasks</h3>
            <p className="text-sm text-muted-foreground">Manage and track all your tasks</p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rank">Rank</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="estimatedTime">Estimated Time</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tasks</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredAndSortedTasks.map((task) => (
            <Card
              key={task.id}
              className={`transition-all duration-200 hover:shadow-md ${
                task.status === "completed" ? "opacity-75" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Drag Handle */}
                  <div className="cursor-grab hover:cursor-grabbing">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </div>

                  {/* Rank */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-sm font-bold text-teal-700 dark:text-teal-300">
                    {task.rank}
                  </div>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={`font-medium ${task.status === "completed" ? "line-through" : ""}`}>
                        {task.title}
                      </h4>
                      {statusIcons[task.status]}
                    </div>
                    {task.description && <p className="text-sm text-muted-foreground mb-2">{task.description}</p>}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Due: {formatDateTime(task.deadline)}</span>
                      <span>•</span>
                      <span>Est: {formatTime(task.estimatedTime)}</span>
                      {task.status === "completed" && task.actualTime && (
                        <>
                          <span>•</span>
                          <span>Actual: {formatTime(task.actualTime)}</span>
                        </>
                      )}
                      {task.status === "in-progress" && task.timeSpent && (
                        <>
                          <span>•</span>
                          <span className="text-blue-600 dark:text-blue-400">Spent: {formatTime(task.timeSpent)}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    <Badge variant={priorityColors[task.priority as keyof typeof priorityColors]}>
                      {task.priority}
                    </Badge>
                    <Badge className={typeColors[task.type as keyof typeof typeColors]}>{task.type}</Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {task.status === "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStartTimer(task.id)}
                        className="h-8 px-2"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    )}
                    {task.status === "in-progress" && (
                      <>
                        {activeTimers[task.id] ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePauseTimer(task.id)}
                            className="h-8 px-2"
                          >
                            <Pause className="h-3 w-3 mr-1" />
                            Pause
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartTimer(task.id)}
                            className="h-8 px-2"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Resume
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleMarkDone(task.id)}
                          className="h-8 px-2 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Done
                        </Button>
                      </>
                    )}
                    {task.status === "completed" && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-muted-foreground">
                          {task.completedAt && formatDateTime(task.completedAt)}
                        </span>
                      </div>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => handleEditTask(task)} className="h-8 w-8 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedTasks.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No tasks found matching your criteria.</p>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Task
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <TaskCreationModal open={showCreateModal} onOpenChange={setShowCreateModal} onCreateTask={handleCreateTask} />
      <TaskEditModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        task={editingTask}
        onUpdateTask={handleUpdateTask}
      />
    </>
  )
}
