import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, HandHeart, Heart, MapPin, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Reveal } from '@/components/site/reveal'
import { programIcons } from '@/components/site/program-icons'
import {
  Container,
  SampleBadge,
  SectionHeading,
} from '@/components/site/section'
import {
  featuredProjects,
  formatMoney,
  impactStats,
  news,
  org,
  programs,
  testimonials,
} from '@/lib/content'
import { img, imgSet } from '@/lib/img'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'HopeBridge Foundation — Building Hope. Changing Lives.' },
      {
        name: 'description',
        content:
          'HopeBridge Foundation transforms lives by supporting vulnerable communities through education, healthcare, food assistance, youth empowerment and community development.',
      },
    ],
  }),
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <ProgramsGrid />
      <FeaturedProjects />
      <Impact />
      <Testimonials />
      <News />
      <FinalCta />
    </>
  )
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      <img
        src={img('hero.png', 1600, 72)}
        srcSet={imgSet('hero.png', [800, 1200, 1600, 2000])}
        sizes="100vw"
        alt="Schoolchildren and their teacher walking together along a rural road at sunset"
        className="hero-zoom absolute inset-0 -z-10 size-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/95 via-navy-deep/70 to-navy-deep/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-deep/70 to-transparent" />
      <Container className="flex min-h-[calc(100svh-4.5rem)] flex-col justify-center py-24 lg:min-h-[44rem]">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            HopeBridge Foundation
          </p>
          <h1 className="text-5xl leading-[1.02] font-semibold text-white sm:text-6xl lg:text-7xl">
            Building Hope.
            <br />
            <span className="text-gold italic">Changing Lives.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            We walk alongside vulnerable communities — keeping children in
            school, bringing healthcare closer to home, feeding families in
            crisis and equipping young people and women to thrive.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-13 bg-gold px-8 text-base font-bold text-navy-deep hover:bg-gold/90"
            >
              <Link to="/donate">
                <Heart className="fill-current" aria-hidden="true" /> Donate
                Now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 border-white/40 bg-white/5 px-8 text-base font-bold text-white backdrop-blur hover:bg-white hover:text-navy"
            >
              <Link to="/get-involved">
                Get Involved <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Intro() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <img
            src={img('story.png', 900)}
            srcSet={imgSet('story.png', [480, 800, 1200])}
            sizes="(min-width: 1024px) 40vw, 100vw"
            alt="Community volunteers and local leaders meeting under an acacia tree"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
            loading="lazy"
          />
          <div className="absolute -right-4 -bottom-6 hidden max-w-xs rounded-xl bg-navy p-6 text-white shadow-2xl sm:block lg:-right-10">
            <HandHeart className="mb-3 size-7 text-gold" aria-hidden="true" />
            <p className="font-display text-lg leading-snug">
              “Communities lead. We build the bridge.”
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <SectionHeading
            eyebrow="Who we are"
            title="A bridge between generosity and the communities who need it most"
          />
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            HopeBridge Foundation is a nonprofit organisation working with
            vulnerable families in Kenya and beyond. Our mission is{' '}
            <span className="font-semibold text-navy">
              {org.mission.charAt(0).toLowerCase() + org.mission.slice(1)}
            </span>
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We partner with local leaders, schools and health workers so that
            every project responds to real needs — and continues long after our
            support ends.
          </p>
          <Button asChild variant="link" className="mt-6 px-0 text-base font-bold">
            <Link to="/about">
              Read our story <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}

