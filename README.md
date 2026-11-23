# Ticket Generator website redesign

The redesigned Ticket Generator marketing site, built around a "ticket" design language: every section is its own ticket with a stub label, notches and a tear line.

**Scope so far:** homepage and pricing page, each with a desktop version and a mobile version. Every other page shows a "coming soon" page until it is redesigned.

- Live preview: https://tg-website-revamp.vercel.app
- Pricing page: https://tg-website-revamp.vercel.app/pricing

## What's in here

| Path | What it is |
| --- | --- |
| `index.html` | Homepage |
| `pricing.html` | Pricing page |
| `coming-soon.html` | Coming-soon page (Mira, the pixel host, at her laptop while a ticket prints). The build copies it to every page that isn't redesigned yet (`/use-cases`, `/features`, `/support` and so on) and to the "page not found" page |
| `css/tokens.css` | Design tokens: colours, fonts, spacing, radius, shadows |
| `css/base.css` | Reset, buttons, header, shared pieces |
| `css/tickets.css` | The ticket shell every section sits in |
| `css/<section>.css` | One file per homepage section (journey, logos, numbers, eventpage, usecases, trust, testimonials, faq, closing, footer). `eventpage.css` holds both the event page and the features grid |
| `css/pricing.css` | Pricing page styles |
| `css/coming-soon.css` | Coming-soon page styles |
| `css/mobile.css` | Phone layout (768px and below), loaded last on both pages |
| `js/main.js` | Homepage and shared behaviour |
| `js/pricing.js` | Pricing calculator |
| `js/coming-soon.js` | Coming-soon animation |
| `assets/` | Logos, photos, badges, icons. `assets/eventpage/` holds the cover image and lineup photos from the Ticket Generator demo event page |
| `build.sh` | Build and deploy script |

Plain HTML, CSS and vanilla JavaScript. No framework and no install step.

## Run, build, deploy

Open the pages through any static server from the project folder, for example:

```bash
python3 -m http.server 5173
```

Build an optimised copy into `dist/` (bundled and minified CSS, minified JS, optimised SVGs):

```bash
./build.sh
```

Build and deploy `dist/` to Vercel production:

```bash
./build.sh --deploy
```

Always deploy with `./build.sh --deploy`. Never deploy the project root: it can hold a local `.env.local` with a Vercel token. That file, `.vercel/` and `dist/` are kept out of this repo.

## Links

- **Log In** opens `https://tg-full-revamp.vercel.app/login`; **Sign Up** and **Create Your Event** open `https://tg-full-revamp.vercel.app/signup`.
- Menu and footer links to pages that aren't redesigned (How It Works, Features, Use Cases, Resources, Support, Book a Demo, Legal and so on) open their own coming-soon page.
- Links to pages on the current `ticket-generator.com` site also open the coming-soon page (`js/main.js` rewrites them when the page loads).

