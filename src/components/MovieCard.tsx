import { Movie } from '../types/movie-lists'
import BookmarkIcon from '../assets/bookmark.svg'
import BookmarkFilledIcon from '../assets/bookmark-filled.svg'
import FavoriteIcon from '../assets/favorite.svg'
import FavoriteFilledIcon from '../assets/favorite-filled.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface MovieCardProps {
  movie: Movie
  onClickFavorite: (movie: Movie) => void
  onClickBookmark: (movie: Movie) => void
  isFavorite: (movie: Movie) => boolean
  isBookmarked: (movie: Movie) => boolean
}

export default function MovieCard({
  movie,
  onClickFavorite,
  onClickBookmark,
  isFavorite,
  isBookmarked,
}: MovieCardProps) {
  const navigate = useNavigate()
  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false)
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false)

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const handleIconClick = (e: React.MouseEvent, callback: (movie: Movie) => void) => {
    e.stopPropagation()
    callback(movie)
  }

  return (
    <div
      className="bg-[#050E12] cursor-pointer rounded-lg h-[355px] w-[193px] shrink-0"
      onClick={handleCardClick}
    >
      <div className="overflow-hidden rounded-t-lg relative group">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          loading='lazy'
          alt="photo"
          className="h-[289px] w-full object-cover z-0"
        />
        <div className="bg-gradient-to-b from-slate-500 to-zinc-800 h-full w-full invisible group-hover:visible absolute z-[1] opacity-50 top-0" />
        <div className="absolute bottom-2 left-0 w-full h-12 flex justify-end items-center px-4 invisible group-hover:visible z-[2]">
          <div className="flex gap-2">
            <div
              className="w-6 h-6 cursor-pointer"
              onClick={(e) => handleIconClick(e, onClickBookmark)}
              onMouseEnter={() => setIsBookmarkHovered(true)}
              onMouseLeave={() => setIsBookmarkHovered(false)}
            >
              <img
                src={
                  isBookmarkHovered || isBookmarked(movie)
                    ? BookmarkFilledIcon
                    : BookmarkIcon
                }
                alt="Bookmark"
              />
            </div>
            <div
              className="w-6 h-6 cursor-pointer"
              onClick={(e) => handleIconClick(e, onClickFavorite)}
              onMouseEnter={() => setIsFavoriteHovered(true)}
              onMouseLeave={() => setIsFavoriteHovered(false)}
            >
              <img
                src={
                  isFavoriteHovered || isFavorite(movie)
                    ? FavoriteFilledIcon
                    : FavoriteIcon
                }
                alt="Favorite"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 text-left py-2">
        <h4 className="text-[#B6B6B6] font-bold line-clamp-1">{movie.title}</h4>
        <h5 className="text-[#828282]">{new Date(movie.release_date).getFullYear()}</h5>
      </div>
    </div>
  )
}
