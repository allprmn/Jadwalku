import { useRef } from 'react'
import { Download, Trash2, Database, User, Info } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import { useActivities } from '../hooks/useActivities.js'
import ConfirmModal from '../components/ui/ConfirmModal.jsx'
import { useState } from 'react'

export default function Settings() {
  const { activities, deleteAllActivities } = useActivities()
  const fileRef = useRef(null)
  const [showDeleteAll, setShowDeleteAll] = useState(false)
  
  const userName = import.meta.env.VITE_USER_NAME || 'Nama Mahasiswa'
  const userNim = import.meta.env.VITE_USER_NIM || 'NIM'

  const handleExport = () => {
    const internalData = activities.filter(a => !a.isExternal)
    const blob = new Blob([JSON.stringify(internalData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `jadwalku-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const confirmClearData = async () => {
    await deleteAllActivities()
  }

  return (
    <>
      <PageHeader title="Pengaturan" subtitle="Konfigurasi aplikasi dan manajemen data" />

      <div className="space-y-6 max-w-3xl">
        
        {/* KARTU 1: INFORMASI PROFIL (READ-ONLY) */}
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-surface-2 grid place-items-center">
              <User size={20} className="text-muted" />
            </div>
            <div>
              <h3 className="text-base font-brand">Profil Mahasiswa</h3>
              <p className="text-xs text-muted">Informasi ini dikonfigurasi secara permanen melalui environment variables.</p>
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 bg-surface-2/50 p-4 rounded-lg border border-border/50">
            <div>
              <p className="text-xs text-muted mb-1">Nama Lengkap</p>
              <p className="text-sm font-medium">{userName}</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">NIM</p>
              <p className="text-sm font-medium">{userNim}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-3 text-xs text-muted">
            <Info size={14} className="shrink-0 mt-0.5" />
            <p>Untuk mengubah nama atau NIM, edit file <code className="bg-surface-2 px-1 rounded">.env</code> di server/komputer Anda.</p>
          </div>
        </div>

        {/* KARTU 2: MANAJEMEN DATA */}
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-surface-2 grid place-items-center">
              <Database size={20} className="text-muted" />
            </div>
            <div>
              <h3 className="text-base font-brand">Manajemen Data</h3>
              <p className="text-xs text-muted">Total saat ini: {activities.filter(a => !a.isExternal).length} kegiatan tersimpan di database.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleExport}>
              <Download size={16} /> Ekspor Backup (JSON)
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteAll(true)}>
              <Trash2 size={16} /> Hapus Semua Jadwal
            </Button>
          </div>
        </div>

        {/* KARTU 3: TENTANG APLIKASI */}
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
          <h3 className="text-base font-brand mb-2">Tentang Aplikasi</h3>
          <p className="text-sm text-muted mb-4">
            <strong className="text-text">JadwalKu</strong> adalah aplikasi manajemen kegiatan dan *deadline* tugas berbasis React + Vite + Tailwind CSS, terintegrasi dengan database Supabase.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border text-xs text-text">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            Terhubung ke Supabase PostgreSQL
          </div>
        </div>

      </div>

      <ConfirmModal
        isOpen={showDeleteAll}
        onClose={() => setShowDeleteAll(false)}
        onConfirm={confirmClearData}
        title="Hapus Semua Jadwal"
        message="Apakah kamu yakin ingin menghapus SEMUA jadwal kegiatan dari database? Tindakan ini tidak bisa dibatalkan."
      />
    </>
  )
}