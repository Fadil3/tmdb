import MovieCard from '../components/MovieCard'

import { Movie } from '../types/movie'
interface MovieGridLayoutProps {
  movies: Movie[]
  gridTitle?: string
  isLoading?: boolean
  isError?: boolean
  isEmpty?: boolean
  isFetching?: boolean
  isSuccess?: boolean
}

export default function MovieGridLayout({
  movies,
  gridTitle,
  isLoading,
  isError,
  isEmpty,
  isFetching,
  isSuccess,
}: MovieGridLayoutProps) {
  return (
    <section className="h-full">
      <h2 className="font-semibold text-5xl text-white text-left mb-8">
        {gridTitle}
      </h2>
      <div className="grid grid-cols-5 xl:grid-cols-6 gap-7">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClickFavorite={() => console.log('Favorite')}
            onClickBookmark={() => console.log('Bookmark')}
            isFavorite={false}
            isBookmarked={false}
          />
        ))}
      </div>
    </section>
  )
}
