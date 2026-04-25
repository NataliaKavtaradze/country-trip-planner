import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Search, Heart, Filter } from "lucide-react"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setPlannerOpen } from "../features/trips/tripsSlice"
import { useGetCountriesQuery } from "../features/countries/countriesApi"

import CountryGrid from "../components/country/CountryGrid"
import CountryModal from "../components/country/CountryModal"
import {
  setFavoritesOnly,
  setRegion,
  setSearch,
} from "../features/countries/countriesSlice"

export default function CountriesPage() {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data, isLoading, isError } = useGetCountriesQuery()
  const { search, region, favoritesOnly } = useAppSelector(
    (state) => state.countries
  )
  const favorites = useAppSelector((state) => state.favorites.items)

  useEffect(() => {
    if (searchParams.get("planner") === "open") {
      dispatch(setPlannerOpen(true))
      setSearchParams({})
    }
  }, [dispatch, searchParams, setSearchParams])

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#F8FAFC] px-6 py-8 text-slate-900">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-slate-500">Loading countries...</p>
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="min-h-screen bg-[#F8FAFC] px-6 py-8 text-slate-900">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-red-500">Failed to load countries.</p>
        </div>
      </section>
    )
  }

  const filteredCountries =
    data?.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesRegion = region === "All" || country.region === region
      const matchesFavorites = !favoritesOnly || favorites.includes(country.cca3)

      return matchesSearch && matchesRegion && matchesFavorites
    }) ?? []

  return (
    <section className="min-h-screen bg-[#F8FAFC] px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        {/* Top Filters */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Region Filter */}
          <div className="relative w-full lg:w-[250px]">
            <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={region}
              onChange={(e) => dispatch(setRegion(e.target.value))}
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"
            >
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          {/* Favorites */}
          <label className="flex items-center gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={favoritesOnly}
              onChange={() => dispatch(setFavoritesOnly(!favoritesOnly))}
              className="h-4 w-4 rounded border-slate-300"
            />
            <Heart className="h-4 w-4 text-slate-400" />
            Show favorites only
          </label>
        </div>

        {/* Counter */}
        <p className="mb-6 text-sm text-slate-500">
          Showing {filteredCountries.length} of {data?.length ?? 0} countries
        </p>

        {/* Grid */}
        <CountryGrid countries={filteredCountries} />

        {/* Modal */}
        <CountryModal />
      </div>
    </section>
  )
}