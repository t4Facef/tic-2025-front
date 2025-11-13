/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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
    isOwnProfile: (profileId: number | string) => boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        const savedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
        const savedUser = localStorage.getItem('userData') || sessionStorage.getItem('userData')
        const savedRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole')

        if (savedToken && savedUser && savedRole) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
            setRole(savedRole)
        }
    }, [])

    const login = (newToken: string, newUser: User, newRole: string, rememberMe: boolean = true) => {
        setToken(newToken)
        setUser(newUser)
        setRole(newRole)
        
        const storage = rememberMe ? localStorage : sessionStorage
        
        storage.setItem('authToken', newToken)
        storage.setItem('userData', JSON.stringify(newUser))
        storage.setItem('userRole', newRole)
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        setRole(null)
        
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('userRole')
        sessionStorage.removeItem('authToken')
        sessionStorage.removeItem('userData')
        sessionStorage.removeItem('userRole')
    }

    const isAuthenticated = !!token

    const isOwnProfile = (profileId: number | string): boolean => {
        if (!user) return false
        return user.id === Number(profileId)
    }

    return (
        <AuthContext.Provider value={{
            token,
            user,
            role,
            isAuthenticated,
            login,
            logout,
            isOwnProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook para usar o contexto
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}