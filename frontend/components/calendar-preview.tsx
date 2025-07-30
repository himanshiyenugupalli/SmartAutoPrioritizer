"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockEvents = [
  { id: 1, title: "Project Review", time: "09:00", priority: "high" },
  { id: 2, title: "Team Meeting", time: "14:00", priority: "medium" },
  { id: 3, title: "Client Call", time: "16:30", priority: "high" },
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const currentWeek = [13, 14, 15, 16, 17, 18, 19]

export function CalendarPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-4 w-4" />
          This Week
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">January 2024</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
          {weekDays.map((day) => (
            <div key={day} className="p-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {currentWeek.map((date, index) => (
            <div
              key={date}
              className={`p-2 text-center text-xs rounded-md ${
                index === 1 // Today (Tuesday)
                  ? "bg-teal-600 text-white font-medium"
                  : "hover:bg-muted"
              }`}
            >
              {date}
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2 border-t">
          <h4 className="text-sm font-medium">Today's Tasks</h4>
          {mockEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
              <div className="space-y-1">
                <div className="text-sm font-medium">{event.title}</div>
                <div className="text-xs text-muted-foreground">{event.time}</div>
              </div>
              <Badge variant={event.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                {event.priority}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
