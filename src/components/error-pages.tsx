import {
  Link,
  useRouter,
  type ErrorComponentProps,
} from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-xl space-y-6 text-center">
        <p className="font-display text-8xl font-semibold text-gold">404</p>
        <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          This path doesn’t lead anywhere — yet
        </h1>
        <p className="text-lg text-muted-foreground">
          The page you’re looking for may have moved or no longer exists. Let’s
          get you back on the bridge.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/programs">Explore our programs</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function RouteErrorPage({ reset }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <main className="grid min-h-svh place-items-center px-6 py-16">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          This page couldn’t load
        </h1>
        <p role="alert" className="text-muted-foreground">
          Please try again, or return to the home page.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              void router.invalidate()
              reset()
            }}
          >
            Try again
          </Button>
          <Button variant="outline" asChild>
            <a href="/">Go home</a>
          </Button>
        </div>
      </div>
    </main>
  )
}
