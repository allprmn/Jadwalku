// src/components/dashboard/ActivityForm.jsx
import { useState, useEffect } from 'react'
import Button from '../ui/Button.jsx'
import { CATEGORIES } from '../../data/dummyActivities.js'
import { todayKey } from '../../utils/date.js'

const EMPTY = {
  title: '',
  category: 'Kuliah',
  date: todayKey(),
  startTime: '08:00',
  endTime: '09:00',
  location: '',
  description: '',
}

const fieldCls =
  'w-full h-10 px-3 rounded-lg bg-surface-2 border border-border text-sm text-text placeholder:text-dim focus:outline-none focus:border-border-2 transition'
const labelCls = 'block text-xs font-medium text-muted mb-1.5'

export default function ActivityForm({ initial, defaultDate, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) setForm({ ...EMPTY, ...initial })
    else setForm({ ...EMPTY, date: defaultDate || EMPTY.date })
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

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className={labelCls}>Judul Kegiatan</label>
        <input value={form.title} onChange={e => set('title', e.target.value)}
          placeholder="Mis. Kuliah Pemrograman Web" className={fieldCls} />
        {errors.title && <p className="text-xs text-danger mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Kategori</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} className={fieldCls}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Tanggal</label>
          <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className={fieldCls} />
          {errors.date && <p className="text-xs text-danger mt-1">{errors.date}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Jam Mulai</label>
          <input type="time" value={form.startTime} onChange={e => set('startTime', e.target.value)} className={fieldCls} />
          {errors.startTime && <p className="text-xs text-danger mt-1">{errors.startTime}</p>}
        </div>
        <div>
          <label className={labelCls}>Jam Selesai</label>
          <input type="time" value={form.endTime} onChange={e => set('endTime', e.target.value)} className={fieldCls} />
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
        <Button type="button" variant="ghost" onClick={onCancel}>Batal</Button>
        <Button type="submit">{isEditing ? 'Simpan Perubahan' : 'Tambah Kegiatan'}</Button>
      </div>
    </form>
  )
}