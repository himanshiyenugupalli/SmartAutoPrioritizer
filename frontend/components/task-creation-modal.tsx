"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock } from "lucide-react"

interface TaskCreationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateTask: (task: any) => void
  prefilledSlot?: { day: number; time: string } | null
}

export function TaskCreationModal({ open, onOpenChange, onCreateTask, prefilledSlot }: TaskCreationModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    type: "",
    deadline: "",
    estimatedTime: "",
    timeUnit: "minutes",
  })

  useEffect(() => {
    if (prefilledSlot && open) {
      // Calculate date based on day and time
      const today = new Date()
      const targetDate = new Date(today)
      targetDate.setDate(today.getDate() + prefilledSlot.day)

      const [hours, minutes] = prefilledSlot.time.split(":").map(Number)
      targetDate.setHours(hours, minutes, 0, 0)

      setFormData((prev) => ({
        ...prev,
        deadline: targetDate.toISOString().slice(0, 16), // Format for datetime-local input
      }))
    }
  }, [prefilledSlot, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const estimatedMinutes =
      formData.timeUnit === "hours"
        ? Number.parseInt(formData.estimatedTime) * 60
        : Number.parseInt(formData.estimatedTime)

    const newTask = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      type: formData.type,
      deadline: formData.deadline,
      estimatedTime: estimatedMinutes,
      actualTime: 0,
      status: "pending",
      timeSpent: 0,
      rank: 1, // This would be calculated based on AI prioritization
    }

    onCreateTask(newTask)
    onOpenChange(false)

    // Reset form
    setFormData({
      title: "",
      description: "",
      priority: "",
      type: "",
      deadline: "",
      estimatedTime: "",
      timeUnit: "minutes",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Add a new task with time estimation for better productivity tracking.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add task details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      High Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      Medium Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Low Priority
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Task Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="deadline"
                type="datetime-local"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedTime">Estimated Time</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="estimatedTime"
                  type="number"
                  placeholder="Enter time..."
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                  className="pl-10"
                  min="1"
                  required
                />
              </div>
              <Select
                value={formData.timeUnit}
                onValueChange={(value) => setFormData({ ...formData, timeUnit: value })}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">This helps track your time estimation accuracy</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
