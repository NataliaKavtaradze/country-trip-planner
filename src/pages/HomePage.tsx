import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh]">
      <h2 className="text-5xl font-bold max-w-3xl leading-tight">
        Explore the world one country at a time
      </h2>
      <p className="mt-4 text-white/70 max-w-xl">
        Search, discover, favorite and plan your next journey with ease.
      </p>

      <button
        onClick={() => navigate("/countries")}
        className="mt-8 rounded-2xl bg-white text-black px-6 py-3 font-semibold"
      >
        Explore places
      </button>
    </section>
  )
}