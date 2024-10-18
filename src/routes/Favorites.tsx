import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import PageWrapper from '../components/Layouts/PageWrapper'
import MovieGridLayout from '../components/Layouts/MovieGridLayout'
import { getFavorites, toggleFavorite, isFavorite, toggleBookmark, isBookmarked } from '../utils/MovieAction'
import { Movie } from '../types/movie-lists'

export default function Favorites() {
  const { isLoggedIn, openLoginModal } = useAuth()
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [_bookmarkStatus, setBookmarkStatus] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    if (isLoggedIn) {
      setFavorites(getFavorites())
    } else {
      openLoginModal()
    }
  }, [isLoggedIn])

  const handleLoginRequired = () => {
    openLoginModal()
  }

  const handleFavoriteClick = (movie: Movie) => {
    if (isLoggedIn) {
      toggleFavorite(movie)
      setFavorites(getFavorites())
    } else {
      handleLoginRequired()
    }
  }

  const handleBookmarkClick = (movie: Movie) => {
    if (isLoggedIn) {
      toggleBookmark(movie)
      setBookmarkStatus(prev => ({ ...prev, [movie.id]: !prev[movie.id] }))
    } else {
      handleLoginRequired()
    }
  }

  return (
    <PageWrapper>
      {isLoggedIn ? (
        <MovieGridLayout
          movies={favorites}
          gridTitle="Your Favorite Movies"
          onClickFavorite={handleFavoriteClick}
          onClickBookmark={handleBookmarkClick}
          isFavorite={(movie) => isFavorite(movie.id)}
          isBookmarked={(movie) => isBookmarked(movie.id)}
          isAuthenticated={isLoggedIn}
          onLoginRequired={handleLoginRequired}
        />
      ) : (
        <div className="text-white text-center">
          Please log in to view your favorites.
        </div>
      )}
    </PageWrapper>
  )
}
