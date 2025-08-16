"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/contexts/auth-context"
import { CustomInput } from "@/components/ui/custom-input"
import { CustomButton } from "@/components/ui/custom-button"
import { loginSchema, type LoginFormData } from "@/lib/validation"

export const LoginForm: React.FC = () => {
  const [error, setError] = useState<string>("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("")
      await login(data.phoneNumber)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Enter your Iranian mobile number to sign in to your account
          </p>
        </div>

        {error && (
          <div
            className="p-3 mb-6 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <CustomInput
            {...register("phoneNumber")}
            label="Phone Number"
            placeholder="09123456789"
            type="tel"
            required
            error={errors.phoneNumber?.message}
            autoComplete="tel"
            maxLength={11}
          />

          <div className="mt-2">
            <CustomButton type="submit" loading={isLoading} size="large" className="w-full">
              {isLoading ? "Signing In..." : "Sign In"}
            </CustomButton>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">Demo: Enter any 11-digit number starting with 09</p>
        </div>
      </div>
    </div>
  )
}
