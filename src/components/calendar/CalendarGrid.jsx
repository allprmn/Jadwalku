// src/components/calendar/CalendarGrid.jsx
import { useMemo } from 'react'
import { buildCalendarMatrix, todayKey } from '../../utils/date.js'

const WEEKDAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

export default function CalendarGrid({ year, month, activities, selectedDate, onSelectDate }) {
  const cells = useMemo(() => buildCalendarMatrix(year, month), [year, month])
  const today = todayKey()

  const byDate = useMemo(() => {
    const map = {}
    activities.forEach(a => {
      if (!map[a.date]) map[a.date] = []
      map[a.date].push(a)
    })
    return map
  }, [activities])

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <div className="grid grid-cols-7 border-b border-border">
        {WEEKDAYS.map(d => (
          <div key={d} className="py-2 text-center text-xs font-medium text-muted">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((dateKey, i) => {
          const list = dateKey ? (byDate[dateKey] || []) : []
          const isToday = dateKey === today
          const isSelected = dateKey === selectedDate

          return (
            <button
              key={i}
              type="button"
              disabled={!dateKey}
              onClick={() => dateKey && onSelectDate(dateKey)}
              className={`
                relative aspect-square p-1.5 border-b border-r border-border text-xs sm:text-sm transition-colors
                ${!dateKey ? 'bg-surface/30 cursor-default' : 'hover:bg-surface-2'}
                ${isSelected ? 'bg-white/10 ring-1 ring-inset ring-white/30' : ''}
              `}
            >
              {dateKey && (
                <>
                  <span className={`inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full
                    ${isToday ? 'bg-white text-black font-semibold' : ''}`}>
                    {Number(dateKey.split('-')[2])}
                  </span>
                  {list.length > 0 && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {list.slice(0, 3).map((_, idx) => (
                        <span key={idx} className="w-1 h-1 rounded-full bg-white/70" />
                      ))}
                    </span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}