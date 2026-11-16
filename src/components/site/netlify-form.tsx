import { useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type State = 'idle' | 'pending' | 'success' | 'error'

/**
 * Submits to Netlify Forms. Each form `name` must have a matching static
 * registration in /public/forms.html with identical field names.
 */
export function NetlifyForm({
  name,
  children,
  submitLabel,
  successTitle,
  successText,
  className,
  submitClassName,
}: {
  name: string
  children: ReactNode
  submitLabel: string
  successTitle: string
  successText: string
  className?: string
  submitClassName?: string
}) {
  const [state, setState] = useState<State>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) =>
      body.append(key, String(value)),
    )
    setState('pending')
    try {
      const response = await fetch('/forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      if (/\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Form handling unavailable')
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-xl border border-gold/40 bg-gold-soft p-6"
      >
        <CheckCircle2 className="size-8 text-navy" aria-hidden="true" />
        <p className="font-display text-xl font-semibold text-navy">
          {successTitle}
        </p>
        <p className="text-muted-foreground">{successText}</p>
      </div>
    )
  }

  return (
    <form
      name={name}
      method="POST"
      action="/forms.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state === 'error') setState('idle')
      }}
      className={className}
    >
      <input type="hidden" name="form-name" value={name} />
      <p hidden>
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="contents">
        {children}
        <div className="sm:col-span-2">
          <Button
            type="submit"
            size="lg"
            className={cn('font-bold', submitClassName)}
          >
            {state === 'pending' && (
              <Loader2 className="animate-spin" aria-hidden="true" />
            )}
            {state === 'pending' ? 'Sending…' : submitLabel}
          </Button>
        </div>
      </fieldset>
      {state === 'error' && (
        <p role="alert" className="text-sm font-medium text-destructive sm:col-span-2">
          We couldn’t confirm your submission. Your details are still here —
          please try again in a moment.
        </p>
      )}
    </form>
  )
}

export function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
  placeholder,
  maxLength = 200,
  className,
  textarea,
  defaultValue,
}: {
  defaultValue?: string
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
  maxLength?: number
  className?: string
  textarea?: boolean
}) {
  const id = `f-${name}`
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </Label>
      {textarea ? (
        <Textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          defaultValue={defaultValue}
          rows={5}
        />
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          maxLength={maxLength}
          defaultValue={defaultValue}
          className="h-11"
        />
      )}
    </div>
  )
}

export function SelectField({
  label,
  name,
  options,
  required,
  className,
}: {
  label: string
  name: string
  options: string[]
  required?: boolean
  className?: string
}) {
  const id = `f-${name}`
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </Label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className="h-11 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}
