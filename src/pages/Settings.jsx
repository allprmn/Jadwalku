// src/pages/Settings.jsx
import PageHeader from '../components/ui/PageHeader.jsx'

export default function Settings() {
  return (
    <>
      <PageHeader
        title="Pengaturan"
        subtitle="Konfigurasi aplikasi"
      />
      <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
        Opsi reset data & ekspor akan diisi di langkah berikutnya.
      </div>
    </>
  )
}