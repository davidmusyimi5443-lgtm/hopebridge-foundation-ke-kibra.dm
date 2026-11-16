import { Link } from '@tanstack/react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { org, programs } from '@/lib/content'
import { Container } from './section'
import { Logo } from './logo'
import { NetlifyForm } from './netlify-form'
import { SocialIcon } from './social-icons'

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white/75">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{org.mission}</p>
          <ul className="mt-6 flex gap-3" aria-label="Social media">
            {org.social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`HopeBridge Foundation on ${s.name}`}
                  className="grid size-10 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"
                >
                  <SocialIcon name={s.name} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-body text-sm font-bold tracking-widest text-white uppercase">
            Organisation
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/about" hash="transparency" className="hover:text-gold">Transparency</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/get-involved" className="hover:text-gold">Volunteer</Link></li>
            <li><Link to="/get-involved" hash="partner" className="hover:text-gold">Partner with us</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-body text-sm font-bold tracking-widest text-white uppercase">
            Programs
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link to="/programs" hash={p.slug} className="hover:text-gold">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-body text-sm font-bold tracking-widest text-white uppercase">
            Stay informed
          </h2>
          <p className="mt-4 text-sm">
            Occasional updates on our work and how you can help. Unsubscribe
            anytime.
          </p>
          <NetlifyForm
            name="newsletter"
            submitLabel="Subscribe"
            successTitle="You’re subscribed"
            successText="Thank you for following our work."
            className="mt-4 flex flex-col gap-3"
            submitClassName="w-full bg-gold text-navy-deep hover:bg-gold/90"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={254}
              placeholder="you@example.com"
              className="h-11 border-white/20 bg-white/5 text-white placeholder:text-white/40"
            />
          </NetlifyForm>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 text-gold" aria-hidden="true" />
              <a href={`mailto:${org.contact.email}`} className="hover:text-gold">
                {org.contact.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 text-gold" aria-hidden="true" />
              <a href={org.contact.phoneHref} className="hover:text-gold">
                {org.contact.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 text-gold" aria-hidden="true" />
              {org.contact.address}
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} HopeBridge Foundation. Contact details
            and figures shown are sample placeholders.
          </p>
          <ul className="flex gap-5">
            <li><Link to="/privacy" className="hover:text-gold">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gold">Terms of Use</Link></li>
          </ul>
        </Container>
      </div>
    </footer>
  )
}
