import React, { createContext, useContext, useState } from 'react'
import type { Affiliate } from './types'

type Role = Affiliate | 'Ad-Lab'

interface AuthContextType {
  role: Role | null
  login: (id: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(() => {
    return localStorage.getItem('affiliate_dashboard_role') as Role | null
  })

  const login = (id: string): boolean => {
    const IDS = {
      ADLAB: import.meta.env.VITE_ACCESS_ID_ADLAB,
      VINCE: import.meta.env.VITE_ACCESS_ID_VINCE,
      DIFIANO: import.meta.env.VITE_ACCESS_ID_DIFIANO,
    }

    let detectedRole: Role | null = null
    if (id === IDS.ADLAB) detectedRole = 'Ad-Lab'
    else if (id === IDS.VINCE) detectedRole = 'Vince'
    else if (id === IDS.DIFIANO) detectedRole = 'Difiano'

    if (detectedRole) {
      setRole(detectedRole)
      localStorage.setItem('affiliate_dashboard_role', detectedRole)
      return true
    }
    return false
  }

  const logout = () => {
    setRole(null)
    localStorage.removeItem('affiliate_dashboard_role')
  }

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
