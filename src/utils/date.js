// src/utils/date.js
export const DAY_NAMES = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu',
]

export const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

/** "2025-11-10" → Date (lokal, tanpa timezone geser) */
export function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Date → "2025-11-10" */
export function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** "2025-11-10" → "10 November 2025" */
export function formatLongDate(str) {
  const d = parseDate(str)
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
}

/** "2025-11-10" → "Senin, 10 Nov 2025" */
export function formatFullDate(str) {
  const d = parseDate(str)
  return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`
}

export function todayKey() {
  return toDateKey(new Date())
}

/** Daftar tanggal (matrix 6x7) untuk grid kalender bulan tertentu */
export function buildCalendarMatrix(year, month) {
  const first = new Date(year, month, 1)
  const startDay = first.getDay() // 0 = Minggu
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  // padding awal
  for (let i = 0; i < startDay; i++) cells.push(null)
  // tanggal
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(toDateKey(new Date(year, month, d)))
  }
  // padding akhir sampai kelipatan 7
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

/** Apakah dua string tanggal sama? */
export function isSameDate(a, b) {
  return a === b
}