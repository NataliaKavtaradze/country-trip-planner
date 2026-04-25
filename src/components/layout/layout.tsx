import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0B1020] text-white">
      <Header />
      <Sidebar />
      <main className="px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}