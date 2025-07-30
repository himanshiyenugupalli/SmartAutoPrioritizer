"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Brain,
  ArrowRight,
  CheckCircle,
  Clock,
  Calendar,
  BarChart3,
  Shield,
  Mail,
  Phone,
  FileText,
  HelpCircle,
} from "lucide-react"

export function LandingPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleGetStarted = () => {
    router.push("/register")
  }

  const handleLogin = () => {
    router.push("/login")
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubscribing(true)
    // Mock subscription
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubscribing(false)
    setEmail("")
    // You could show a success message here
  }

  const features = [
    {
      icon: CheckCircle,
      title: "Smart Prioritization",
      description: "AI-powered task ranking helps you focus on what matters most",
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Track actual vs estimated time to improve your planning accuracy",
    },
    {
      icon: Calendar,
      title: "Calendar Integration",
      description: "Seamlessly sync with your existing calendar applications",
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Detailed insights into your productivity patterns and trends",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
              <Brain className="size-4" />
            </div>
            <span className="font-bold text-xl">TaskNeuron</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={handleLogin}>
              Login
            </Button>
            <Button onClick={handleGetStarted} className="bg-teal-600 hover:bg-teal-700">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex justify-center mb-8">
            <div className="flex aspect-square size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-2xl">
              <Brain className="size-10" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-teal-600 to-teal-800 dark:from-teal-400 dark:to-teal-600 bg-clip-text text-transparent">
            TaskNeuron
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Organize smarter. Prioritize better.
          </p>

          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            TaskNeuron helps you rank, organize, and track your daily priorities with intelligent scheduling and a clean
            interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-6 h-auto"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleLogin}
              className="text-lg px-8 py-6 h-auto border-teal-200 hover:bg-teal-50 dark:border-teal-800 dark:hover:bg-teal-950 bg-transparent"
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose TaskNeuron?</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Built for students, freelancers, and professionals who want to maximize their productivity with intelligent
            task management and beautiful, intuitive design.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Powerful Features</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* First row - 3 cards */}
            {features.slice(0, 3).map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}

            {/* Second row - 2 cards centered */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="grid gap-8 md:grid-cols-2 max-w-2xl w-full">
                {features.slice(3, 5).map((feature, index) => (
                  <Card
                    key={index + 3}
                    className="border-2 hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300 hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Organized?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who have transformed their productivity with TaskNeuron.
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-6 h-auto"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                  <Brain className="size-4" />
                </div>
                <span className="font-bold text-xl">TaskNeuron</span>
              </div>
              <p className="text-sm text-muted-foreground">Intelligent task management for the modern professional.</p>
            </div>

            {/* Newsletter Signup */}
            <div className="md:col-span-1">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Stay Updated
              </h3>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-1">
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:support@taskneuron.app" className="hover:text-teal-600">
                    support@taskneuron.app
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+919876543210" className="hover:text-teal-600">
                    +91-9876543210
                  </a>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div className="md:col-span-1">
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <a href="#" className="hover:text-teal-600">
                    Terms of Service
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <a href="#" className="hover:text-teal-600">
                    Privacy Policy
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <a href="#" className="hover:text-teal-600">
                    Help Center
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 TaskNeuron. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
