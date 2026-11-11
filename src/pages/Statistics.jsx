// src/pages/Statistics.jsx
import { useMemo } from 'react'
import PageHeader from '../components/ui/PageHeader.jsx'
import { useActivities } from '../hooks/useActivities.js'
import { CATEGORIES } from '../data/dummyActivities.js'

export default function Statistics() {
  const { activities, stats } = useActivities()

  const progress = stats.total === 0 ? 0 : Math.round((stats.done / stats.total) * 100)

  const byCategory = useMemo(() => {
    const map = {}
    CATEGORIES.forEach(c => { map[c] = { total: 0, done: 0 } })
    activities.forEach(a => {
      if (!map[a.category]) map[a.category] = { total: 0, done: 0 }
      map[a.category].total++
      if (a.status === 'done') map[a.category].done++
    })
    return map
  }, [activities])

  const maxCount = Math.max(...Object.values(byCategory).map(v => v.total), 1)

  return (
    <>
      <PageHeader title="Statistik" subtitle="Ringkasan progres kegiatanmu" />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-xs text-muted mb-1">Progres Keseluruhan</p>
          <p className="text-3xl font-semibold mb-4 tabular-nums">{progress}%</p>
          <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
            <div className="h-full bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted">
            <span>{stats.done} selesai</span>
            <span>{stats.upcoming} belum</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-xs text-muted mb-3">Ringkasan</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-2xl font-semibold tabular-nums">{stats.total}</p>
              <p className="text-xs text-muted">Total</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-success tabular-nums">{stats.done}</p>
              <p className="text-xs text-muted">Selesai</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums">{stats.upcoming}</p>
              <p className="text-xs text-muted">Belum</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5 mt-4">
        <p className="text-xs text-muted mb-4">Per Kategori</p>
        <div className="space-y-4">
          {Object.entries(byCategory).map(([cat, v]) => (
            <div key={cat}>
              <div className="flex justify-between text-xs mb-1.5">
                <span>{cat}</span>
                <span className="text-muted">{v.done}/{v.total}</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                <div className="h-full bg-white/80 transition-all duration-500"
                  style={{ width: `${(v.total / maxCount) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}