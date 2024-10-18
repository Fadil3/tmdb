import { useState } from 'react'

export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async () => {
    setLoading(true)
    setError(null)
    try {
      const urlCallback = `${window.location.origin}/auth-callback`

      const response = await fetch(
        'https://api.themoviedb.org/4/auth/request_token',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
          body: JSON.stringify({
            // redirect to current page /callback-
            redirect_to: urlCallback,
          }),
        },
      )
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      if (data.request_token) {
        localStorage.setItem('request_token', data.request_token)
        window.location.href = `https://www.themoviedb.org/auth/access?request_token=${data.request_token}`
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}

export async function createAccessToken(requestToken: string) {
  const response = await fetch(
    'https://api.themoviedb.org/4/auth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify({ request_token: requestToken }),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to create access token')
  }

  const data = await response.json()
  return {
    access_token: data.access_token,
    account_id: data.account_id,
  }
}
