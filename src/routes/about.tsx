import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Compass,
  Eye,
  FileCheck2,
  Handshake,
  Leaf,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  HeartHandshake,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/site/reveal'
import {
  Container,
  PageHero,
  SampleBadge,
  SectionHeading,
} from '@/components/site/section'
import { coreValues, org, team } from '@/lib/content'
import { img, imgSet } from '@/lib/img'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Us — HopeBridge Foundation' },
      {
        name: 'description',
        content:
          'Our story, vision, mission, core values, leadership and our commitment to transparency and accountability.',
      },
    ],
  }),
  component: About,
})

const valueIcons = [Sparkles, Scale, Users, HeartHandshake, ShieldCheck, Leaf]

const commitments = [
  {
    icon: FileCheck2,
    title: 'Annual reports & audited accounts',
    text: 'We will publish annual reports and independently audited financial statements here as they become available.',
  },
  {
    icon: Target,
    title: 'Restricted gifts honoured',
    text: 'Gifts made to a specific programme or project are used for that purpose, or donors are contacted before any change.',
  },
  {
    icon: Compass,
    title: 'Monitoring & evaluation',
    text: 'Every project tracks agreed indicators so we can report results honestly — including what didn’t work.',
  },
  {
    icon: ShieldCheck,
    title: 'Safeguarding & data protection',
    text: 'We protect the children and adults we serve, and handle donor data in line with applicable data-protection law.',
  },
]

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Rooted in community. Driven by hope."
        intro="HopeBridge Foundation exists to connect people who want to help with communities working to build a better future for themselves."
        image="story.png"
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <img
              src={img('gallery-6.png', 900)}
              srcSet={imgSet('gallery-6.png', [480, 800, 1200])}
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt="Members of a women’s savings group meeting in a circle"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-xl"
            />
          </Reveal>
          <Reveal delay={100} className="self-center">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Our story</p>
              <SampleBadge />
            </div>
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-navy sm:text-4xl">
              It began with a simple question: what would it take for every
              child in this village to finish school?
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                HopeBridge Foundation was started by a small group of
                educators, health workers and community volunteers who saw
                talented young people leave school because of fees, hunger or
                illness at home.
              </p>
              <p>
                We quickly learned that no single intervention was enough. A
                scholarship helps — but so does a nearby clinic, a reliable
                water point, a meal during drought, and a parent with a steady
                income. That is why our work now spans five connected
                programmes.
              </p>
              <p>
                Today we work hand in hand with local leaders, schools, health
                workers and volunteers, guided by the priorities communities set
                for themselves.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy py-20 text-white sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-10">
            <Eye className="size-9 text-gold" aria-hidden="true" />
            <h2 className="mt-6 text-3xl font-semibold">Our vision</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              {org.vision}
            </p>
          </Reveal>
          <Reveal delay={100} className="rounded-2xl border border-white/10 bg-white/5 p-10">
            <Target className="size-9 text-gold" aria-hidden="true" />
            <h2 className="mt-6 text-3xl font-semibold">Our mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              {org.mission}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Core values"
            title="The principles behind every decision"
            align="center"
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, i) => {
              const Icon = valueIcons[i]
              return (
                <Reveal as="li" key={v.title} delay={i * 60}>
                  <div className="h-full rounded-2xl border border-border p-8 transition-colors hover:border-gold">
                    <span className="grid size-12 place-items-center rounded-xl bg-gold-soft text-navy">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold text-navy">
                      {v.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {v.text}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </Container>
      </section>

      <section className="bg-muted py-20 sm:py-28" id="team">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Leadership & team"
              title="The people building the bridge"
              intro="Our leadership team brings together experience in public health, education, finance and community development."
            />
            <SampleBadge label="Sample profiles" />
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 70}>
                <div className="h-full rounded-2xl bg-card p-8 text-center shadow-sm">
                  <span
                    className="mx-auto grid size-24 place-items-center rounded-full bg-navy font-display text-3xl font-semibold text-gold ring-4 ring-gold-soft"
                    aria-hidden="true"
                  >
                    {m.initials}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy">
                    {m.name}
                  </h3>
                  <p className="text-sm font-bold text-gold">{m.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {m.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-28" id="transparency">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Transparency & accountability"
              title="Your trust is our most important asset"
              intro="We believe donors and communities deserve to know exactly how resources are used."
            />
            <div className="mt-8 rounded-xl border border-dashed border-gold bg-gold-soft/60 p-6 text-sm leading-relaxed text-navy">
              <p className="font-bold">Registration & financial documents</p>
              <p className="mt-2 text-muted-foreground">
                Placeholder: add the foundation’s official registration
                details, annual reports and audited accounts here once they are
                available for publication.
              </p>
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border p-7">
                  <c.icon className="size-7 text-gold" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-navy">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-navy-deep py-16">
        <Container className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Join us in building hope.
            </h2>
            <p className="mt-2 text-white/70">
              Give, volunteer or partner — there’s a place for you here.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-gold font-bold text-navy-deep hover:bg-gold/90">
              <Link to="/donate">Donate Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent font-bold text-white hover:bg-white hover:text-navy">
              <Link to="/get-involved">
                <Handshake aria-hidden="true" /> Get Involved
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
