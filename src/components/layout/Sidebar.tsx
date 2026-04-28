import { useState } from "react"
import { Trash2, X } from "lucide-react"
import { useGetCountriesQuery } from "../../features/countries/countriesApi"
import {
  useGetTripsQuery,
  useSaveTripMutation,
} from "../../features/trips/tripsApi"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  clearTrip,
  removeCountryFromTrip,
  setPlannerOpen,
} from "../../features/trips/tripsSlice"

import DropZone from "../trip/DropZone"
import SavedTrips from "../trip/SavedTrips"

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const { plannerOpen, selectedCountries } = useAppSelector((state) => state.trips)

  const [tripName, setTripName] = useState("")

  const { data: countries = [] } = useGetCountriesQuery()
  const { data: savedTrips = [] } = useGetTripsQuery()
  const [saveTrip, { isLoading }] = useSaveTripMutation()

  if (!plannerOpen) return null

  const selectedCountryData = countries.filter((country) =>
    selectedCountries.includes(country.cca3)
  )

  const handleSave = async () => {
    if (!selectedCountries.length || !tripName.trim()) return

    try {
      await saveTrip({
        title: tripName,
        countries: selectedCountries,
        createdAt: new Date().toISOString(),
      }).unwrap()

      setTripName("")
      dispatch(clearTrip())
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={() => dispatch(setPlannerOpen(false))}
      />

      <aside className="fixed right-0 top-0 z-[70] h-screen w-full max-w-[360px] overflow-hidden border-l border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 px-5 py-4 text-white">
          <div>
            <h2 className="text-lg font-semibold">Trip Planner</h2>
            <p className="text-xs text-blue-100">
              Drag countries here to add them to your trip
            </p>
          </div>

          <button onClick={() => dispatch(setPlannerOpen(false))}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Current Trip */}
          <DropZone>
            <div className="rounded-2xl border border-dashed border-blue-300 bg-slate-50 p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-medium text-slate-800">Current Trip</h3>

                {selectedCountryData.length > 0 && (
                  <button
                    onClick={() => dispatch(clearTrip())}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {selectedCountryData.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-400">
                  Drag countries here
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedCountryData.map((country) => (
                    <div
                      key={country.cca3}
                      className="flex items-center gap-3 rounded-xl bg-white px-3 py-2"
                    >
                      <img
                        src={country.flags.png}
                        alt={country.name.common}
                        className="h-8 w-10 rounded object-cover"
                      />

                      <div className="flex-1">
                        <p className="text-sm font-medium">{country.name.common}</p>
                        <p className="text-xs text-slate-500">{country.region}</p>
                      </div>

                      <button
                        onClick={() =>
                          dispatch(removeCountryFromTrip(country.cca3))
                        }
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DropZone>

          {/* Save Trip */}
          <div className="mt-4">
            <input
  type="text"
  value={tripName}
  onChange={(e) => setTripName(e.target.value)}
  placeholder="Enter trip name"
  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
/>

            <div className="mt-2 flex gap-2">
              <button
                onClick={handleSave}
                disabled={!tripName.trim() || !selectedCountries.length || isLoading}
              className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium text-white transition ${
  tripName.trim() && selectedCountries.length
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-slate-300 cursor-not-allowed"
}`}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setTripName("")
                  dispatch(clearTrip())
                }}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Saved Trips */}
          <div className="mt-6">
            <h3 className="mb-3 font-medium text-slate-800">Saved Trips</h3>
            <SavedTrips tripsCount={savedTrips.length} />
          </div>
        </div>
      </aside>
    </>
  )
}