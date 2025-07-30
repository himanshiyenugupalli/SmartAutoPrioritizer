"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Square, Timer, Coffee } from "lucide-react"

interface FocusModeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FocusModeModal({ open, onOpenChange }: FocusModeModalProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isBreak, setIsBreak] = useState(false)
  const [session, setSession] = useState(1)

  const totalTime = isBreak ? 5 * 60 : 25 * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            if (!isBreak) {
              // Work session completed, start break
              setIsBreak(true)
              setTimeLeft(5 * 60)
            } else {
              // Break completed, start next work session
              setIsBreak(false)
              setTimeLeft(25 * 60)
              setSession((prev) => prev + 1)
            }
            return prev - 1
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, isBreak])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleStop = () => {
    setIsRunning(false)
    setTimeLeft(25 * 60)
    setIsBreak(false)
    setSession(1)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isBreak ? <Coffee className="h-4 w-4" /> : <Timer className="h-4 w-4" />}
            {isBreak ? "Break Time" : "Focus Session"}
          </DialogTitle>
          <DialogDescription>
            {isBreak ? "Take a short break to recharge" : "Stay focused on your current task"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Timer Display */}
          <Card className={`${isBreak ? "bg-green-50 dark:bg-green-950" : "bg-teal-50 dark:bg-teal-950"}`}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
              <div className="text-sm text-muted-foreground mb-4">
                Session {session} • {isBreak ? "Break" : "Focus"}
              </div>
              <Progress
                value={progress}
                className={`h-2 ${isBreak ? "[&>div]:bg-green-500" : "[&>div]:bg-teal-500"}`}
              />
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="flex justify-center gap-2">
            {!isRunning ? (
              <Button onClick={handleStart} className="bg-teal-600 hover:bg-teal-700">
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : (
              <Button onClick={handlePause} variant="outline">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            <Button onClick={handleStop} variant="outline">
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </div>

          {/* Tips */}
          <div className="text-center text-sm text-muted-foreground">
            {isBreak ? (
              <p>💡 Step away from your screen and stretch</p>
            ) : (
              <p>💡 Eliminate distractions and focus on one task</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
