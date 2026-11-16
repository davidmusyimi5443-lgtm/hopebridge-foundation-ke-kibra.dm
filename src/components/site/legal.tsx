import type { ReactNode } from 'react'
import { Container } from './section'

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <>
      <section className="bg-navy-deep">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow mb-3">Legal</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-white/60">Last updated: {updated}</p>
        </Container>
      </section>
      <Container className="py-16">
        <div className="mx-auto max-w-reading rounded-xl border border-dashed border-gold bg-gold-soft/60 p-5 text-sm text-navy">
          This is a template policy provided as sample content. Have it reviewed
          by a qualified legal adviser and adapted to the foundation’s
          jurisdiction (including Kenya’s Data Protection Act, 2019) before
          publication.
        </div>
        <article className="mx-auto mt-10 max-w-reading space-y-5 leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-navy [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </article>
      </Container>
    </>
  )
}
