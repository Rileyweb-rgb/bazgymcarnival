# BazGym Carnival 2026 — Project Context

> **Purpose of this document:** Give future developers and AI assistants enough context to understand what was built, how it works, and where to improve it — without re-reading the full chat history.

---

## Overview

**BazGym Carnival 2026** is a single-page marketing and registration site for a two-day gymnastics carnival event.

| Item | Value |
|------|-------|
| **Live URL** | https://bazgymcarnival.vercel.app |
| **Vercel project** | `bazgymcarnival` (team: `park4sparx-2138s-projects`) |
| **Event dates** | 5 & 6 September **2026** |
| **Venue** | Bedok HomeTeamNS |
| **Hours** | 10am – 5pm daily |
| **Entry** | Free, open to all |

The site is intentionally a **single scrolling “poster” page** (Apple-style full-viewport sections) rather than a multi-page app. Registration opens a modal; submissions are saved to **Google Sheets** via a **Google Apps Script webhook**.

---

## What Was Built

### 1. Landing page (`components/poster/PosterLanding.tsx`)

The entire public experience lives in one client component. Section order (as of latest deploy):

| # | Section ID | Headline | Theme |
|---|------------|----------|-------|
| 1 | `#try` | **Try.** | Pop-up trial classes (Andrew & Cheechia) |
| 2 | `#watch` | **Watch.** | Student showcase + competitive performance media |
| 3 | `#celebrate` | **Celebrate.** | Main stage competitive shows (12pm & 3pm) |
| 4 | `#spin` | **Spin.** | Fringe wheel-of-challenges (interactive preview) |

Additional blocks on the page:

- **Sticky nav** — logo, date/venue, Register button, Event Info link
- **Hero** — full-viewport photo, carnival title, stickers (date/time/venue), CTAs
- **Marquee ticker** — `Try · Watch · Celebrate · Spin · 5–6 Sept · Bedok HomeTeamNS · Open to All`
- **Photo strip** — horizontal scroll gallery (`CARNIVAL_GALLERY`)
- **Event details card** — ticket-style card with when/where/entry/who + directions
- **Programme schedule** — Day 1 / Day 2 tabs with timeline
- **Finale CTA** — closing message + footer

**Hero tagline:** `Try · Watch · Celebrate · Spin` (no “it” suffix).

**Primary CTA copy:** `Register Free` (via `RegisterButton` default).

### 2. Registration modal (`components/poster/RegistrationModal.tsx`)

Modal form collecting:

- Child name
- Parent/guardian name
- Email
- Contact number
- Child date of birth
- Preferred day: `5-sept` | `6-sept`
- Preferred time: `morning` | `afternoon`
- **Compulsory waiver** (full legal text in `lib/registration.ts`)

On success → `POST /api/register` → Google Sheets.

### 3. Registration API (`app/api/register/route.ts`)

- Validates payload with `validateRegistration()` in `lib/registration.ts`
- Enriches record with human-readable labels, ISO timestamp, event name
- Appends to Google Sheets via `appendToGoogleSheet()` in `lib/google-sheets.ts`

### 4. Google Sheets integration

**Spreadsheet ID:** `1JbLNRsxOS93Bov_gJGX6X_RSwLY7TxWMbUE0593cdmI`

**Tabs (case-insensitive match in Apps Script):**

- `registration`
- `indemnity waiver form`

**Active integration (production):** Google Apps Script webhook

```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbyZ9bnsxITo3-DA8PzPgJ5ry8msWdax9n0urmV2H8tC7IuYgEwYq1rkU12HdPQpWfg1/exec
```

Webhook script source: `scripts/google-sheets-webhook.gs`

**Fallback (not configured in production):** Direct Sheets API via OAuth refresh token (`lib/google-sheets-api.ts` + `googleapis` package). Used only if `GOOGLE_OAUTH_REFRESH_TOKEN` is set.

### 5. Media assets (`public/media/`)

Curated paths are defined in `lib/carnival-media.ts`:

| Key | File | Usage |
|-----|------|-------|
| `hero` | `hero-carnival-shirt.png` | Hero background (carnival shirt photo) |
| `try` | `tiny-tots-class.png` | Try section backdrop |
| `watch` | `showcase-class.png` | Watch section backdrop |
| `celebrate` | `coaching-balance.png` | Celebrate section backdrop |
| `spin` | `challenge-beam.png` | Spin section backdrop |
| `details` | `coaching-moment.png` | Details card backdrop |
| `groupStretch` | `group-stretch.png` | Gallery |
| `competitivePerformancePhoto` | `competitive-performance.png` | Watch section — 2025 stunt photo |
| `competitivePerformanceVideo` | `competitive-performance.mp4` | Watch section — muted autoplay loop (~10MB) |

