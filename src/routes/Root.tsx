import { useState, useCallback } from 'react'

import { useAuth } from '../context/AuthContext'

import MovieGridLayout from '../components/Layouts/MovieGridLayout'
import MovieCarouselLayout from '../components/Layouts/MovieCarouselLayout'

import { Movie } from '../types/movie-lists'
import { useApi } from '../hooks/useApi'
import { toggleFavorite, toggleBookmark, isFavorite, isBookmarked } from '../utils/MovieAction'
import PageWrapper from '../components/Layouts/PageWrapper'

export default function Root() {
  const urlNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
  const urlTopRated = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    delay: 500
  }

  const { data: nowPlayingData, loading: nowPlayingLoading, error: nowPlayingError } = useApi<{ results: Movie[] }>(urlNowPlaying, options)
  const { data: topRatedData, loading: topRatedLoading, error: topRatedError } = useApi<{ results: Movie[] }>(urlTopRated, options)

  const [, setFavoriteStatus] = useState<{ [key: number]: boolean }>({})
  const [, setBookmarkStatus] = useState<{ [key: number]: boolean }>({})

  const { isLoggedIn, openLoginModal } = useAuth()

  const handleLoginRequired = useCallback(() => {
    if (!isLoggedIn) {
      openLoginModal()
    }
  }, [isLoggedIn, openLoginModal])

  const handleFavoriteClick = useCallback((movie: Movie) => {
    if (isLoggedIn) {
      const newStatus = toggleFavorite(movie)
      setFavoriteStatus(prev => ({ ...prev, [movie.id]: newStatus }))
    } else {
      handleLoginRequired()
    }
  }, [isLoggedIn])

  const handleBookmarkClick = useCallback((movie: Movie) => {
    if (isLoggedIn) {
      const newStatus = toggleBookmark(movie)
      setBookmarkStatus(prev => ({ ...prev, [movie.id]: newStatus }))
    } else {
      handleLoginRequired()
    }
  }, [isLoggedIn])



  return (
    <PageWrapper>
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
    </PageWrapper>
  )
}
