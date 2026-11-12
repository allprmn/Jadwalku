
export const DAY_NAMES = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu',
]

export const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

export function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
export function formatLongDate(str) {
  const d = parseDate(str)
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
}

export function formatFullDate(str) {
  const d = parseDate(str)
  return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`
}

export function todayKey() {
  return toDateKey(new Date())
}

export function buildCalendarMatrix(year, month) {
  const first = new Date(year, month, 1)
  const startDay = first.getDay() 
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
 
  for (let i = 0; i < startDay; i++) cells.push(null)
 
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(toDateKey(new Date(year, month, d)))
  }
  
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export function isSameDate(a, b) {
  return a === b
}