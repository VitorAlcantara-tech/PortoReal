"use client"

import React, { createContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento do usuário
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        // Ignorar erros de parse
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setLoading(false)
  }

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true)
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}
