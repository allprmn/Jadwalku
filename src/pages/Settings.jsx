// src/pages/Settings.jsx
import { useState, useRef, useEffect } from 'react'
import { Download, Trash2, Database, User, Save, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import { useActivities } from '../hooks/useActivities.js'
import ConfirmModal from '../components/ui/ConfirmModal.jsx'

export default function Settings() {
  const { activities, deleteAllActivities } = useActivities()
  const fileRef = useRef(null)

  const [showDeleteAll, setShowDeleteAll] = useState(false)
  const [profile, setProfile] = useState({ name: '', nim: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('user_profile'))
    if (savedProfile) setProfile(savedProfile)
  }, [])

  const handleSaveProfile = (e) => {
    e.preventDefault()
    localStorage.setItem('user_profile', JSON.stringify(profile))
    setSaved(true)
    window.dispatchEvent(new Event('profileUpdated'))
    setTimeout(() => setSaved(false), 3000)
  }

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

  const handleClearData = () => {
    setShowDeleteAll(true)
  }
  const confirmClearData = async () => {
    await deleteAllActivities()
  }

  const inputCls = 'w-full h-10 px-3 rounded-lg bg-surface-2 border border-border text-sm text-text focus:outline-none focus:border-border-2 transition'

  return (
    <>
      <PageHeader title="Pengaturan" subtitle="Konfigurasi profil dan manajemen data aplikasi" />

      <div className="space-y-6 max-w-3xl">

        {/* KARTU 1: PROFIL MAHASISWA */}
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-surface-2 grid place-items-center">
              <User size={20} className="text-muted" />
            </div>
            <div>
              <h3 className="text-base font-brand">Profil Mahasiswa</h3>
              <p className="text-xs text-muted">Informasi ini akan ditampilkan di Sidebar dan Header.</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Nama Lengkap</label>
              <input
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                placeholder="Mis. Aldi Pramana"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">NIM</label>
              <input
                value={profile.nim}
                onChange={e => setProfile({ ...profile, nim: e.target.value })}
                placeholder="Mis. 1247050031"
                className={inputCls}
                required
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-3 mt-2">
              <Button type="submit">
                <Save size={16} /> Simpan Profil
              </Button>
              {saved && (
                <span className="inline-flex items-center gap-1 text-xs text-success animate-fade-in">
                  <CheckCircle2 size={14} /> Profil berhasil disimpan!
                </span>
              )}
            </div>
          </form>
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
            <Button variant="danger" onClick={handleClearData}>
              <Trash2 size={16} /> Hapus Semua Jadwal
            </Button>
          </div>
          <p className="text-[11px] text-muted mt-4">
            *Catatan: Ekspor JSON hanya menyimpan data jadwal yang kamu buat sendiri. Data tugas dari aplikasi eksternal tidak akan diekspor.
          </p>
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