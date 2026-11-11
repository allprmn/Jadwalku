// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  ListChecks, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search 
} from 'lucide-react'

const NAV = [
  { to: '/',            label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { to: '/calendar',    label: 'Kalender',   icon: Calendar },
  { to: '/activities',  label: 'Kegiatan',   icon: ListChecks },
  { to: '/statistics',  label: 'Statistik',  icon: BarChart3 },
  { to: '/settings',    label: 'Pengaturan', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* 1. BACKDROP (Latar Gelap) khusus Mobile */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 2. SIDEBAR UTAMA */}
      <aside
        className={`
          fixed z-50 flex flex-col justify-between bg-surface border border-border/50 shadow-2xl
          transition-all duration-300 ease-in-out group
          
          /* Mobile Styles */
          top-0 left-0 h-full w-64 rounded-none
          ${open ? 'translate-x-0' : '-translate-x-full'}
          
          /* Desktop Styles (Floating & Hover Expand) */
          md:left-4 md:top-4 md:bottom-4 md:h-auto md:translate-x-0 
          md:w-[80px] md:hover:w-[260px] md:rounded-2xl
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden">
          
          {/* Brand / Logo */}
          <div className="h-16 flex items-center px-4 mt-2">
            <div className="w-10 h-10 rounded-xl bg-white text-black grid place-items-center font-bold text-xl shrink-0">
              J
            </div>
            <span className="ml-3 font-semibold whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              JadwalKu
            </span>
          </div>

          {/* Search Bar (Hanya muncul saat di-hover di desktop) */}
          <div className="px-4 mb-2 whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <div className="relative flex items-center">
              <Search size={18} className="absolute left-3 text-muted" />
              <input
                type="text"
                placeholder="Cari..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-2 text-sm placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-white/20 transition"
              />
            </div>
          </div>

          {/* Navigasi */}
          <nav className="flex flex-col gap-1 px-3 py-2 flex-1">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all whitespace-nowrap
                   ${
                     isActive
                       ? 'bg-white text-black font-medium'
                       : 'text-muted hover:bg-surface-2 hover:text-text'
                   }`
                }
                title={label}
              >
                <Icon size={20} className="shrink-0" />
                <span className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  {label}
                </span>
              </NavLink>
            ))}
          </nav>

          {/* Profil & Pengaturan (Bawah) */}
          <div className="p-3 mt-auto border-t border-border/50">
            <div className="flex items-center gap-3 p-2 rounded-xl">
              <div className="w-9 h-9 rounded-full bg-surface-2 grid place-items-center font-semibold shrink-0 text-sm">
                A
              </div>
              <div className="flex flex-col whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium">Aldi Pramana</span>
                <span className="text-xs text-muted">1247050031</span>
              </div>
            </div>
            
          </div>
        </div>
      </aside>
    </>
  )
}