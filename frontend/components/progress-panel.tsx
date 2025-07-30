"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Target } from "lucide-react"

export function ProgressPanel() {
  const stats = {
    completed: 12,
    pending: 8,
    total: 20,
    completionRate: 60,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Progress Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Overall Progress</span>
            <span className="font-medium">{stats.completionRate}%</span>
          </div>
          <Progress value={stats.completionRate} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <Target className="h-4 w-4 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-teal-600">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
