import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setPlannerOpen } from "../features/trips/tripsSlice"
import { useGetCountriesQuery } from "../features/countries/countriesApi"

import CountryFilters from "../components/country/CountryFilters"
import CountryGrid from "../components/country/CountryGrid"
import CountryModal from "../components/country/CountryModal"

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
    return <section className="min-h-screen bg-[#F8FAFC] px-6 py-8">Loading...</section>
  }

  if (isError) {
    return <section className="min-h-screen bg-[#F8FAFC] px-6 py-8">Error...</section>
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
        <CountryFilters total={data?.length ?? 0} filtered={filteredCountries.length} />
        <CountryGrid countries={filteredCountries} />
        <CountryModal />
      </div>
    </section>
  )
}