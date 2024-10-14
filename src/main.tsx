import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import Root from './routes/Root';

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Root />,
  },
  {
    path: "/watchlists",
    element: <div>watchlists!</div>,
  },
  {
    path: "/favorites",
    element: <div>favorites</div>,
  },
  {
    path: "/movies",
    element: <div>list movies</div>,
  },
  {
    path: "/movie/:id",
    element: <div>Detail movie</div>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
