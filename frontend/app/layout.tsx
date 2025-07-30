import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TaskNeuron - Intelligent Task Management",
  description:
    "Organize smarter. Prioritize better. AI-powered task management for students, freelancers, and professionals.",
  keywords: "task management, productivity, AI, scheduling, time tracking, calendar integration",
  authors: [{ name: "TaskNeuron Team" }],
  openGraph: {
    title: "TaskNeuron - Intelligent Task Management",
    description:
      "Organize smarter. Prioritize better. AI-powered task management for students, freelancers, and professionals.",
    type: "website",
    url: "https://taskneuron.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskNeuron - Intelligent Task Management",
    description: "Organize smarter. Prioritize better.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
