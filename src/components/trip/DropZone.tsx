import { useDroppable } from "@dnd-kit/core"

type DropZoneProps = {
  children: React.ReactNode
}

export default function DropZone({ children }: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "trip-dropzone",
  })

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[220px] rounded-2xl border border-dashed p-4 transition ${
        isOver
          ? "border-white bg-white/10"
          : "border-white/15 bg-white/5"
      }`}
    >
      {children}
    </div>
  )
}