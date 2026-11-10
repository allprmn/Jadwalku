// src/components/ui/Button.jsx
import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary:
    'bg-white text-black hover:bg-zinc-200 active:bg-zinc-300 font-medium',
  ghost:
    'bg-transparent text-muted hover:text-text hover:bg-surface-2',
  outline:
    'bg-transparent text-text border border-border-2 hover:bg-surface-2',
  danger:
    'bg-transparent text-danger border border-danger/40 hover:bg-danger/10',
}

const SIZES = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
  icon: 'h-9 w-9',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg
        transition-colors duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
        ${VARIANTS[variant]} ${SIZES[size]} ${className}
      `}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}