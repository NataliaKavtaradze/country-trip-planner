import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  setRegion,
  setSearch,
  setFavoritesOnly,
} from "../../features/countries/countriesSlice"

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"]

export default function CountryFilters() {
  const dispatch = useAppDispatch()
  const { search, region, favoritesOnly } = useAppSelector(
    (state) => state.countries
  )

  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="w-full lg:max-w-md rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <select
          value={region}
          onChange={(e) => dispatch(setRegion(e.target.value))}
          className="rounded-2xl border border-white/10 bg-[#11182E] px-4 py-3 outline-none"
        >
          {regions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          onClick={() => dispatch(setFavoritesOnly(!favoritesOnly))}
          className={`rounded-2xl px-4 py-3 border transition ${
            favoritesOnly
              ? "bg-white text-black border-white"
              : "border-white/10 bg-white/5"
          }`}
        >
          Favorites only
        </button>
      </div>
    </div>
  )
}