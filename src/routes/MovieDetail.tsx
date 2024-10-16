import BookmarkIcon from '../assets/bookmark.svg'
import BookmarkFilledIcon from '../assets/bookmark-filled.svg'
import FavoriteIcon from '../assets/favorite.svg'
import FavoriteFilledIcon from '../assets/favorite-filled.svg'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'

export default function MovieDetail() {
  const dummyMovies = Array(9).fill({
    id: 1,
    adult: false,
    backdrop_path: 'https://placehold.co/600x400',
    genre_ids: [1, 2, 3],
    poster_path: 'https://placehold.co/600x400',
    title: 'The Godfather',
    release_date: '1972',
    vote_average: 8.7,
    vote_count: 1000,
    overview:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    original_language: 'en',
    original_title: 'The Godfather',
    popularity: 85.5,
    video: false,
  })
  return (
    <>
      <Navbar />
      <main>
        <section className="h-[400px] bg-slate-600 px-10 py-[50px]">
          <div className="flex gap-5 text-white items-center">
            <img
              src="https://placehold.co/600x400"
              alt="photo"
              className="w-[200px] h-[300px] object-cover rounded-md"
              loading="lazy"
            />
            <div className="">
              <h1 className="font-bold text-4xl mb-2">
                Oppenheimer <span className="font-normal">(2023)</span>
              </h1>
              <p className="mb-5">07/19/2023 • Drama, History • 3h 1m</p>
              <div className="flex gap-3 mb-6 items-center">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white">
                  <svg className="transform -rotate-90 w-7 h-7">
                    <circle
                      cx="14"
                      cy="14"
                      r="12"
                      stroke="currentColor"
                      stroke-width="4"
                      fill="transparent"
                      className="text-[#EDEDED]"
                    />
                    <circle
                      cx="14"
                      cy="14"
                      r="12"
                      stroke="currentColor"
                      stroke-width="4"
                      fill="transparent"
                      stroke-dasharray={2 * Math.PI * 10}
                      stroke-dashoffset={
                        2 * Math.PI * 10 - (20 / 100) * (2 * Math.PI * 10)
                      }
                      className="text-[#0EA5E9]"
                    />
                  </svg>
                  <span className="absolute text-xs text-[#0EA5E9] font-black">
                    28
                  </span>
                </div>
                <p className="text-white text-xs">
                  User
                  <br />
                  Score
                </p>
                <img src={BookmarkIcon} alt="bookmark" className="w-5 h-5" />
                <img src={FavoriteIcon} alt="bookmark" className="w-5 h-5" />
              </div>
              <i className="mb-3">The World Forever Changes.</i>
              <h2 className="font-bold mb-1">Overview</h2>
              <p>
                The story of J. Robert Oppenheimer's role in the development of
                the atomic bomb during World War II.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-black min-h-screen px-10 py-[50px]">
          <section className="h-full">
            <h2 className="font-semibold text-5xl text-white text-left mb-5">
              Now Playing
            </h2>
            <div className="flex gap-7 overflow-x-scroll py-4 ">
              {dummyMovies.map((movie, index) => (
                <MovieCard key={`${movie.id}-${index}`} movie={movie} />
              ))}
            </div>
          </section>
        </section>
      </main>
    </>
  )
}
