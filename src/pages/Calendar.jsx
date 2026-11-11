// src/pages/Calendar.jsx
import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import CalendarGrid from '../components/calendar/CalendarGrid.jsx'
import DayDetail from '../components/calendar/DayDetail.jsx'
import ActivityForm from '../components/dashboard/ActivityForm.jsx'
import { useActivities } from '../hooks/useActivities.js'
import { todayKey, MONTH_NAMES } from '../utils/date.js'

export default function Calendar() {
  const { activities, addActivity, updateActivity, deleteActivity, toggleStatus } = useActivities()

  const [cursor, setCursor] = useState(() => {
    const d = new Date()
    return { year: d.getFullYear(), month: d.getMonth() }
  })
  const [selectedDate, setSelectedDate] = useState(todayKey())

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const dayActivities = useMemo(
    () => activities.filter(a => a.date === selectedDate),
    [activities, selectedDate]
  )

  const prev = () => setCursor(c =>
    c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 })
  const next = () => setCursor(c =>
    c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 })

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
        title="Kalender"
        subtitle="Lihat kegiatan per tanggal"
        action={<Button onClick={openCreate}><Plus size={16} /> Tambah Kegiatan</Button>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold">
              {MONTH_NAMES[cursor.month]} {cursor.year}
            </h2>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={prev}><ChevronLeft size={16} /></Button>
              <Button variant="ghost" size="icon" onClick={next}><ChevronRight size={16} /></Button>
            </div>
          </div>

          <CalendarGrid
            year={cursor.year}
            month={cursor.month}
            activities={activities}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        <div>
          <DayDetail
            date={selectedDate}
            activities={dayActivities}
            onEdit={openEdit}
            onDelete={handleDelete}
            onToggle={toggleStatus}
          />
        </div>
      </div>

      <Modal open={modalOpen} onClose={closeModal} title={editing ? 'Edit Kegiatan' : 'Tambah Kegiatan'}>
        <ActivityForm
          initial={editing}
          defaultDate={selectedDate}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </>
  )
}