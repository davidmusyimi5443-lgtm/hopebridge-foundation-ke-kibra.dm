import { useMemo, useState, type FormEvent } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'
import {
  CreditCard,
  Globe2,
  Heart,
  Info,
  Lock,
  Repeat,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Container } from '@/components/site/section'
import {
  donationAmounts,
  featuredProjects,
  formatMoney,
  giftExamples,
  org,
  programs,
  type Currency,
} from '@/lib/content'
import { img } from '@/lib/img'
import { cn } from '@/lib/utils'

const searchSchema = z.object({
  program: z.string().optional(),
  project: z.string().optional(),
})

export const Route = createFileRoute('/donate')({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: 'Donate — HopeBridge Foundation' },
      {
        name: 'description',
        content:
          'Give once or monthly to HopeBridge Foundation. Donate by M-Pesa in Kenya or by card and PayPal internationally.',
      },
    ],
  }),
  component: Donate,
})

type Method = 'mpesa' | 'card' | 'paypal'

const kenyanPhone = /^(?:\+?254|0)(7|1)\d{8}$/

const donorSchema = z.object({
  firstName: z.string().trim().min(1, 'Enter your first name').max(80),
  lastName: z.string().trim().min(1, 'Enter your last name').max(80),
  email: z.email('Enter a valid email address').max(254),
  phone: z.string().trim().max(30).optional(),
  country: z.string().trim().min(2, 'Enter your country').max(80),
  message: z.string().max(500).optional(),
})

