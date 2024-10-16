import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Root from './routes/Root'
import MovieDetail from './routes/MovieDetail'
import Favorites from './routes/Favorites'
import Watchlists from './routes/Watchlists'

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Root />,
  },
  {
    path: '/watchlists',
    element: <Watchlists />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
  {
    path: '/movies',
    element: <div>list movies</div>,
  },
  {
    path: '/movie/:id',
    element: <MovieDetail />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
