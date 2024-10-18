import React from 'react'
import { useAuth } from '../../context/AuthContext'
import LoginModal from '../LoginModal'
import Navbar from '../Navbar'

interface PageWrapperProps {
  children: React.ReactNode
  banner?: React.ReactNode
}

export default function ({ children, banner }: PageWrapperProps) {
  const { isLoginModalOpen, closeLoginModal } = useAuth()

  return (
    <>
      <Navbar />
      {banner}
      <main className="w-full min-h-screen bg-black flex flex-col gap-8 px-10 py-[50px]">
        {children}
      </main>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  )
}