The design is documented below in two parts: [Desktop version](#desktop-version) and [Mobile version](#mobile-version). Both draw on the same [shared tokens](#shared-tokens) in [`css/tokens.css`](css/tokens.css), which come from the Ticket Generator design system in Figma (TG > Design System > Website).

---

## Desktop version

Applies above 768px. Styles live in `css/base.css`, `css/tickets.css`, the per-section files and `css/pricing.css`.

### Desktop fonts

| Role | Font | Weights | Used for |
| --- | --- | --- | --- |
| Body and headings | Inter | 400, 500, 600, 700 | All running text, headings, buttons |
| Mono | JetBrains Mono | 500 | Ticket stub labels, prices, counters, small data |
| Fallback | "Inter Fallback" (Arial, metric-matched) | n/a | Shown until Inter loads, so text doesn't jump |

Both fonts load from Google Fonts. Mono text uses a slashed zero and `-0.03em` letter spacing.

### Desktop type scale

| Style | Size / line height | Weight | Letter spacing |
| --- | --- | --- | --- |
| Hero title (homepage) | 40–60px, fluid, line height 1.12 | 600 | -0.02em |
| Page title (pricing) | 56 / 64px | 600 | -0.02em |
| Section heading (h2) | 36 / 44px | 600 | -0.02em |
| Step heading (h3) | 30 / 38px | 600 | n/a |
| Use case title | 22 / 30px | 600 | -0.01em |
| Lede (pricing) | 20 / 30px | 400 | n/a |
| Large paragraph | 18 / 28px | 400 | n/a |
| Body | 16 / 24px | 400 | n/a |
| Eyebrow | 14 / 20px | 600 | n/a |
| Button | 14 / 20px (lg and xl: 16 / 24px) | 600 | n/a |
| Ticket stub label | 11 / 16px, uppercase, mono | 500 | 0.16em |

### Desktop colour use

| Role | Token | Value |
| --- | --- | --- |
| Main text | `--text-primary` | `--gray-900` `#181d27` |
| Secondary text | `--text-secondary` | `--gray-700` `#414651` |
| Supporting text | `--text-tertiary` | `--gray-600` `#535862` |
| Quiet text | `--text-quaternary` | `--gray-500` `#717680` |
| Border | `--border-primary` | `--gray-300` `#d5d7da` |
| Light border | `--border-secondary` | `--gray-200` `#e9eaeb` |
| Ticket surface | `--bg-primary` | `#ffffff` |
| Soft surface | `--bg-secondary` | `--gray-50` `#fafafa` |
| Page background ("desk") | `--desk` | `#e2e9f4` with a faint blue dot grid |
| Use case ticket papers | n/a | `#fff7e3`, `#e9f7ef`, `#fff0e9`, `#f2efff`, `#e9f3ff` |

### Desktop buttons

| Button | Background | Text | Hover | Padding and radius |
| --- | --- | --- | --- | --- |
| Primary | `--brand-600` | white | `--brand-700` | 10px 16px, 8px radius |
| Dark | `--gray-900` | white | `--gray-800` | 10px 16px, 8px radius |
| Secondary | white | `--text-secondary` | `--gray-50` | 10px 16px, 8px radius |
| Link | none | `--text-tertiary` | `--text-primary` | 10px 16px |
| Large (`lg`) | as above | as above | as above | 12px 18px |
| Extra large (`xl`) | as above | as above | as above | 14px 22px, 10px radius |

### Desktop layout

| Setting | Value |
| --- | --- |
| Content width | 1280px (`--container`) |
| Side gutter | 32px (`--gutter`) |
| Ticket width | page width minus 40px, up to 1480px |
| Ticket corners | 32px |
| Ticket notch size | 16px |
| Gap between tickets | 28px |
| Tablet adjustments | 960px and below |
| Closing ticket turns portrait | 720px and below |

### Desktop sections and behaviour

Homepage order: hero and five steps, event page, launch options, customer logos, clear wins, numbers, features, use cases, security, API, testimonials, FAQ, blog, closing ticket, footer. Every section on the live ticket-generator.com homepage has a counterpart here (checked 18 November 2026).

| Section | What it does |
| --- | --- |
| Navigation bar | Floating ticket-shaped bar, same on every page: the original logo (it links to the homepage), then How It Works, Features, Use Cases, Resources, Pricing, Support, with Log In and a blue Sign Up on the right |
| Hero | Full width, edge to edge under the floating nav, on the festival-lawn photo. Centred copy, then the TG app (breadcrumb, three stats, and five working tabs: Event Details, Ticket Design with clickable templates that swap the hero ticket, Event Page with a working Register now, Guest Tickets with the live list, Analytics with hoverable sales bars) with a ticket in front. The ticket is one of 24 designs in `js/ticket-designs.js` (each its own colours, pattern, typeface and designed QR, a real code with the event's initials in the middle), never the same as the last visit. Tap the QR to scan (laser, Admitted stamp, guest checked in, count up, toast); scan again to see the entry refused; "New design" flips to another design; the ticket tilts with the cursor; new tickets keep arriving in the list; a soft blurred blue glow follows the cursor around the hero (mouse only). The ticket sits beside the app, not over it. Event name and guest are editable |
| Backstage Pass | The five steps, as a separate ticket right under the hero ("Backstage Pass" on its strip): the heading and the five steps on the left (each step is about 430px of scroll), the live picture pinned on the right and changing with the step, with one quiet "Preview as: Conference ⌄" menu in its corner (Conference, Private party, Eco run, Concert, Valentine's brunch); no colour dots |
| Ready to try | "Ready to try event ticket generator?" (the real site's wording) right after Backstage Pass, as a plain blue band: perks on one line, Book a Demo and Try Ticket Generator |
| Numbers | Centred head: heading, line of text, then "See pricing →" right under it. Below, the printed receipt sits in the centre and the three stats float beside it as plain white cards (big number + label, no ticket shapes), each just touching the receipt's edge: 1,000,000+ and 30,000+ on the left, 150+ on the right, slightly tilted and gently bobbing |
| Event page | Riverside Music Festival (the same event as the hero app) on a light event page in a browser window. The cover slides are designed posters: a duotone cut-out performer on a flat colour field (blue, orange, violet) with the event name set large, the outlined word RIVERSIDE behind it, a mono kicker and the dates (always the coming week). Lineup: four duotone cut-outs on colour discs. Register Now opens the registration step, as before |
| Launch options | "What kind of event are you planning?": two separate portrait tickets side by side (stacked under 900px). On top, a small product scene on a dotted panel (`css/scenes.css`): a guest list sending tickets to Email, SMS and WhatsApp; and a Riverside event page with a working **Free / Paid** switch (Free · Register, or $25 · Buy ticket). A tear line with half-circle notches cut through both the scene panel and the ticket, then the number, title, text, two steps and a solid blue Get Started |
| Clear wins | "Easy event ticketing from setup to scan": five landscape tickets that stack as you scroll; copy on the left, and on the right half a small product scene built in HTML in the hero app's style (`css/scenes.css`, scaled to fit): (1) ticket design with four templates (click one to recolour the ticket) and Send tickets with ticks landing; (2) payment gateway (click Stripe, PayPal or Razorpay) and a payout that counts up with $0.00 commission; (3) Early Bird, General Admission and VIP as real tickets with sold bars (hover to pull one out); (4) a live dashboard: KPIs, a chart that draws in with each day on hover, Export report; (5) a receipt whose lines tick in before the ZERO COMMISSION stamp lands |
| Features | "Powerful features that make event ticketing a breeze for you, not just the techies": nine tickets (icon and heading, tear line with side notches, two or three lines of text), all the same size, in a plain three-column grid (no stacking) |
| Use cases | New photo set (Magnific One, light and airy, real candid moments: conference, charity gala, festival, training workshop, local football).  Section pins. The pinned box is only as tall as the heading, rail and pile, and pins 24px under the header at every screen height. One tilted ticket is dealt onto a pile per scroll step, with no zoom. Only the top ticket casts a full shadow (the ones under it barely any), so the pile never builds a dark smudge; tickets waiting below are hidden until dealt, so the section's clip edge never shows as a line. The rail on the left has five equal lines; the line of the use case on show is fully lit |
| Security | Its own ticket. Static: words on the left, the three badges on the right, no lines or moving dots. Under the badges a quiet caption (small lock icon, grey text "Encrypted, access-controlled, audited"), not a pill, so it doesn't look clickable |
| API | Its own ticket after Security ("Ticket Generator API" on its strip): heading and copy centred one above the other, then a live demo: registration list (taller, with more air), API, ticket, three delivery channels. The list, the logo and the middle channel card (SMS) share one centre line; the dotted lines run from the list straight into the logo, and from the logo to each channel card, with Email and WhatsApp evenly above and below. The logo in the middle is the only control (hand cursor, grows slightly on hover): click it to send a registration. A small "Try it: click the logo in the middle" pill sits in the demo's top-left corner, with clear space under it, and the running count ("0 tickets issued in this demo · zero manual steps") is a small pill in its bottom-right corner, inside the box without making it taller |
| Testimonials | Curved carousel, not pinned: the middle review faces you and its neighbours angle in from the sides. It moves on by itself, one review every 2.5 seconds while on screen, and pauses while the mouse rests on it. Previous and next arrows sit under it; you can also drag it, click a side review or use the arrow keys. Each review ticket has a faint grey TG mark in its top-right corner (no stamp) |
| FAQ | "Have a Question?" in the strip. One answer open, the rest open on click |
| Still have a question? | A plain full-width white box after the FAQ (no ticket strip or notches), everything centred: "Still have a question?", "Talk to our team…", then Contact us (blue) and Book a Demo. Pricing has the same box |
| Footer | "Keep exploring" in the strip. Under "Download Ticket Validator": the App Store and Google Play buttons, then "Web Application" as a plain grey text link (as on the live site) to validate.ticket-generator.com. Link columns: Product, Resources with Affiliate Program, Comparison |
| Blog | Three posts with designed covers: a duotone cut-out (organiser, door staff with a scanner, designer with a printed ticket) on a colour field, with the post's keyword (EVENTS, ENTRY, PRINT) set three times behind it, tone-on-tone with the middle row in white; no outlined type. The words slide apart on hover. Never fewer than three. Heading centred |
| Closing ticket | Landscape "admission ticket" with Sign Up and Book a Demo (same height). The stub shows "10 tickets free" and a real, branded QR code (rounded modules and eyes, TG mark in the centre, error correction H; checked to scan at 120–600px) with "tg-full-revamp.vercel.app →" under it. Scanning, clicking or tapping the QR or the link opens the app |
| Pricing: estimator | A landscape ticket like the homepage hero: headline, ticket count field and credit packs on the main part; the sticky price receipt is the stub on the right, past the tear line. Under its "Sign up to buy" button sit "First 10 tickets free" and "No credit card required" with check marks, like the homepage hero. "Create your own event" in the event page section opens the app's sign-up. The receipt's printer slot overhangs only 6px here, so it never touches the tear line |
| Pricing: features | Section pins; the blue "1 credit = 1 ticket" ticket steps back and ten feature tickets slide past sideways (including seating plans and on-ground sales, as on the live pricing page) |
| Coming soon | Terminal with Mira typing; a portrait ticket prints from the top and names the page. The stub carries a real QR code that opens the homepage |

---

## Mobile version

Applies at 768px and below. Mobile is the main audience. All phone styles live in `css/mobile.css`, loaded last on both pages; phone-only behaviour is in `js/main.js` behind a `(max-width: 768px)` check.

### Mobile fonts

| Role | Font | Weights | Used for |
| --- | --- | --- | --- |
| Body and headings | Inter | 400, 500, 600, 700 | All running text, headings, buttons |
| Mono | JetBrains Mono | 500 | Ticket stub labels, prices, small figure labels |
| Fallback | "Inter Fallback" (Arial, metric-matched) | n/a | Shown until Inter loads |

Same fonts as desktop; only the sizes change.

### Mobile type scale

| Style | Size / line height | Weight | Letter spacing |
| --- | --- | --- | --- |
| Hero title (homepage) | 32 / 37px | 600 | -0.02em |
| Page title (pricing) | 28 / 34px | 600 | -0.02em |
| Section heading (h2) | 22 / 28px (FAQ, blog, numbers and pricing features: 26 / 32px) | 600 | -0.02em |
| Step heading | 19 / 25px | 600 | n/a |
| Use case title | 18 / 24px | 600 | -0.01em |
| Feature card title (pricing) | 17 / 23px | 600 | n/a |
| Hero lede | 16 / 24px | 400 | n/a |
| Body | 14 / 21px to 16 / 24px | 400 | n/a |
| Review quote | 15 / 22px | 400 | n/a |
| FAQ question | 15 / 21px | 600 | n/a |
| Button | 15–16px | 600 | n/a |
| Ticket stub label | 10 / 16px, uppercase, mono | 500 | 0.14em |

### Mobile colour use

| Role | Token | Value |
| --- | --- | --- |
| Main text | `--text-primary` | `--gray-900` `#181d27` |
| Supporting text | `--text-tertiary` | `--gray-600` `#535862` |
| White tickets | `--bg-primary` | `#ffffff` |
| Blue tickets (steps, pricing headline, "1 credit = 1 ticket") | `--brand-800` to `--brand-600` | 165° gradient, `#1849a9` to `#1570ef`, with a light blue glow top right |
| Text on blue tickets | n/a | white; labels `--brand-200` `#b2ddff` |
| Dark ink ticket (numbers) | n/a | dark navy with white text |
| Product picture backdrop | n/a | `#eaf1fb`, so the white ticket stub and its notches read as cut-outs |
| Use case ticket papers | n/a | `#fff7e3`, `#e9f7ef`, `#fff0e9`, `#f2efff`, `#e9f3ff` |
| Page background ("desk") | `--desk` | `#e2e9f4` with a faint blue dot grid |
| Ticket shadow | `--m-shadow` | `0 1px 2px rgba(10,13,18,.06), 0 18px 28px -18px rgba(10,13,18,.3)` |

### Mobile buttons

| Button | Background | Text | Notes |
| --- | --- | --- | --- |
| Primary | `--brand-600` | white | Full width in the hero |
| Secondary | white | `--text-secondary` | Used in the menu and FAQ |
| Bottom action bar | white bar, primary button | n/a | Fixed to the bottom of the screen; shows "First 10 tickets free" on the homepage and the running total on pricing |
| Menu button | n/a | n/a | Opens the full menu as a card under the navigation bar |

### Mobile layout

| Setting | Value |
| --- | --- |
| Phone layout starts | 768px and below |
| Ticket width | screen width minus 20px |
| Side gutter inside tickets | 16px (`--gutter`) |
| Ticket corners | 24px |
| Ticket notch size | 11px |
| Gap between tickets | 14px |
| Sticky cards stop at | 78px from the top, each next card 20–26px lower so every stacked ticket shows its top edge. Every stack stops when its last ticket lands and then scrolls away as one (no ticket slides over the others) |
| Reviews carousel pins at | 70px from the top |

### Mobile sections and behaviour

| Section | What it does |
| --- | --- |
| Navigation bar | Floating bar with the original logo (links to the homepage) and the menu button, same on every page |
| Hero | Full width on the photo: copy, both buttons stacked, the app (stats and three guest rows, no tabs) and the designed ticket under it with New design and the scan hint |
| Five steps | Its own white ticket ("Backstage Pass" on its strip), 14px below the hero ticket: heading, one "Pick your event type" row (five swatches; on phones the ticket itself names the type), then five step tickets that stack as you scroll. Each is a real ticket: its label and heading on top, a tear line with side notches, a still picture of that step, another tear line with notches, then one line of text. 32px apart before stacking, and the stack leaves as one |
| Ready to issue | A plain blue band after the steps: "Ready to try event ticket generator?", the perks on two lines, Book a Demo and Try Ticket Generator side by side |
| Numbers | Three stats in one row, compact receipt |
| Event page | The copy centred (heading, text, the three checkmarks as a centred list, the button), then the event page in its phone layout: cover, details, full-width "Register Now", lineup in a 2 × 2 grid, guide and share side by side. "Register Now" opens the registration step inside the frame (ticket choice, sample name and email, Register), with a "Back to event" button; Register shows a "You're registered" confirmation. Same on desktop |
| Launch options | Two portrait tickets, 16px apart: the scene on top, the tear line (it follows the scene's height), then the copy and a full-width Get Started |
| Our customers | Smaller logo tickets (128 × 60) in the moving strip, with little space above and below |
| Clear wins | Five stacking portrait tickets, 14px apart, each 24px lower than the last once stacked: the words on the main part, then a tear line with side notches, then the illustration on a smaller bottom stub |
| Features | Nine tickets in one column, 14px apart, as a plain list (no stacking) |
| Use cases | Five full tickets (photo on top, tear line, heading, full text, "Learn more"), 14px apart, that stack as you scroll with 26px of each one showing. No progress bar and no "Admit one" label |
| Security | Seals show their names only, static (no lines), with the quiet lock caption under them |
| API | Its own ticket. The demo shows three registrations, runs by itself, and tapping the logo sends another; a small "Try it: tap the logo" pill sits in its top-left corner with clear space under it, and a short "0 tickets issued" count sits opposite it in the top-right corner |
| Testimonials | Same curved carousel as desktop: moves on by itself every 2.5 seconds, with previous and next arrows under it. Pauses for 5 seconds after a swipe and 8 seconds after an arrow tap |
| FAQ | One answer open, the rest open on tap. "Still have a question?" follows as a plain centred box with Contact us and Book a Demo side by side |
| Blog | Three slim rows, or the section is removed. Heading centred |
| Footer | The strip above the tear line reads "Keep exploring", the same height as every other strip. Compact link columns (Product, Resources with Affiliate Program, Comparison) and a row of Trycon product tiles. The validator box shows the two store buttons with "Web Application" as a text link under them |
| Pricing: top | Two tickets: the blue headline ticket with three figures, then the white "Estimate" ticket with the calculator. Under "Sign up to buy", "First 10 tickets free" and "No credit card required" sit one under the other, left-aligned, as a centred group |
| Pricing: features | The blue "1 credit = 1 ticket" ticket, then ten portrait tickets (icon and heading, tear line with side notches, three lines of text), 14px apart, that stack on scroll, each 20px lower than the last |
| Coming soon | Same terminal and printing ticket as desktop, sized to the screen |

Every section heading on phones is centred under its centred blue strip label, with the intro line under it centred too.

Headings never run past two lines, on desktop, tablet or phone: the Features heading's box is wider on desktop, the use-cases side column is 370px, a few long headings are a little smaller between 769 and 1180px wide, and on phones the Features heading has a shorter version ("Powerful features that make event ticketing a breeze"). Wherever "Ticket Generator" appears in the page text it is written with a non-breaking space (`Ticket&nbsp;Generator`), so the two words always stay on the same line.

The Sign Up button in the navigation bar is blue (the brand primary button) on every page.

The demo ticket in the hero changes event with its colour, everywhere the demo shows the event (ticket, event page card, "Create New Event" form, sales list and report): name, category, logo letters and venue all switch, and a photo of that kind of event sits behind the ticket, as a light hint on the right side only: the ticket itself is a clean solid colour, and the photo is blended so it can only lighten it (never darken), fading out before the words, so the text is always readable. The event page card's cover shows the same photo with only a light tint, so the photo is clearly visible. Light picked colours switch the text to dark.

| Colour | Event | Category | Venue | Photo | QR design |
|---|---|---|---|---|---|
| Blue (default) | Leaders Summit | Conference | Grand Hall | `summit.webp` | Square modules, square eyes |
| Ink | Midnight Soirée | Private party | The Loft | `night.webp` | Dots, round eyes |
| Green | Earth Day Run 10K | Eco run | Riverside Park | `run.webp` | Leaf modules and eyes |
| Purple | Neon Nights Live | Concert | City Arena | `concert.webp` | Diamonds, framed eyes |
| Pink (pastel, dark text) | Valentine's Brunch | Brunch party | Rose Terrace | `rooftop.webp` | Soft rounded squares |

There are five colours (no colour wheel), picked only in Backstage Pass. The hero picture has no colour dots of its own but is linked to that choice: its event card and ticket (desktop) or hero ticket (phones) change with it (name, category, logo letters, venue, colour and photo).

Every section reads in one straight line, centred: the blue label on the strip above the tear line, then the heading, then its text, then the content (pictures, grids, demos). No section puts its heading beside its content, except the hero, the closing "Get started" ticket and Security (words on the left, badges on the right), which keep their own layouts.

Sections fly in with a gentle drift (about 6% of the screen width from the side, a 2.5° tilt, alternating sides), so the motion is there without being distracting.

QR codes: the demo ticket's QR changes design with the event type (see the table), to show the QR itself is customisable, always with the TG mark in the middle and in the ticket's own colour. The API demo's delivered ticket has a small brand QR. The closing ticket has a real QR that opens the app. The review tickets have no QR or stamp, just a faint TG mark; the pricing receipt ends in a "Paid in full · Zero commission" seal.

Touch targets: the event-type swatches and the event page's cover-image dots have an invisible ring around them so each is about 40px to tap, without looking bigger.

Imagery: Use Cases and Blog use a new generated photo set (`assets/usecases/*.webp`, `assets/blog/*.webp`); Clear Wins uses code-built UI collages. The event page photos and the Launch Options art are unchanged.

### Mobile copy

Some long paragraphs have a shorter phone-only version. In the HTML these are pairs of `<span class="d-only">` (desktop) and `<span class="m-only">` (phone).

---

## Shared tokens

Used by both versions. All values live in [`css/tokens.css`](css/tokens.css).

### Brand colour (blue)

| Token | Hex | Token | Hex |
| --- | --- | --- | --- |
| `--brand-25` | `#f5faff` | `--brand-500` | `#2e90fa` |
| `--brand-50` | `#eff8ff` | `--brand-600` | `#1570ef` |
| `--brand-100` | `#d1e9ff` | `--brand-700` | `#175cd3` |
| `--brand-200` | `#b2ddff` | `--brand-800` | `#1849a9` |
| `--brand-300` | `#84caff` | `--brand-900` | `#194185` |
| `--brand-400` | `#53b1fd` | `--brand-950` | `#102a56` |

`--brand-600` is the main action colour (primary buttons); `--brand-700` is its hover and the eyebrow colour.

### Gray

| Token | Hex | Token | Hex |
| --- | --- | --- | --- |
| `--gray-25` | `#fdfdfd` | `--gray-500` | `#717680` |
| `--gray-50` | `#fafafa` | `--gray-600` | `#535862` |
| `--gray-100` | `#f5f5f5` | `--gray-700` | `#414651` |
| `--gray-200` | `#e9eaeb` | `--gray-800` | `#252b37` |
| `--gray-300` | `#d5d7da` | `--gray-900` | `#181d27` |
| `--gray-400` | `#a4a7ae` | `--gray-950` | `#0a0d12` |

### Status colours

| Token | Hex | Meaning |
| --- | --- | --- |
| `--success-50` | `#ecfdf3` | Success background |
| `--success-500` | `#17b26a` | Success |
| `--success-600` | `#079455` | Success, stronger |
| `--success-700` | `#067647` | Success text |
| `--warning-500` | `#f79009` | Warning |
| `--warning-600` | `#dc6803` | Warning, stronger |
| `--error-500` | `#f04438` | Error |
| `--error-600` | `#d92d20` | Error, stronger |

### Spacing

| Token | Value | Token | Value |
| --- | --- | --- | --- |
| `--space-xs` | 4px | `--space-4xl` | 32px |
| `--space-sm` | 6px | `--space-5xl` | 40px |
| `--space-md` | 8px | `--space-6xl` | 48px |
| `--space-lg` | 12px | `--space-7xl` | 64px |
| `--space-xl` | 16px | `--space-8xl` | 80px |
| `--space-2xl` | 20px | `--space-9xl` | 96px |
| `--space-3xl` | 24px | | |

### Radius

| Token | Value |
| --- | --- |
| `--radius-sm` | 6px |
| `--radius-md` | 8px |
| `--radius-lg` | 10px |
| `--radius-xl` | 12px |
| `--radius-2xl` | 16px |
| `--radius-full` | 9999px (pills) |
| Ticket corners | 32px desktop, 22–24px mobile |

### Shadows

| Token | Value |
| --- | --- |
| `--shadow-xs` | `0 1px 2px rgba(10,13,18,.05)` |
| `--shadow-md` | `0 4px 6px -1px rgba(10,13,18,.1), 0 2px 4px -2px rgba(10,13,18,.06)` |
| `--shadow-lg` | `0 12px 16px -4px rgba(10,13,18,.08), 0 4px 6px -2px rgba(10,13,18,.03)` |
| `--shadow-xl` | `0 20px 24px -4px rgba(10,13,18,.08), 0 8px 8px -4px rgba(10,13,18,.03)` |
| `--shadow-2xl` | `0 24px 48px -12px rgba(10,13,18,.18)` |

## Loading and offline

- **Loading screen:** every page opens with Mira (the pixel host) typing at her laptop on the desk background, no text. It's inline in each page, so it shows before anything else loads, and it fades out when the page has finished loading, or after 2.5 seconds at most.
- **Offline:** [`sw.js`](sw.js) is a small service worker. If a page can't be reached (no network or an unstable one), it shows [`offline.html`](offline.html) instead of the browser's error page: the same Mira at her laptop, with a short note on top ("Looks like your Wi-Fi took an intermission"). The loading screen itself has no text. That page reloads itself as soon as the connection is back. Everything else loads from the network as normal.

## Ticket rules

Apply to both versions.

- Every section is a ticket: rounded card, a mono uppercase stub label at the top, semicircle notches where parts join.
- The stub strip at the top of each ticket carries the section's blue heading (its eyebrow, such as "Event Page", "Use Cases", "Have a Question?"), above the dashed tear line. The heading isn't repeated below the line. It keeps the section's own shade, lighter on the blue and dark tickets. The footer strip is left empty. The blog's strip reads "Reading Room".
- **Vertical (portrait) ticket:** the dotted line, zig-zag or semicircle notches sit at the bottom, where the two parts join.
- **Horizontal (landscape) ticket:** the line or pattern sits on the right-hand side, between the main part and the stub.
- When a ticket changes orientation at a breakpoint, its tear line and notches move with it.
- Motion is turned down for visitors who ask for reduced motion.
