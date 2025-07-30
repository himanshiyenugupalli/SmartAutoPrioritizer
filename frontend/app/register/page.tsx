"use client"

import { SignUpForm } from "@/components/signup-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" onClick={() => router.push("/")} className="flex items-center gap-2">
          <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <Brain className="size-3" />
          </div>
          TaskNeuron
        </Button>
      </div>

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
          <h1 className="text-3xl font-bold tracking-tight">Join TaskNeuron</h1>
          <p className="text-muted-foreground mt-2">Create your account and start organizing smarter</p>
        </div>

        <SignUpForm onSwitchToLogin={() => router.push("/login")} />
      </div>
    </div>
  )
}
