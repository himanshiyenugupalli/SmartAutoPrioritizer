"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { SignUpForm } from "@/components/signup-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { Brain } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex aspect-square size-16 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg">
              <Brain className="size-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">TaskNeuron</h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? "Welcome back to your intelligent task manager" : "Create your TaskNeuron account"}
          </p>
        </div>

        {/* Auth Forms */}
        {isLogin ? (
          <LoginForm onSwitchToSignUp={() => setIsLogin(false)} />
        ) : (
          <SignUpForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  )
}
