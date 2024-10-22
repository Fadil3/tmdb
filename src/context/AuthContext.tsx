import React, { createContext, useState, useContext, useEffect } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  login: (access_token: string, account_id: string) => void
  logout: () => void
  isLoginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function ({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn')
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const login = (access_token: string, account_id: string) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('account_id', account_id)
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }
  const logout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
  }
  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
