const STATUS_STYLES = {
  upcoming: 'bg-white/10 text-white border-white/20',
  done: 'bg-success/15 text-success border-success/30',
  late: 'bg-red-500/15 text-red-500 border-red-500/30',
}

const STATUS_LABEL = {
  upcoming: 'Belum Selesai',
  done: 'Selesai',
  late: 'Terlambat',

}

const CATEGORY_STYLES = {
  Kuliah: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  Tugas: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  Organisasi: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
  Pribadi: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
}

export default function Badge({ type = 'status', value, className = '' }) {
  if (type === 'status') {
    return (
      <span
        className={`
          inline-flex items-center text-[11px] font-medium
          px-2 py-0.5 rounded-full border
          ${STATUS_STYLES[value] || STATUS_STYLES.upcoming} ${className}
        `}
      >
        {STATUS_LABEL[value] || value}
      </span>
    )
  }

  // kategori
  return (
    <span
      className={`
        inline-flex items-center text-[11px] font-medium
        px-2 py-0.5 rounded-full border
        ${CATEGORY_STYLES[value] || 'bg-white/5 text-muted border-border'} ${className}
      `}
    >
      {value}
    </span>
  )
}