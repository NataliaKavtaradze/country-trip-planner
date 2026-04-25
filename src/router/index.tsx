import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/layout/Layout"
import HomePage from "../pages/HomePage"
import CountriesPage from "../pages/CountriesPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "countries",
        element: <CountriesPage />,
      },
    ],
  },
])