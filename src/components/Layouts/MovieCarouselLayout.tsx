import React from 'react';
import MovieCardSkeleton from '../Loader/MovieCardSkeleton';
import MovieCard from '../MovieCard';
import { Movie } from '../../types/movie-lists';

interface MovieCarouselLayoutProps {
  movies: Movie[];
  onClickFavorite: (movie: Movie) => void;
  onClickBookmark: (movie: Movie) => void;
  isFavorite: (movie: Movie) => boolean;
  isBookmarked: (movie: Movie) => boolean;
  carouselTitle: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const MovieCarouselLayout: React.FC<MovieCarouselLayoutProps> = ({
  movies,
  onClickFavorite,
  onClickBookmark,
  isFavorite,
  isBookmarked,
  carouselTitle,
  isLoading,
  isError,
  errorMessage,
}) => {
  const renderErrorMessage = (message: string) => (
    <div className="text-red-500 text-xl">{message}</div>
  );

  return (
    <section className="h-full">
      <h2 className="font-semibold text-5xl text-white text-left mb-5">
        {carouselTitle}
      </h2>
      {isError ? (
        renderErrorMessage(errorMessage)
      ) : (
        <div className="flex gap-7 overflow-x-scroll py-4">
          {isLoading
            ? Array(10).fill(0).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
            : movies.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} onClickBookmark={onClickBookmark} onClickFavorite={onClickFavorite} isBookmarked={isBookmarked} isFavorite={isFavorite} />
            ))}
        </div>
      )}
    </section>
  );
};

export default MovieCarouselLayout;
