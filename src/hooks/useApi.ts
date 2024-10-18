import { useState, useEffect } from 'react'

interface ApiResponse<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface ApiOptions {
  headers?: HeadersInit
  method?: string
  delay?: number
}

export function useApi<T>(
  url: string,
  options: ApiOptions = {},
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        if (options.delay) {
          console.log('Delaying for', options.delay, 'milliseconds')
          await new Promise((resolve) => setTimeout(resolve, options.delay))
        }

        const response = await fetch(url, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result: T = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      setData(null)
      setLoading(false)
      setError(null)
    }
  }, [url, options.method, JSON.stringify(options.headers)])

  return { data, loading, error }
}
