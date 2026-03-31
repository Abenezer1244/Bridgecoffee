# Bridge Coffee — Landing Page & Website Design Spec

## Overview

An Awwwards-level scrollytelling landing page for Bridge Coffee, a single-location artisan coffee shop. The experience is a cinematic brand story — warm, moody, editorial — driven by scroll-linked canvas image transitions, premium serif typography, and emotionally resonant copywriting. Supporting pages include Menu (Supabase-driven), Order (pickup, no payment), and About.

## Business Details

- **Name:** Bridge Coffee
- **Rating:** 4.7 stars (112 Google reviews)
- **Price Range:** $1–10
- **Located in:** North Seattle Church
- **Address:** 2150 N 122nd St, Seattle, WA 98133
- **Phone:** (206) 457-8690
- **Hours:**
  - Monday: 8 AM–3 PM
  - Tuesday: 8 AM–3 PM
  - Wednesday: 8 AM–4 PM
  - Thursday: 8 AM–3 PM
  - Friday: 8 AM–3 PM
  - Saturday: Closed
  - Sunday: Closed
- **Description:** Comfortable coffee shop with Wi-Fi serving up lattes and French press coffee, plus pastries.
- **Offerings:** Lattes, French press coffee, pastries (caramel latte, orange hazelnut buns noted in reviews)
- **Vibe (from reviews):** Cozy, friendly staff, great music, local art on walls, natural light from big windows, lots of seating, kid play room in back, perfect for laptop work or coffee dates. Located inside a church but purely a neighborhood coffee shop — "just trying to brighten everyone's day one cup at a time."
- **People typically spend:** 10 min to 2 hr

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with custom warm dark-mode design tokens
- **Animation:** Framer Motion for text animations; HTML5 Canvas for scroll-linked image sequence
- **Database:** Supabase (menu items, orders)
- **Backend:** Node.js (Next.js API routes for order submission, rate limiting)
- **Deploy:** Vercel
- **Fonts:** Playfair Display (display serif), DM Sans (body/nav sans)

---

## Visual Direction & Brand Aesthetic

**Vibe:** Warm luxury editorial. Artisan craft meets cinematic minimalism. Blue Bottle Coffee meets Apple product page meets Michelin-star tasting menu. Dark, moody, warm — never cold or tech-forward.

**Seamless blending:** Page background color matches the darkest tones in the image sequence frames so photo edges are invisible and subjects float in a unified warm void.

### Color Palette — Warm Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0D0A07` | Primary background (deep espresso near-black) |
| `--bg-secondary` | `#120E09` | Section variation |
| `--bg-gradient-end` | `#1A0F06` | Subtle radial gradient end (warm brown) |
| `--text-heading` | `#F5EDD6` | Headings — warm ivory like parchment in candlelight |
| `--text-body` | `rgba(245,237,214,0.65)` | Body text — soft, readable |
| `--accent-primary` | `#C8873A` | Roasted amber — crema and latte art tones |
| `--accent-secondary` | `#E8C99A` | Golden highlight — hover glows, subtle borders |

### Typography

| Role | Font | Style |
|------|------|-------|
| Display headlines | Playfair Display | 72–96px desktop, tight line-height, editorial serif |
| Subtitles | Playfair Display | 20–24px |
| Body | DM Sans | 16–18px, line-height 1.7–1.9 |
| Nav labels | DM Sans | All caps, wide letter-spacing |

**Headline gradient fill:** Warm ivory `#F5EDD6` fading to golden amber `#C8873A` at base of letterforms — like light catching rising steam.

---

## Project Structure

```
bridgecoffee/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, metadata, Navbar)
│   │   ├── page.tsx            # Landing page (scrollytelling)
│   │   ├── menu/page.tsx       # Menu page (Supabase-driven)
│   │   ├── order/page.tsx      # Order for pickup
│   │   ├── about/page.tsx      # Brand story
│   │   └── globals.css         # Tailwind + custom CSS properties
│   ├── components/
│   │   ├── Navbar.tsx           # Apple-style glassmorphism nav
│   │   ├── ScrollCanvas.tsx     # Canvas image sequence engine
│   │   ├── StoryBeat.tsx        # Individual scroll storytelling beat
│   │   ├── ScrollSection.tsx    # Sticky scroll container (~500vh)
│   │   ├── HeroCTA.tsx          # Final CTA section
│   │   ├── Footer.tsx           # Minimal footer
│   │   └── LoadingScreen.tsx    # Image preloader with progress
│   ├── hooks/
│   │   ├── useScrollProgress.ts # Scroll position -> 0-1 progress
│   │   └── useImageSequence.ts  # Preload + canvas frame controller
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   └── images.ts            # Image manifest (URLs, order, alt text)
│   └── types/
│       └── index.ts             # Shared types
├── public/
│   ├── images/
│   │   ├── sequence/            # 9 optimized scroll sequence images (WebP)
│   │   └── shop/                # 14 real Bridge Coffee shop photos
│   └── fonts/                   # Self-hosted fallback if needed
├── supabase/
│   └── migrations/              # Menu + orders schema
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## Navbar — Apple-Style, Warm Edition

**Layout:** Fixed top bar, `z-50`, three-column grid.
- **Left:** "Bridge Coffee" in Playfair Display serif
- **Center:** "Story" | "Menu" | "Craft" | "Location" | "Order" — DM Sans, all caps, wide tracking
- **Right:** "Order Now" button with `#C8873A` border, soft amber glow on hover

