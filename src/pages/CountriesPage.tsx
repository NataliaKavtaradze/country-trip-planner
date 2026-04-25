import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import CountryFilters from "../components/country/CountryFilters"
import CountryGrid from "../components/country/CountryGrid"
import CountryModal from "../components/country/CountryModal"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setPlannerOpen } from "../features/trips/tripsSlice"
import { useGetCountriesQuery } from "../features/countries/countriesApi"

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

  if (isLoading) return <p className="text-white/60">Loading countries...</p>
  if (isError) return <p className="text-red-400">Failed to load countries.</p>

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
    <section>
      <h2 className="text-3xl font-bold mb-6">Countries</h2>
      <CountryFilters />
      <CountryGrid countries={filteredCountries} />
      <CountryModal />
    </section>
  )
}