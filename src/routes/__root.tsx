import {
  HeadContent,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NotFoundPage } from '@/components/error-pages'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'

import '../styles.css'

const siteName = 'HopeBridge Foundation — Building Hope. Changing Lives.'
const siteDescription = 'HopeBridge Foundation supports vulnerable communities through education, healthcare, food assistance, youth empowerment and sustainable community development.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:image',
        content: '/.netlify/images?url=/img/hero.png&w=1200&fm=jpg&q=75',
      },
      { property: 'og:site_name', content: 'HopeBridge Foundation' },
      { name: 'theme-color', content: '#13284a' },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NGO',
          name: 'HopeBridge Foundation',
          description: siteDescription,
          url: 'https://hopebridge-foundation-09afe2.netlify.app',
          logo: 'https://hopebridge-foundation-09afe2.netlify.app/favicon.svg',
        }),
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <TooltipProvider>
          <SiteChrome>{children}</SiteChrome>
        </TooltipProvider>
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}

/** Public pages get the site header and footer; the admin area has its own layout. */
function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  if (pathname.startsWith('/admin')) return <>{children}</>
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
