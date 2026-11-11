import { Clock, MapPin, Pencil, Trash2, CheckCircle2, RotateCcw, Lock } from 'lucide-react'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import { formatLongDate } from '../../utils/date.js'

export default function ActivityCard({ activity, onEdit, onDelete, onToggle }) {
  const done = activity.status === 'done'
  // Cek apakah ini data dari tabel tasks (aplikasi Pertemuan 6)
  const isExternal = activity.isExternal === true

  return (
    <div
      className={`group rounded-xl border bg-surface p-4 transition-colors
        ${done ? 'border-border/60 opacity-70' : 'border-border hover:border-border-2'}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-semibold leading-snug line-clamp-2
            ${done ? 'line-through text-muted' : ''}`}>
            {activity.title}
          </h3>
          <p className="text-xs text-muted mt-0.5">{formatLongDate(activity.date)}</p>
        </div>
        <Badge type="status" value={activity.status} />
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted mb-3">
        <span className="inline-flex items-center gap-1">
          <Clock size={12} /> {activity.startTime} – {activity.endTime}
        </span>
        {activity.location && (
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} /> {activity.location}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
        <Badge type="category" value={activity.category} />
        
        {/* Logika Tombol Aksi */}
        <div className="flex items-center gap-1">
          {isExternal ? (
            // Jika dari tabel tasks, tampilkan gembok
            <span className="inline-flex items-center gap-1 text-[11px] text-muted italic">
              <Lock size={12} /> Dari Tugas Kuliah
            </span>
          ) : (
            // Jika dari tabel activities, tampilkan tombol CRUD
            <>
              <Button size="icon" variant="ghost" onClick={() => onToggle(activity.id)}
                title={done ? 'Tandai belum selesai' : 'Tandai selesai'}>
                {done ? <RotateCcw size={14} /> : <CheckCircle2 size={14} />}
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onEdit(activity)} title="Edit">
                <Pencil size={14} />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onDelete(activity.id)}
                title="Hapus" className="hover:text-danger">
                <Trash2 size={14} />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}