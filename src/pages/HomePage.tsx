import { MapPin, Compass, Heart, Calendar, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const features = [
  {
    icon: Compass,
    title: "Discover Countries",
    description:
      "Browse through a comprehensive list of countries with detailed information, flags, and key facts about each destination.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Heart,
    title: "Save Favorites",
    description:
      "Mark countries as favorites and easily access them later. Filter by your favorite destinations to plan future trips.",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Calendar,
    title: "Plan Trips",
    description:
      "Create custom travel itineraries by selecting multiple countries. Save your trips and access them anytime for future reference.",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
]

const steps = [
  {
    number: "1",
    title: "Browse Countries",
    description:
      "Explore our comprehensive list of countries with flags and information",
  },
  {
    number: "2",
    title: "Add to Favorites",
    description:
      "Mark interesting destinations as favorites for easy access",
  },
  {
    number: "3",
    title: "Plan Your Trip",
    description: "Use our trip planner to create custom itineraries",
  },
  {
    number: "4",
    title: "Save & Share",
    description: "Save your travel plans and access them anytime",
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <section className="min-h-[calc(100vh-72px)] bg-[#EEF4FF] px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <div className="flex flex-col items-center text-center pt-8">
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-700">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span>TravelPlanner</span>
          </div>

          <h1 className="max-w-3xl text-5xl font-bold tracking-tight leading-tight md:text-6xl">
            Plan Your Perfect
            <span className="block text-blue-600">Adventure</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Discover amazing destinations, create personalized travel itineraries,
            and save your favorite places. Your next adventure is just a click away.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/countries")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              Explore Places
              <ArrowRight className="h-4 w-4" />
            </button>

            <button className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-medium text-blue-700 transition hover:bg-blue-50">
              Learn More
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${feature.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${feature.iconColor}`} />
                </div>

                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Steps */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold">How it works</h2>

          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {step.number}
                </div>

                <h3 className="mt-4 text-sm font-semibold">{step.title}</h3>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}