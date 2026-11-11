// src/components/calendar/DayDetail.jsx
import { CalendarOff } from 'lucide-react'
import ActivityCard from '../dashboard/ActivityCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import { formatFullDate } from '../../utils/date.js'

export default function DayDetail({ date, activities, onEdit, onDelete, onToggle }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <h2 className="text-sm font-semibold mb-1">{formatFullDate(date)}</h2>
      <p className="text-xs text-muted mb-4">{activities.length} kegiatan</p>

      {activities.length === 0 ? (
        <EmptyState
          icon={CalendarOff}
          title="Tidak ada kegiatan"
          description="Belum ada kegiatan di tanggal ini."
        />
      ) : (
        <div className="space-y-3 animate-slide-up">
          {activities.map(a => (
            <ActivityCard
              key={a.id}
              activity={a}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}