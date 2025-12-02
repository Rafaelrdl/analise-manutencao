import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  username: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Usuários válidos para login
const VALID_USERS = [
  { username: 'admin', password: 'admin123', name: 'Administrador' },
  { username: 'rafael', password: 'rafael123', name: 'Rafael Ribeiro' },
  { username: 'engenharia', password: 'eng123', name: 'Engenharia Clínica' },
  { username: 'predial', password: 'pred123', name: 'Manutenção Predial' },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = VALID_USERS.find(
      (u) => u.username === username && u.password === password
    )

    if (foundUser) {
      const userData = { username: foundUser.username, name: foundUser.name }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
