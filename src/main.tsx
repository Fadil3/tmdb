import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Root from './routes/Root'
import MovieDetail from './routes/MovieDetail'
import Favorites from './routes/Favorites'
import Watchlists from './routes/Watchlists'
import { AuthCallback } from './routes/AuthCallback'
import { AuthProvider } from './context/AuthContext'

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
  {
    path: '/auth-callback',
    element: <AuthCallback />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
