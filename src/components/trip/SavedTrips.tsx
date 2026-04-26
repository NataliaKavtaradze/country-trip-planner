import { Trash2 } from "lucide-react"

import { useGetCountriesQuery } from "../../features/countries/countriesApi"
import {
  useDeleteTripMutation,
  useGetTripsQuery,
} from "../../features/trips/tripsApi"

export default function SavedTrips() {
  const { data: trips, isLoading, isError } = useGetTripsQuery()
  const { data: countries } = useGetCountriesQuery()
  const [deleteTrip, { isLoading: isDeleting }] = useDeleteTripMutation()

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 py-8 text-center text-sm text-slate-400">
        Loading saved trips...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 py-8 text-center text-sm text-red-500">
        Failed to load saved trips
      </div>
    )
  }

  if (!trips?.length) {
    return (
      <div className="rounded-xl border border-slate-200 py-10 text-center text-sm text-slate-400">
        No saved trips yet
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="rounded-xl border border-slate-200 bg-white p-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-slate-800">{trip.title}</p>
              <p className="mt-1 text-xs text-slate-500">
                {trip.countries.length} countries
              </p>
            </div>

            <button
              type="button"
              onClick={() => deleteTrip(trip.id)}
              disabled={isDeleting}
              className="text-slate-400 transition hover:text-red-500 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {trip.countries.map((code) => {
              const country = countries?.find((c) => c.cca3 === code)

              return country ? (
                <span
                  key={code}
                  className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700"
                >
                  {country.name.common}
                </span>
              ) : null
            })}
          </div>
        </div>
      ))}
    </div>
  )
}