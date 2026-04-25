import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useGetTripsQuery } from "../../features/trips/tripsApi"
import { loadTrip, setSavedTripsOpen } from "../../features/trips/tripsSlice"

export default function SavedTrips() {
  const dispatch = useAppDispatch()
  const { savedTripsOpen } = useAppSelector((state) => state.trips)
  const { data } = useGetTripsQuery()

  if (!savedTripsOpen) return null

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
      <h3 className="mb-4 text-lg font-semibold">Saved trips</h3>

      {!data?.length ? (
        <p className="text-sm text-white/50">No saved trips yet.</p>
      ) : (
        <div className="space-y-3">
          {data.map((trip) => (
            <button
              key={trip.id}
              onClick={() => dispatch(loadTrip(trip.countries))}
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10 transition"
            >
              <p className="font-medium">{trip.title}</p>
              <p className="text-xs text-white/50 mt-1">
                {trip.countries.length} countries •{" "}
                {new Date(trip.createdAt).toLocaleDateString()}
              </p>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => dispatch(setSavedTripsOpen(false))}
        className="mt-4 w-full rounded-xl border border-white/10 px-4 py-2 hover:bg-white/10"
      >
        Close saved trips
      </button>
    </div>
  )
}