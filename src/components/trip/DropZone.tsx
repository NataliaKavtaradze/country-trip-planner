import { useDroppable } from "@dnd-kit/core"
import type { ReactNode } from "react"

type DropZoneProps = {
  children: ReactNode
}

export default function DropZone({ children }: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "trip-dropzone",
  })

  return (
    <div
      ref={setNodeRef}
      className={`transition ${
        isOver ? "scale-[1.01] opacity-100" : "opacity-100"
      }`}
    >
      {children}
    </div>
  )
}