import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createAccessToken } from '../hooks/useLogin'

export function AuthCallback() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const requestToken = localStorage.getItem('request_token')

    if (requestToken) {
      createAccessToken(requestToken)
        .then(({ access_token, account_id }) => {
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('account_id', account_id)
          localStorage.setItem('isLoggedIn', 'true')
          login()
          navigate('/')
        })
        .catch((error) => {
          console.error('Error creating access token:', error)
        })
    }
  }, [location, login, navigate])

  return (
    <div className="h-screen bg-black">
      <h1 className="pt-10 text-white font-bold text-4xl animate-pulse text-center">
        Completing login process...
      </h1>
    </div>
  )
}
