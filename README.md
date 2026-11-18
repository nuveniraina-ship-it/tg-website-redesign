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
| Navigation bar | Floating ticket-shaped bar, same on every page, with Log In and Sign Up on the right |
| Hero and five steps | A landscape ticket with no strip across the top and 24px corners. A dashed tear line runs the full height between the copy (the main part, wider) and the product picture (the stub, narrower; 1.3 : 1), with a notch at the top and bottom edges. The closing "Ready to issue" card runs the full width at the bottom; the vertical tear line stops just above it. The copy is 1.65 times as wide as the picture, and the picture's box is only as tall as the picture. "First 10 tickets free" and "No credit card required" sit under the Create Your Event button. A "Try it with your brand colour" bar sits in the picture's top-left corner: five preset colours plus a colour-wheel dot that opens the device's colour picker, and the whole ticket, cards and progress bars take that colour. The picture's box is taller than the picture (560 : 830), so the demo has room above and below it, with a clear gap (about 60px) under the "Try it" bar. The demo has no Templates card; colours come from the "Try it" bar only. The picture is pinned while the five steps scroll past and change it; colour swatches recolour the ticket |
| Numbers | Stats beside a printed receipt; the receipt ends in a QR code that opens the pricing page (scan it, or click or tap it) |
| Event page | The Ticket Generator event page as guests see it (dark theme, three cover images that slide every 3.5 seconds with arrows on either side and dots, Live badge, date, time, venue, "Register Now", lineup, event guide, share), in a browser window beside the copy. Copied from the product's demo page at `tg-full-revamp.vercel.app/p/summer-music-festival`. "Register Now" opens the registration step inside the window (ticket choice, sample details, Register, then a confirmation) with a "Back to event" button |
| Launch options | "What kind of event are you planning?": a strip of three tickets joined edge to edge (Direct Ticketing, Free Registrations, Paid Registrations) with perforations and notches between them. Each has the live site's illustration, its name, a line of text, a two-step "how it works", and "Get Started" on its stub (opens sign-up). On hover the left ticket tilts out to the left, the middle one lifts a little and the right one tilts out to the right |
| Clear wins | "Easy event ticketing from setup to scan": five landscape tickets that stack on top of each other as you scroll, each one 30px lower than the last. The stack stops when the last ticket lands, and then all five scroll away together (the last one never slides over the others). The text is the main part (70%) and the live site's illustration sits on the narrow stub (30%), where a ticket's QR code would be |
| Features | "Core Strengths": the live homepage's nine features as portrait tickets, three to a row. Icon and title on top, a tear line with side notches, then the text. All nine are the same size (JS sets every ticket to the tallest one's height). As you scroll, each row of three stacks over the row above, 34px lower |
| Use cases | Section pins. The pinned box is only as tall as the heading, rail and pile, and sits centred under the header, so there is no empty band above or below it; the section ends right after it. One tilted ticket is dealt onto a pile per scroll step, with no zoom. The rail on the left has five equal lines; the line of the use case on show is fully lit, including when one is clicked |
| Security | Its own ticket. Faint dotted lines start where the text ends and run into the first seal, across the gaps between the seals and in an arc over them; small lights travel along them. They never pass under any words. The "Encrypted, access-controlled, audited" pill is a button: clicking it draws a very light lock behind the seals, open while it draws, and the shackle snaps shut once it's complete |
| API | Its own ticket after Security ("Ticket Generator API" on its strip): heading and copy, then a live demo: registration list, API, ticket, three delivery channels. Clicking the button or the logo sends a registration. A small "Try it: click the logo in the middle" pill sits in the demo's top-left corner |
| Testimonials | Curved carousel, not pinned: the middle review faces you and its neighbours angle in from the sides. Like the customer logos it moves on by itself, one review every 2.5 seconds while on screen, and pauses while the mouse rests on it. Previous and next arrows sit under it; you can also drag it, click a side review or use the arrow keys |
| FAQ | "Have a Question?" in the strip. One answer open, the rest open on click. The help box has See All FAQs and Contact us |
| Blog | Three posts, or the section is removed. Never fewer than three |
| Closing ticket | Landscape "admission ticket" with Sign Up and Book a Demo |
| Pricing: estimator | A landscape ticket like the homepage hero: headline, ticket count field and credit packs on the main part; the sticky price receipt is the stub on the right, past the tear line. Under its "Sign up to buy" button sit "First 10 tickets free" and "No credit card required" with check marks, like the homepage hero. "Create your own event" in the event page section opens the app's sign-up |
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
| Navigation bar | Floating bar with logo and menu button, same on every page |
| Hero | Its own white ticket: headline, button, then the picture as the stub: one tidy portrait event ticket (blue top with the event name, date, time and venue, a tear line with side notches, then the QR code, ticket number and a "Valid ticket" badge). Nothing overlaps |
| Five steps | Its own white ticket (like every other section) with five tabs, ending in a light full-width band ("Ready to issue your first ticket?" with Book a Demo and Create Your Event). Steps change by themselves every 2 seconds; touching the picture holds the step and it resumes 3 seconds after the last touch. Under the picture, a clean "Try a colour" row with five colour dots and the colour wheel (not on top of the picture) |
| Numbers | Three stats in one row, compact receipt |
| Event page | The copy, then the event page in its phone layout: cover, details, full-width "Register Now", lineup in a 2 × 2 grid, guide and share side by side. "Register Now" opens the registration step inside the frame (ticket choice, sample name and email, Register), with a "Back to event" button; Register shows a "You're registered" confirmation. Same on desktop |
| Launch options | Three separate tickets that stack as you scroll (each 24px lower than the last), 14px apart before they stack, no tilting: illustration across the top, a tear line, the words, then "Get Started" |
| Our customers | Smaller logo tickets (128 × 60) in the moving strip, with little space above and below |
| Clear wins | Five stacking portrait tickets, 14px apart, each 24px lower than the last once stacked: the words on the main part, then a tear line with side notches, then the illustration on a smaller bottom stub |
| Features | Nine cards (icon, heading, three lines of text), 14px apart, that stack as you scroll, each 22px lower than the last |
| Use cases | Five full tickets (photo on top, tear line, heading, full text, "Learn more"), 14px apart, that stack as you scroll with 26px of each one showing. No progress bar and no "Admit one" label |
| Security | Seals show their names only, with clear room above them for the lines: lines and lights into and between the seals, small hops over each gap, and a few loose lines in the space above (never under words). Tapping the pill draws a small lock behind the middle seal, which then locks. The ticket is long enough that nothing is cut |
| API | Its own ticket. The demo shows three registrations, runs by itself, and tapping the logo sends another; a small "Try it: tap the logo" pill sits in its top-left corner |
| Testimonials | Same curved carousel as desktop: moves on by itself every 2.5 seconds, with previous and next arrows under it. Pauses for 5 seconds after a swipe and 8 seconds after an arrow tap |
| FAQ | One answer open, the rest open on tap. The help box is a small card: icon, "Didn't find your query?", one line of text, then See All FAQs and Contact us side by side |
| Blog | Three slim rows, or the section is removed |
| Footer | The strip above the tear line reads "Keep exploring", the same height as every other strip. Compact link columns (Product, Resources with Affiliate Program, Comparison) and a row of Trycon product tiles |
| Pricing: top | Two tickets: the blue headline ticket with three figures, then the white "Estimate" ticket with the calculator. Under "Sign up to buy", "First 10 tickets free" and "No credit card required" sit one under the other, left-aligned, as a centred group |
| Pricing: features | The blue "1 credit = 1 ticket" ticket, then ten portrait tickets (icon and heading, tear line with side notches, three lines of text), 14px apart, that stack on scroll, each 20px lower than the last |
| Coming soon | Same terminal and printing ticket as desktop, sized to the screen |

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