function ProgramsGrid() {
  return (
    <section className="bg-muted py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Five programmes, one purpose"
            intro="Integrated support that addresses the root causes of poverty — not just its symptoms."
          />
          <Button asChild variant="outline" size="lg" className="self-start md:self-auto">
            <Link to="/programs">
              All programs <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {programs.map((p, i) => {
            const Icon = programIcons[p.slug]
            return (
              <Reveal as="li" key={p.slug} delay={i * 70}>
                <Link
                  to="/programs"
                  hash={p.slug}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg motion-reduce:transition-none"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg leading-snug font-semibold text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-navy">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

function FeaturedProjects() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured community projects"
            title="Where your support goes right now"
          />
          <SampleBadge label="Sample projects & figures" />
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {featuredProjects.map((project, i) => {
            const pct = Math.round((project.raised / project.goal) * 100)
            return (
              <Reveal as="li" key={project.title} delay={i * 90}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img(project.image, 640)}
                      srcSet={imgSet(project.image, [400, 640, 960])}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      alt=""
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <MapPin className="size-3.5 text-gold" aria-hidden="true" />
                      {project.location}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-navy">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>
                    <div className="mt-6">
                      <Progress
                        value={pct}
                        aria-label={`${project.title} funding progress`}
                        className="h-2 bg-secondary [&_[data-slot=progress-indicator]]:bg-gold"
                      />
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="font-bold text-navy">
                          {formatMoney(project.raised, 'KES')} raised
                        </span>
                        <span className="text-muted-foreground">
                          of {formatMoney(project.goal, 'KES')}
                        </span>
                      </div>
                    </div>
                    <Button asChild className="mt-6 w-full font-bold">
                      <Link to="/donate" search={{ project: project.title }}>
                        Support this project
                      </Link>
                    </Button>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

function Impact() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
      <div
        className="pointer-events-none absolute -top-40 -right-40 size-[30rem] rounded-full border-[3rem] border-white/5"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Our impact"
          title="Measured honestly, reported openly"
          intro="We publish only verified figures drawn from our monitoring records and audited reports."
          inverted
        />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((s) => (
            <div key={s.label} className="bg-navy p-8">
              <dt className="text-sm font-semibold text-white/70">{s.label}</dt>
              <dd className="mt-3 font-display text-5xl font-semibold text-gold">
                {s.value === null ? (
                  <>
                    <span aria-hidden="true">—</span>
                    <span className="sr-only">Figure not yet published</span>
                  </>
                ) : (
                  s.value.toLocaleString()
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm text-white/60">
          Placeholder: verified impact figures will be published here once
          entered from the organisation’s records.
        </p>
      </Container>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="bg-gold-soft/60 py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Voices from our communities"
            title="Stories of hope"
          />
          <SampleBadge label="Sample testimonials" />
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl bg-card p-8 shadow-sm">
                <Quote className="size-9 fill-gold text-gold" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-navy">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
                  <span className="grid size-11 place-items-center rounded-full bg-navy font-bold text-gold">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-bold text-navy">{t.name}</span>
                    <span className="block text-sm text-muted-foreground">
                      {t.role} · {t.location}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function News() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="News & updates" title="From the field" />
          <SampleBadge label="Sample news" />
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {news.map((n, i) => (
            <Reveal as="li" key={n.slug} delay={i * 90}>
              <article className="group">
                <div className="aspect-[16/10] overflow-hidden rounded-xl">
                  <img
                    src={img(n.image, 640)}
                    srcSet={imgSet(n.image, [400, 640, 960])}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  />
                </div>
                <p className="mt-5 flex items-center gap-3 text-xs font-bold tracking-wider text-gold uppercase">
                  {n.category}
                  <span className="h-px w-6 bg-border" aria-hidden="true" />
                  <time dateTime={n.date} className="text-muted-foreground">
                    {new Date(n.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </p>
                <h3 className="mt-3 text-xl leading-snug font-semibold text-navy">
                  {n.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {n.excerpt}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={img('cta.png', 1600, 70)}
        srcSet={imgSet('cta.png', [800, 1200, 1600])}
        sizes="100vw"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-navy-deep/80" />
      <Container className="py-24 text-center sm:py-32">
        <Reveal>
          <p className="eyebrow mb-4">Be the bridge</p>
          <h2 className="mx-auto max-w-3xl text-4xl leading-tight font-semibold text-white sm:text-5xl">
            Hope grows when we build it together.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            Give once, give monthly, volunteer your time or partner with us.
            Every act of support helps a family take the next step forward.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-13 bg-gold px-8 text-base font-bold text-navy-deep hover:bg-gold/90"
            >
              <Link to="/donate">
                <Heart className="fill-current" aria-hidden="true" /> Donate
                Now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 border-white/40 bg-transparent px-8 text-base font-bold text-white hover:bg-white hover:text-navy"
            >
              <Link to="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
