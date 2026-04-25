import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setModalOpen, setSelectedCountry } from "../../features/countries/countriesSlice"
import { useGetCountryByCodeQuery } from "../../features/countries/countriesApi"

export default function CountryModal() {
  const dispatch = useAppDispatch()
  const { selectedCountry, isModalOpen } = useAppSelector((state) => state.countries)

  const { data, isLoading } = useGetCountryByCodeQuery(selectedCountry!, {
    skip: !selectedCountry,
  })

  if (!isModalOpen || !selectedCountry) return null

  const country = data?.[0]

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#11182E] border border-white/10 p-6">
        <button
          onClick={() => {
            dispatch(setModalOpen(false))
            dispatch(setSelectedCountry(null))
          }}
          className="absolute right-4 top-4 rounded-xl border border-white/10 px-3 py-1 hover:bg-white/10"
        >
          ✕
        </button>

        {isLoading ? (
          <p className="text-white/60">Loading country details...</p>
        ) : country ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={country.flags.png}
                alt={country.flags.alt || country.name.common}
                className="w-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-3xl font-bold">{country.name.common}</h3>
              <p className="mt-1 text-white/60">{country.name.official}</p>

              <div className="mt-6 space-y-3 text-sm text-white/80">
                <p>
                  <span className="text-white/50">Capital:</span>{" "}
                  {country.capital?.[0] || "N/A"}
                </p>
                <p>
                  <span className="text-white/50">Region:</span> {country.region}
                </p>
                <p>
                  <span className="text-white/50">Subregion:</span>{" "}
                  {country.subregion || "N/A"}
                </p>
                <p>
                  <span className="text-white/50">Population:</span>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span className="text-white/50">Languages:</span>{" "}
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A"}
                </p>
                <p>
                  <span className="text-white/50">Currencies:</span>{" "}
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
          <p className="text-red-400">Failed to load country details.</p>
        )}
      </div>
    </div>
  )
}