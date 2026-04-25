import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  setModalOpen,
  setSelectedCountry,
} from "../../features/countries/countriesSlice"
import { toggleFavorite } from "../../features/favorites/favoritesSlice"
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
      {...listeners}
      {...attributes}
      className="group cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={country.flags.png}
          alt={country.flags.alt || country.name.common}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{country.name.common}</h3>
            <p className="text-sm text-white/60">{country.region}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              dispatch(toggleFavorite(country.cca3))
            }}
            className={`shrink-0 rounded-xl border px-3 py-1 text-sm transition ${
              isFavorite
                ? "bg-white text-black border-white"
                : "border-white/10 hover:bg-white/10"
            }`}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        <div className="mt-4 space-y-1 text-sm text-white/75">
          <p>
            <span className="text-white/50">Capital:</span>{" "}
            {country.capital?.[0] || "N/A"}
          </p>
          <p>
            <span className="text-white/50">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
        </div>
      </div>
    </article>
  )
}