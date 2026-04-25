import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  clearTrip,
  removeCountryFromTrip,
  setPlannerOpen,
} from "../../features/trips/tripsSlice"

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const { plannerOpen, selectedCountries } = useAppSelector((state) => state.trips)

  if (!plannerOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={() => dispatch(setPlannerOpen(false))}
      />

      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-[#11182E] p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Plan a trip</h2>

          <button
            onClick={() => dispatch(setPlannerOpen(false))}
            className="rounded-xl border border-white/10 px-3 py-1 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm text-white/60 mb-4">
            Drag countries here to build your trip itinerary.
          </p>

          <div className="min-h-[220px] rounded-2xl border border-dashed border-white/15 bg-white/5 p-4">
            {selectedCountries.length === 0 ? (
              <div className="flex h-full min-h-[180px] items-center justify-center text-center text-white/40">
                No countries selected yet
              </div>
            ) : (
              <div className="space-y-3">
                {selectedCountries.map((code) => (
                  <div
                    key={code}
                    className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3"
                  >
                    <span>{code}</span>
                    <button
                      onClick={() => dispatch(removeCountryFromTrip(code))}
                      className="text-sm text-red-300 hover:text-red-200"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              disabled={!selectedCountries.length}
              className="flex-1 rounded-2xl bg-white text-black px-4 py-3 font-medium disabled:opacity-40"
            >
              Save a trip
            </button>

            <button
              onClick={() => dispatch(clearTrip())}
              disabled={!selectedCountries.length}
              className="rounded-2xl border border-white/10 px-4 py-3 disabled:opacity-40"
            >
              Clear
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}