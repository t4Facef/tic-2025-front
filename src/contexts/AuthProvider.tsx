import { useState, useEffect, ReactNode } from 'react'
import { AuthContext } from './AuthContext'

interface User {
    id: number
    email: string
    nome: string
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [role, setRole] = useState<string | null>(null)

    // Carregar dados do storage na inicialização
    useEffect(() => {
        // Tentar localStorage primeiro, depois sessionStorage
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
        
        // Escolher storage baseado no rememberMe
        const storage = rememberMe ? localStorage : sessionStorage
        
        storage.setItem('authToken', newToken)
        storage.setItem('userData', JSON.stringify(newUser))
        storage.setItem('userRole', newRole)
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        setRole(null)
        
        // Limpar ambos os storages
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('userRole')
        sessionStorage.removeItem('authToken')
        sessionStorage.removeItem('userData')
        sessionStorage.removeItem('userRole')
    }

    const isAuthenticated = !!token

    return (
        <AuthContext.Provider value={{
            token,
            user,
            role,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}