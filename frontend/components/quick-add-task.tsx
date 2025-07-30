"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { TaskCreationModal } from "./task-creation-modal"

export function QuickAddTask() {
  const [task, setTask] = useState("")
  const [showModal, setShowModal] = useState(false)

  const handleQuickAdd = () => {
    if (task.trim()) {
      // Quick add with default values
      console.log("Quick adding task:", task)
      setTask("")
    }
  }

  const handleDetailedAdd = () => {
    setShowModal(true)
  }

  const handleCreateTask = (newTask: any) => {
    console.log("Creating detailed task:", newTask)
    // This would integrate with your task management system
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleQuickAdd()
    }
  }

  return (
    <>
      <Card className="border-dashed border-2 border-teal-200 dark:border-teal-800 bg-gradient-to-r from-teal-50/50 to-teal-100/50 dark:from-teal-950/20 dark:to-teal-900/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Quick add a task... (AI will auto-prioritize)"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-teal-500"
            />
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-teal-600">
              <Mic className="h-4 w-4" />
            </Button>
            <Button onClick={handleQuickAdd} size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
            <Button
              onClick={handleDetailedAdd}
              size="sm"
              variant="outline"
              className="border-teal-200 hover:bg-teal-50 dark:border-teal-800 dark:hover:bg-teal-950 bg-transparent"
            >
              Detailed
            </Button>
          </div>
        </CardContent>
      </Card>

      <TaskCreationModal open={showModal} onOpenChange={setShowModal} onCreateTask={handleCreateTask} />
    </>
  )
}
