import { useNavigate, useLocation } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { setPlannerOpen } from "../../features/trips/tripsSlice"

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const handlePlanTrip = () => {
    if (location.pathname !== "/countries") {
      navigate("/countries?planner=open")
    } else {
      dispatch(setPlannerOpen(true))
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <h1 className="text-xl font-bold">Countries Explorer</h1>

      <button
        onClick={handlePlanTrip}
        className="rounded-xl bg-white text-black px-4 py-2 font-medium hover:opacity-90"
      >
        Plan a trip
      </button>
    </header>
  )
}