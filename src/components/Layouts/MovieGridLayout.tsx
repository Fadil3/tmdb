import MovieCard from '../MovieCard'
import MovieCardSkeleton from '../Loader/MovieCardSkeleton'

import { Movie } from '../../types/movie-lists'
interface MovieGridLayoutProps {
  movies: Movie[]
  onClickFavorite: (movie: Movie) => void
  onClickBookmark: (movie: Movie) => void
  isFavorite: (movie: Movie) => boolean
  isBookmarked: (movie: Movie) => boolean
  gridTitle?: string
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  isEmpty?: boolean
  isFetching?: boolean
  isSuccess?: boolean
  isAuthenticated: boolean
  onLoginRequired: () => void
}

export default function MovieGridLayout({
  movies,
  onClickFavorite,
  onClickBookmark,
  isFavorite,
  isBookmarked,
  gridTitle,
  isLoading,
  isError,
  errorMessage,
  isAuthenticated,
  onLoginRequired
}: MovieGridLayoutProps) {
  return (
    <section className="h-full">
      <h2 className="font-semibold text-5xl text-white text-left mb-8">
        {gridTitle}
      </h2>
      <div className="grid grid-cols-5 xl:grid-cols-6 gap-7">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))
        ) : isError ? (
          <div className="col-span-full text-center text-red-500">
            Error: {errorMessage || 'An error occurred while fetching movies.'}
          </div>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClickBookmark={onClickBookmark}
              onClickFavorite={onClickFavorite}
              isBookmarked={isBookmarked}
              isFavorite={isFavorite}
              isAuthenticated={isAuthenticated}
              onLoginRequired={onLoginRequired}
            />
          ))
        )}
      </div>
    </section>
  )
}
