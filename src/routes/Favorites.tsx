import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import MovieGridLayout from '../components/Layouts/MovieGridLayout'
import LoginModal from '../components/LoginModal'
import { getFavorites, toggleFavorite, isFavorite, toggleBookmark, isBookmarked } from '../utils/MovieAction'
import { Movie } from '../types/movie-lists'

export default function Favorites() {
  const { isLoggedIn } = useAuth()
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [_bookmarkStatus, setBookmarkStatus] = useState<{ [key: number]: boolean }>({})
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      setFavorites(getFavorites())
    }
  }, [isLoggedIn])

  const handleLoginRequired = () => {
    setIsLoginModalOpen(true)
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
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-black flex flex-col gap-8 p-20">
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
      </main>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
