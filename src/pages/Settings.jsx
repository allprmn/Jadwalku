import { useRef } from 'react'
import { Download, RotateCcw, Upload } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import { useActivities } from '../hooks/useActivities.js'

export default function Settings() {
  const { activities, resetActivities } = useActivities()
  const fileRef = useRef(null)

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(activities, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `jadwalku-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result)
        if (!Array.isArray(data)) throw new Error('Format tidak valid')
        localStorage.setItem('jadwalku:activities', JSON.stringify(data))
        window.location.reload()
      } catch (err) {
        alert('File tidak valid: ' + err.message)
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (confirm('Reset semua data ke contoh awal? Data yang ada akan hilang.')) {
      resetActivities()
    }
  }

  return (
    <>
      <PageHeader title="Pengaturan" subtitle="Konfigurasi aplikasi" />

      <div className="space-y-4 max-w-2xl">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h3 className="text-sm font-semibold mb-1">Data Kegiatan</h3>
          <p className="text-xs text-muted mb-4">Total saat ini: {activities.length} kegiatan</p>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download size={14} /> Ekspor JSON
            </Button>
            <Button variant="outline" onClick={() => fileRef.current?.click()}>
              <Upload size={14} /> Impor JSON
            </Button>
            <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
            <Button variant="danger" onClick={handleReset}>
              <RotateCcw size={14} /> Reset ke Contoh
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h3 className="text-sm font-semibold mb-1">Tentang Aplikasi</h3>
          <p className="text-xs text-muted mb-2">
            <strong className="text-text">JadwalKu</strong> — aplikasi manajemen kegiatan berbasis
            React + Vite + Tailwind.
          </p>
        </div>
      </div>
    </>
  )
}