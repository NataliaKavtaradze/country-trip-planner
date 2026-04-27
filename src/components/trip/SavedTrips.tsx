
import { useGetCountriesQuery } from "../../features/countries/countriesApi"
import {
  useDeleteTripMutation,
  useGetTripsQuery,
} from "../../features/trips/tripsApi"
import { Calendar, Trash2 } from "lucide-react"

type SavedTripsProps = {
  tripsCount: number
}

export default function SavedTrips({ tripsCount }: SavedTripsProps) {
  const { data: trips = [] } = useGetTripsQuery()
  const { data: countries = [] } = useGetCountriesQuery()
  const [deleteTrip] = useDeleteTripMutation()

  if (tripsCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400">
        <Calendar className="h-10 w-10" />
        <p className="mt-3 text-sm">No saved trips</p>
        <p className="text-xs">Create and save your first trip</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {trips.map((trip) => {
        const tripCodes = Array.isArray(trip.countries) ? trip.countries : []

        const tripCountries = countries.filter((country) =>
          tripCodes.includes(country.cca3)
        )

        return (
          <div
            key={trip.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h4 className="font-medium text-slate-900">{trip.title}</h4>
                <p className="text-xs text-slate-500">
                  {new Date(trip.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => deleteTrip(trip.id)}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {tripCountries.length === 0 ? (
              <p className="text-xs text-slate-400">No countries found</p>
            ) : (
              <div className="space-y-2">
                {tripCountries.map((country) => (
                  <div
                    key={country.cca3}
                    className="flex items-center gap-3 rounded-xl bg-white px-3 py-2"
                  >
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      className="h-8 w-10 rounded object-cover"
                    />

                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {country.name.common}
                      </p>
                      <p className="text-xs text-slate-500">{country.region}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}