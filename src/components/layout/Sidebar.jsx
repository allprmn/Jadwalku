import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  ListChecks, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search,
  ExternalLink
} from 'lucide-react'

const NAV = [
  { to: '/',            label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { to: '/calendar',    label: 'Kalender',   icon: Calendar },
  { to: '/activities',  label: 'Kegiatan',   icon: ListChecks },
  { to: '/statistics',  label: 'Statistik',  icon: BarChart3 },
  { to: '/settings',    label: 'Pengaturan', icon: Settings },
  { href: 'https://aldipramana.my.id', label: 'Landing Page', icon: ExternalLink, isExternal: true }, 
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Backdrop Mobile */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`
          fixed z-50 flex flex-col justify-between bg-surface border border-border/50 shadow-2xl
          transition-all duration-300 ease-in-out group
          top-0 left-0 h-full w-64 rounded-none
          ${open ? 'translate-x-0' : '-translate-x-full'}
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
            <span className="ml-3 font-brand whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              JADWALKU
            </span>
          </div>

          {/* Search Bar Mini */}
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
            {NAV.map((item, index) => {
              const Icon = item.icon
              const linkClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all whitespace-nowrap text-muted hover:bg-surface-2 hover:text-text"
              const activeClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all whitespace-nowrap bg-white text-black font-medium"

              // Jika menu berupa link eksternal (Landing Page)
              if (item.isExternal) {
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    title={item.label}
                  >
                    <Icon size={20} className="shrink-0" />
                    <span className="flex-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      {item.label}
                    </span>
                  </a>
                )
              }

              // Jika menu internal (React Router)
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) => isActive ? activeClass : linkClass}
                  title={item.label}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    {item.label}
                  </span>
                </NavLink>
              )
            })}
          </nav>

          {/* Profil & Pengaturan */}
          <div className="p-3 mt-auto border-t border-border/50">
            <div className="flex items-center gap-3 p-2 rounded-xl">
              <div className="w-9 h-9 rounded-full bg-surface-2 grid place-items-center font-semibold shrink-0 text-sm">
                M
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