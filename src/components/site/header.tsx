import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Heart, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Logo } from './logo'

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/programs', label: 'Our Programs' },
  { to: '/get-involved', label: 'Get Involved' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-background/95 backdrop-blur transition-shadow motion-reduce:transition-none',
        scrolled ? 'border-border shadow-sm' : 'border-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-18 max-w-content items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="HopeBridge Foundation home">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === '/' }}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-navy/80 transition-colors hover:text-navy data-[status=active]:text-navy data-[status=active]:underline data-[status=active]:decoration-gold data-[status=active]:decoration-2 data-[status=active]:underline-offset-8"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden bg-gold font-bold text-navy-deep hover:bg-gold/90 sm:inline-flex"
          >
            <Link to="/donate">
              <Heart className="fill-current" aria-hidden="true" /> Donate Now
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-4">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.to}>
                      <SheetClose asChild>
                        <Link
                          to={item.to}
                          activeOptions={{ exact: item.to === '/' }}
                          className="block rounded-md px-3 py-3 text-base font-semibold text-navy hover:bg-muted data-[status=active]:bg-secondary"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <SheetClose asChild>
                  <Button
                    asChild
                    className="mt-6 w-full bg-gold font-bold text-navy-deep hover:bg-gold/90"
                    size="lg"
                  >
                    <Link to="/donate">
                      <Heart className="fill-current" aria-hidden="true" />{' '}
                      Donate Now
                    </Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
