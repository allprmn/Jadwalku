// src/pages/Dashboard.jsx
import PageHeader from '../components/ui/PageHeader.jsx'

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Semua kegiatanmu dalam satu tampilan"
      />
      <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
        Area kartu kegiatan akan diisi di langkah berikutnya.
      </div>
    </>
  )
}