import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'
import { CheckCircle2, Clock, Info, Mail, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/site/section'
import { org } from '@/lib/content'

const searchSchema = z.object({
  ref: z.string().max(64).optional(),
  preview: z.coerce.boolean().optional(),
})

/**
 * Donation confirmation. Once payments are connected, this page will look up
 * `ref` on the server and show the verified status of the transaction. Until
 * then it never claims a payment succeeded; `?preview=1` shows the design with
 * a clear preview banner.
 */
export const Route = createFileRoute('/donate_/confirmation')({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: 'Donation confirmation — HopeBridge Foundation' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: Confirmation,
})

function Confirmation() {
  const { preview } = Route.useSearch()

  if (!preview) {
    return (
      <Container className="py-24 sm:py-32">
        <div className="mx-auto max-w-xl text-center">
          <Clock className="mx-auto size-14 text-gold" aria-hidden="true" />
          <h1 className="mt-6 text-3xl font-semibold text-navy sm:text-4xl">
            We couldn’t find a completed donation
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Online payments are still being connected, so no donation has been
            processed. When they go live, this page will confirm your gift
            with a receipt reference.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/donate">Return to donation page</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-16 sm:py-24">
      <div
        role="note"
        className="mx-auto mb-8 flex max-w-2xl gap-3 rounded-xl border border-gold/50 bg-gold-soft p-4 text-sm text-navy"
      >
        <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <p>
          <span className="font-bold">Design preview.</span> No payment was
          processed. Real confirmations will show verified details from the
          payment provider.
        </p>
      </div>
      <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-border">
        <div className="bg-navy px-8 py-12 text-center text-white">
          <CheckCircle2 className="mx-auto size-16 text-gold" aria-hidden="true" />
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">
            Thank you, Jane!
          </h1>
          <p className="mt-3 text-white/80">
            Your generosity is helping build hope in our communities.
          </p>
        </div>
        <dl className="divide-y px-8 py-4 text-sm">
          {[
            ['Receipt reference', 'HB-XXXX-XXXX'],
            ['Amount', 'KES 2,500'],
            ['Frequency', 'One-time'],
            ['Designation', 'Where it’s needed most'],
            ['Payment method', 'M-Pesa'],
          ].map(([t, v]) => (
            <div key={t} className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">{t}</dt>
              <dd className="font-semibold text-navy">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="space-y-4 border-t bg-muted px-8 py-6 text-sm text-muted-foreground">
          <p className="flex gap-2">
            <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />A
            receipt will be emailed to you. Questions? Write to{' '}
            {org.contact.email}.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/get-involved">
                <Share2 aria-hidden="true" /> More ways to help
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
