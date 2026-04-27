import { X, Heart, Plus, MapPin, Globe, Users, Clock, Coins } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { closeModal } from "../../features/countries/countriesSlice"
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice"
import { addCountryToTrip } from "../../features/trips/tripsSlice"
import type { Country } from "../../types/country"

type CountryModalProps = {
  country: Country
}

export default function CountryModal({ country }: CountryModalProps) {
  const dispatch = useAppDispatch()

  const { favorites } = useAppSelector((state) => state.favorites)
  const { selectedCountries } = useAppSelector((state) => state.trips)

  const isFavorite = favorites.includes(country.cca3)
  const isInTrip = selectedCountries.includes(country.cca3)

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(country.cca3))
    } else {
      dispatch(addFavorite(country.cca3))
    }
  }

  const handleAddToTrip = () => {
    if (!isInTrip) {
      dispatch(addCountryToTrip(country.cca3))
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Close */}
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow hover:bg-white"
        >
          <X className="h-5 w-5 text-slate-700" />
        </button>

        {/* Flag Header */}
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-bold">{country.name.common}</h2>
            <p className="text-sm opacity-90">{country.name.official}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-b border-slate-200 px-5 py-4">
          <button
            onClick={handleFavorite}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              isFavorite
                ? "bg-red-50 text-red-600"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Added to Favorites" : "Add to Favorites"}
          </button>

          <button
            onClick={handleAddToTrip}
            disabled={isInTrip}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white transition ${
              isInTrip
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Plus className="h-4 w-4" />
            {isInTrip ? "Added to Trip" : "Add to Trip"}
          </button>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 gap-6 px-5 py-5 sm:grid-cols-2">
          <InfoItem
            icon={<MapPin className="h-4 w-4 text-blue-500" />}
            label="Region"
            value={`${country.region}${country.subregion ? ` • ${country.subregion}` : ""}`}
          />
          <InfoItem
            icon={<Coins className="h-4 w-4 text-yellow-500" />}
            label="Currency"
            value={
              country.currencies
                ? Object.values(country.currencies)
                    .map((c) => `${c.name} (${c.symbol ?? ""})`)
                    .join(", ")
                : "N/A"
            }
          />
          <InfoItem
            icon={<MapPin className="h-4 w-4 text-indigo-500" />}
            label="Capital"
            value={country.capital?.[0] || "N/A"}
          />
          <InfoItem
            icon={<Globe className="h-4 w-4 text-violet-500" />}
            label="Languages"
            value={
              country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"
            }
          />
          <InfoItem
            icon={<Users className="h-4 w-4 text-green-500" />}
            label="Population"
            value={country.population.toLocaleString()}
          />
          <InfoItem
            icon={<Clock className="h-4 w-4 text-red-500" />}
            label="Timezones"
            value={country.timezones?.join(", ") || "N/A"}
          />
        </div>
      </div>
    </div>
  )
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-sm text-slate-600">{value}</p>
      </div>
    </div>
  )
}