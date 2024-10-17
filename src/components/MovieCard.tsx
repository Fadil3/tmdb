import { Movie } from '../types/movie'
import BookmarkIcon from '../assets/bookmark.svg'
import BookmarkFilledIcon from '../assets/bookmark-filled.svg'
import FavoriteIcon from '../assets/favorite.svg'
import FavoriteFilledIcon from '../assets/favorite-filled.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface MovieCardProps {
  movie: Movie
  onClickFavorite?: () => void
  onClickBookmark?: () => void
  isFavorite?: boolean
  isBookmarked?: boolean
}
export default function MovieCard({
  movie: {
    id,
    poster_path,
    title,
    release_date,
    vote_average,
    vote_count,
    overview,
  },
  onClickFavorite,
  onClickBookmark,
  isFavorite,
  isBookmarked,
}: MovieCardProps) {
  const navigate = useNavigate()
  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false)
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false)

  const handleCardClick = () => {
    navigate(`/movie/${id}`)
  }

  const handleIconClick = (e: React.MouseEvent, callback?: () => void) => {
    e.stopPropagation()
    if (callback) {
      callback()
    }
  }

  return (
    <div
      className="bg-[#050E12] cursor-pointer rounded-lg h-[355px] w-[193px] shrink-0"
      onClick={handleCardClick}
    >
      <div className="overflow-hidden rounded-t-lg relative group">
        <img
          src="https://placehold.co/600x400"
          alt="photo"
          className="h-[289px] w-full object-cover z-0"
        />
        <div className="bg-gradient-to-b from-slate-50 to-zinc-800 h-full w-full invisible group-hover:visible absolute z-[1] opacity-80 top-0" />
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
                  isBookmarkHovered || isBookmarked
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
                  isFavoriteHovered || isFavorite
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
        <h4 className="text-[#B6B6B6] font-bold">{title}</h4>
        <h5 className="text-[#828282]">{release_date}</h5>
      </div>
    </div>
  )
}