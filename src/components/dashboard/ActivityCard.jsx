import { Clock, MapPin, Pencil, Trash2, CheckCircle2, RotateCcw, Lock, AlertCircle } from 'lucide-react'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import SpotlightCard from '../ui/SpotlightCard.jsx'
import { formatLongDate } from '../../utils/date.js'

export default function ActivityCard({ activity, onEdit, onDelete, onToggle }) {
  const isExternal = activity.isExternal === true
  
  const deadlineDate = new Date(`${activity.date}T${activity.endTime}:00`)
  const now = new Date()
  
  const isLate = deadlineDate < now && activity.status !== 'done'
  
  const displayStatus = isLate ? 'late' : activity.status
  
  const done = activity.status === 'done'

   return (
    <SpotlightCard
      theme="dark"
      spotlightColor="rgba(255, 255, 255, 0.15)"
      intensity={0.15}
      spotlightSize={300} // Sedikit diperbesar agar lebih luas
      softness={0.7}
      shape="circle"
      borderGlow={0.8}
      proximity={80}
      smoothing={0.3}
      grain={0}
      ambient={false}
      flare
      className={`p-4 ${done ? 'opacity-60 grayscale-[0.5]' : ''}`}
      style={{
        backgroundColor: '#0a0a0a',
        borderColor: '#262626'
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-semibold leading-snug line-clamp-2
            ${done ? 'line-through text-muted' : ''}`}>
            {activity.title}
          </h3>
          <p className="text-xs text-muted mt-0.5">{formatLongDate(activity.date)}</p>
        </div>
        
        <Badge type="status" value={displayStatus} />
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted mb-3">
        <span className={`inline-flex items-center gap-1 ${isLate ? 'text-red-400' : ''}`}>
          {isLate ? <AlertCircle size={12} /> : <Clock size={12} />} 
          {activity.startTime} – {activity.endTime}
        </span>
        {activity.location && (
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} /> {activity.location}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/50">
        <Badge type="category" value={activity.category} />
        
        <div className="flex items-center gap-1">
          {isExternal ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted italic">
              <Lock size={12} /> Dari Tugas Kuliah
            </span>
          ) : (
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
    </SpotlightCard>
  )
}