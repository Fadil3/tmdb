import { useParams } from 'react-router-dom'
import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

import BookmarkIcon from '../assets/bookmark.svg'
import BookmarkFilledIcon from '../assets/bookmark-filled.svg'
import FavoriteIcon from '../assets/favorite.svg'
import FavoriteFilledIcon from '../assets/favorite-filled.svg'
import Navbar from '../components/Navbar'
import { Genre, IMovieDetail } from '../types/movie-detail'
import { useApi } from '../hooks/useApi'
import CircleProgressBar from '../components/CircleProgressBar'
import MovieDetailSkeleton from '../components/Loader/MovieDetailSkeleton'
import { MovieResponse } from '../types/movie-lists'
import MovieGridLayout from '../components/Layouts/MovieGridLayout'
import MovieCardSkeleton from '../components/Loader/MovieCardSkeleton'
import { toggleFavorite, toggleBookmark, isFavorite, isBookmarked } from '../utils/MovieAction'
import LoginModal from '../components/LoginModal'

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorite(Number(id)))
  const [bookmarkStatus, setBookmarkStatus] = useState(isBookmarked(Number(id)))
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { isLoggedIn } = useAuth()

  const {
    data: movieData,
    loading,
    error,
  } = useApi<IMovieDetail>(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      delay: 500
    },
  )

  const {
    data: nowPlayingMovies,
    loading: nowPlayingLoading,
    error: nowPlayingError,
  } = useApi<MovieResponse>(
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US',
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      delay: 500
    },
  )

  const handleFavoriteClick = useCallback(() => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true)
      return
    }
    if (movieData) {
      const newStatus = toggleFavorite(movieData)
      setFavoriteStatus(newStatus)
    }
  }, [movieData, isLoggedIn])

  const handleBookmarkClick = useCallback(() => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true)
      return
    }
    if (movieData) {
      const newStatus = toggleBookmark(movieData)
      setBookmarkStatus(newStatus)
    }
  }, [movieData, isLoggedIn])

  const handleLoginRequired = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true)
    }
  }

  if (loading || nowPlayingLoading) {
    return (
      <>
        <Navbar />
        <MovieDetailSkeleton />
        <div className="px-10 py-[50px] bg-black">
          <h2 className="font-semibold text-5xl text-white mb-8">
            Now Playing
          </h2>
          <div className="grid grid-cols-5 xl:grid-cols-6 gap-7"> {
            Array.from({ length: 8 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          }</div>
        </div>
      </>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <Navbar />
      <main>
        <section
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
            url(https://image.tmdb.org/t/p/w780${movieData?.backdrop_path})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'top',
          }}
          className={`h-[400px] px-10 py-[50px]`}
        >
          <div className="flex gap-5 text-white items-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
              alt="photo"
              className="w-[200px] h-[300px] object-cover rounded-md"
              loading="lazy"
            />
            <div className="">
              <h1 className="font-bold text-4xl mb-2">
                {movieData?.original_title}{' '}
                <span className="font-normal">({new Date(movieData?.release_date || '').getFullYear()})</span>
              </h1>
              <p className="mb-5">
                {movieData?.release_date} • {" "}
                {movieData?.genres.map((genre: Genre) => genre.name).join(', ')}{' '}
                •{" "}{movieData?.runtime} min
              </p>
              <div className="flex gap-3 mb-6 items-center">
                <CircleProgressBar
                  value={
                    Math.round(
                      movieData?.vote_average
                        ? movieData?.vote_average * 10
                        : 0,
                    ) || 0
                  }
                />
                <p className="text-white text-xs">
                  User
                  <br />
                  Score
                </p>
                <img
                  src={bookmarkStatus ? BookmarkFilledIcon : BookmarkIcon}
                  alt="bookmark"
                  className="w-5 h-5 cursor-pointer"
                  onClick={handleBookmarkClick}
                />
                <img
                  src={favoriteStatus ? FavoriteFilledIcon : FavoriteIcon}
                  alt="favorite"
                  className="w-5 h-5 cursor-pointer"
                  onClick={handleFavoriteClick}
                />
              </div>
              <i className="mb-3">The World Forever Changes.</i>
              <h2 className="font-bold mb-1">Overview</h2>
              <p>{movieData?.overview}</p>
            </div>
          </div>
        </section>
        <section className="bg-black min-h-screen px-10 py-[50px]">
          <section className="h-full">
            <MovieGridLayout
              movies={nowPlayingMovies?.results || []}
              gridTitle="Now Playing"
              isLoading={nowPlayingLoading}
              isError={nowPlayingError !== null}
              errorMessage='An error occurred while fetching movies.'
              onClickFavorite={toggleFavorite}
              onClickBookmark={toggleBookmark}
              isFavorite={(movie) => isFavorite(movie.id)}
              isBookmarked={(movie) => isBookmarked(movie.id)}
              isAuthenticated={isLoggedIn}
              onLoginRequired={handleLoginRequired}
            />
          </section>
        </section>
      </main>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
