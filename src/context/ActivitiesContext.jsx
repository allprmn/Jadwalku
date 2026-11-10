// src/context/ActivitiesContext.jsx
import { createContext, useEffect, useMemo, useState } from 'react'
import { dummyActivities } from '../data/dummyActivities.js'
import { createId } from '../utils/id.js'

export const ActivitiesContext = createContext(null)

const STORAGE_KEY = 'jadwalku:activities'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return dummyActivities
}

export function ActivitiesProvider({ children }) {
  const [activities, setActivities] = useState(loadInitial)

  // simpan otomatis setiap kali berubah
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities))
  }, [activities])

  // === CRUD ===
  function addActivity(payload) {
    const newActivity = {
      id: createId(),
      status: 'upcoming',
      ...payload,
    }
    setActivities((prev) => [newActivity, ...prev])
    return newActivity
  }

  function updateActivity(id, patch) {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
    )
  }

  function deleteActivity(id) {
    setActivities((prev) => prev.filter((a) => a.id !== id))
  }

  function toggleStatus(id) {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === 'done' ? 'upcoming' : 'done' }
          : a
      )
    )
  }

  function resetActivities() {
    setActivities(dummyActivities)
  }

  // === Derived data (memoized) ===
  const stats = useMemo(() => {
    const total = activities.length
    const done = activities.filter((a) => a.status === 'done').length
    const upcoming = total - done
    return { total, done, upcoming }
  }, [activities])

  const value = {
    activities,
    stats,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleStatus,
    resetActivities,
  }

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  )
}