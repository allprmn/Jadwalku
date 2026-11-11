// src/components/dashboard/ActivityGrid.jsx
import ActivityCard from './ActivityCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'

export default function ActivityGrid({ activities, onEdit, onDelete, onToggle, emptyAction }) {
  if (activities.length === 0) {
    return (
      <EmptyState
        title="Belum ada kegiatan"
        description="Tambahkan kegiatan pertamamu dengan tombol di atas."
        action={emptyAction}
      />
    )
  }

  return (
    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3 animate-slide-up">
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
  )
}