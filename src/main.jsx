import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./components/Home.jsx";
import Movies from "./components/Movies.jsx";
import Genres from "./components/Genres.jsx";
import GraphQL from "./components/GraphQL.jsx";
import Login from "./components/Login.jsx";
import EditMovie from "./components/EditMovie.jsx";
import Movie from "./components/Movie.jsx";
import ManageCatalogue from "./components/ManageCatalogue.jsx";
import { AppProvider } from './context/AppContext';
// adjust path if needed

// Wrap App component with AppProvider
const AppWithProvider = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

// Wrap Login component with AppProvider
const LoginWithProvider = () => (
  <AppProvider>
    <Login />
  </AppProvider>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWithProvider />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {
        path: '/movies',
        element: <Movies />
      },
      {
        path: '/graphQL',
        element: <GraphQL />
      },
      {
        path: '/admin/movie/:id',
        element: <EditMovie />
      },
      {
        path: '/movie/:id',
        element: <Movie />
      },
      {
        path: '/genres',
        element: <Genres />
      },
      {
        path: '/admin/manage-catalogue',
        element: <ManageCatalogue />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginWithProvider />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