**Scroll behavior:**
- At top: fully transparent background, no border
- After ~50px scroll: transitions to `rgba(13,10,7,0.82)` with `backdrop-blur(12px)`
- Transition: 300ms ease

**Interactions:**
- Link hover: amber underline slides in from left (`#C8873A`, 2px)
- CTA hover: border glows brighter, slight `scale(1.02)`
- Mobile: hamburger menu, slide-in drawer with same dark treatment

**Navigation targets:**
- "Story" / "Craft" -> anchor scroll to landing page beats
- "Menu" -> `/menu`
- "Location" -> footer or location section
- "Order" / "Order Now" -> `/order`

---

## Core Interaction — Scroll-Linked Canvas Image Sequence

### Preloading Phase

- On page load, `LoadingScreen` fetches all 9 images as `HTMLImageElement` objects
- Minimal progress indicator (warm amber bar) against `#0D0A07` background
- Once all images decoded: loading screen fades out, scroll enabled

### Canvas Rendering

- Single `<canvas>` element, `position: sticky`, `top: 0`, filling viewport
- Parent `ScrollSection` is ~500vh tall (scroll runway)
- `useScrollProgress` maps container scroll to `0–1` progress value
- Each frame via `requestAnimationFrame`:
  1. Determine current image + next image + blend factor from progress
  2. Draw current image (cover-fit with 0.6x parallax offset)
  3. Draw next image at `globalAlpha = blendFactor` (cubic ease-in-out)
  4. Draw radial vignette overlay (`rgba(13,10,7,0.3)`)

### Image Sequence Mapping

| Progress | Image | Description |
|----------|-------|-------------|
| 0–15% | Image 1 | Overhead latte heart in dark ceramic cup on warm wood. Hero beauty shot. |
| 15–30% | Image 4 | Coffee beans in heart shape on dark wood. Origin story. |
| 30–45% | Image 5 | Glass jar of ground coffee with whole beans. Roasting craft. |
| 45–60% | Image 7 | Individual beans on white surface, sharp focus, long shadows. |
| 60–70% | Image 8 | Espresso in glass cup on wood slice, dramatic shadow-stripe lighting. |
| 70–80% | Image 3 | Cappuccino in white ceramic, cocoa dust, soft blur. |
| 80–88% | Image 6 | Latte art in dark cup, natural window light. Cafe atmosphere. |
| 88–94% | Image 2 | Takeaway latte art in kraft paper cup, blue-blurred background. |
| 94–100% | Image 9 | Black coffee overhead on bed of beans. Final CTA state. |

### Scroll Sequence Source Images

1. `zoe-d9ya-UJr90u-E-unsplash.jpg` — Overhead latte heart (hero)
2. `john-murphey-S20-DTk-RWdn-A-unsplash.jpg` — Takeaway latte art
3. `yianni-k-Wcewenz5l-VY-unsplash.jpg` — Cappuccino with cocoa dust
4. `davidson-l-u-n-a-TZOhcl-DZGg-unsplash.jpg` — Bean heart on dark wood
5. `mae-mu-0-EWWLx-etkw-unsplash.jpg` — Ground coffee jar with beans
6. `lex-sirikiat-lq-II6-R4h-Hm-Y-unsplash.jpg` — Latte art, window light
7. `jay-sadangi-5-Me-U-Vz-U3no-unsplash.jpg` — Individual beans, sharp focus
8. `ionela-mat-p-STRBOVv2-Hw-unsplash.jpg` — Espresso in glass cup
9. `brent-ninaber-vb-Dz2-XLwwo-unsplash.jpg` — Black coffee overhead on beans

### Effects

- **Ken Burns:** Image 1 gets slow `scale(1.0 -> 1.05)` drift via canvas `drawImage` scaling
- **Parallax:** Canvas images at 0.6x scroll speed; text overlays at 1x in separate DOM layer
- **Vignette:** Radial gradient drawn on canvas after each frame — dark edges, transparent center
- **Reduced motion:** `prefers-reduced-motion` -> instant cuts, no Ken Burns, no parallax

---

## Scroll Storytelling Beats (Copy)

### Hero / Intro (0–15%)

**Visual:** Image 1. Overhead latte art on dark wood. Cinematic rim light.

**Copy (centered, bold, editorial):**
- Headline: "Bridge Coffee" — large serif, gradient fill
- Subtitle: "Craft, poured with intention."
- Supporting: "Artisan coffee roasted locally and served with purpose — for mornings worth savoring."

### Origin Story (15–45%)

**Visual:** Images 4 and 5. Bean hearts dissolving into grinding jars.

**Copy (left aligned, fading in from left):**
- Headline: "Born from the perfect bean."
- Subcopy: "We source single-origin beans from family farms, roasted in small batches to unlock every note of flavor."
- "The journey from seed to cup is one we take seriously."

