import { Search, Heart, Filter } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  setFavoritesOnly,
  setRegion,
  setSearch,
} from "../../features/countries/countriesSlice"

type CountryFiltersProps = {
  total: number
  filtered: number
}

export default function CountryFilters({
  total,
  filtered,
}: CountryFiltersProps) {
  const dispatch = useAppDispatch()
  const { search, region, favoritesOnly } = useAppSelector(
    (state) => state.countries
  )

  return (
    <div className="mb-6">
      {/* Filters Row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
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
        <div className="relative w-full lg:w-[220px]">
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
        <button
          type="button"
          onClick={() => dispatch(setFavoritesOnly(!favoritesOnly))}
          className={`flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
            favoritesOnly
              ? "border-red-200 bg-red-50 text-red-600"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Heart
            className="h-4 w-4"
            fill={favoritesOnly ? "currentColor" : "none"}
          />
          Favorites
        </button>
      </div>

      {/* Counter */}
      <p className="mt-4 text-sm text-slate-500">
        Showing {filtered} of {total} countries
      </p>
    </div>
  )
}