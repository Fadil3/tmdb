import { Link, useNavigate } from 'react-router-dom'
import LogoutIcon from '../../assets/logout.svg'
import { useAuth } from '../../context/AuthContext'

interface NavbarProps {
  openLoginModal: () => void
}

export default function Navbar({ openLoginModal }: NavbarProps) {
  const { isLoggedIn, logout: authLogout } = useAuth()
  const navigate = useNavigate()

  const handleProtectedRouteAccess = (path: string) => {
    if (!isLoggedIn) {
      openLoginModal()
    } else {
      navigate(path)
    }
  }

  const handleLogout = () => {
    authLogout()
  }

  return (
    <nav className="w-full h-[100px] bg-[#0EA5E9] flex justify-between items-center px-20 flex-col md:flex-row py-4">
      <Link to="/" className="text-2xl lg:text-4xl text-white font-black tracking-[15px]">
        CINEMA
      </Link>
      <ul className="flex gap-4 md:gap-12 text-white items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button onClick={() => handleProtectedRouteAccess('/favorites')}>Favorites</button>
        </li>
        <li>
          <button onClick={() => handleProtectedRouteAccess('/watchlists')}>Watchlists</button>
        </li>
        {isLoggedIn && (
          <button onClick={handleLogout}>
            <img src={LogoutIcon} alt="logout" />
          </button>
        )}
      </ul>
    </nav>
  )
}
