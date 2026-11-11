import { useState, useEffect } from 'react'
import Button from '../ui/Button.jsx'
import { CATEGORIES } from '../../data/dummyActivities.js'

// Fungsi waktu dinamis dengan Native JS
const getDynamicTimes = () => {
  const now = new Date()
  const start = new Date(now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0))
  const end = new Date(start.getTime() + 60 * 60 * 1000)
  const pad = (num) => String(num).padStart(2, '0')

  return {
    date: `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`,
    startTime: `${pad(start.getHours())}:${pad(start.getMinutes())}`,
    endTime: `${pad(end.getHours())}:${pad(end.getMinutes())}`,
  }
}

// --- INI DIA VARIABEL YANG HILANG TADI ---
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))
// -----------------------------------------

const EMPTY = {
  title: '',
  category: 'Kuliah',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  description: '',
}

const fieldCls = 'w-full h-10 px-3 rounded-lg bg-surface-2 border border-border text-sm text-text placeholder:text-dim focus:outline-none focus:border-border-2 transition'
const labelCls = 'block text-xs font-medium text-muted mb-1.5'

export default function ActivityForm({ initial, defaultDate, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const dynamicTimes = getDynamicTimes()
    if (initial) {
      setForm({ ...EMPTY, ...initial })
    } else {
      setForm({ 
        ...EMPTY, 
        date: defaultDate || dynamicTimes.date,
        startTime: dynamicTimes.startTime,
        endTime: dynamicTimes.endTime
      })
    }
    setErrors({})
  }, [initial, defaultDate])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const isEditing = Boolean(initial?.id)

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Judul wajib diisi'
    if (!form.date) e.date = 'Tanggal wajib diisi'
    if (!form.startTime) e.startTime = 'Jam mulai wajib diisi'
    if (form.endTime <= form.startTime) e.endTime = 'Jam selesai harus setelah jam mulai'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    await onSubmit(form)
    setSubmitting(false)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className={labelCls}>Judul Kegiatan</label>
        <input value={form.title} onChange={e => set('title', e.target.value)}
          placeholder="Mis. Kuliah Pemrograman Web" className={fieldCls} />
        {errors.title && <p className="text-xs text-danger mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className={labelCls}>Kategori</label>
        <select value={form.category} onChange={e => set('category', e.target.value)} className={fieldCls}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* INPUT TANGGAL */}
        <div className="sm:col-span-1">
          <label className={labelCls}>Tanggal</label>
          <input 
            type="date" 
            value={form.date} 
            onChange={e => set('date', e.target.value)} 
            className={fieldCls} 
          />
          {errors.date && <p className="text-xs text-danger mt-1">{errors.date}</p>}
        </div>

        {/* INPUT JAM MULAI CUSTOM (24 JAM) */}
        <div>
          <label className={labelCls}>Jam Mulai</label>
          <div className="flex items-center gap-1">
            <select 
              value={form.startTime.split(':')[0] || '08'} 
              onChange={e => {
                const min = form.startTime.split(':')[1] || '00'
                set('startTime', `${e.target.value}:${min}`)
              }} 
              className={fieldCls}
            >
              {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
            <span className="text-muted font-bold">:</span>
            <select 
              value={form.startTime.split(':')[1] || '00'} 
              onChange={e => {
                const hr = form.startTime.split(':')[0] || '08'
                set('startTime', `${hr}:${e.target.value}`)
              }} 
              className={fieldCls}
            >
              {MINUTES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          {errors.startTime && <p className="text-xs text-danger mt-1">{errors.startTime}</p>}
        </div>

        {/* INPUT JAM SELESAI CUSTOM (24 JAM) */}
        <div>
          <label className={labelCls}>Jam Selesai</label>
          <div className="flex items-center gap-1">
            <select 
              value={form.endTime.split(':')[0] || '09'} 
              onChange={e => {
                const min = form.endTime.split(':')[1] || '00'
                set('endTime', `${e.target.value}:${min}`)
              }} 
              className={fieldCls}
            >
              {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
            <span className="text-muted font-bold">:</span>
            <select 
              value={form.endTime.split(':')[1] || '00'} 
              onChange={e => {
                const hr = form.endTime.split(':')[0] || '09'
                set('endTime', `${hr}:${e.target.value}`)
              }} 
              className={fieldCls}
            >
              {MINUTES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          {errors.endTime && <p className="text-xs text-danger mt-1">{errors.endTime}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls}>Lokasi</label>
        <input value={form.location} onChange={e => set('location', e.target.value)}
          placeholder="Mis. Lab Komputer 3" className={fieldCls} />
      </div>

      <div>
        <label className={labelCls}>Deskripsi (opsional)</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)}
          rows={3} placeholder="Catatan tambahan..."
          className="w-full px-3 py-2 rounded-lg bg-surface-2 border border-border text-sm text-text placeholder:text-dim focus:outline-none focus:border-border-2 transition resize-none" />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={submitting}>Batal</Button>
        <Button type="submit" loading={submitting}>
          {isEditing ? 'Simpan Perubahan' : 'Tambah Kegiatan'}
        </Button>
      </div>
    </form>
  )
}