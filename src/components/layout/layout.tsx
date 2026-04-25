import { Outlet } from "react-router-dom"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { useAppDispatch } from "../../app/hooks"
import { addCountryToTrip } from "../../features/trips/tripsSlice"

export default function Layout() {
  const dispatch = useAppDispatch()

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event

    if (!over) return

    if (over.id === "trip-dropzone") {
      dispatch(addCountryToTrip(String(active.id)))
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen">
        <Header />
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </DndContext>
  )
}