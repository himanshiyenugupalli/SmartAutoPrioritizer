"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle, Minus } from "lucide-react"

const mockTasks = {
  high: [
    {
      id: 1,
      title: "Complete project proposal",
      deadline: "2024-01-15",
      tags: ["urgent", "work"],
    },
    {
      id: 2,
      title: "Review client feedback",
      deadline: "2024-01-14",
      tags: ["client", "review"],
    },
  ],
  medium: [
    {
      id: 3,
      title: "Update portfolio website",
      deadline: "2024-01-20",
      tags: ["personal", "development"],
    },
    {
      id: 4,
      title: "Plan team meeting",
      deadline: "2024-01-18",
      tags: ["meeting", "team"],
    },
  ],
  low: [
    {
      id: 5,
      title: "Organize desk workspace",
      deadline: "2024-01-25",
      tags: ["personal", "organization"],
    },
    {
      id: 6,
      title: "Read industry articles",
      deadline: "2024-01-30",
      tags: ["learning", "research"],
    },
  ],
}

const priorityConfig = {
  high: {
    title: "High Priority",
    icon: AlertTriangle,
    color: "bg-red-100 dark:bg-red-950 border-red-200 dark:border-red-800",
    badgeColor: "bg-red-500",
  },
  medium: {
    title: "Medium Priority",
    icon: Clock,
    color: "bg-yellow-100 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
    badgeColor: "bg-yellow-500",
  },
  low: {
    title: "Low Priority",
    icon: Minus,
    color: "bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-800",
    badgeColor: "bg-green-500",
  },
}

export function PriorityBuckets() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Priority Buckets</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(mockTasks).map(([priority, tasks]) => {
          const config = priorityConfig[priority as keyof typeof priorityConfig]
          const Icon = config.icon

          return (
            <Card key={priority} className={`${config.color} min-h-[400px]`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="h-4 w-4" />
                  {config.title}
                  <Badge variant="secondary" className="ml-auto">
                    {tasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task) => (
                  <Card
                    key={task.id}
                    className="p-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing border border-gray-200 dark:border-gray-700 task-card"
                  >
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">{task.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.deadline}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs px-1 py-0 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
