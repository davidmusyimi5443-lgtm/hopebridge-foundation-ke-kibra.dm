import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  FileText,
  FolderKanban,
  HandCoins,
  Image as ImageIcon,
  LayoutDashboard,
  Megaphone,
  Plus,
  ShieldAlert,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LogoMark } from '@/components/site/logo'
import { adminCampaigns, adminDonations, adminVolunteers } from '@/lib/admin-fixtures'
import { featuredProjects, formatMoney, gallery, programs } from '@/lib/content'
import { img } from '@/lib/img'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/admin')({
  head: () => ({
    meta: [
      { title: 'Admin — HopeBridge Foundation' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: Admin,
})

const sections = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'donations', label: 'Donations', icon: HandCoins },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  { id: 'volunteers', label: 'Volunteers', icon: Users },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'content', label: 'Website content', icon: FileText },
] as const
type SectionId = (typeof sections)[number]['id']

function statusVariant(s: string) {
  if (s === 'Completed' || s === 'Live' || s === 'Active') return 'bg-emerald-100 text-emerald-800'
  if (s === 'Pending' || s === 'New' || s === 'Draft') return 'bg-gold-soft text-navy'
  if (s === 'Failed') return 'bg-red-100 text-red-800'
  return 'bg-secondary text-navy'
}

