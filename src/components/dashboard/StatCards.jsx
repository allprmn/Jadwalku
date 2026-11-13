// src/components/dashboard/StatCards.jsx
import { ListChecks, Calendar, Clock, CheckCircle2 } from 'lucide-react'
import { useActivities } from '../../hooks/useActivities.js'
import { todayKey } from '../../utils/date.js'
import SpotlightCard from '../ui/SpotlightCard.jsx'

export default function StatCards() {
  const { activities, stats } = useActivities()
  const todayCount = activities.filter(a => a.date === todayKey()).length

  const items = [
    { label: 'Total Kegiatan', value: stats.total,      icon: ListChecks },
    { label: 'Hari Ini',       value: todayCount,       icon: Calendar },
    { label: 'Belum Selesai',  value: stats.upcoming,   icon: Clock },
    { label: 'Selesai',        value: stats.done,       icon: CheckCircle2 },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {items.map(({ label, value, icon: Icon }) => (
        <SpotlightCard
          key={label}
          theme="dark"
          spotlightColor="rgba(255, 255, 255, 0.15)"
          intensity={0.15}
          spotlightSize={250}
          softness={0.7}
          shape="circle"
          borderGlow={0.8}
          proximity={80}
          smoothing={0.3}
          grain={0}
          flare
          className="p-4 sm:p-5"
          style={{
            backgroundColor: '#0a0a0a',
            borderColor: '#262626'
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted">{label}</span>
            <Icon size={16} className="text-muted" />
          </div>
          <p className="text-2xl sm:text-3xl font-brand tabular-nums">
            {value}
          </p>
        </SpotlightCard>
      ))}
    </div>
  )
}