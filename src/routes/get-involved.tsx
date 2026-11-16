import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Briefcase,
  Building2,
  CalendarHeart,
  Handshake,
  HandHeart,
  Megaphone,
  Trophy,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Field,
  NetlifyForm,
  SelectField,
} from '@/components/site/netlify-form'
import { Reveal } from '@/components/site/reveal'
import {
  Container,
  PageHero,
  SampleBadge,
  SectionHeading,
} from '@/components/site/section'
import { campaigns, programs } from '@/lib/content'
import { img } from '@/lib/img'

export const Route = createFileRoute('/get-involved')({
  head: () => ({
    meta: [
      { title: 'Get Involved — HopeBridge Foundation' },
      {
        name: 'description',
        content:
          'Volunteer, partner, sponsor or fundraise with HopeBridge Foundation.',
      },
    ],
  }),
  component: GetInvolved,
})

const ways = [
  { icon: HandHeart, title: 'Volunteer', text: 'Share your time and skills in the field or remotely.', href: 'volunteer' },
  { icon: Handshake, title: 'Partner', text: 'Collaborate with us as an NGO, school or institution.', href: 'partner' },
  { icon: Building2, title: 'Sponsor', text: 'Align your company’s purpose with lasting impact.', href: 'sponsor' },
  { icon: Megaphone, title: 'Fundraise', text: 'Rally friends and family behind a campaign.', href: 'fundraise' },
]

const sponsorTiers = [
  { icon: Trophy, title: 'Programme sponsorship', text: 'Fund a full programme cycle — such as a scholarship cohort or outreach season — with regular impact reporting.' },
  { icon: Briefcase, title: 'Employee engagement', text: 'Volunteer days, payroll giving and matched-giving schemes that involve your whole team.' },
  { icon: CalendarHeart, title: 'Event & in-kind support', text: 'Sponsor community events or contribute goods, services and professional expertise.' },
]

function GetInvolved() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="There’s a place for you on the bridge"
        intro="Whether you have an hour, a skill, a network or an organisation behind you, your involvement multiplies what communities can achieve."
        image="gallery-2.png"
      />

      <section className="py-16">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ways.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 60}>
                <a
                  href={`#${w.href}`}
                  className="group flex h-full flex-col rounded-2xl border border-border p-6 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg motion-reduce:transition-none"
                >
                  <w.icon className="size-8 text-gold" aria-hidden="true" />
                  <h2 className="mt-4 text-xl font-semibold text-navy">{w.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section id="volunteer" className="scroll-mt-24 bg-muted py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Volunteer registration"
              title="Lend your time and talent"
              intro="We welcome teachers, health professionals, mentors, photographers, IT specialists and everyday helpers. Tell us about yourself and we’ll match you with opportunities."
            />
            <img
              src={img('gallery-1.png', 800)}
              alt="Children playing football at a community sports day"
              loading="lazy"
              className="mt-8 hidden aspect-[4/3] w-full rounded-2xl object-cover lg:block"
            />
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
            <NetlifyForm
              name="volunteer"
              submitLabel="Register as a volunteer"
              successTitle="Thank you for volunteering!"
              successText="Our volunteer coordinator will be in touch by email about suitable opportunities."
              className="grid gap-5 sm:grid-cols-2"
            >
              <Field label="Full name" name="name" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" maxLength={254} />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              <Field label="Town / country" name="location" required />
              <SelectField
                label="Area of interest"
                name="interest"
                required
                options={[...programs.map((p) => p.title), 'Events & fundraising', 'Communications & media', 'Remote / skills-based']}
              />
              <SelectField
                label="Availability"
                name="availability"
                required
                options={['Weekdays', 'Weekends', 'Occasional events', 'Remote only', 'Full-time placement']}
              />
              <Field label="Skills & experience" name="skills" textarea maxLength={1500} className="sm:col-span-2" placeholder="Tell us what you’d love to contribute" />
            </NetlifyForm>
          </div>
        </Container>
      </section>

      <section id="partner" className="scroll-mt-24 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Partnership opportunities"
            title="Stronger together"
            intro="We work with community-based organisations, schools, health facilities, foundations and government agencies to deliver more for the communities we serve."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['Implementing partners', 'Co-design and deliver programmes with local organisations who know their communities best.'],
              ['Institutional & foundation partners', 'Fund multi-year initiatives with clear results frameworks and transparent reporting.'],
              ['Academic & technical partners', 'Contribute research, evaluation or technical expertise to strengthen our work.'],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-border p-7">
                <Users className="size-7 text-gold" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-navy">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="sponsor" className="scroll-mt-24 bg-navy py-20 text-white sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Corporate sponsorship"
              title="Purpose-driven partnerships for business"
              intro="Corporate sponsors help us scale proven programmes while engaging employees and customers in meaningful impact."
              inverted
            />
            <ul className="mt-10 space-y-6">
              {sponsorTiers.map((s) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                    <s.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold">{s.title}</span>
                    <span className="block text-sm leading-relaxed text-white/70">{s.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-card p-6 text-foreground shadow-xl sm:p-8">
            <h3 className="font-display text-2xl font-semibold text-navy">
              Start a partnership conversation
            </h3>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
              Tell us about your organisation and our partnerships team will
              respond within a few working days.
            </p>
            <NetlifyForm
              name="partnership"
              submitLabel="Send enquiry"
              successTitle="Enquiry received"
              successText="Thank you. Our partnerships team will contact you soon."
              className="grid gap-5 sm:grid-cols-2"
            >
              <Field label="Organisation" name="organisation" required autoComplete="organization" />
              <Field label="Contact name" name="name" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" maxLength={254} />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              <SelectField
                label="Partnership type"
                name="type"
                required
                className="sm:col-span-2"
                options={['Corporate sponsorship', 'Implementing partnership', 'Foundation / institutional funding', 'In-kind support', 'Other']}
              />
              <Field label="How would you like to work together?" name="message" textarea required maxLength={2000} className="sm:col-span-2" />
            </NetlifyForm>
          </div>
        </Container>
      </section>

      <section id="fundraise" className="scroll-mt-24 py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Fundraising campaigns"
              title="Rally your community"
              intro="Join an active campaign or start your own birthday, school or workplace fundraiser."
            />
            <SampleBadge label="Sample campaigns" />
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {campaigns.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border-t-4 border-gold bg-muted p-8">
                  <h3 className="text-xl font-semibold text-navy">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                  <Button asChild className="mt-6 self-start font-bold">
                    <Link to="/donate">Support campaign</Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-gold-soft p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-xl text-navy">
              Want to start your own fundraiser? We’ll send you a toolkit.
            </p>
            <Button asChild variant="outline" size="lg" className="font-bold">
              <Link to="/contact" search={{ subject: 'Fundraising toolkit' }}>
                Request a toolkit
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
