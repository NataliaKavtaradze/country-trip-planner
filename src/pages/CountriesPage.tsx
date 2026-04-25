import CountryFilters from "../components/country/CountryFilters"
import CountryGrid from "../components/country/CountryGrid"
import CountryModal from "../components/country/CountryModal"
import { useAppSelector } from "../app/hooks"
import { useGetCountriesQuery } from "../features/countries/countriesApi"

export default function CountriesPage() {
  const { data, isLoading, isError } = useGetCountriesQuery()
  const { search, region, favoritesOnly } = useAppSelector(
    (state) => state.countries
  )
  const favorites = useAppSelector((state) => state.favorites.items)

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