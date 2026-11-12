import { useState, useEffect } from 'react'
import { BellOff, BellRing } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import SwipeRow from '../components/ui/SwipeRow.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { useActivities } from '../hooks/useActivities.js'
import { todayKey } from '../utils/date.js'

export default function Notifications() {
  const { activities } = useActivities()
  const [isEnabled, setIsEnabled] = useState(false)
  const [dismissedIds, setDismissedIds] = useState([])

  // Cek status izin notifikasi saat halaman dimuat
  useEffect(() => {
    const saved = localStorage.getItem('notif_enabled')
    if (saved === 'true' && Notification.permission === 'granted') {
      setIsEnabled(true)
    }
  }, [])

  const toggleNotif = async () => {
    if (!isEnabled) {
      // 1. Jika mau menyalakan, minta izin ke browser
      if (!("Notification" in window)) {
        alert("Browser kamu tidak mendukung notifikasi desktop.")
        return
      }

      const permission = await Notification.requestPermission()
      
      if (permission === "granted") {
        setIsEnabled(true)
        localStorage.setItem('notif_enabled', 'true')
        
        // 2. Kirim notifikasi uji coba
        new Notification("Notifikasi JadwalKu Aktif! 🎉", {
          body: "Kamu akan menerima pengingat untuk tugas dan jadwal hari ini.",
          icon: "/favicon.svg" // Pastikan ada file favicon di folder public
        })
      } else {
        alert("Izin notifikasi ditolak. Buka pengaturan browser untuk mengizinkannya.")
      }
    } else {
      // Jika dimatikan
      setIsEnabled(false)
      localStorage.setItem('notif_enabled', 'false')
    }
  }

  // Fungsi untuk mengirim notifikasi manual dari daftar
  const sendTestNotif = (task) => {
    if (Notification.permission === 'granted') {
      new Notification("Pengingat Tugas ⏰", {
        body: `${task.title} - Deadline pukul ${task.startTime}`,
      })
    }
  }

  const todayTasks = activities
    .filter(a => a.isExternal === true && a.date === todayKey())
    .filter(a => !dismissedIds.includes(a.id))

  const handleDelete = (id) => {
    setDismissedIds(prev => [...prev, id])
  }

  return (
    <>
      <PageHeader title="Notifikasi" subtitle="Pengingat tugas & jadwal hari ini" />

      {/* Toggle Switch */}
      <div className="bg-surface border border-border rounded-xl p-4 sm:p-5 mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-text flex items-center gap-2">
            {isEnabled ? <BellRing size={16} className="text-success" /> : <BellOff size={16} className="text-muted" />}
            Notifikasi Desktop
          </h3>
          <p className="text-xs text-muted mt-1">Terima pemberitahuan langsung di layar perangkatmu.</p>
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
      <h3 className="text-sm font-semibold mb-3">Tenggat Hari Ini</h3>
      
      {todayTasks.length === 0 ? (
        <EmptyState 
          icon={BellOff} 
          title="Tidak ada tugas hari ini" 
          description="Semua pemberitahuan sudah dibersihkan atau tidak ada deadline."
        />
      ) : (
        <div className="space-y-2">
          {todayTasks.map(task => (
            <SwipeRow
              key={task.id}
              onCommit={(action) => {
                if (action.id === 'delete') handleDelete(task.id)
              }}
            >
              <div 
                className="flex items-center gap-3 w-full cursor-pointer hover:opacity-80 transition"
                onClick={() => sendTestNotif(task)} // Klik untuk tes notif
                title="Klik untuk coba kirim notifikasi"
              >
                <div className="w-2 h-2 rounded-full shrink-0 bg-white" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">
                    {task.title}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    Deadline: Pukul {task.startTime} (Klik untuk tes notif)
                  </p>
                </div>
              </div>
            </SwipeRow>
          ))}
        </div>
      )}
    </>
  )
}