"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardContent } from "@/components/dashboard-content"

export default function DashboardPage(): React.JSX.Element {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to auth if no user data exists
    if (user === null) {
      router.push("/auth")
    }
  }, [user, router])

  // Show loading while checking authentication
  if (user === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-muted-foreground)",
        }}
      >
        Checking authentication...
      </div>
    )
  }

  return <DashboardContent />
}
