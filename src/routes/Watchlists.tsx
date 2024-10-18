import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import MovieGridLayout from '../components/Layouts/MovieGridLayout'
import LoginModal from '../components/LoginModal'
import { getBookmarks, toggleFavorite, isFavorite, toggleBookmark, isBookmarked } from '../utils/MovieAction'
import { Movie } from '../types/movie-lists'

export default function Watchlists() {
  const { isLoggedIn } = useAuth()
  const [watchlist, setWatchlist] = useState<Movie[]>([])
  const [_favoriteStatus, setFavoriteStatus] = useState<{ [key: number]: boolean }>({})
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      setWatchlist(getBookmarks())
    }
  }, [isLoggedIn])

  const handleLoginRequired = () => {
    setIsLoginModalOpen(true)
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
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-black flex flex-col gap-8 p-20">
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
      </main>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
