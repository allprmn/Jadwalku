import { Menu, Bell, Search, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useActivities } from '../../hooks/useActivities.js'
import { Link } from 'react-router-dom'

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/calendar': 'Kalender',
  '/activities': 'Daftar Kegiatan',
  '/statistics': 'Statistik',
  '/settings': 'Pengaturan',
}

export default function Header({ onMenuClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  // Ambil state pencarian dari context
  const { searchQuery, setSearchQuery } = useActivities()
  
  const currentTitle = PAGE_TITLES[location.pathname] || 'Dashboard'
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })

  // Handler saat mengetik pencarian
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    // Jika sedang di halaman yang tidak ada list-nya, pindah ke /activities
    if (location.pathname !== '/' && location.pathname !== '/activities') {
      navigate('/activities')
    }
  }

  return (
    <header className="sticky top-4 z-30 mx-4 sm:mx-6 lg:mx-8 mt-4 transition-all duration-300">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 rounded-2xl bg-surface/80 backdrop-blur-xl border border-border shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        
        {/* KIRI: Tombol Menu (Mobile) & Judul Halaman */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 rounded-lg text-muted hover:text-text hover:bg-surface-2 transition">
            <Menu size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-sm sm:text-base font-semibold text-text leading-tight">{currentTitle}</h1>
            <span className="text-[11px] text-muted hidden sm:block">{today}</span>
          </div>
        </div>

        {/* TENGAH: Search Bar Real-time */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full flex items-center">
            <Search size={16} className="absolute left-3 text-muted" />
            <input
              type="text"
              placeholder="Cari kegiatan..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full h-9 pl-9 pr-8 rounded-full bg-surface-2/50 border border-border/50 text-sm text-text placeholder:text-dim focus:outline-none focus:border-border-2 focus:bg-surface-2 transition-all"
            />
            {/* Tombol Clear (X) */}
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-muted hover:text-text"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* KANAN: Aksi & Profil */}
        <div className="flex items-center gap-2 sm:gap-3">
           <Link to="/notifications" className="relative p-2 rounded-full text-muted hover:text-text hover:bg-surface-2 transition group">
            <Bell size={18} className="group-hover:animate-pulse" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-surface"></span>
          </Link>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-black grid place-items-center font-bold text-sm shadow-sm cursor-pointer hover:ring-2 ring-white/30 transition-all">
            A
          </div>
        </div>

      </div>
    </header>
  )
}