function Admin() {
  const [active, setActive] = useState<SectionId>('overview')
  const current = sections.find((s) => s.id === active)!

  return (
    <div className="flex min-h-svh bg-muted">
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
          <LogoMark className="size-9" />
          <span className="leading-tight">
            <span className="block font-display font-semibold">HopeBridge</span>
            <span className="block text-xs text-sidebar-foreground/60">Admin console</span>
          </span>
        </div>
        <nav aria-label="Admin" className="flex-1 p-3">
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s.id)}
                  aria-current={active === s.id ? 'page' : undefined}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                    active === s.id
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-white',
                  )}
                >
                  <s.icon className="size-4" aria-hidden="true" />
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/" className="flex items-center gap-2 border-t border-sidebar-border px-5 py-4 text-sm text-sidebar-foreground/70 hover:text-white">
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to website
        </Link>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div role="note" className="flex items-center gap-3 bg-gold px-4 py-2.5 text-sm font-semibold text-navy-deep sm:px-8">
          <ShieldAlert className="size-4 shrink-0" aria-hidden="true" />
          Design preview with sample data. Secure administrator sign-in and live records are being added next.
        </div>
        <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-card px-4 py-5 sm:px-8">
          <h1 className="text-2xl font-semibold text-navy">{current.label}</h1>
          <label className="md:hidden">
            <span className="sr-only">Admin section</span>
            <select
              value={active}
              onChange={(e) => setActive(e.target.value as SectionId)}
              className="h-10 rounded-md border border-input bg-card px-3 text-sm"
            >
              {sections.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
        </header>

        <main className="flex-1 space-y-6 p-4 sm:p-8">
          {active === 'overview' && <Overview go={setActive} />}
          {active === 'donations' && <Donations />}
          {active === 'campaigns' && (
            <Panel title="Fundraising campaigns" action="New campaign">
              <SimpleTable
                head={['Campaign', 'Status', 'Ends']}
                rows={adminCampaigns.map((c) => [c.title, <Status key="s" s={c.status} />, c.ends])}
              />
            </Panel>
          )}
          {active === 'volunteers' && <Volunteers />}
          {active === 'projects' && (
            <Panel title="Community projects" action="Add project">
              <SimpleTable
                head={['Project', 'Location', 'Raised', 'Goal']}
                rows={featuredProjects.map((p) => [p.title, p.location, formatMoney(p.raised, 'KES'), formatMoney(p.goal, 'KES')])}
              />
            </Panel>
          )}
          {active === 'gallery' && (
            <Panel title="Gallery images" action="Upload images">
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {gallery.map((g) => (
                  <li key={g.image + g.title} className="overflow-hidden rounded-lg border bg-card">
                    <img src={img(g.image, 320)} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    <div className="p-3">
                      <p className="truncate text-sm font-semibold text-navy">{g.title}</p>
                      <p className="text-xs text-muted-foreground">{g.category}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
          {active === 'content' && (
            <Panel title="Website content">
              <SimpleTable
                head={['Content', 'Type', 'Status']}
                rows={[
                  ['Homepage hero & introduction', 'Page section', <Status key="1" s="Live" />],
                  ['Impact statistics', 'Figures', <Status key="2" s="Draft" />],
                  ['Testimonials', 'Collection', <Status key="3" s="Draft" />],
                  ['News & updates', 'Collection', <Status key="4" s="Live" />],
                  ...programs.map((p) => [p.title, 'Program page', <Status key={p.slug} s="Live" />]),
                  ['Contact details & social links', 'Settings', <Status key="5" s="Draft" />],
                ]}
              />
            </Panel>
          )}
        </main>
      </div>
    </div>
  )
}

function Status({ s }: { s: string }) {
  return <Badge className={cn('border-0 font-semibold', statusVariant(s))}>{s}</Badge>
}

function Panel({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-body text-lg font-bold text-navy">{title}</h2>
        {action && (
          <Button size="sm" disabled title="Available once administrator sign-in is live">
            <Plus aria-hidden="true" /> {action}
          </Button>
        )}
      </div>
      {children}
    </section>
  )
}

function SimpleTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {head.map((h) => <TableHead key={h}>{h}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={i}>
            {r.map((c, j) => <TableCell key={j} className={j === 0 ? 'font-semibold text-navy' : undefined}>{c}</TableCell>)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function Overview({ go }: { go: (s: SectionId) => void }) {
  const tiles = [
    { label: 'Donations this month', value: '—', note: 'Sample preview', to: 'donations' as const },
    { label: 'Active monthly donors', value: '—', note: 'Sample preview', to: 'donations' as const },
    { label: 'New volunteer applications', value: String(adminVolunteers.filter((v) => v.status === 'New').length), note: 'Sample data', to: 'volunteers' as const },
    { label: 'Live campaigns', value: String(adminCampaigns.filter((c) => c.status === 'Live').length), note: 'Sample data', to: 'campaigns' as const },
  ]
  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => (
          <li key={t.label}>
            <button onClick={() => go(t.to)} className="w-full rounded-xl bg-card p-5 text-left shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
              <p className="text-sm font-semibold text-muted-foreground">{t.label}</p>
              <p className="mt-2 font-display text-3xl font-semibold text-navy">{t.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.note}</p>
            </button>
          </li>
        ))}
      </ul>
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Donations compact />
        <Volunteers compact />
      </div>
    </>
  )
}

function Donations({ compact = false }: { compact?: boolean }) {
  return (
    <Panel title={compact ? 'Recent donations' : 'All donations'}>
      <SimpleTable
        head={compact ? ['Donor', 'Amount', 'Status'] : ['Reference', 'Donor', 'Amount', 'Method', 'Frequency', 'Status', 'Date']}
        rows={adminDonations.map((d) => {
          const amount = formatMoney(d.amount, d.currency)
          const status = <Status key="s" s={d.status} />
          return compact
            ? [d.donor, amount, status]
            : [d.id, d.donor, amount, d.method, d.frequency, status, d.date]
        })}
      />
    </Panel>
  )
}

function Volunteers({ compact = false }: { compact?: boolean }) {
  return (
    <Panel title={compact ? 'Latest volunteers' : 'Volunteer applications'}>
      <SimpleTable
        head={compact ? ['Name', 'Status'] : ['Name', 'Interest', 'Availability', 'Location', 'Status']}
        rows={adminVolunteers.map((v) => {
          const status = <Status key="s" s={v.status} />
          return compact ? [v.name, status] : [v.name, v.interest, v.availability, v.location, status]
        })}
      />
    </Panel>
  )
}
