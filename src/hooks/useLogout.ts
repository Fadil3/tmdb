import { useAuth } from '../context/AuthContext'

export function useLogout() {
  const { logout: setLoggedOut } = useAuth()
  const logout = () => setLoggedOut()
  return { logout }
}
