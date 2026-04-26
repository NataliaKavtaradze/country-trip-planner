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
      {/* Image wrapper */}
      <div className="relative h-32 overflow-hidden">
        {/* Drag handle only on image */}
       <div
  {...listeners}
  {...attributes}
  className="h-full w-full cursor-grab active:cursor-grabbing"
>
  <img
    src={country.flags.png}
    alt={country.name.common}
    className="h-full w-full object-cover"
  />
</div>

        {/* Actions */}
        <div className="absolute right-3 top-3 z-10 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              console.log("favorite clicked")
              dispatch(toggleFavorite(country.cca3))
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white text-slate-700 shadow-sm hover:bg-slate-50"
            }`}
          >
            <Heart
              className="h-4 w-4"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              dispatch(addCountryToTrip(country.cca3))
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
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