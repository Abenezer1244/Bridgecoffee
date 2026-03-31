# Bridge Coffee

Awwwards-level scrollytelling website for Bridge Coffee, a neighborhood artisan coffee shop in North Seattle.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** with custom warm dark-mode design tokens
- **Framer Motion** for text animations
- **HTML5 Canvas** for scroll-linked image sequence
- **Supabase** for menu items and orders
- **Vercel** for deployment

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

The site works without Supabase — menu and order pages use fallback data.

## Pages

- `/` — Scrollytelling landing page with 9-image canvas sequence
- `/menu` — Menu with category filtering
- `/order` — Order for pickup (no payment, pay at counter)
- `/about` — Brand story with real shop photos

## Supabase Setup

Run the SQL migrations in `supabase/migrations/` in order, then seed with `supabase/seed.sql`.
