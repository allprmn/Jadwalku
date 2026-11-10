// src/pages/Statistics.jsx
import PageHeader from '../components/ui/PageHeader.jsx'

export default function Statistics() {
  return (
    <>
      <PageHeader
        title="Statistik"
        subtitle="Ringkasan progres kegiatanmu"
      />
      <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
        Grafik & progress bar akan diisi di langkah berikutnya.
      </div>
    </>
  )
}