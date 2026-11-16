import { cn } from '@/lib/utils'

/** HopeBridge mark: a bridge arch rising over a gold sun, with two pillars. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn('size-10 shrink-0', className)}
    >
      <rect width="48" height="48" rx="12" fill="var(--navy)" />
      <circle cx="24" cy="26" r="7.5" fill="var(--gold)" />
      <path
        d="M8 33c4.5-9.5 10-14 16-14s11.5 4.5 16 14"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14 25.5V36M34 25.5V36M7 36h34"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M24 10v3.5M15.5 13.5l2 2.6M32.5 13.5l-2 2.6"
        stroke="var(--gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-xl font-semibold tracking-tight',
            inverted ? 'text-white' : 'text-navy',
          )}
        >
          HopeBridge
        </span>
        <span
          className={cn(
            'mt-1 text-[0.65rem] font-bold tracking-[0.32em] uppercase',
            inverted ? 'text-gold' : 'text-gold',
          )}
        >
          Foundation
        </span>
      </span>
    </span>
  )
}
