import type { Country } from "../../features/countries/types"
import CountryCard from "./CountryCard"

type CountryGridProps = {
  countries: Country[]
}

export default function CountryGrid({ countries }: CountryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  )
}