import { useGetCountriesQuery } from "../../features/countries/countriesApi"
import { useGetTripsQuery, useSaveTripMutation } from "../../features/trips/tripsApi"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  clearTrip,
  removeCountryFromTrip,
  setPlannerOpen,
  setSavedTripsOpen,
} from "../../features/trips/tripsSlice"
import DropZone from "../trip/DropZone"
import SavedTrips from "../trip/SavedTrips"

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const { plannerOpen, selectedCountries } = useAppSelector((state) => state.trips)

  const { data } = useGetCountriesQuery()
  const { data: savedTrips } = useGetTripsQuery()
  const [saveTrip, { isLoading: isSaving }] = useSaveTripMutation()

  if (!plannerOpen) return null

  const selectedCountryData =
    data?.filter((country) => selectedCountries.includes(country.cca3)) ?? []

  const handleSaveTrip = async () => {
    if (!selectedCountries.length) return

    await saveTrip({
      title: `Trip ${new Date().toLocaleDateString()}`,
      countries: selectedCountries,
      createdAt: new Date().toISOString(),
    })

    dispatch(clearTrip())
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={() => dispatch(setPlannerOpen(false))}
      />

      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-[#11182E] p-6 shadow-2xl overflow-y-auto">
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

          <DropZone>
            {selectedCountryData.length === 0 ? (
              <div className="flex h-full min-h-[180px] items-center justify-center text-center text-white/40">
                No countries selected yet
              </div>
            ) : (
              <div className="space-y-3">
                {selectedCountryData.map((country) => (
                  <div
                    key={country.cca3}
                    className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3"
                  >
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      className="h-10 w-14 rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-medium">{country.name.common}</p>
                      <p className="text-xs text-white/50">{country.region}</p>
                    </div>

                    <button
                      onClick={() => dispatch(removeCountryFromTrip(country.cca3))}
                      className="text-sm text-red-300 hover:text-red-200"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </DropZone>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSaveTrip}
              disabled={!selectedCountries.length || isSaving}
              className="flex-1 rounded-2xl bg-white text-black px-4 py-3 font-medium disabled:opacity-40"
            >
              {isSaving ? "Saving..." : "Save a trip"}
            </button>

            <button
              onClick={() => dispatch(clearTrip())}
              disabled={!selectedCountries.length}
              className="rounded-2xl border border-white/10 px-4 py-3 disabled:opacity-40"
            >
              Clear
            </button>
          </div>

          {!!savedTrips?.length && (
            <button
              onClick={() => dispatch(setSavedTripsOpen(true))}
              className="mt-4 w-full rounded-2xl border border-white/10 px-4 py-3 hover:bg-white/10"
            >
              Saved trips
            </button>
          )}

          <SavedTrips />
        </div>
      </aside>
    </>
  )
}