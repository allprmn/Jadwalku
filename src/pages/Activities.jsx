// src/pages/Activities.jsx
import { useState, useMemo } from 'react'
import { Plus, CheckCircle2, RotateCcw, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import Badge from '../components/ui/Badge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import FilterBar from '../components/dashboard/FilterBar.jsx'
import ActivityForm from '../components/dashboard/ActivityForm.jsx'
import { useActivities } from '../hooks/useActivities.js'
import { formatLongDate } from '../utils/date.js'

export default function Activities() {
  const { activities, addActivity, updateActivity, deleteActivity, toggleStatus } = useActivities()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const filtered = useMemo(() => {
    return activities
      .filter(a => category === 'all' || a.category === category)
      .filter(a => status === 'all' || a.status === status)
      .filter(a => a.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime))
  }, [activities, search, category, status])

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (a) => { setEditing(a); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditing(null) }

  const handleSubmit = (data) => {
    if (editing) updateActivity(editing.id, data)
    else addActivity(data)
    closeModal()
  }

  const handleDelete = (id) => {
    if (confirm('Hapus kegiatan ini?')) deleteActivity(id)
  }

  return (
    <>
      <PageHeader
        title="Daftar Kegiatan"
        subtitle="Semua kegiatan dalam tampilan tabel"
        action={<Button onClick={openCreate}><Plus size={16} /> Tambah Kegiatan</Button>}
      />

      <FilterBar
        search={search} onSearchChange={setSearch}
        category={category} onCategoryChange={setCategory}
        status={status} onStatusChange={setStatus}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="Tidak ada kegiatan"
          description="Coba ubah filter atau tambahkan kegiatan baru."
        />
      ) : (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="hidden md:grid grid-cols-[minmax(0,2fr)_1fr_1fr_120px_120px] gap-3 px-4 py-3 border-b border-border text-xs text-muted font-medium">
            <span>Judul</span>
            <span>Tanggal</span>
            <span>Waktu</span>
            <span>Kategori</span>
            <span className="text-right">Aksi</span>
          </div>

          <div className="divide-y divide-border">
            {filtered.map(a => {
              const done = a.status === 'done'
              return (
                <div key={a.id}
                  className="px-4 py-3 md:grid md:grid-cols-[minmax(0,2fr)_1fr_1fr_120px_120px] md:gap-3 md:items-center">
                  <div className="mb-2 md:mb-0">
                    <p className={`text-sm font-medium ${done ? 'line-through text-muted' : ''}`}>
                      {a.title}
                    </p>
                    <div className="md:hidden mt-1 flex flex-wrap gap-1.5">
                      <Badge type="category" value={a.category} />
                      <Badge type="status" value={a.status} />
                    </div>
                  </div>
                  <span className="hidden md:block text-xs text-muted">{formatLongDate(a.date)}</span>
                  <span className="hidden md:block text-xs text-muted">{a.startTime} – {a.endTime}</span>
                  <span className="hidden md:block"><Badge type="category" value={a.category} /></span>
                  <div className="flex items-center gap-1 md:justify-end">
                    <Button size="icon" variant="ghost" onClick={() => toggleStatus(a.id)}
                      title={done ? 'Tandai belum selesai' : 'Tandai selesai'}>
                      {done ? <RotateCcw size={14} /> : <CheckCircle2 size={14} />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => openEdit(a)} title="Edit">
                      <Pencil size={14} />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(a.id)}
                      title="Hapus" className="hover:text-danger">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <Modal open={modalOpen} onClose={closeModal} title={editing ? 'Edit Kegiatan' : 'Tambah Kegiatan'}>
        <ActivityForm initial={editing} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
    </>
  )
}