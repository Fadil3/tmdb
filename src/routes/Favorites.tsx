import Navbar from '../components/Navbar'
import MovieGridLayout from '../Layouts/MovieGridLayout'

export default function Favorites() {
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
      <main className="w-full min-h-screen bg-black flex flex-col gap-8 p-20">
        <MovieGridLayout
          movies={dummyMovies}
          gridTitle="Your Favorite Movies"
        />
      </main>
    </>
  )
}
