# HopeBridge Foundation — Product Roadmap

The public website is the foundation. The milestones below layer real data, secure administration and live payments on top of it. Each one is self-contained and can ship on its own.

## Milestone 1 — Public website & admin design ✅

- Brand identity: HopeBridge logo, navy / white / gold theme, Fraunces + Manrope typography, documentary-style photography served through the Netlify Image CDN.
- Pages: Home, About Us, Our Programs, Donate, Donation confirmation, Get Involved, Gallery, Contact, Privacy Policy, Terms of Use, custom 404.
- Netlify Forms for contact, volunteer registration, partnership enquiries and newsletter signups (honeypot spam protection).
- Donation experience (one-time/monthly, KES/USD, suggested + custom amounts, donor details, M-Pesa / card / PayPal selection) that validates the gift and clearly states no payment is taken.
- Admin dashboard design preview at `/admin` using sample data from `src/lib/admin-fixtures.ts`.
- All demonstration content lives in `src/lib/content.ts` and is labelled on the page.

## Milestone 2 — Data model (Netlify Database)

- Drizzle schema in `db/schema.ts`: `donations`, `donors`, `campaigns`, `projects`, `programs`, `volunteers`, `gallery_images`, `news_posts`, `testimonials`, `impact_stats`, `site_settings` (contact details, social links).
- Seed it from the current `src/lib/content.ts` fixtures, then switch public pages to route loaders reading from the database.
- Gallery uploads stored in Netlify Blobs, served via the Image CDN.

## Milestone 3 — Secure administration (Netlify Identity)

- Invite-only Netlify Identity with an `admin` role; protect `/admin` and every admin server function with server-side role checks.
- Replace the dashboard fixtures with live queries and add create/edit/delete for campaigns, projects, gallery images, news, testimonials, impact stats and site settings.
- Volunteer and partnership submissions: sync Netlify Forms submissions into the database (form-submission event function) so admins can triage them.
- Audit log of admin changes.

## Milestone 4 — M-Pesa donations (Kenya)

Requires Safaricom Daraja credentials (consumer key/secret, shortcode, passkey) supplied as environment variables.

- Server function to start an STK Push (Lipa na M-Pesa Online) and record a `pending` donation.
- Callback endpoint to verify results and mark donations `completed`/`failed`.
- Confirmation page polls the donation by reference and shows verified status only.
- Paybill details displayed from site settings.

## Milestone 5 — International payments

Requires provider credentials (e.g. Stripe and/or PayPal; Flutterwave or Pesapal are alternatives with strong Kenyan coverage).

- Hosted checkout for one-time card gifts; subscriptions for monthly gifts.
- Webhooks to confirm payments and manage recurring gift cancellations.
- Emailed receipts.

## Milestone 6 — Content & growth

- News article detail pages and an archive.
- Campaign pages with live progress from the database.
- Donor self-service for managing recurring gifts.
- Analytics, sitemap.xml, and multilingual content (English / Kiswahili).
