import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  username: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (name: string, password?: string) => void
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Verificar credenciais customizadas salvas
    const customCredentials = localStorage.getItem('customCredentials')
    let credentials = VALID_USERS

    if (customCredentials) {
      const parsed = JSON.parse(customCredentials)
      credentials = VALID_USERS.map(u => {
        const custom = parsed[u.username]
        if (custom) {
          return { ...u, ...custom }
        }
        return u
      })
    }

    const foundUser = credentials.find(
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

  const updateUser = (name: string, password?: string) => {
    if (!user) return

    // Atualizar nome
    const updatedUser = { ...user, name }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))

    // Atualizar credenciais customizadas se a senha foi alterada
    if (password) {
      const customCredentials = localStorage.getItem('customCredentials')
      const parsed = customCredentials ? JSON.parse(customCredentials) : {}
      parsed[user.username] = { name, password }
      localStorage.setItem('customCredentials', JSON.stringify(parsed))
    } else {
      // Apenas atualizar o nome nas credenciais customizadas
      const customCredentials = localStorage.getItem('customCredentials')
      const parsed = customCredentials ? JSON.parse(customCredentials) : {}
      parsed[user.username] = { ...parsed[user.username], name }
      localStorage.setItem('customCredentials', JSON.stringify(parsed))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, updateUser }}>
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
