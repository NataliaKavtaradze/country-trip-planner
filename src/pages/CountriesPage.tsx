import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useGetCountriesQuery } from "../features/countries/countriesApi"

import { setPlannerOpen, addCountryToTrip } from "../features/trips/tripsSlice"

import CountryGrid from "../components/country/CountryGrid"
import CountryModal from "../components/country/CountryModal"
import Sidebar from "../components/layout/Sidebar"

export default function CountriesPage() {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeId, setActiveId] = useState<string | null>(null)

  const { data, isLoading, isError } = useGetCountriesQuery()
  const { search, region, favoritesOnly } = useAppSelector(
    (state) => state.countries
  )
  const favorites = useAppSelector((state) => state.favorites.items)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  useEffect(() => {
    if (searchParams.get("planner") === "open") {
      dispatch(setPlannerOpen(true))
      setSearchParams({})
    }
  }, [dispatch, searchParams, setSearchParams])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over?.id === "trip-dropzone") {
      dispatch(addCountryToTrip(String(active.id)))
    }

    setActiveId(null)
  }

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#F8FAFC] px-6 py-8 text-slate-900">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-slate-500">Loading countries...</p>
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="min-h-screen bg-[#F8FAFC] px-6 py-8 text-slate-900">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-red-500">Failed to load countries.</p>
        </div>
      </section>
    )
  }

  const filteredCountries =
    data?.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesRegion = region === "All" || country.region === region
      const matchesFavorites = !favoritesOnly || favorites.includes(country.cca3)

      return matchesSearch && matchesRegion && matchesFavorites
    }) ?? []

 return (
  <DndContext
    sensors={sensors}
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
  >
    <section className="min-h-screen bg-[#F8FAFC] px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        {/* filters */}
        {/* counter */}
        {/* grid */}
        <CountryGrid countries={filteredCountries} />
        <CountryModal />
        <Sidebar />
      </div>
    </section>

    <DragOverlay zIndex={9999}>
      {activeId ? (
        <div className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
          Dragging country...
        </div>
      ) : null}
    </DragOverlay>
  </DndContext>
)
}