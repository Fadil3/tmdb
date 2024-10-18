import { useAuth } from '../context/AuthContext'

export function useLogout() {
  const { logout: setLoggedOut } = useAuth()

  const logout = () => {
    // clear all local storage
    localStorage.clear()
    setLoggedOut()
    // refresh the page
    window.location.reload()
  }

  return { logout }
}
