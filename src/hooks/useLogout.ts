import { useAuth } from '../context/AuthContext'

export function useLogout() {
  const { logout: setLoggedOut } = useAuth()

  const logout = () => {
    localStorage.removeItemremoveItem('access_token')
    localStorage.removeItem('request_token')
    localStorage.removeItem('isLoggedIn')
    setLoggedOut()
  }

  return { logout }
}
