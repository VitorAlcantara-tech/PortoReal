"use client"

import { useAuth } from "@/contexts/auth-context"
import { LandingPage } from "@/components/landing-page"
import { AppLayout } from "@/components/app-layout"
import { Loader2 } from "lucide-react"

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary/5 to-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return user ? <AppLayout /> : <LandingPage />
}
