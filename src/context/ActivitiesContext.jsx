import { createContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export const ActivitiesContext = createContext(null)

export function ActivitiesProvider({ children }) {
  const [activities, setActivities] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)
  
  const [searchQuery, setSearchQuery] = useState('')

  const fetchData = async (isInitial = false) => {
    if (isInitial) setInitialLoading(true)
    
    const { data: actData, error: actErr } = await supabase.from('activities').select('*')
    const { data: taskData, error: taskErr } = await supabase.from('tasks').select('*')

    if (!actErr && !taskErr) {
      const mappedActivities = (actData || []).map(a => ({
        id: a.id, title: a.title, category: a.category, date: a.date,
        startTime: a.start_time ? a.start_time.slice(0, 5) : '00:00',
        endTime: a.end_time ? a.end_time.slice(0, 5) : '00:00',
        location: a.location, description: a.description, status: a.status, isExternal: false
      }))

      const mappedTasks = (taskData || []).map(t => ({
        id: t.id, title: `[Tugas] ${t.title}`, category: 'Tugas',
        date: t.deadline ? t.deadline.split('T')[0] : new Date().toISOString().split('T')[0],
        startTime: '23:59', endTime: '23:59', location: 'Sistem Tugas',
        description: t.description || 'Deadline tugas kuliah',
        status: t.is_completed ? 'done' : 'upcoming', isExternal: true 
      }))

      const combined = [...mappedActivities, ...mappedTasks].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
      setActivities(combined)
    }
    if (isInitial) setInitialLoading(false)
  }

  useEffect(() => { fetchData(true) }, [])

  async function addActivity(payload) {
    await supabase.from('activities').insert([{ 
      title: payload.title, category: payload.category, date: payload.date,
      start_time: payload.startTime, end_time: payload.endTime,
      location: payload.location, description: payload.description, status: 'upcoming'
    }])
    fetchData()
  }

  async function updateActivity(id, patch) {
    await supabase.from('activities').update({ 
      title: patch.title, category: patch.category, date: patch.date,
      start_time: patch.startTime, end_time: patch.endTime,
      location: patch.location, description: patch.description
    }).eq('id', id)
    fetchData()
  }

  async function deleteActivity(id) {
    const item = activities.find(a => a.id === id)
    if (item?.isExternal) return
    await supabase.from('activities').delete().eq('id', id)
    fetchData()
  }

  async function toggleStatus(id) {
    const item = activities.find(a => a.id === id)
    if (item?.isExternal) return
    const newStatus = item.status === 'done' ? 'upcoming' : 'done'
    await supabase.from('activities').update({ status: newStatus }).eq('id', id)
    fetchData()
  }

  const stats = useMemo(() => {
    const total = activities.length
    const done = activities.filter((a) => a.status === 'done').length
    return { total, done, upcoming: total - done }
  }, [activities])

   async function deleteAllActivities() {
    await supabase.from('activities').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    fetchData()
  }

  return (
    <ActivitiesContext.Provider value={{
      activities, stats, loading: initialLoading,
      addActivity, updateActivity, deleteActivity, toggleStatus,
      searchQuery, setSearchQuery,
      deleteAllActivities
    }}>
      {children}
    </ActivitiesContext.Provider>
  )
}