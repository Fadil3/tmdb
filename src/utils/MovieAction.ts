import { Movie } from '../types/movie-lists'

const FAVORITES_KEY = 'favoriteMovies'
const BOOKMARKS_KEY = 'bookmarkedMovies'

function getStoredMovies(key: string): Movie[] {
  const storedMovies = localStorage.getItem(key)
  return storedMovies ? JSON.parse(storedMovies) : []
}

function setStoredMovies(key: string, movies: Movie[]): void {
  localStorage.setItem(key, JSON.stringify(movies))
}

export function toggleMovieInList(movie: Movie, listKey: string): boolean {
  const storedMovies = getStoredMovies(listKey)
  const index = storedMovies.findIndex(m => m.id === movie.id)

  if (index === -1) {
    storedMovies.push(movie)
  } else {
    storedMovies.splice(index, 1)
  }

  setStoredMovies(listKey, storedMovies)
  return index === -1
}

export function isMovieInList(movieId: number, listKey: string): boolean {
  const storedMovies = getStoredMovies(listKey)
  return storedMovies.some(m => m.id === movieId)
}

export function toggleFavorite(movie: Movie): boolean {
  return toggleMovieInList(movie, FAVORITES_KEY)
}

export function toggleBookmark(movie: Movie): boolean {
  return toggleMovieInList(movie, BOOKMARKS_KEY)
}

export function isFavorite(movieId: number): boolean {
  return isMovieInList(movieId, FAVORITES_KEY)
}

export function isBookmarked(movieId: number): boolean {
  return isMovieInList(movieId, BOOKMARKS_KEY)
}

export function getFavorites(): Movie[] {
  return getStoredMovies(FAVORITES_KEY)
}

export function getBookmarks(): Movie[] {
  return getStoredMovies(BOOKMARKS_KEY)
}
