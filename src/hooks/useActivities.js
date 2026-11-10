// src/hooks/useActivities.js
import { useContext } from 'react'
import { ActivitiesContext } from '../context/ActivitiesContext.jsx'

export function useActivities() {
  const ctx = useContext(ActivitiesContext)
  if (!ctx) {
    throw new Error('useActivities harus dipakai di dalam <ActivitiesProvider>')
  }
  return ctx
}