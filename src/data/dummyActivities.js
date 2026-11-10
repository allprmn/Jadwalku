// src/data/dummyActivities.js
import { todayKey } from '../utils/date.js'

const today = todayKey()
const [, y, m] = today.split('-')
const d = Number(today.split('-')[2])
const pad = (n) => String(n).padStart(2, '0')
const mk = (day) => `${y}-${m}-${pad(day)}`

/**
 * @typedef {Object} Activity
 * @property {string} id
 * @property {string} title
 * @property {'Kuliah'|'Tugas'|'Organisasi'|'Pribadi'} category
 * @property {string} date          // "YYYY-MM-DD"
 * @property {string} startTime     // "08:00"
 * @property {string} endTime       // "10:00"
 * @property {string} location
 * @property {string} description
 * @property {'upcoming'|'done'} status
 */

/** @type {Activity[]} */
export const dummyActivities = [
  {
    id: 'a1',
    title: 'Kuliah Pemrograman Web',
    category: 'Kuliah',
    date: mk(d),
    startTime: '08:00',
    endTime: '10:30',
    location: 'Lab Komputer 3',
    description: 'Materi: Component-Based UI dengan React',
    status: 'upcoming',
  },
  {
    id: 'a2',
    title: 'Kerjakan Tugas PWA Pertemuan 6',
    category: 'Tugas',
    date: mk(d),
    startTime: '13:00',
    endTime: '15:00',
    location: 'Rumah',
    description: 'Revisi dokumentasi Git & Vite sebelum dikumpulkan',
    status: 'upcoming',
  },
  {
    id: 'a3',
    title: 'Rapat Divisi Acara',
    category: 'Organisasi',
    date: mk(Math.min(d + 1, 28)),
    startTime: '16:00',
    endTime: '17:30',
    location: 'Sekretariat BEM',
    description: 'Persiapan event bulan depan',
    status: 'upcoming',
  },
  {
    id: 'a4',
    title: 'Belajar React Router',
    category: 'Pribadi',
    date: mk(Math.max(d - 1, 1)),
    startTime: '19:00',
    endTime: '20:30',
    location: 'Rumah',
    description: 'Menyelesaikan modul routing & nested layout',
    status: 'done',
  },
  {
    id: 'a5',
    title: 'Review Pull Request Tim',
    category: 'Tugas',
    date: mk(Math.min(d + 2, 28)),
    startTime: '09:00',
    endTime: '10:00',
    location: 'Online',
    description: 'Cek kode teman di repository kelompok',
    status: 'upcoming',
  },
  {
    id: 'a6',
    title: 'Olahraga Pagi',
    category: 'Pribadi',
    date: mk(Math.max(d - 2, 1)),
    startTime: '06:00',
    endTime: '07:00',
    location: 'Lapangan Kampus',
    description: 'Jogging ringan',
    status: 'done',
  },
]

export const CATEGORIES = ['Kuliah', 'Tugas', 'Organisasi', 'Pribadi']