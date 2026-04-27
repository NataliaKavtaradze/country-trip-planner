import { MapPin } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { setPlannerOpen } from "../../features/trips/tripsSlice"

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const handlePlanTrip = () => {
       if (location.pathname === "/countries") {
      dispatch(setPlannerOpen(true))
      return
    }

    navigate("/countries?planner=open")
  }

  return (
    <header className="sticky top-0 z-60 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm font-semibold text-slate-800"
      >
        <MapPin className="h-4 w-4 text-blue-600" />
        TravelPlanner
      </button>

      <button
        type="button"
        onClick={handlePlanTrip}
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Plan a Trip
      </button>
    </header>
  )
}