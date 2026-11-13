# Ticket Generator website redesign

The redesigned Ticket Generator marketing site, built around a "ticket" design language: every section is its own ticket with a stub label, notches and a tear line.

**Scope so far:** homepage and pricing page, desktop and mobile. The rest of the site follows once these two are approved.

- Live preview: https://tg-website-revamp.vercel.app
- Pricing page: https://tg-website-revamp.vercel.app/pricing

## What's in here

| Path | What it is |
| --- | --- |
| `index.html` | Homepage |
| `pricing.html` | Pricing page |
| `css/tokens.css` | Design tokens: colours, fonts, spacing, radius, shadows |
| `css/base.css` | Reset, buttons, header, shared pieces |
| `css/tickets.css` | The ticket shell every section sits in |
| `css/<section>.css` | One file per homepage section (journey, logos, numbers, usecases, trust, testimonials, faq, closing, footer) |
| `css/pricing.css` | Pricing page styles |
| `css/mobile.css` | Phone layout (768px and below), loaded last on both pages |
| `js/main.js` | Homepage and shared behaviour |
| `js/pricing.js` | Pricing calculator |
| `assets/` | Logos, photos, badges, icons |
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

## Design styles

All values live in [`css/tokens.css`](css/tokens.css) and come from the Ticket Generator design system in Figma (TG > Design System > Website).

### Fonts

| Role | Font | Weights | Used for |
| --- | --- | --- | --- |
| Body and headings | Inter | 400, 500, 600, 700 | All running text, headings, buttons |
| Mono | JetBrains Mono | 500 | Ticket stub labels, prices, counters, small data |
| Fallback | "Inter Fallback" (Arial, metric-matched) | n/a | Shown until Inter loads, so text doesn't jump |

Both fonts load from Google Fonts. Mono text uses a slashed zero and `-0.03em` letter spacing.

### Type scale

| Style | Desktop | Mobile | Weight | Letter spacing |
| --- | --- | --- | --- | --- |
| Hero title (homepage) | 40–60px, fluid, line height 1.12 | 38px | 600 | -0.02em |
| Page title (pricing) | 56 / 64px | 38 / 46px | 600 | -0.02em |
| Section heading (h2) | 36 / 44px | 30 / 38px | 600 | -0.02em |
| Step heading (h3) | 30 / 38px | 24 / 32px | 600 | n/a |
| Lede (pricing) | 20 / 30px | 17 / 26px | 400 | n/a |
| Large paragraph | 18 / 28px | 16 / 24px | 400 | n/a |
| Body | 16 / 24px | 16 / 24px | 400 | n/a |
| Eyebrow | 14 / 20px | 14 / 20px | 600 | n/a |
| Button | 14 / 20px (lg and xl: 16 / 24px) | same | 600 | n/a |
| Ticket stub label | 11px, uppercase, mono | 9.5px | 500 | 0.16em (0.12em mobile) |

Sizes are written as font size / line height.

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

### Colour roles

| Role | Token | Value |
| --- | --- | --- |
| Main text | `--text-primary` | `--gray-900` `#181d27` |
| Secondary text | `--text-secondary` | `--gray-700` `#414651` |
| Supporting text | `--text-tertiary` | `--gray-600` `#535862` |
| Quiet text | `--text-quaternary` | `--gray-500` `#717680` |
| Border | `--border-primary` | `--gray-300` `#d5d7da` |
| Light border | `--border-secondary` | `--gray-200` `#e9eaeb` |
| Surface | `--bg-primary` | `#ffffff` |
| Soft surface | `--bg-secondary` | `--gray-50` `#fafafa` |
| Page background ("desk") | `--desk` | `#e2e9f4` with a faint blue dot grid |

### Buttons

| Button | Background | Text | Hover |
| --- | --- | --- | --- |
| Primary | `--brand-600` | white | `--brand-700` |
| Dark | `--gray-900` | white | `--gray-800` |
| Secondary | white | `--text-secondary` | `--gray-50` |
| Link | none | `--text-tertiary` | `--text-primary` |

Default padding is 10px 16px with an 8px radius; `lg` is 12px 18px; `xl` is 14px 22px with a 10px radius.

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

### Layout

| Setting | Value |
| --- | --- |
| Content width | 1280px (`--container`) |
| Side gutter | 32px desktop, 16px mobile (`--gutter`) |
| Phone layout starts | 768px and below |
| Closing ticket turns portrait | 720px and below |
| Tablet adjustments | 960px and below |
| Ticket notch size | 16px desktop, 11px mobile |

## Ticket rules

- Every section is a ticket: rounded card, a mono uppercase stub label at the top, semicircle notches where parts join.
- **Vertical (portrait) ticket:** the dotted line, zig-zag or semicircle notches sit at the bottom, where the two parts join.
- **Horizontal (landscape) ticket:** the line or pattern sits on the right-hand side, between the main part and the stub.
- When a ticket changes orientation at a breakpoint, its tear line and notches move with it.

## Mobile rules

- Mobile is the main audience, so it is designed as its own layout, not a shrunken desktop.
- Sections stack as separate coloured tickets (white, brand blue, dark ink).
- Nothing should need a tap to be seen: steps and reviews play on their own and descriptions show in full. The FAQ is the one exception (one answer open, the rest open on tap).
- No sideways swipe rows and no pinned scroll animations on phones.
- Some long paragraphs have a shorter phone-only version, marked with `.m-only` / `.d-only` spans in the HTML.
- Motion is turned down for visitors who ask for reduced motion.
