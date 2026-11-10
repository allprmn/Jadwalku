// src/components/ui/Modal.jsx
import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, footer }) {
  // kunci scroll saat modal terbuka
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // tutup dengan Esc
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* panel */}
      <div
        className="relative w-full max-w-lg bg-surface border border-border rounded-2xl shadow-xl animate-scale-in"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 rounded-lg text-muted hover:text-text hover:bg-surface-2 transition"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 max-h-[70vh] overflow-y-auto">{children}</div>

        {footer && (
          <div className="px-5 py-4 border-t border-border flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}