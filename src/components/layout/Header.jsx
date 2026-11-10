// src/components/layout/Header.jsx
import { Menu } from 'lucide-react'

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-bg/80 backdrop-blur border-b border-border">
      <div className="flex items-center h-full gap-3 px-4 sm:px-6 lg:px-8">
        <button
          onClick={onMenuClick}
          className="lg:hidden -ml-2 p-2 rounded-lg text-muted hover:text-text hover:bg-surface-2 transition"
          aria-label="Buka menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted">Selamat datang kembali 👋</p>
          <p className="text-sm font-medium truncate">
            Kelola jadwal & kegiatanmu
          </p>
        </div>

        {/* Avatar inisial — ganti "M" jadi huruf depan namamu */}
        <div className="w-9 h-9 rounded-full bg-white text-black grid place-items-center font-semibold text-sm">
          M
        </div>
      </div>
    </header>
  )
}