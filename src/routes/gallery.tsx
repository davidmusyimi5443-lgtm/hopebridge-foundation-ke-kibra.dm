import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Container, PageHero } from '@/components/site/section'
import { gallery, galleryCategories, type GalleryCategory } from '@/lib/content'
import { img, imgSet } from '@/lib/img'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/gallery')({
  head: () => ({
    meta: [
      { title: 'Gallery — HopeBridge Foundation' },
      {
        name: 'description',
        content:
          'Photos from HopeBridge Foundation community activities, outreach programmes and events.',
      },
    ],
  }),
  component: Gallery,
})

function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>('All')
  const [open, setOpen] = useState<number | null>(null)
  const items = filter === 'All' ? gallery : gallery.filter((g) => g.category === filter)
  const current = open === null ? null : items[open]

  const step = (d: number) =>
    setOpen((i) => (i === null ? i : (i + d + items.length) % items.length))

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments of hope"
        intro="Scenes from our community activities, outreach programmes and events — shared with the consent of the people pictured."
        image="gallery-3.png"
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div role="tablist" aria-label="Filter photos" className="flex flex-wrap gap-2">
            {galleryCategories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-bold transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
                  filter === c ? 'bg-navy text-white' : 'bg-muted text-navy hover:bg-secondary',
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Demonstration images — replace with the foundation’s own photography via the admin dashboard.
          </p>
          <ul className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {items.map((g, i) => (
              <li key={g.image + g.title} className="mb-5 break-inside-avoid">
                <button
                  onClick={() => setOpen(i)}
                  className="group relative block w-full overflow-hidden rounded-2xl focus-visible:ring-4 focus-visible:ring-gold focus-visible:outline-none"
                  aria-label={`View photo: ${g.title}`}
                >
                  <img
                    src={img(g.image, 640)}
                    srcSet={imgSet(g.image, [400, 640, 960])}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    alt=""
                    loading="lazy"
                    className={cn(
                      'w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none',
                      i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]',
                    )}
                  />
                  <span className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-deep/85 via-transparent to-transparent p-5 opacity-90 transition-opacity group-hover:opacity-100">
                    <span className="text-left">
                      <span className="block text-xs font-bold tracking-wider text-gold uppercase">
                        {g.category}
                      </span>
                      <span className="block font-display text-lg text-white">{g.title}</span>
                    </span>
                    <Expand className="ml-auto size-5 text-white/80" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl gap-0 overflow-hidden border-0 bg-navy-deep p-0 text-white sm:max-w-5xl">
          {current && (
            <>
              <img
                src={img(current.image, 1600, 80)}
                alt={current.title}
                className="max-h-[75vh] w-full object-contain"
              />
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <DialogTitle className="font-display text-xl">{current.title}</DialogTitle>
                  <DialogDescription className="text-white/60">{current.category}</DialogDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" aria-label="Previous photo" onClick={() => step(-1)} className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <ChevronLeft />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Next photo" onClick={() => step(1)} className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
