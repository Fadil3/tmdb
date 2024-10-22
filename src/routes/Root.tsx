import { useState, useCallback } from 'react'

import { useAuth } from '../context/AuthContext'

import MovieGridLayout from '../components/layouts/MovieGridLayout'
import MovieCarouselLayout from '../components/layouts/MovieCarouselLayout'

import { Movie } from '../types/movie-lists'
import { useApi } from '../hooks/useApi'
import {
  toggleFavorite,
  toggleBookmark,
  isFavorite,
  isBookmarked,
} from '../utils/MovieAction'
import PageWrapper from '../components/layouts/PageWrapper'

export default function Root() {
  const urlNowPlaying =
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
  const urlTopRated =
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    delay: 500,
  }

  const [, setFavoriteStatus] = useState<{ [key: number]: boolean }>({})
  const [, setBookmarkStatus] = useState<{ [key: number]: boolean }>({})

  const {
    data: nowPlayingData,
    loading: nowPlayingLoading,
    error: nowPlayingError,
  } = useApi<{ results: Movie[] }>(urlNowPlaying, options)
  const {
    data: topRatedData,
    loading: topRatedLoading,
    error: topRatedError,
  } = useApi<{ results: Movie[] }>(urlTopRated, options)

  const { isLoggedIn, openLoginModal } = useAuth()

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Movie[]>([])

  const urlSearch = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${encodeURIComponent(searchQuery)}&page=1`
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<Error | null>(null)

  const handleSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (searchQuery.trim() !== '') {
        setSearchLoading(true)
        setSearchError(null)
        fetch(urlSearch, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Search failed')
            }
            return response.json()
          })
          .then((data) => {
            setSearchResults(data.results || [])
          })
          .catch((error) => {
            setSearchError(error)
          })
          .finally(() => {
            setSearchLoading(false)
          })
      }
    },
    [searchQuery, urlSearch, options],
  )

  const handleLoginRequired = useCallback(() => {
    if (!isLoggedIn) {
      openLoginModal()
    }
  }, [isLoggedIn, openLoginModal])

  const handleFavoriteClick = useCallback(
    (movie: Movie) => {
      if (isLoggedIn) {
        const newStatus = toggleFavorite(movie)
        setFavoriteStatus((prev) => ({ ...prev, [movie.id]: newStatus }))
      } else {
        handleLoginRequired()
      }
    },
    [isLoggedIn],
  )

  const handleBookmarkClick = useCallback(
    (movie: Movie) => {
      if (isLoggedIn) {
        const newStatus = toggleBookmark(movie)
        setBookmarkStatus((prev) => ({ ...prev, [movie.id]: newStatus }))
      } else {
        handleLoginRequired()
      }
    },
    [isLoggedIn],
  )

  return (
    <PageWrapper>
      <form onSubmit={handleSearch} className="mb-4 flex gap-3">
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Search
        </button>
        <button
          type="reset"
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          onClick={() => {
            setSearchQuery('')
            setSearchResults([])
          }}
        >
          Reset
        </button>
      </form>

      {searchQuery !== '' && searchResults.length > 0 ? (
        <MovieGridLayout
          movies={searchResults}
          gridTitle="Search Results"
          isLoading={searchLoading}
          isError={searchError !== null}
          errorMessage="Failed to load search results. Please try again later."
          onClickFavorite={handleFavoriteClick}
          onClickBookmark={handleBookmarkClick}
          isFavorite={(movie) => isFavorite(movie.id)}
          isBookmarked={(movie) => isBookmarked(movie.id)}
          isAuthenticated={isLoggedIn}
          onLoginRequired={handleLoginRequired}
        />
      ) : (
        <>
          <MovieCarouselLayout
            movies={nowPlayingData?.results || []}
            carouselTitle="Now Playing"
            isLoading={nowPlayingLoading}
            isError={nowPlayingError !== null}
            errorMessage="Failed to load Now Playing movies. Please try again later."
            onClickFavorite={handleFavoriteClick}
            onClickBookmark={handleBookmarkClick}
            isFavorite={(movie) => isFavorite(movie.id)}
            isBookmarked={(movie) => isBookmarked(movie.id)}
            isAuthenticated={isLoggedIn}
            onLoginRequired={handleLoginRequired}
          />
          <MovieGridLayout
            movies={topRatedData?.results || []}
            gridTitle="Top Rated"
            isLoading={topRatedLoading}
            isError={topRatedError !== null}
            errorMessage="Failed to load top-rated movies. Please try again later."
            onClickFavorite={handleFavoriteClick}
            onClickBookmark={handleBookmarkClick}
            isFavorite={(movie) => isFavorite(movie.id)}
            isBookmarked={(movie) => isBookmarked(movie.id)}
            isAuthenticated={isLoggedIn}
            onLoginRequired={handleLoginRequired}
          />
        </>
      )}
    </PageWrapper>
  )
}
