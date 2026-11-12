import { Search } from 'lucide-react'
import { CATEGORIES } from '../../data/categories.js'

const selectCls =
  'h-10 px-3 rounded-lg bg-surface-2 border border-border text-sm text-text focus:outline-none focus:border-border-2 transition'

export default function FilterBar({
  search, onSearchChange,
  category, onCategoryChange,
  status, onStatusChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-5">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
        <input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Cari kegiatan..."
          className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-2 border border-border text-sm placeholder:text-dim focus:outline-none focus:border-border-2 transition"
        />
      </div>

      <select value={category} onChange={e => onCategoryChange(e.target.value)} className={selectCls}>
        <option value="all">Semua Kategori</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={status} onChange={e => onStatusChange(e.target.value)} className={selectCls}>
        <option value="all">Semua Status</option>
        <option value="upcoming">Belum Selesai</option>
        <option value="done">Selesai</option>
      </select>
    </div>
  )
}