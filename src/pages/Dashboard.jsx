// src/pages/Dashboard.jsx
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

export default function Dashboard() {
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
  const openEdit = (act) => { setEditing(act); setModalOpen(true) }
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
        title="Dashboard"
        subtitle="Semua kegiatanmu dalam satu tampilan"
        action={<Button onClick={openCreate}><Plus size={16} /> Tambah Kegiatan</Button>}
      />

      <StatCards />

      <FilterBar
        search={search} onSearchChange={setSearch}
        category={category} onCategoryChange={setCategory}
        status={status} onStatusChange={setStatus}
      />

      <ActivityGrid
        activities={filtered}
        onEdit={openEdit}
        onDelete={handleDelete}
        onToggle={toggleStatus}
        emptyAction={<Button onClick={openCreate}><Plus size={16} /> Tambah Kegiatan</Button>}
      />

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? 'Edit Kegiatan' : 'Tambah Kegiatan'}
      >
        <ActivityForm initial={editing} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
    </>
  )
}