import { X, Users, MapPin, Globe2, Landmark } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  setModalOpen,
  setSelectedCountry,
} from "../../features/countries/countriesSlice"
import { useGetCountryByCodeQuery } from "../../features/countries/countriesApi"

export default function CountryModal() {
  const dispatch = useAppDispatch()
  const { selectedCountry, isModalOpen } = useAppSelector(
    (state) => state.countries
  )

  const { data, isLoading } = useGetCountryByCodeQuery(selectedCountry!, {
    skip: !selectedCountry,
  })

  if (!isModalOpen || !selectedCountry) return null

  const country = data?.[0]

  const handleClose = () => {
    dispatch(setModalOpen(false))
    dispatch(setSelectedCountry(null))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50"
        >
          <X className="h-5 w-5 text-slate-600" />
        </button>

        {isLoading ? (
          <p className="text-slate-500">Loading country details...</p>
        ) : country ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                {country.name.common}
              </h2>
              <p className="mt-1 text-slate-500">{country.name.official}</p>

              <div className="mt-6 space-y-4 text-sm text-slate-700">
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  Capital: {country.capital?.[0] || "N/A"}
                </p>

                <p className="flex items-center gap-3">
                  <Globe2 className="h-4 w-4 text-slate-400" />
                  Region: {country.region} / {country.subregion || "N/A"}
                </p>

                <p className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-slate-400" />
                  Population: {country.population.toLocaleString()}
                </p>

                <p className="flex items-center gap-3">
                  <Landmark className="h-4 w-4 text-slate-400" />
                  Languages:{" "}
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A"}
                </p>

                <p className="flex items-center gap-3">
                  <Landmark className="h-4 w-4 text-slate-400" />
                  Currencies:{" "}
                  {country.currencies
                    ? Object.values(country.currencies)
                        .map((currency) => `${currency.name} (${currency.symbol})`)
                        .join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-500">Failed to load country details.</p>
        )}
      </div>
    </div>
  )
}