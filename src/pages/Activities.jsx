// src/pages/Activities.jsx
import PageHeader from '../components/ui/PageHeader.jsx'

export default function Activities() {
  return (
    <>
      <PageHeader
        title="Daftar Kegiatan"
        subtitle="Semua kegiatan dalam bentuk daftar"
      />
      <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
        Tabel / list semua kegiatan akan diisi di langkah berikutnya.
      </div>
    </>
  )
}