### Craft & Precision (45–65%)

**Visual:** Images 7 and 8. Close-up beans and dramatic espresso shot.

**Copy (right aligned, sliding from right):**
- Headline: "Precision is our process."
- Points:
  - "Grind size, water temperature, extraction time — every variable dialed in."
  - "Our baristas are craftspeople. Your espresso, their masterpiece."
  - "No shortcuts. No compromises. Just coffee done right."

### Atmosphere (65–88%)

**Visual:** Images 3 and 6. Cappuccino and latte in warm cafe light.

**Copy (centered):**
- Headline: "A space that breathes."
- Subcopy: "Whether you stay for an hour or just a moment — this is your place."
- "Big windows. Natural light. Local art on the walls. Music that sets the mood."
- "A neighborhood coffee shop trying to brighten everyone's day, one cup at a time."

### CTA / Close (88–100%)

**Visual:** Images 2 and 9. Takeaway cup fading into bold overhead black coffee.

**Copy (centered, strong):**
- Headline: "Drink something real."
- Subheadline: "Handcrafted coffee. Every single day."
- CTA Primary button: "Explore Our Menu"
- CTA Secondary link: "Find a Location"
- Micro-copy: "Open daily. Sourced honestly. Served with care."

---

## Menu Page (`/menu`)

- **Categories:** Espresso, Drip, Cold Brew, Tea, Pastries, Seasonal
- **Each item:** name, description, price, optional photo, dietary tags (vegan, gluten-free)
- **Data source:** Supabase `menu_items` table
- **Visual:** Same warm dark aesthetic — `#0D0A07` background, ivory text, amber accents
- **Interaction:** Category filter tabs, smooth fade transitions between categories

---

## Order Page (`/order`)

- **Flow:** Browse menu -> add to cart -> enter name & pickup time -> submit
- **No payment integration** — pay at counter
- **Order stored** in Supabase `orders` + `order_items` tables, status `pending`
- **Confirmation:** Order number + estimated pickup time displayed
- **Validation:** Name required, pickup time must be during business hours

---

## About Page (`/about`)

- Extended brand story — origin, roasting philosophy, team
- Reuses warm editorial typography and dark palette
- Static content, no database dependency
- Incorporates real Bridge Coffee shop photos

### Real Shop Photos (14 images)

These are used on the About page, Location section, and Atmosphere beat:

1. `unnamed-7.webp`
2. `unnamed-6.webp`
3. `unnamed-5.webp`
4. `unnamed-4.webp`
5. `unnamed-3.webp`
6. `2024-09-19-1.webp`
7. `unnamed-2.webp`
8. `2024-09-18-2.webp`
9. `2024-09-18-1.webp`
10. `2024-09-18.webp`
11. `unnamed-1.webp`
12. `2024-09-19.webp`
13. `unnamed.webp`
14. `2024-09-18.jpg`

---

## Supabase Schema

```sql
-- Menu items
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal NOT NULL,
  category text NOT NULL,          -- 'espresso', 'drip', 'cold_brew', 'tea', 'pastry', 'seasonal'
  image_url text,
  dietary_tags text[],             -- ['vegan', 'gluten_free']
  available boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Orders (pickup, no payment)
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  pickup_time timestamptz NOT NULL,
  status text DEFAULT 'pending',   -- 'pending', 'preparing', 'ready', 'completed'
  total decimal NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Order line items
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id uuid NOT NULL REFERENCES menu_items(id),
  quantity int NOT NULL DEFAULT 1,
  price decimal NOT NULL
);
```

### RLS Policies

- **`menu_items`:** Public read. Authenticated admin write (insert, update, delete).
- **`orders`:** Public insert (placing orders). Authenticated admin read/update.
- **`order_items`:** Public insert (with valid order_id). Authenticated admin read.

---

## Performance

- 9 sequence images optimized to WebP, ~200-300KB each (~2.7MB total preload)
- `next/font/google` for Playfair Display + DM Sans — zero layout shift
- Canvas: single GPU-composited layer, no DOM reflow
- Tailwind CSS purged in production
- Shop photos served via `next/image` with automatic optimization

## Accessibility

- Canvas: `role="img"` with `aria-label` describing current scene
- All storytelling copy in real DOM elements — screen readers get full narrative
- `prefers-reduced-motion`: instant cuts, no parallax, no Ken Burns
- Keyboard-navigable nav with visible amber focus rings
- Color contrast: warm ivory on espresso black passes WCAG AA

## SEO

- `generateMetadata` for title, description, Open Graph image
- Storytelling copy is real HTML text, fully indexable
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`

## Security

- Input sanitization on order form (customer name, pickup time)
- Rate limiting on order API endpoint via Next.js middleware
- Supabase RLS enabled on all tables
- Environment variables for Supabase credentials (never client-exposed secrets)

## Deployment

- **Hosting:** Vercel (zero-config Next.js)
- **Database:** Supabase project
- **Env vars:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Domain:** Custom domain via Vercel dashboard
