"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Plus, Clock, CalendarIcon } from "lucide-react"
import { TaskCreationModal } from "./task-creation-modal"

const mockCalendarEvents = [
  {
    id: 1,
    title: "Complete project proposal",
    time: "09:00",
    duration: 120,
    priority: "high",
    type: "work",
    day: 1,
  },
  {
    id: 2,
    title: "Team meeting",
    time: "14:00",
    duration: 60,
    priority: "medium",
    type: "meeting",
    day: 1,
  },
  {
    id: 3,
    title: "Review client feedback",
    time: "10:30",
    duration: 90,
    priority: "high",
    type: "review",
    day: 2,
  },
  {
    id: 4,
    title: "Update portfolio",
    time: "15:00",
    duration: 180,
    priority: "low",
    type: "personal",
    day: 3,
  },
]

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

const priorityColors = {
  high: "bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200",
  medium:
    "bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200",
  low: "bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200",
}

// Add monthly calendar data
const monthlyEvents = [
  { id: 1, title: "Project Review", date: 15, priority: "high" },
  { id: 2, title: "Team Meeting", date: 16, priority: "medium" },
  { id: 3, title: "Client Call", date: 18, priority: "high" },
  { id: 4, title: "Portfolio Update", date: 22, priority: "low" },
]

// Add monthly view component after the existing weekly view
const MonthlyView = () => {
  const daysInMonth = 31
  const firstDayOfWeek = 1 // Monday
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Monthly View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfWeek - 1 }).map((_, index) => (
            <div key={`empty-${index}`} className="h-20"></div>
          ))}

          {/* Days of the month */}
          {days.map((day) => {
            const dayEvents = monthlyEvents.filter((event) => event.date === day)
            const isToday = day === 16 // Mock today

            return (
              <div
                key={day}
                className={`h-20 p-1 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors ${
                  isToday ? "bg-teal-50 border-teal-200 dark:bg-teal-950 dark:border-teal-800" : ""
                }`}
                onClick={() => console.log(`Creating task for day ${day}`)}
              >
                <div className={`text-sm font-medium ${isToday ? "text-teal-600" : ""}`}>{day}</div>
                <div className="space-y-1 mt-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded truncate ${
                        event.priority === "high"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : event.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// Update the main component to include tabs
export function CalendarPage() {
  const [currentWeek, setCurrentWeek] = useState(0)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; time: string } | null>(null)

  const handlePrevWeek = () => setCurrentWeek((prev) => prev - 1)
  const handleNextWeek = () => setCurrentWeek((prev) => prev + 1)

  const handleSlotClick = (day: number, time: string) => {
    setSelectedSlot({ day, time })
    setShowTaskModal(true)
  }

  const handleCreateTask = (newTask: any) => {
    console.log("Creating task for slot:", selectedSlot, newTask)
    // This would integrate with your task management system
    setSelectedSlot(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Calendar</h3>
          <p className="text-sm text-muted-foreground">View and manage your scheduled tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium px-4">Week of Jan {15 + currentWeek * 7}, 2024</span>
          <Button variant="outline" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Weekly View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-2">
                {/* Time column header */}
                <div className="font-medium text-sm text-muted-foreground p-2">Time</div>

                {/* Day headers */}
                {weekDays.map((day, index) => (
                  <div key={day} className="font-medium text-sm text-center p-2 border-b">
                    <div>{day}</div>
                    <div className="text-xs text-muted-foreground">Jan {15 + index}</div>
                  </div>
                ))}

                {/* Time slots and calendar grid */}
                {timeSlots.map((time) => (
                  <>
                    {/* Time label */}
                    <div key={`time-${time}`} className="text-xs text-muted-foreground p-2 border-r">
                      {time}
                    </div>

                    {/* Day slots */}
                    {weekDays.map((_, dayIndex) => {
                      const dayEvents = mockCalendarEvents.filter(
                        (event) => event.day === dayIndex && event.time === time,
                      )

                      return (
                        <div
                          key={`${dayIndex}-${time}`}
                          className="min-h-[60px] border border-border hover:bg-muted/50 cursor-pointer transition-colors relative"
                          onClick={() => handleSlotClick(dayIndex, time)}
                        >
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`absolute inset-1 p-1 rounded text-xs border ${
                                priorityColors[event.priority as keyof typeof priorityColors]
                              }`}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {event.type}
                                </Badge>
                              </div>
                            </div>
                          ))}

                          {/* Add task button on hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Plus className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      )
                    })}
                  </>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <MonthlyView />
        </TabsContent>
      </Tabs>

      {/* Today's Agenda */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Agenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockCalendarEvents
              .filter((event) => event.day === 1) // Today
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">{event.time}</div>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.duration} minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{event.type}</Badge>
                    <Badge variant={event.priority === "high" ? "destructive" : "secondary"}>{event.priority}</Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      <TaskCreationModal
        open={showTaskModal}
        onOpenChange={setShowTaskModal}
        onCreateTask={handleCreateTask}
        prefilledSlot={selectedSlot}
      />
    </div>
  )
}