function Donate() {
  const search = Route.useSearch()
  const initialDesignation = search.project
    ? featuredProjects.find((p) => p.title === search.project)?.title
    : programs.find((p) => p.slug === search.program)?.title

  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [currency, setCurrency] = useState<Currency>('KES')
  const [preset, setPreset] = useState<number | null>(donationAmounts.KES[1])
  const [custom, setCustom] = useState('')
  const [method, setMethod] = useState<Method>('mpesa')
  const [designation, setDesignation] = useState(
    initialDesignation ?? 'Where it’s needed most',
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pendingGift, setPendingGift] = useState<{
    amount: number
    method: Method
  } | null>(null)

  const amount = custom ? Number(custom) : (preset ?? 0)
  const min = currency === 'KES' ? 100 : 5

  const designations = useMemo(
    () => [
      'Where it’s needed most',
      ...programs.map((p) => p.title),
      ...featuredProjects.map((p) => p.title),
    ],
    [],
  )

  function switchCurrency(c: Currency) {
    setCurrency(c)
    setPreset(donationAmounts[c][1])
    setCustom('')
    if (c === 'USD' && method === 'mpesa') setMethod('card')
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >
    const next: Record<string, string> = {}
    if (!Number.isFinite(amount) || amount < min)
      next.amount = `Please enter at least ${formatMoney(min, currency)}`
    const parsed = donorSchema.safeParse(data)
    if (!parsed.success) {
      for (const issue of parsed.error.issues)
        next[String(issue.path[0])] ??= issue.message
    }
    if (method === 'mpesa' && !kenyanPhone.test((data.mpesaPhone ?? '').replace(/\s/g, '')))
      next.mpesaPhone = 'Enter a Safaricom number, e.g. 0712 345 678'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      document.getElementById(`d-${first}`)?.focus()
      return
    }
    // Payment processing is not connected yet: never simulate a successful charge.
    setPendingGift({ amount, method })
  }

  const examples = giftExamples[currency]

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <img
          src={img('gallery-4.png', 1600, 65)}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover opacity-30"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/60 to-navy-deep" />
        <Container className="pt-16 pb-40 text-center sm:pt-20">
          <p className="eyebrow mb-4">Donate</p>
          <h1 className="mx-auto max-w-3xl text-4xl leading-tight font-semibold text-white sm:text-5xl">
            Your gift builds a bridge to a brighter future
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            Give once or become a monthly supporter. Donate with M-Pesa in
            Kenya, or by card and PayPal from anywhere in the world.
          </p>
        </Container>
      </section>

      <Container className="-mt-28 pb-24">
        <form
          noValidate
          onSubmit={onSubmit}
          className="grid gap-8 lg:grid-cols-[1fr_22rem]"
          aria-describedby="donation-status-note"
        >
          <div className="space-y-8 rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-10">
            <div
              id="donation-status-note"
              className="flex gap-3 rounded-xl border border-gold/50 bg-gold-soft p-4 text-sm text-navy"
            >
              <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <p>
                <span className="font-bold">Online payments are being connected.</span>{' '}
                You can prepare your gift below — no payment will be taken until
                our secure payment providers are live.
              </p>
            </div>

            {/* Step 1: gift */}
            <fieldset className="space-y-6">
              <legend className="flex items-center gap-3 font-display text-2xl font-semibold text-navy">
                <StepNumber n={1} /> Your gift
              </legend>

              <div className="grid gap-4 sm:grid-cols-2">
                <Segmented
                  label="Frequency"
                  value={frequency}
                  onChange={(v) => setFrequency(v as 'once' | 'monthly')}
                  options={[
                    { value: 'once', label: 'One-time' },
                    { value: 'monthly', label: 'Monthly', icon: Repeat },
                  ]}
                />
                <Segmented
                  label="Currency"
                  value={currency}
                  onChange={(v) => switchCurrency(v as Currency)}
                  options={[
                    { value: 'KES', label: 'KES (Ksh)' },
                    { value: 'USD', label: 'USD ($)' },
                  ]}
                />
              </div>

              <div>
                <p id="amount-label" className="mb-3 text-sm font-semibold text-navy">
                  Choose an amount
                </p>
                <div
                  role="radiogroup"
                  aria-labelledby="amount-label"
                  className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                >
                  {donationAmounts[currency].map((a) => {
                    const active = !custom && preset === a
                    return (
                      <button
                        key={a}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => {
                          setPreset(a)
                          setCustom('')
                        }}
                        className={cn(
                          'rounded-xl border-2 px-4 py-4 text-lg font-bold transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
                          active
                            ? 'border-navy bg-navy text-white'
                            : 'border-border text-navy hover:border-gold',
                        )}
                      >
                        {formatMoney(a, currency)}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-3">
                  <Label htmlFor="d-amount" className="sr-only">
                    Custom amount in {currency}
                  </Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                      {currency}
                    </span>
                    <Input
                      id="d-amount"
                      inputMode="numeric"
                      placeholder="Other amount"
                      value={custom}
                      aria-invalid={!!errors.amount}
                      aria-describedby={errors.amount ? 'e-amount' : undefined}
                      onChange={(e) =>
                        setCustom(e.target.value.replace(/[^\d]/g, '').slice(0, 9))
                      }
                      className="h-13 pl-16 text-lg font-semibold"
                    />
                  </div>
                  <ErrorText id="e-amount" message={errors.amount} />
                </div>
                {!custom && preset && examples[preset] && (
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="size-4 fill-gold text-gold" aria-hidden="true" />
                    {examples[preset]}
                    {frequency === 'monthly' && ', every month'}.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="d-designation">Direct my gift to</Label>
                <select
                  id="d-designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="h-11 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {designations.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
            </fieldset>

            {/* Step 2: donor */}
            <fieldset className="space-y-5">
              <legend className="flex items-center gap-3 font-display text-2xl font-semibold text-navy">
                <StepNumber n={2} /> Your details
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <DonorField name="firstName" label="First name" autoComplete="given-name" errors={errors} />
                <DonorField name="lastName" label="Last name" autoComplete="family-name" errors={errors} />
                <DonorField name="email" label="Email" type="email" autoComplete="email" errors={errors} />
                <DonorField name="phone" label="Phone (optional)" type="tel" autoComplete="tel" errors={errors} required={false} />
                <DonorField
                  name="country"
                  label="Country"
                  autoComplete="country-name"
                  errors={errors}
                  defaultValue={currency === 'KES' ? 'Kenya' : ''}
                  key={currency}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="d-message">Message (optional)</Label>
                <Textarea id="d-message" name="message" maxLength={500} rows={3} placeholder="Dedicate your gift or leave a note of encouragement" />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="d-anonymous" name="anonymous" />
                <Label htmlFor="d-anonymous" className="font-normal">
                  Keep my gift anonymous in public acknowledgements
                </Label>
              </div>
            </fieldset>

            {/* Step 3: payment */}
            <fieldset className="space-y-5">
              <legend className="flex items-center gap-3 font-display text-2xl font-semibold text-navy">
                <StepNumber n={3} /> Payment method
              </legend>
              <div role="radiogroup" aria-label="Payment method" className="grid gap-3 sm:grid-cols-3">
                <MethodCard
                  active={method === 'mpesa'}
                  onSelect={() => {
                    setMethod('mpesa')
                    if (currency !== 'KES') switchCurrency('KES')
                  }}
                  icon={Smartphone}
                  title="M-Pesa"
                  text="Kenya · KES"
                />
                <MethodCard
                  active={method === 'card'}
                  onSelect={() => setMethod('card')}
                  icon={CreditCard}
                  title="Card"
                  text="Visa, Mastercard"
                />
                <MethodCard
                  active={method === 'paypal'}
                  onSelect={() => setMethod('paypal')}
                  icon={Globe2}
                  title="PayPal"
                  text="International"
                />
              </div>

              {method === 'mpesa' && (
                <div className="space-y-4 rounded-xl bg-muted p-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="d-mpesaPhone">M-Pesa phone number</Label>
                    <Input
                      id="d-mpesaPhone"
                      name="mpesaPhone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="07XX XXX XXX"
                      aria-invalid={!!errors.mpesaPhone}
                      aria-describedby="h-mpesa e-mpesaPhone"
                      className="h-11 bg-card"
                    />
                    <ErrorText id="e-mpesaPhone" message={errors.mpesaPhone} />
                    <p id="h-mpesa" className="text-sm text-muted-foreground">
                      You’ll receive an M-Pesa prompt on this phone. Enter your
                      M-Pesa PIN to approve the gift — we never see your PIN.
                    </p>
                  </div>
                  <div className="rounded-lg border border-dashed border-border bg-card p-4 text-sm">
                    <p className="font-bold text-navy">Prefer Paybill?</p>
                    <p className="mt-1 text-muted-foreground">
                      Paybill <span className="font-mono font-bold text-navy">000000</span> ·
                      Account <span className="font-mono font-bold text-navy">HOPE</span>{' '}
                      <span className="text-xs">(placeholder — replace with the registered Paybill)</span>
                    </p>
                  </div>
                </div>
              )}
              {method === 'card' && (
                <p className="rounded-xl bg-muted p-5 text-sm text-muted-foreground">
                  You’ll enter your card details on our payment provider’s
                  secure, encrypted checkout page. HopeBridge never stores your
                  card number.
                </p>
              )}
              {method === 'paypal' && (
                <p className="rounded-xl bg-muted p-5 text-sm text-muted-foreground">
                  You’ll be redirected to PayPal to complete your gift securely
                  in your preferred currency.
                </p>
              )}
            </fieldset>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-navy p-8 text-white shadow-xl">
              <h2 className="font-display text-xl font-semibold">Gift summary</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <Row term="Amount" value={amount > 0 ? formatMoney(amount, currency) : '—'} />
                <Row term="Frequency" value={frequency === 'monthly' ? 'Monthly' : 'One-time'} />
                <Row term="Designation" value={designation} />
                <Row
                  term="Method"
                  value={method === 'mpesa' ? 'M-Pesa' : method === 'card' ? 'Card' : 'PayPal'}
                />
              </dl>
              <div className="mt-6 border-t border-white/15 pt-6">
                <p className="text-sm text-white/70">Total {frequency === 'monthly' && 'per month'}</p>
                <p className="font-display text-4xl font-semibold text-gold">
                  {amount > 0 ? formatMoney(amount, currency) : '—'}
                </p>
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-6 h-13 w-full bg-gold text-base font-bold text-navy-deep hover:bg-gold/90"
              >
                <Lock aria-hidden="true" />
                {frequency === 'monthly' ? 'Give monthly' : 'Give now'}
              </Button>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/60">
                <ShieldCheck className="size-4" aria-hidden="true" />
                Secure, encrypted payment processing
              </p>
            </div>
            <p className="mt-4 px-2 text-xs leading-relaxed text-muted-foreground">
              By donating you agree to our{' '}
              <Link to="/terms" className="underline">Terms of Use</Link> and{' '}
              <Link to="/privacy" className="underline">Privacy Policy</Link>. Monthly
              gifts can be changed or cancelled at any time by contacting{' '}
              {org.contact.email}.
            </p>
          </aside>
        </form>
      </Container>

      <Dialog open={!!pendingGift} onOpenChange={(o) => !o && setPendingGift(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-navy">
              Thank you for your generosity
            </DialogTitle>
            <DialogDescription>
              Your gift of{' '}
              <strong className="text-navy">
                {pendingGift && formatMoney(pendingGift.amount, currency)}
                {frequency === 'monthly' && ' per month'}
              </strong>{' '}
              is ready, but our online payment providers are still being
              connected. <strong>No payment has been taken.</strong>
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Please check back soon, or contact us at{' '}
            <a className="font-semibold text-navy underline" href={`mailto:${org.contact.email}`}>
              {org.contact.email}
            </a>{' '}
            and we’ll help you give another way.
          </p>
          <DialogFooter>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact us</Link>
            </Button>
            <Button onClick={() => setPendingGift(null)}>Back to my gift</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function StepNumber({ n }: { n: number }) {
  return (
    <span className="grid size-8 place-items-center rounded-full bg-gold font-body text-sm font-bold text-navy-deep">
      {n}
    </span>
  )
}

function Segmented({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string; icon?: typeof Repeat }[]
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-navy">{label}</p>
      <div role="radiogroup" aria-label={label} className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              'flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
              value === o.value ? 'bg-card text-navy shadow-sm' : 'text-muted-foreground hover:text-navy',
            )}
          >
            {o.icon && <o.icon className="size-4" aria-hidden="true" />}
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function MethodCard({
  active,
  onSelect,
  icon: Icon,
  title,
  text,
}: {
  active: boolean
  onSelect: () => void
  icon: typeof Repeat
  title: string
  text: string
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      className={cn(
        'flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
        active ? 'border-navy bg-secondary' : 'border-border hover:border-gold',
      )}
    >
      <span className={cn('grid size-10 place-items-center rounded-lg', active ? 'bg-navy text-gold' : 'bg-muted text-navy')}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block font-bold text-navy">{title}</span>
        <span className="block text-xs text-muted-foreground">{text}</span>
      </span>
    </button>
  )
}

function DonorField({
  name,
  label,
  type = 'text',
  autoComplete,
  errors,
  required = true,
  defaultValue,
}: {
  name: string
  label: string
  type?: string
  autoComplete?: string
  errors: Record<string, string>
  required?: boolean
  defaultValue?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={`d-${name}`}>{label}</Label>
      <Input
        id={`d-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        maxLength={254}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `e-${name}` : undefined}
        className="h-11"
      />
      <ErrorText id={`e-${name}`} message={errors[name]} />
    </div>
  )
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1 text-sm font-medium text-destructive">
      {message}
    </p>
  )
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-white/60">{term}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  )
}
