import type { ReactNode } from 'react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { img } from '@/lib/img'

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  inverted = false,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  inverted?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2
        className={cn(
          'text-3xl leading-tight font-semibold sm:text-4xl',
          inverted ? 'text-white' : 'text-navy',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed',
            inverted ? 'text-white/75' : 'text-muted-foreground',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}

/** Inner-page banner with a photo, heading and short intro. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  image: string
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      <img
        src={img(image, 1600, 70)}
        alt=""
        className="hero-zoom absolute inset-0 -z-10 size-full object-cover opacity-45"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
      <Container className="py-20 sm:py-28">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl leading-[1.05] font-semibold text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          {intro}
        </p>
        {children}
      </Container>
    </section>
  )
}

/** Small label marking demonstration content that must be replaced before launch. */
export function SampleBadge({
  className,
  label = 'Sample content',
}: {
  className?: string
  label?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-gold/50 bg-gold-soft px-2.5 py-0.5 text-[0.7rem] font-semibold tracking-wide text-navy uppercase',
        className,
      )}
    >
      <Info className="size-3" aria-hidden="true" />
      {label}
    </span>
  )
}
