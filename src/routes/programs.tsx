import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/site/reveal'
import { programIcons } from '@/components/site/program-icons'
import { Container, PageHero } from '@/components/site/section'
import { programs } from '@/lib/content'
import { img, imgSet } from '@/lib/img'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/programs')({
  head: () => ({
    meta: [
      { title: 'Our Programs — HopeBridge Foundation' },
      {
        name: 'description',
        content:
          'Education and scholarships, healthcare outreach, food and emergency assistance, youth and women empowerment, and community development.',
      },
    ],
  }),
  component: Programs,
})

function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Our programs"
        title="Integrated support for lasting change"
        intro="Our five programmes work together, because a child’s education depends on their health, their family’s food security and the strength of their community."
        image="education.png"
      />

      <nav
        aria-label="Programs"
        className="sticky top-18 z-30 border-b bg-background/95 backdrop-blur"
      >
        <Container>
          <ul className="-mx-2 flex gap-1 overflow-x-auto py-3">
            {programs.map((p) => {
              const Icon = programIcons[p.slug]
              return (
                <li key={p.slug} className="shrink-0">
                  <a
                    href={`#${p.slug}`}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-navy/80 hover:bg-muted hover:text-navy"
                  >
                    <Icon className="size-4 text-gold" aria-hidden="true" />
                    {p.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </Container>
      </nav>

      {programs.map((p, i) => {
        const Icon = programIcons[p.slug]
        const flip = i % 2 === 1
        return (
          <section
            key={p.slug}
            id={p.slug}
            className={cn('scroll-mt-36 py-20 sm:py-24', flip && 'bg-muted')}
            aria-labelledby={`${p.slug}-title`}
          >
            <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={cn(flip && 'lg:order-2')}>
                <img
                  src={img(p.image, 900)}
                  srcSet={imgSet(p.image, [480, 800, 1200])}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
                />
              </Reveal>
              <Reveal delay={100}>
                <span className="grid size-14 place-items-center rounded-2xl bg-navy text-gold">
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <p className="eyebrow mt-6">Program 0{i + 1}</p>
                <h2
                  id={`${p.slug}-title`}
                  className="mt-2 text-3xl leading-tight font-semibold text-navy sm:text-4xl"
                >
                  {p.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {p.focus.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm font-medium text-navy">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-navy">How you can help: </span>
                    {p.howToHelp}
                  </p>
                  <Button asChild className="shrink-0 font-bold">
                    <Link to="/donate" search={{ program: p.slug }}>
                      Support <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </Container>
          </section>
        )
      })}
    </>
  )
}
