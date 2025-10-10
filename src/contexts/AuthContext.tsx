import { createContext } from 'react'

interface User {
    id: number
    email: string
    nome: string
}

interface AuthContextType {
    token: string | null
    user: User | null
    role: string | null
    isAuthenticated: boolean
    login: (token: string, user: User, role: string, rememberMe?: boolean) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)