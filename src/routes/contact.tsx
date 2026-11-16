import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Field, NetlifyForm, SelectField } from '@/components/site/netlify-form'
import { SocialIcon } from '@/components/site/social-icons'
import { Container, PageHero } from '@/components/site/section'
import { org } from '@/lib/content'

export const Route = createFileRoute('/contact')({
  validateSearch: (s) => z.object({ subject: z.string().max(100).optional() }).parse(s),
  head: () => ({
    meta: [
      { title: 'Contact Us — HopeBridge Foundation' },
      {
        name: 'description',
        content: 'Get in touch with HopeBridge Foundation by email, phone or our contact form.',
      },
    ],
  }),
  component: Contact,
})

const subjects = ['General enquiry', 'Donations', 'Volunteering', 'Partnerships', 'Media', 'Fundraising toolkit']

function Contact() {
  const { subject } = Route.useSearch()
  const details = [
    { icon: Mail, label: 'Email', value: org.contact.email, href: `mailto:${org.contact.email}` },
    { icon: Phone, label: 'Telephone', value: org.contact.phone, href: org.contact.phoneHref },
    { icon: MessageCircle, label: 'WhatsApp', value: org.contact.whatsapp },
    { icon: MapPin, label: 'Postal address', value: org.contact.address },
    { icon: Clock, label: 'Office hours', value: org.contact.hours },
  ]
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We’d love to hear from you"
        intro="Questions about giving, volunteering or partnering? Our team is here to help."
        image="gallery-6.png"
      />
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold text-navy">Contact details</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Placeholder details — update them in the site content module or admin dashboard.
            </p>
            <ul className="mt-8 space-y-6">
              {details.map((d) => (
                <li key={d.label} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-gold">
                    <d.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold tracking-wider text-muted-foreground uppercase">{d.label}</span>
                    {d.href ? (
                      <a href={d.href} className="font-semibold text-navy hover:text-gold">{d.value}</a>
                    ) : (
                      <span className="font-semibold text-navy">{d.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="mt-10 text-sm font-bold tracking-wider text-navy uppercase">Follow us</h3>
            <ul className="mt-4 flex flex-wrap gap-3" aria-label="Social media">
              {org.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`HopeBridge Foundation on ${s.name}`}
                    className="grid size-11 place-items-center rounded-full border border-border text-navy transition-colors hover:border-gold hover:bg-gold hover:text-navy-deep"
                  >
                    <SocialIcon name={s.name} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-navy">Send us a message</h2>
            <p className="mt-2 mb-8 text-sm text-muted-foreground">We aim to reply within two working days.</p>
            <NetlifyForm
              name="contact"
              submitLabel="Send message"
              successTitle="Message sent"
              successText="Thank you for reaching out. A member of our team will reply by email soon."
              className="grid gap-5 sm:grid-cols-2"
            >
              <Field label="Full name" name="name" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" maxLength={254} />
              <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
              {subject ? (
                <Field label="Subject" name="subject" required defaultValue={subject} />
              ) : (
                <SelectField label="Subject" name="subject" required options={subjects} />
              )}
              <Field label="Message" name="message" textarea required maxLength={3000} className="sm:col-span-2" />
              <p className="text-xs text-muted-foreground sm:col-span-2">
                We use your details only to respond to your message. See our{' '}
                <a href="/privacy" className="underline">Privacy Policy</a>.
              </p>
            </NetlifyForm>
          </div>
        </Container>
      </section>
      <section aria-labelledby="map-title" className="pb-20 sm:pb-24">
        <Container>
          <h2 id="map-title" className="mb-6 text-2xl font-semibold text-navy">Find us</h2>
          <div className="overflow-hidden rounded-2xl ring-1 ring-border">
            <iframe
              title="Map showing Nairobi, Kenya (placeholder location)"
              src="https://www.openstreetmap.org/export/embed.html?bbox=36.75%2C-1.33%2C36.90%2C-1.25&layer=mapnik"
              className="h-96 w-full"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Placeholder location: Nairobi, Kenya. Replace with the office address before launch.
          </p>
        </Container>
      </section>
    </>
  )
}
