# AGENTS.md

Guide for AI agents and developers working on the HopeBridge Foundation website.

**Start with [PLAN.md](PLAN.md).** Milestone 1, the public site and the admin design preview, is complete. Pick up at the next unfinished milestone.

## Architecture

- TanStack Start (React 19, SSR) deployed to Netlify via `@netlify/vite-plugin-tanstack-start`. Future backend code belongs in TanStack server functions/server routes. Do not add a separate Netlify Server; the framework's catch-all function would shadow it.
- `src/routes/__root.tsx` holds the HTML shell, global SEO meta, fonts, JSON-LD, and the `SiteChrome` wrapper that adds the header and footer to every page except `/admin*`.
- Forms use **Netlify Forms**. Every form must have a matching static registration in `public/forms.html` with identical field names. The React `NetlifyForm` component (`src/components/site/netlify-form.tsx`) posts URL-encoded data to `/forms.html` and handles the pending, error and success states. If you add or rename a field, update both places.
- Images: AI-generated originals live in `public/img/*.png`. Always reference them via `img()` / `imgSet()` from `src/lib/img.ts`, which return Netlify Image CDN WebP URLs.

## Key directories

```
src/lib/content.ts          # ALL public sample content (single swap point for the database later)
src/lib/admin-fixtures.ts   # Sample data for the /admin preview only
src/lib/img.ts              # Image CDN URL helpers
src/components/site/        # Header, footer, logo, section primitives, Reveal animation, forms, legal layout
src/components/ui/          # shadcn/ui components
src/routes/                 # Pages: index, about, programs, donate, donate_.confirmation, get-involved,
                            # gallery, contact, privacy, terms, admin
public/forms.html           # Netlify Forms static registrations
```

## Conventions

- Theme colours are CSS variables in `src/styles.css`. Brand utilities: `bg-navy`, `bg-navy-deep`, `text-gold`, `bg-gold-soft`. Headings use Fraunces (`font-display`) and body text uses Manrope. Use the `eyebrow` utility for small gold section labels.
- Use `Container`, `SectionHeading`, `PageHero` and `SampleBadge` from `components/site/section.tsx` for consistent layout.
- Route files export only `Route`. Put shared helpers in components or lib (for example `program-icons.tsx`).
- Animations use `Reveal` plus the CSS in `styles.css`, and respect `prefers-reduced-motion`.

## Non-obvious decisions and rules

- **Honesty rules from the client:** never invent registration certificates, charity credentials, partnerships or impact statistics. `impactStats` values are `null` and render as "—" with a placeholder note. Label sample content with `SampleBadge`.
- **Never simulate successful payments.** The donate page validates the form, then opens a dialog saying no payment was taken. `/donate/confirmation` shows a "not found" state unless `?preview=1` is set, which shows the design under a preview banner. Real confirmation must verify payment server-side (see PLAN.md, milestones 4–5).
- `/admin` is a public design preview with sample data and `noindex`. Before it handles real data, it must be protected by Netlify Identity with server-side role checks (milestone 3). Never put credentials or API keys in frontend code.
- Contact details, social links and the Paybill number are placeholders in `org` (`content.ts`).
