import {
  Heart,
  Plus,
  MapPinned,
  MapPin,
  Users,
} from "lucide-react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  setModalOpen,
  setSelectedCountry,
} from "../../features/countries/countriesSlice"
import { toggleFavorite } from "../../features/favorites/favoritesSlice"
import { addCountryToTrip } from "../../features/trips/tripsSlice"
import type { Country } from "../../features/countries/types"

type CountryCardProps = {
  country: Country
}

export default function CountryCard({ country }: CountryCardProps) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.items)

  const isFavorite = favorites.includes(country.cca3)

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: country.cca3,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  const handleOpenModal = () => {
    dispatch(setSelectedCountry(country.cca3))
    dispatch(setModalOpen(true))
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      onClick={handleOpenModal}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {/* Flag / drag handle only */}
      <div
        {...listeners}
        {...attributes}
        className="relative h-32 cursor-grab overflow-hidden active:cursor-grabbing"
      >
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="h-full w-full object-cover"
        />

        <div className="absolute right-3 top-3 flex gap-2">
          {/* Favorite */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              dispatch(toggleFavorite(country.cca3))
              }}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 text-slate-700 hover:bg-white"
            }`}
          >
            <Heart
              className="h-4 w-4"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>


          {/* Add to trip */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              dispatch(addCountryToTrip(country.cca3))
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 transition hover:bg-white"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="cursor-pointer p-4">
        <h3 className="text-lg font-semibold text-slate-900">
          {country.name.common}
        </h3>

        <div className="mt-3 space-y-2 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <MapPinned className="h-4 w-4 text-slate-400" />
            {country.region}
          </p>

          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            Capital: {country.capital?.[0] || "N/A"}
          </p>

          <p className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-400" />
            {country.population.toLocaleString()} people
          </p>
        </div>

        <span className="mt-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {country.region}
        </span>
      </div>
         </article>
  )
}