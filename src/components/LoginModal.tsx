import { useRef, useEffect } from 'react'
import { useLogin } from '../hooks/useLogin'
import tmdb from '../assets/tmdb.svg'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useLogin()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-8 rounded-2xl shadow-lg w-[250px] h-[250px] cursor-pointer" onClick={login}>
        <img src={tmdb} alt="tmdb-logo" className='mx-auto w-[164px] h-[164px] mb-4' />
        <p className="mb-1 text-center">Login with TMDB</p>
      </div>
    </div>
  )
}

