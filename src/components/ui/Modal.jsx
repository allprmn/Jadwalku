import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return
    
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-lg bg-surface border border-border rounded-2xl shadow-xl animate-scale-in flex flex-col"
        role="dialog"
        aria-modal="true"
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="text-base font-brand">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1.5 rounded-lg text-muted hover:text-text hover:bg-surface-2 transition"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 overflow-y-auto flex-1 overscroll-contain">
          {children}
        </div>

        {footer && (
          <div className="px-5 py-4 border-t border-border shrink-0 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}