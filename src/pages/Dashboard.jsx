import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import StatCards from '../components/dashboard/StatCards.jsx'
import FilterBar from '../components/dashboard/FilterBar.jsx'
import ActivityGrid from '../components/dashboard/ActivityGrid.jsx'
import ActivityForm from '../components/dashboard/ActivityForm.jsx'
import { useActivities } from '../hooks/useActivities.js'
import ConfirmModal from '../components/ui/ConfirmModal.jsx'

export default function Dashboard() {
  // Tambahkan loading
  const { activities, loading, addActivity, updateActivity, deleteActivity, toggleStatus, searchQuery, setSearchQuery } = useActivities()


  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const filtered = useMemo(() => {
    return activities
      .filter(a => category === 'all' || a.category === category)
      .filter(a => status === 'all' || a.status === status)
      .filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime))
  }, [activities, searchQuery, category, status])

  const [deleteTarget, setDeleteTarget] = useState(null)

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (act) => { setEditing(act); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setEditing(null) }

  const handleSubmit = async (data) => {
    if (editing) await updateActivity(editing.id, data)
    else await addActivity(data)
    closeModal()
  }

  const handleDelete = (id) => {
    const act = activities.find(a => a.id === id)
    if (act) setDeleteTarget(act) // Buka modal
  }

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteActivity(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  // LOADING SKELETON
  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-surface-2 rounded w-1/4"></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-surface-2 rounded-xl"></div>)}
        </div>
        <div className="h-10 bg-surface-2 rounded w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-40 bg-surface-2 rounded-xl"></div>)}
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Semua kegiatanmu dalam satu tampilan"
        action={<Button onClick={openCreate}><Plus size={16} /> Tambah Kegiatan</Button>}
      />

      <StatCards />
      <FilterBar
        search={searchQuery}
        onSearchChange={setSearchQuery}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
      />
      <ActivityGrid activities={filtered} onEdit={openEdit} onDelete={handleDelete} onToggle={toggleStatus} emptyAction={<Button onClick={openCreate}><Plus size={16} /> Tambah Kegiatan</Button>} />

      <Modal open={modalOpen} onClose={closeModal} title={editing ? 'Edit Kegiatan' : 'Tambah Kegiatan'}>
        <ActivityForm initial={editing} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Hapus Kegiatan"
        message={`Apakah kamu yakin ingin menghapus "${deleteTarget?.title}"? Tindakan ini tidak bisa dibatalkan.`}
      />
    </>
  )
}