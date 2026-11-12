// src/pages/Notifications.jsx
import { useState, useEffect } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Delete02Icon, Notification03Icon } from '@hugeicons/core-free-icons'
import PageHeader from '../components/ui/PageHeader.jsx'
import SwipeRow from '../components/ui/SwipeRow.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'

const INITIAL_NOTIFS = [
  { id: '1', title: 'Tugas Pemrograman Web ditambahkan', time: '10 menit lalu', read: false },
  { id: '2', title: 'Jadwal Rapat BEM diubah ke 16:00', time: '2 jam lalu', read: true },
  { id: '3', title: 'Pengingat: Deadline Tugas PWA besok!', time: '1 hari lalu', read: false },
]

export default function Notifications() {
  const [isEnabled, setIsEnabled] = useState(true)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFS)

  useEffect(() => {
    const saved = localStorage.getItem('notif_enabled')
    if (saved !== null) setIsEnabled(saved === 'true')
  }, [])

  const toggleNotif = () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    localStorage.setItem('notif_enabled', String(newState))
  }

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <>
      <PageHeader title="Notifikasi" subtitle="Pusat riwayat pemberitahuan aplikasi" />

      {/* Toggle Switch */}
      <div className="bg-surface border border-border rounded-xl p-4 sm:p-5 mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-text">Aktifkan Notifikasi</h3>
          <p className="text-xs text-muted mt-1">Terima pemberitahuan saat ada jadwal atau tugas baru.</p>
        </div>
        <button
          onClick={toggleNotif}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            isEnabled ? 'bg-white' : 'bg-surface-2 border border-border'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
              isEnabled ? 'translate-x-6 bg-black' : 'translate-x-1 bg-muted'
            }`}
          />
        </button>
      </div>

      {/* List Notifikasi */}
      <h3 className="text-sm font-semibold mb-3">Riwayat Terbaru</h3>
      
      {notifications.length === 0 ? (
        <EmptyState 
          icon={Notification03Icon} 
          title="Tidak ada notifikasi" 
          description="Semua pemberitahuan sudah dibersihkan."
        />
      ) : (
        <div className="space-y-2">
          {notifications.map(notif => (
            <SwipeRow
              key={notif.id}
              onCommit={(action) => {
                if (action === 'delete') handleDelete(notif.id)
              }}
              actionWidth={80}
              // Kirim ikon sebagai props
              actionIcon={<HugeiconsIcon icon={Delete02Icon} size={24} color="white" />}
            >
              {/* Konten ditaruh langsung di dalam SwipeRow */}
              <div className="flex items-center gap-3 w-full">
                <div className={`w-2 h-2 rounded-full shrink-0 ${notif.read ? 'bg-transparent' : 'bg-white'}`} />
                <div className="flex-1">
                  <p className={`text-sm ${notif.read ? 'text-muted' : 'text-text font-medium'}`}>
                    {notif.title}
                  </p>
                  <p className="text-xs text-dim mt-1">{notif.time}</p>
                </div>
              </div>
            </SwipeRow>
          ))}
        </div>
      )}
    </>
  )
}