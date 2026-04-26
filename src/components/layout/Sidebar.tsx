import { useState } from "react"
import {
  CalendarDays,
  Trash2,
  X,
  GripVertical,
  Check,
} from "lucide-react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useGetCountriesQuery } from "../../features/countries/countriesApi"
import { useDeleteTripMutation, useGetTripsQuery, useSaveTripMutation } from "../../features/trips/tripsApi"
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

  const { data } = useGetCountriesQuery()
  const { data: savedTrips } = useGetTripsQuery()
  const [saveTrip, { isLoading }] = useSaveTripMutation()

  const [showSaveInput, setShowSaveInput] = useState(false)
  const [tripName, setTripName] = useState("")
  const [deleteTrip] = useDeleteTripMutation()
  if (!plannerOpen) return null

  const selectedCountryData =
    data?.filter((country) => selectedCountries.includes(country.cca3)) ?? []

  const handleSaveTrip = async () => {
    if (!selectedCountries.length || !tripName.trim()) return

    await saveTrip({
      title: tripName,
      countries: selectedCountries,
      createdAt: new Date().toISOString(),
    })

    setTripName("")
    setShowSaveInput(false)
    dispatch(clearTrip())
  }

  return (
    <>
      {/* Backdrop only on left side */}
      <div
        className="fixed inset-y-0 left-0 right-[360px] z-40 bg-black/30"
        onClick={() => dispatch(setPlannerOpen(false))}
      />

      {/* Interactive Sidebar */}
      <aside className="fixed right-0 top-0 z-50 flex h-screen w-[360px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-blue-600 px-4 py-4 text-white">
          <div>
            <h2 className="text-sm font-semibold">Trip Planner</h2>
            <p className="mt-1 text-[11px] text-blue-100">
              Drag countries here to add them to your trip
            </p>
          </div>

          <button
            onClick={() => dispatch(setPlannerOpen(false))}
            className="rounded-md p-1 hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-4">
          <DropZone>
            <div className="rounded-2xl border border-dashed border-blue-300 bg-blue-50 p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">Current Trip</h3>

                {!!selectedCountries.length && (
                  <button
                    onClick={() => dispatch(clearTrip())}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {!selectedCountryData.length ? (
                <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-sm text-slate-400">
                  Drag countries here
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedCountryData.map((country) => (
                    <div
                      key={country.cca3}
                      className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm"
                    >
                      <GripVertical className="h-4 w-4 text-slate-300" />

                      <img
                        src={country.flags.png}
                        alt={country.name.common}
                        className="h-6 w-8 rounded object-cover"
                      />

                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {country.name.common}
                        </p>
                        <p className="text-xs text-slate-500">{country.region}</p>
                      </div>

                      <button
                        onClick={() => dispatch(removeCountryFromTrip(country.cca3))}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DropZone>

          {showSaveInput ? (
            <div className="mt-4 flex gap-2">
              <input
                autoFocus
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="Enter trip name"
                className="h-11 flex-1 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSaveTrip}
                disabled={!tripName.trim() || isLoading}
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-600 text-white disabled:opacity-50"
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSaveInput(true)}
              disabled={!selectedCountries.length}
              className="mt-5 flex h-11 items-center justify-center gap-2 rounded-lg bg-green-600 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              <CalendarDays className="h-4 w-4" />
              Save Trip
            </button>
          )}

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">Saved Trips</h3>
             <SavedTrips />
            {!savedTrips?.length ? (
              <div className="rounded-xl border border-slate-200 py-10 text-center text-sm text-slate-400">
                No saved trips yet
              </div>
            ) : (
              <div className="space-y-3">
                {savedTrips.map((trip) => (
                  <div key={trip.id} className="rounded-xl border border-slate-200 p-3">
                    <p className="font-medium text-slate-800">{trip.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {trip.countries.length} countries
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {trip.countries.map((code) => {
                        const country = data?.find((c) => c.cca3 === code)
                        return country ? (
                          <span
                            key={code}
                            className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600"
                          >
                            {country.name.common}
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}