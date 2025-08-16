"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage(): React.JSX.Element {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect based on authentication status
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/auth")
    }
  }, [user, router])

  // Show loading state while redirecting
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
      Loading...
    </div>
  )
}
