import { useState } from 'react'
import { Link } from 'react-router-dom'

import LogoutIcon from '../assets/logout.svg'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'

export default function Navbar() {
  const { isLoggedIn, logout: authLogout } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleProtectedRouteAccess = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault()
      setIsLoginModalOpen(true)
    }
  }

  const handleLogout = () => {
    authLogout()
  }

  return (
    <>
      <nav className="w-full h-[100px] bg-[#0EA5E9] flex justify-between items-center px-20 flex-col md:flex-row py-4">
        <Link to="/" className="text-2xl lg:text-4xl text-white font-black tracking-[15px]">
          CINEMA
        </Link>
        <ul className="flex gap-4 md:gap-12 text-white items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites" onClick={handleProtectedRouteAccess}>
              Favorites
            </Link>
          </li>
          <li>
            <Link to="/watchlists" onClick={handleProtectedRouteAccess}>
              Watchlists
            </Link>
          </li>
          {isLoggedIn && (
            <button onClick={handleLogout}>
              <img src={LogoutIcon} alt="logout" />
            </button>
          )}
        </ul>
      </nav>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
