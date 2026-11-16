# HopeBridge Foundation

Website for **HopeBridge Foundation**, a nonprofit transforming lives by supporting vulnerable communities through education, healthcare, food assistance, youth empowerment and sustainable community development.

> **Building Hope. Changing Lives.**

## What’s included

- **Home**: hero, introduction, programmes, featured projects, impact statistics, testimonials, news and call to action
- **About Us**: story, vision and mission, core values, leadership, transparency and accountability
- **Our Programs**: education, healthcare, food and emergency assistance, youth and women empowerment, community development
- **Donate**: one-time or monthly gifts, KES or USD, suggested and custom amounts, donor details, M-Pesa, card and PayPal options. Payments aren’t connected yet, so no charge is ever simulated.
- **Donation confirmation** (`/donate/confirmation`, with `?preview=1` to show the design)
- **Get Involved**: volunteer registration, partnerships, corporate sponsorship, fundraising campaigns
- **Gallery**: filterable photo gallery with a lightbox
- **Contact**: contact form, placeholder contact details, social links, map
- **Privacy Policy**, **Terms of Use**, and a custom **404** page
- **Admin dashboard preview** (`/admin`), shown with sample data

All demonstration content is marked as sample content on the page. Impact figures, registration details and the M-Pesa Paybill number are placeholders. Replace them before launch.

## Technology

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR) on Netlify
- Tailwind CSS 4 + shadcn/ui components
- Netlify Forms for contact, volunteer, partnership and newsletter forms
- Netlify Image CDN for responsive WebP images

## Running locally

```bash
pnpm install
netlify dev        # or: pnpm dev
```

Use `netlify dev` to emulate Netlify features such as the Image CDN. Netlify Forms submissions are only delivered on a deployed site.

## Editing content

Sample content lives in `src/lib/content.ts`: contact details, programmes, projects, testimonials, news, team, gallery and donation amounts. Photos are in `public/img/`.

## Roadmap

See [PLAN.md](PLAN.md) for the full roadmap:

- Netlify Database for stored data
- Secure admin sign-in with Netlify Identity
- Live M-Pesa (Daraja STK Push) and international card/PayPal payments, once credentials are supplied
- Content management from the admin dashboard
