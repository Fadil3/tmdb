import LogoutIcon from '../assets/logout.svg'
import { useLogin } from '../hooks/useLogin'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isLoggedIn, logout: authLogout } = useAuth()
  const { login, loading } = useLogin()

  const handleLogin = async () => {
    try {
      await login()
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleLogout = () => {
    authLogout()
  }

  return (
    <nav className="w-full h-[100px] bg-[#0EA5E9] flex justify-between items-center px-20">
      <h1 className="text-4xl text-white font-black tracking-[15px]">CINEMA</h1>
      <ul className="flex gap-12 text-white items-center">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/favorites">Favorites</a>
        </li>
        <li>
          <a href="/watchlists">Watchlists</a>
        </li>
        {isLoggedIn ? (
          <button onClick={handleLogout}>
            <img src={LogoutIcon} alt="logout" />
          </button>
        ) : (
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        )}
      </ul>
    </nav>
  )
}
