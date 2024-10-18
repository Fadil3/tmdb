import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import PageWrapper from '../components/Layouts/PageWrapper'
import MovieGridLayout from '../components/Layouts/MovieGridLayout'
import { getBookmarks, toggleFavorite, isFavorite, toggleBookmark, isBookmarked } from '../utils/MovieAction'
import { Movie } from '../types/movie-lists'

export default function Watchlists() {
  const { isLoggedIn, openLoginModal } = useAuth()
  const [watchlist, setWatchlist] = useState<Movie[]>([])
  const [_favoriteStatus, setFavoriteStatus] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    if (isLoggedIn) {
      setWatchlist(getBookmarks())
    }
  }, [isLoggedIn])

  const handleLoginRequired = () => {
    openLoginModal()
  }

  const handleFavoriteClick = (movie: Movie) => {
    if (isLoggedIn) {
      toggleFavorite(movie)
      setFavoriteStatus(prev => ({ ...prev, [movie.id]: !prev[movie.id] }))
    } else {
      handleLoginRequired()
    }
  }

  const handleBookmarkClick = (movie: Movie) => {
    if (isLoggedIn) {
      toggleBookmark(movie)
      setWatchlist(getBookmarks())
    } else {
      handleLoginRequired()
    }
  }

  return (
    <PageWrapper>
      {isLoggedIn ? (
        <MovieGridLayout
          movies={watchlist}
          gridTitle="Your Watchlist"
          onClickFavorite={handleFavoriteClick}
          onClickBookmark={handleBookmarkClick}
          isFavorite={(movie) => isFavorite(movie.id)}
          isBookmarked={(movie) => isBookmarked(movie.id)}
          isAuthenticated={isLoggedIn}
          onLoginRequired={handleLoginRequired}
        />
      ) : (
        <div className="text-white text-center">
          Please log in to view your watchlist.
        </div>
      )}
    </PageWrapper>
  )
}
