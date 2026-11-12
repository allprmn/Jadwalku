// src/components/ui/SwipeRow.jsx
import { useRef, useState } from 'react'

export default function SwipeRow({ 
  children, 
  actionIcon, // <-- Ubah jadi props terpisah
  onCommit, 
  actionWidth = 80, 
  drawerColor = '#262626', 
  actionColor = '#ef4444' 
}) {
  const [offset, setOffset] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const startX = useRef(0)
  const isDragging = useRef(false)

  const handlePointerDown = (e) => {
    isDragging.current = true
    startX.current = e.clientX - offset
    e.target.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current) return
    const currentX = e.clientX - startX.current
    if (currentX < 0) {
      setOffset(Math.max(currentX, -actionWidth - 20))
    }
  }

  const handlePointerUp = () => {
    isDragging.current = false
    if (offset < -actionWidth * 0.5) {
      setOffset(-actionWidth)
      setIsOpen(true)
    } else {
      setOffset(0)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-xl mb-2" style={{ backgroundColor: drawerColor }}>
      {/* Tombol Hapus di Belakang */}
      <div 
        className="absolute inset-y-0 right-0 flex items-center justify-center cursor-pointer"
        style={{ width: actionWidth, backgroundColor: actionColor }}
        onClick={() => onCommit && onCommit('delete')}
      >
        {actionIcon || <span className="text-white text-xs font-medium">Hapus</span>}
      </div>

      {/* Konten Utama */}
      <div
        className="relative flex items-center p-4 bg-surface text-text cursor-grab active:cursor-grabbing"
        style={{ 
          transform: `translateX(${offset}px)`,
          transition: isDragging.current ? 'none' : 'transform 0.2s ease-out',
          touchAction: 'pan-y'
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={() => {
          if (isOpen) {
            setOffset(0)
            setIsOpen(false)
          }
        }}
      >
        {children} {/* <-- Render children langsung */}
      </div>
    </div>
  )
}