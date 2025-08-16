"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { CustomButton } from "@/components/ui/custom-button"

export const DashboardContent: React.FC = () => {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground text-base">
        Loading user data...
      </div>
    )
  }

  const handleLogout = () => {
    logout()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-4">
            <img
              src={user.picture.thumbnail || "/placeholder.svg"}
              alt={`${user.name.first} ${user.name.last}`}
              className="w-10 h-10 rounded-full border-2 border-border"
            />
            <span className="text-sm font-medium text-foreground hidden sm:block">
              {user.name.first} {user.name.last}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-8">
        <section className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to the Dashboard, {user.name.first}!</h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Here's your profile information retrieved from the authentication system.
          </p>
        </section>

        <section className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user.picture.large || "/placeholder.svg"}
              alt={`${user.name.first} ${user.name.last}`}
              className="w-16 h-16 rounded-full border-3 border-border"
            />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {user.name.title} {user.name.first} {user.name.last}
              </h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Phone</div>
              <div className="text-sm text-foreground font-medium">{user.phone}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Cell</div>
              <div className="text-sm text-foreground font-medium">{user.cell}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</div>
              <div className="text-sm text-foreground font-medium">
                {user.location.city}, {user.location.state}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Country</div>
              <div className="text-sm text-foreground font-medium">{user.location.country}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date of Birth</div>
              <div className="text-sm text-foreground font-medium">
                {formatDate(user.dob.date)} (Age: {user.dob.age})
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Member Since</div>
              <div className="text-sm text-foreground font-medium">{formatDate(user.registered.date)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Username</div>
              <div className="text-sm text-foreground font-medium">{user.login.username}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Nationality</div>
              <div className="text-sm text-foreground font-medium">{user.nat}</div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Ready to sign out? You'll be redirected to the login page.
            </p>
            <CustomButton variant="outline" onClick={handleLogout}>
              Sign Out
            </CustomButton>
          </div>
        </section>
      </main>
    </div>
  )
}
