import { AlertTriangle } from 'lucide-react'
import Button from './Button.jsx'
import SpotlightCard from './SpotlightCard.jsx'

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Konfirmasi Hapus", 
  message = "Apakah kamu yakin ingin melanjutkan? Tindakan ini tidak dapat dibatalkan." 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" 
        onClick={onClose} 
      />

      {/* Konten Modal dengan SpotlightCard */}
      <div className="relative w-full max-w-sm animate-scale-in">
        <SpotlightCard 
          className="p-6 border-red-500/30" 
          spotlightColor="rgba(239, 68, 68, 0.15)" // Efek sorotan merah
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-4 ring-1 ring-red-500/20">
              <AlertTriangle size={24} />
            </div>
            
            <h2 className="text-lg font-brand text-text mb-2">{title}</h2>
            <p className="text-sm text-muted mb-6">{message}</p>
            
            <div className="flex gap-3 w-full">
              <Button variant="ghost" className="flex-1" onClick={onClose}>
                Batal
              </Button>
              <Button 
                className="flex-1 bg-red-500 hover:bg-red-600 text-white border-none" 
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
              >
                Ya, Hapus
              </Button>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  )
}