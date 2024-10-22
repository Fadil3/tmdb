import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { createAccessToken } from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom'

export function AuthCallback() {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const requestToken = localStorage.getItem('request_token')

    if (requestToken) {
      createAccessToken(requestToken)
        .then(({ access_token, account_id }) => {
          login(access_token, account_id)
          navigate('/')
        })
        .catch((error) => {
          console.error('Error creating access token:', error)
          alert('Error creating access token')
          navigate('/')
        })
    }
  }, [navigate, login])

  return (
    <div className="h-screen bg-black">
      <h1 className="pt-10 text-white font-bold text-4xl animate-pulse text-center">
        Completing login process...
      </h1>
    </div>
  )
}
