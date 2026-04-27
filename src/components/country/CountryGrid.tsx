import type { Country } from "../../features/countries/types"
import CountryCard from "./CountryCard"

type CountryGridProps = {
  countries: Country[]
}

export default function CountryGrid({ countries }: CountryGridProps) {
  if (!countries.length) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            No countries found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  )
}