Logo: `public/figma-assets/circle-icon.png`

**Note:** Hero shirt photo still shows “CARNIVAL 2025” on the physical shirt; site copy correctly says 2026.

### 6. Interactive elements

- **Spin wheel** — client-side random challenge preview (not persisted; demo only)
- **Scroll reveal** — `ScrollReveal` + `useScrollReveal` for fade-in on scroll
- **Schedule tabs** — Day 1 / Day 2 programme switcher

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Browser (https://bazgymcarnival.vercel.app)                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  app/page.tsx → PosterLanding (client component)       │  │
│  │    ├── RegistrationModal                                │  │
│  │    ├── RegisterButton                                   │  │
│  │    ├── SectionBackdrop / Coral / Dark variants          │  │
│  │    └── ScrollReveal                                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │ POST /api/register                 │
└──────────────────────────┼──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Vercel Serverless (Next.js 15 App Router)                  │
│  app/api/register/route.ts                                  │
│    → lib/registration.ts (validate)                         │
│    → lib/google-sheets.ts (append)                          │
└──────────────────────────┼──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Google Apps Script Web App (doPost)                        │
│  scripts/google-sheets-webhook.gs                           │
│    → Spreadsheet append (registration + waiver tabs)        │
└─────────────────────────────────────────────────────────────┘
```

### Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 (`@theme` in `globals.css`) |
| Fonts | Fredoka (display), Nunito (body) via `next/font` |
| Hosting | Vercel |
| Data store | Google Sheets (via Apps Script) |
| Images | `next/image` for static assets |
| Video | Native `<video>` (muted, loop, playsInline) |

### Rendering model

- `app/page.tsx` is a **server component** that renders `<PosterLanding />`
- `PosterLanding` is a **client component** (`"use client"`) because it uses scroll state, modal, wheel animation, schedule tabs
- The home page is **statically generated** (`○` in build output)
- `/api/register` is a **dynamic serverless function** (`ƒ`)

---

## File Structure (what matters)

```
bazgym-site/
├── app/
│   ├── layout.tsx          # Metadata, fonts, global shell
│   ├── page.tsx            # Entry → PosterLanding only
│   ├── globals.css         # Design tokens, animations, utility classes
│   └── api/register/
│       └── route.ts        # Registration POST handler
├── components/
│   └── poster/             # ★ ACTIVE — everything on the live site
│       ├── PosterLanding.tsx
│       ├── RegistrationModal.tsx
│       ├── RegisterButton.tsx
│       ├── ScrollReveal.tsx
│       └── SectionBackdrop.tsx
├── lib/
│   ├── carnival-media.ts   # ★ Curated image/video paths
│   ├── registration.ts     # Validation, waiver text, types
│   ├── google-sheets.ts    # Webhook + API routing
│   ├── google-sheets-api.ts# OAuth Sheets API (fallback)
│   ├── media.ts            # Server-side public/media scanner (unused by page)
│   └── media-shared.ts     # pickMedia helper (legacy)
├── public/
│   ├── media/              # Carnival photos + competitive video
│   └── figma-assets/       # Logo, old placeholder images
├── scripts/
│   └── google-sheets-webhook.gs  # Deploy to Google Apps Script
├── .env.example
└── PROJECT_CONTEXT.md      # This file
```

### Legacy / unused components

These exist from an earlier multi-section layout and are **not imported** by `app/page.tsx`:

- `components/Hero.tsx`
- `components/ActivityTents.tsx`
- `components/Schedule.tsx`
- `components/SpinWheel.tsx`
- `components/Marquee.tsx`
- `components/Footer.tsx`
- `components/Coaches.tsx`
- `components/PracticalInfo.tsx`
- `components/QuickFacts.tsx`
- `components/Confetti.tsx`

Safe to delete or refactor into `poster/` if cleaning up — but verify nothing imports them first.

---

## Design System

Defined in `app/globals.css` via Tailwind v4 `@theme`:

| Token | Hex | Usage |
|-------|-----|-------|
| `poster-navy` | `#0c1a2e` | Dark backgrounds, text |
| `poster-cream` | `#fff8f0` | Light section bg |
| `poster-warm` | `#ffe8d6` | Details section bg |
| `poster-coral` | `#ff5c4d` | Try section, accents |
| `poster-sun` | `#ffc93c` | Stickers, highlights |
| `poster-sky` | `#3db8ff` | Stickers, badges |
| `poster-pink` | `#ff4d8d` | Gradient, blobs |
| `poster-lilac` | `#a78bfa` | Spin eyebrow |
| `poster-mint` | `#34d399` | Celebrate eyebrow |

**Patterns:**

- `.poster-section` — min-height 100svh, vertically centered content
- `.sticker` — rotated pill badges with drop shadow
- `.text-poster-gradient` — coral → sun → pink headline gradient
- `.ticket-outline` — dashed border cards
- `.marquee-inner` — infinite horizontal scroll ticker
- `.blob-float` — decorative floating circles in hero/finale

**Aesthetic direction:** Fun carnival poster / Apple product-page scroll — big single-word headlines, full-bleed photos, minimal chrome.

---

## Copy & Content Decisions

Copy was refined to feel less “cringy” (see user’s `copy-updates.md` in Downloads). Key choices:

- Section verbs stay short: **Try. Watch. Celebrate. Spin.**
- Body copy is conversational but not overly hype-y
- CTAs: **Register Free**, **See What's On ↓**
- Footer finale copy kept: *“See you at the carnival.”* / *“Just bring socks, energy, and a smile.”*

**Watch section** specifically showcases last year’s competitive performance (photo + muted video) to set expectations for 2026.

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GOOGLE_SHEETS_WEBHOOK_URL` | **Yes (prod)** | Apps Script endpoint |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | No | Optional shared secret (must match `.gs` script) |
| `GOOGLE_OAUTH_CLIENT_ID` | No | Alternative Sheets API path |
| `GOOGLE_OAUTH_CLIENT_SECRET` | No | Alternative Sheets API path |
| `GOOGLE_OAUTH_REFRESH_TOKEN` | No | Alternative Sheets API path |

Set on Vercel: `npx vercel env add GOOGLE_SHEETS_WEBHOOK_URL production --value "..." --yes`

Local: `.env.local` (not committed).

---

## Development & Deployment

```bash
# Install
npm install

# Local dev
npm run dev          # http://localhost:3000

# Production build
npm run build

# Deploy to Vercel
npx vercel --prod --yes
```

**Registration testing locally** requires `GOOGLE_SHEETS_WEBHOOK_URL` in `.env.local`.

**Video processing:** `IMG_0481.MOV` was converted to `competitive-performance.mp4` (H.264, no audio, faststart) for web playback. Original `.mov` was removed from `public/media/` to keep deploy size down.

---

## What Can Be Improved

### High priority

1. **Video performance** — `competitive-performance.mp4` is ~10MB. Compress further (lower bitrate, 720p), or host on Cloudflare Stream / YouTube embed / Vercel Blob with CDN.
2. **Remove dead code** — Legacy `components/*.tsx` files clutter the repo; delete or archive.
3. **Consolidate media config** — `lib/media.ts` / `media-shared.ts` are unused by the live page; either wire them up or remove.
4. **Webhook secret** — Production webhook has no `GOOGLE_SHEETS_WEBHOOK_SECRET`; add one to prevent spam submissions.
5. **Rate limiting** — `/api/register` has no CAPTCHA or rate limit; vulnerable to bot spam.
6. **Error visibility** — API catches all errors and returns generic 503; log to Vercel / Sentry for debugging.
7. **Preview/dev env vars** — Only production had webhook URL set reliably; add to preview/development too.

### Medium priority

8. **Accessibility** — Video needs clearer controls labeling; modal focus trap; reduced-motion respect for animations.
9. **SEO** — Add Open Graph image (`og:image`), structured data (`Event` schema), favicon.
10. **Mobile video** — Autoplay muted works on most mobile, but verify iOS low-power mode behavior; consider tap-to-play fallback.
11. **Form UX** — Success state could email confirmation; show summary of selected day/time.
12. **Analytics** — No tracking (GA4, Plausible, Vercel Analytics) for registration conversions.
13. **i18n** — Site is English-only; event is in Singapore — consider bilingual EN/ZH if audience needs it.

### Low priority / polish

14. **Hero shirt year** — Replace or crop hero image so shirt doesn’t say 2025.
15. **Spin wheel** — Currently a demo; could tie to real prize logic or remove if misleading.
16. **Schedule sync** — Programme times are hardcoded; could move to a JSON/CMS file.
17. **Component size** — `PosterLanding.tsx` is ~600 lines; split into section components.

---

## Ideas to Make the Website More Attractive

These align with the existing poster/carnival aesthetic without a full redesign:

### Visual & motion

- **Parallax on hero** — subtle scroll-linked movement on blobs and hero image
- **Section transitions** — color wipes or curved dividers between Try/Watch/Celebrate/Spin
- **Micro-interactions** — sticker wiggle on hover, button bounce, confetti burst on successful registration
- **Video polish** — cinematic letterbox, play overlay on first frame, “2025 highlights” label badge
- **Photo gallery upgrade** — lightbox modal, masonry grid, or auto-advancing carousel with captions

### Content

- **Coach spotlights** — small cards with Andrew, Cheechia, Jeremy, Jean photos + one-liner
- **Testimonials** — parent quotes from last year’s carnival
- **“What to bring”** — socks, water bottle, comfortable clothes (visual checklist)
- **FAQ accordion** — parking, age limits, spectating vs participating
- **Countdown timer** — days until 5 Sept 2026 in hero or nav

### Social proof & sharing

- **Instagram embed** — `#bazgymcarnival` feed or manual photo grid
- **Share buttons** — WhatsApp / Telegram share with pre-filled message + link
- **OG image** — custom 1200×630 poster graphic for link previews

### Conversion

- **Sticky mobile CTA** — floating “Register Free” bar after scrolling past hero
- **Urgency** — “Limited pop-up class slots” (if true) near Try section
- **Post-registration** — “Add to calendar” (.ics download) on success screen

### Technical polish

- **Image optimization** — run all `public/media/*.png` through sharp/WebP variants
- **Font subsetting** — reduce Fredoka/Nunito payload
- **Prefetch** — `next/link` prefetch for `#details`, lazy-load video below fold

---

## Registration Data Flow (detail)

```
User fills modal
  → client POST { childName, parentGuardianName, parentEmail, contactNumber,
                  childDateOfBirth, preferredDay, preferredTime, waiverAccepted }
  → validateRegistration()
  → appendToGoogleSheet({
       ...fields,
       preferredDayLabel: "5 September 2026",
       preferredTimeLabel: "Morning (10am – 1pm)",
       submittedAt: ISO string,
       event: "BazGym Carnival 2026"
     })
  → fetch(GOOGLE_SHEETS_WEBHOOK_URL, { method: POST, body: JSON })
  → Apps Script doPost()
  → appendRow on "registration" tab
  → appendRow on "indemnity waiver form" tab
  → { success: true }
```

**Registration tab columns:** Submitted At, Child Name, Parent/Guardian, Email, Contact, DOB, Preferred Day, Preferred Time, Event

**Waiver tab columns:** Submitted At, Parent/Guardian, Child Name, DOB, Email, Contact, Preferred Day, Preferred Time, Waiver Accepted, Event

---

## Programme Schedule (hardcoded)

Both days share the same structure in `PosterLanding.tsx` → `SCHEDULE` constant:

| Time | Activity |
|------|----------|
| 10:00 | Doors open — fringe challenges & wheel spin |
| 10:30 | Pop-up classes begin |
| 11:00 | Student Moves Showcase — Session 1 |
| 12:00 | ★ Competitive Performance — Show 1 |
| 14:00 | Student Moves Showcase — Session 2 |
| 15:00 | ★ Competitive Performance — Show 2 |
| 17:00 | Carnival closes |

Day 2 closing line adds: “thanks for coming!”

---

## Changelog Summary (for AI continuity)

| Date | Change |
|------|--------|
| Initial build | Single poster landing page, registration form, waiver |
| Deploy | Vercel at bazgymcarnival.vercel.app |
| Google Sheets | Apps Script webhook connected and working in production |
| Media | 7 carnival photos added; hero replaced with carnival shirt image |
| Copy refresh | Less cringy wording; CTA → “Register Free” |
| Section reorder | Try → Watch → Celebrate → Spin; Cheer renamed Celebrate |
| Watch media | 2025 competitive performance photo + muted MP4 video added |

---

## Quick Reference for AI Assistants

**To change section order or copy:** Edit `components/poster/PosterLanding.tsx` — sections, `MARQUEE`, hero tagline, `SCHEDULE`.

**To add/replace images:** Put files in `public/media/`, update paths in `lib/carnival-media.ts`.

**To change registration fields:** Update `lib/registration.ts`, `RegistrationModal.tsx`, `google-sheets.ts` headers, and `scripts/google-sheets-webhook.gs` — keep all four in sync.

**To deploy:** `npm run build && npx vercel --prod --yes`

**Do not break:** `GOOGLE_SHEETS_WEBHOOK_URL` on Vercel production — registration depends on it.

**Main user-facing component:** `components/poster/PosterLanding.tsx` — everything else is supporting infrastructure or legacy.
