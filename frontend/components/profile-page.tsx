"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Calendar, Edit2, Camera, Trophy, Target, Clock } from "lucide-react"
import { ProfileEditModal } from "./profile-edit-modal"

interface UserProfile {
  name: string
  email: string
  avatar: string
  joinDate: string
  bio?: string
}

export function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  })

  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser({
        ...parsedUser,
        joinDate: "January 2024", // Mock join date
      })
      setEditForm({
        name: parsedUser.name,
        email: parsedUser.email,
      })
    }
  }, [])

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: editForm.name,
        email: editForm.email,
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setIsEditing(false)
    }
  }

  const handleAvatarUpdate = () => {
    // Mock avatar update functionality
    console.log("Avatar update clicked")
  }

  const handleUpdateProfile = (updatedUser: any) => {
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setShowEditModal(false)
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  // Mock task statistics
  const taskStats = {
    totalCompleted: 127,
    currentStreak: 7,
    averageCompletionTime: 85, // percentage
    totalTimeTracked: 2340, // minutes
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account information and view your productivity stats
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                  onClick={handleAvatarUpdate}
                >
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              <div>
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.bio && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">{user.bio}</p>
                  </div>
                )}
                <div className="flex items-center gap-1 mt-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Joined {user.joinDate}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Profile Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{user.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile} className="bg-teal-600 hover:bg-teal-700">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setShowEditModal(true)} variant="outline">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{taskStats.totalCompleted}</div>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Current Streak</span>
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  {taskStats.currentStreak} days
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Completion Rate</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {taskStats.averageCompletionTime}%
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Time Tracked</span>
                <Badge variant="outline">{formatTime(taskStats.totalTimeTracked)}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Productivity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Productivity Summary
          </CardTitle>
          <CardDescription>Your task management insights and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-teal-50 dark:bg-teal-950">
              <div className="text-2xl font-bold text-teal-600">92%</div>
              <p className="text-sm text-muted-foreground">Time Accuracy</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <p className="text-sm text-muted-foreground">Avg Tasks/Day</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950">
              <div className="text-2xl font-bold text-green-600">3.2h</div>
              <p className="text-sm text-muted-foreground">Avg Focus Time</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950">
              <div className="text-2xl font-bold text-purple-600">28</div>
              <p className="text-sm text-muted-foreground">Projects Done</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Current Preferences
          </CardTitle>
          <CardDescription>Your current TaskNeuron settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Theme</h4>
              <Badge variant="outline">System Default</Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Task View</h4>
              <Badge variant="outline">Kanban View</Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Notifications</h4>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Email Enabled
                </Badge>
                <Badge variant="outline">Push Disabled</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Calendar Sync</h4>
              <Badge variant="outline">Google Calendar Off</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <ProfileEditModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        user={user}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  )
}
