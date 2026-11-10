// src/components/ui/EmptyState.jsx
import { Inbox } from 'lucide-react'

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Belum ada data',
  description = 'Data akan muncul di sini setelah kamu menambahkannya.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-xl border border-dashed border-border bg-surface/50">
      <div className="w-12 h-12 grid place-items-center rounded-full bg-surface-2 text-muted mb-4">
        <Icon size={22} />
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-muted mt-1 max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}