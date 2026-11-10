// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  ListChecks,
  BarChart3,
  Settings,
  X,
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
      {/* Overlay untuk mobile */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-surface border-r border-border
          flex flex-col
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white" />
            <span className="font-semibold tracking-wide">JadwalKu</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-muted hover:text-text transition"
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
                 ${
                   isActive
                     ? 'bg-white text-black font-medium'
                     : 'text-muted hover:text-text hover:bg-surface-2'
                 }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-border">
          <p className="text-sm font-medium truncate">Nama Mahasiswa</p>
          <p className="text-xs text-muted">NIM 123456789</p>
        </div>
      </aside>
    </>
  )
}