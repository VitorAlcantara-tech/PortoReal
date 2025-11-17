"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { X, Loader2 } from "lucide-react"

interface AuthModalProps {
  mode: "login" | "signup"
  onClose: () => void
  onModeChange: (mode: "login" | "signup") => void
}

export function AuthModal({ mode, onClose, onModeChange }: AuthModalProps) {
  const { login, signup, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      if (mode === "login") {
        await login(email, password)
      } else {
        await signup(email, password, name)
      }
      onClose()
    } catch (err) {
      setError("Erro ao autenticar. Tente novamente.")
    }
  }

  const isLoginMode = mode === "login"

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-border gap-2">
          <h2 className="text-xl sm:text-2xl font-bold">{isLoginMode ? "Entrar" : "Criar conta"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Nome completo</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome"
                className="text-xs sm:text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">E-mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              className="text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="text-xs sm:text-sm"
            />
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full text-sm" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {isLoginMode ? "Entrar" : "Criar conta"}
          </Button>

          <div className="relative my-3 sm:my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-card text-muted-foreground">ou</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent text-xs sm:text-sm"
            onClick={() => onModeChange(isLoginMode ? "signup" : "login")}
          >
            {isLoginMode ? "Criar nova conta" : "Já tenho uma conta"}
          </Button>
        </form>
      </div>
    </div>
  )
}
