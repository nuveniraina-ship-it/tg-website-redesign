# Review notes: round after the 20 Nov feedback

Live: https://tg-website-revamp.vercel.app (homepage and pricing, desktop and mobile)

## What I changed and why

| # | Feedback | What changed | Why this way |
|---|---|---|---|
| 1 | Logo cycling looks broken | Back to the original logo on every page. It now links to the homepage, and the separate "Homepage" nav item is gone. The two trial SVGs are removed from the repo, and any saved choice is cleared from visitors' browsers. | The logo is the standard way home. A nav item that only repeats it adds noise. |
| 2 | Picker says "pick a colour" | The label now says "Try it: pick your event type" ("Pick your event type" on phones). Each swatch is named (Concert, Night show, Fun run, Conference, Valentine's concert), and the picked type shows beside the swatches. | A new label alone still leaves five unlabelled dots. Naming the current choice makes the dot-to-event link clear on the first click. |
| 4 | Plain QR codes everywhere | **Kept**, restyled as a brand QR (round dots, soft finder eyes, TG mark in the centre, in the ticket's colour), in two places: the demo ticket (it is scanned in step 4) and the ticket the API demo delivers. **Removed** from the closing CTA ticket, the review tickets and the pricing receipt. These get a brand "admit seal" instead: a ring of mono text around the TG mark. | Where scanning isn't the story, the stub still needs something that says *ticket*. An admission stamp does that without saying "scan me". It also gives us one reusable brand device. |
| 5 | "See pricing" far from its copy | The link now sits directly under the pricing line in the centred head. The stats were sitting low under an empty gap, so they now stack as three landscape stubs beside the receipt. | The gap came from last round's switch to centred heads: the copy moved, but the link and stats kept their old spacing. |
| 6 | CTA buttons different heights | Both closing buttons measure 52px. Every button group on both pages is now checked by a script at 1440, 1024 and 375px; none differ. | The two buttons only *looked* different because one is filled with a shadow and the other is outlined. The script makes this a check, not an eyeball. |
| 7 | Mid-page CTA doesn't read as a CTA | "Ready to issue your first ticket?" is now a full-width blue band across the bottom of the Get Started ticket, with a dashed tear line: the ticket's tear-off stub. It has a white primary button and an outlined secondary. On phones it is the same band. | A band between two tickets would break the "stack of tickets" language. Making it the ticket's own stub keeps the system and still reads as a band. |
| 8 | FAQ help sends you to FAQs | The block now reads "Still have a question?" / "Talk to our team…", with **Contact us** first and Book a Demo second. "See All FAQs" is removed. Both pages. | Someone who reaches the end of the FAQs needs a person, not more FAQs. |
| 3 | No new imagery | **Not done this round.** See "Open" below. | |

## Issues I found and fixed in my own QA

I checked both pages at 1440px, 1024px and 375px. I took screenshots section by section and ran a script for button heights, horizontal overflow, broken images, empty links, unnamed buttons and tap-target size.

1. **"Marathon" on a 10K.** The green event is "City Run 10K", but its category said MARATHON. It now says Fun run, matching the new picker label.
2. **Stats stranded under a gap** (pricing section, desktop). Fixed as described in #5.
3. **Dangling "•" separators on phones.** "First 10 tickets free • Free account •" wrapped with a bullet at the end of the line, in both the mid and closing CTAs. Phones now show two clean lines.
4. **Tap targets too small.** The event-type swatches were 22px and the event page's cover-image dots 7px. Each now has an invisible ring of about 40px, so they're easy to tap and look the same.
5. **Preview cache.** Old CSS was served once during testing. Every check after that ran on a cache-busted reload, so the screenshots match the deployed files.

## Where I explored alternatives

- **Event-type picker:** I considered full text chips (dot + name × 5). They fit on desktop but cover too much of the ticket picture, and they don't fit at 375px. I chose named swatches plus the current type named beside them (on phones the ticket itself shows the type).
- **Replacing decorative QRs:**
  - Considered: a barcode (same problem as a QR), seat/row details (clutter on a small stub), or leaving the stub empty (doesn't read as a ticket).
  - Chose: the admit seal, one component used in three places.
- **Mid-page CTA:**
  - Considered: a full-viewport band between sections (breaks the ticket stack) or a stronger card inside the ticket (still reads as a card).
  - Chose: the ticket's own full-width tear-off stub.
- **FAQ help:** considered "Contact us" alone. I added Book a Demo as the second action because it's the other human route and gives the two buttons a balanced pair.
- **Imagery:** see below.

## Open

**New imagery (#3).** The plan is a single photographic series in one light, airy grade with soft blue accents. Real moments from each event type, plus people with their tickets, wristbands or phones at the door. No text or logos in the images.

| Area | Images planned |
|---|---|
| Hero event photos | 5 (one per event type) |
| Event page | 3 banners, 4 lineup portraits |
| Launch Options | 3 (one style for all three cards; today two are SVG and one is a photo) |
| Clear Wins | 5 scenes |

Prompts are written. Generation through Codex isn't available on our current plan. The options are to generate with our Magnific credits, or for design to supply a shoot or stock set.

**Judgement call to confirm:** the coming-soon page still has a real, scannable QR code that opens the homepage. I kept it because scanning there does something: it moves you to your phone.

---

# Round 2: Nuveni's 11 points (20 Nov)

## What changed and why

| # | Point | What changed | Why this way |
|---|---|---|---|
| 1 | Event names; pink too strong; "Try it" bar wraps | Each colour has a new event and its own type label. The picked type sits in a fixed-width slot and the bar never wraps; on phones only the label and swatches show. | Each colour now reads as a kind of event, not a theme. |
| 2 | "Ready to issue" stuck inside Get Started; rename Get Started | The CTA is now its own blue ticket, labelled "Your turn", straight after the steps. The steps ticket is renamed "Backstage Pass". | Its own ticket reads as a CTA but stays in the ticket-stack language. "Backstage Pass" is ticket vocabulary and hints at "see how it works behind the scenes". |
| 3 | Pricing: empty left side | Stats and receipt are now one centred group (500 + 400px, 64px gap). | The old grid stretched to full width, which left a dead band on the left. |
| 4 | Use cases: shadow darkens, line visible | Only the top ticket casts a full shadow; the ones underneath barely cast any. Tickets waiting below the pile are hidden until dealt. | Five stacked drop-shadows added up to a dark smudge. The "line" was the section's clip edge cutting through the next ticket on its way in. |
| 5 | Security: remove lock; straight, light lines | Lock removed. Two very faint parallel lines run from the text into the first badge, and one straight line crosses each gap between badges. Small square blocks (encrypted data) travel along them. The pill is now a plain label. | Straight lines read as a data path through the protection layers. Square blocks suggest data that is packaged, not open. |
| 6 | Registration not working | It did open, but into a tall, mostly empty dark frame, with the page left scrolled to the bottom. To a user that looked like nothing happened. Now the step keeps the event cover on top, is capped in height, and scrolls into view below the header. The confirmation has a "Back to event page" button. Tested with real clicks at 1440 and 375px. | |
| 7 | Testimonial stamp | The stamp is removed. A faint grey TG mark sits in each ticket's top-right corner. | |
| 8 | FAQ help box | It is now its own small ticket, labelled "Need a hand?", after the FAQ on both pages, with everything centred. | |
| 9 | Closing ticket | A real, scannable QR code that opens the app, with "tg-full-revamp.vercel.app →" under it. The QR, the link, a click or a scan all go to the app. Rounded modules and eyes, TG mark in the centre, error correction H. | |
| 10 | Same QR, only the colour changed | Each event type now has its own QR design (module shape + eye shape), so switching type shows the QR is customisable too. | |
| 11 | Ticket text not readable | The photo is now only a hint on the right. The words sit on a near-solid wash of the ticket colour (94% → 88% → 62%), with a soft text shadow on the light-on-dark types. Pastel pink uses dark-rose text. | |

**New events (point 1)**

| Colour | Event | Type label |
|---|---|---|
| Blue (formal) | Leaders Summit | Conference |
| Black | Midnight Soirée | Private party |
| Green | Earth Day Run 10K | Eco run |
| Purple | Neon Nights Live | Concert |
| Pink (pastel, dark-rose text) | Valentine's Brunch | Brunch party |

**QR designs per event type (point 10)**

| Event type | QR design |
|---|---|
| Conference | Square, formal |
| Private party | Dots |
| Eco run | Leaf |
| Concert | Diamonds |
| Valentine's brunch | Soft rounded |

## Issues I found and fixed in QA

1. **Pricing layout wiped while editing.** Cleaning up the old CTA band also deleted the pricing stats layout and the tap-target rules. Caught on the desktop pass; both restored.
2. **Phone picker text cut off.** The event-type name squeezed "Pick your event type" down to "F…". It is now hidden on phones.
3. **Closing ticket QR not scanning.** My first styled QR (gapped rounded dots, very round eyes) didn't decode. I tested module and eye shapes against a strict decoder and kept the most rounded style that still decodes. The final QR was also read with the browser's barcode decoder at 600, 200 and 120px, including the logo.
4. **Serial number clutter.** "No. 000001" on the closing stub competed with the QR and link, so it's hidden.

## Alternatives considered

- **Mid-page CTA:**
  - Considered: a section-wide band with no ticket shape.
  - Chose: its own ticket, because it matches every other section and still stands out in blue.
- **Pricing:** I first stacked the stats beside the receipt but left the column right-aligned to it, which still left space on the left. A centred two-column group fixed it.
- **QR per event:** a caption naming each style ("QR style: Dots") was tempting. I kept "Scan at entry", because the ticket also plays the Scan step.
- **Security motion:**
  - Considered: glowing dots (too busy) and dashed flowing lines (read as "loading").
  - Chose: small square blocks.

### Follow-up: step tickets still looked dark
The near-solid wash wasn't enough: the photo's dark parts (crowd silhouettes) still showed through behind the venue, serial and small labels. Now the ticket is a clean solid colour, and the photo sits only on the right as a faint layer blended with "screen", so it can only lighten, never darken. It fades out before the text. Pastel pink uses a softer blend. I checked every event type on phone and desktop.

---

# Round 3 (20 Nov)

| Point | What changed |
|---|---|
| "Ready to issue" looked like a ticket | It's now a plain blue band: same width and rounding as the sections, but no strip, notches or tear line. |
| Pricing still had empty space | The receipt is centred, and the three stats float beside it as plain white cards that just touch its edges: two on the left, one on the right, slightly tilted and gently bobbing. "See pricing →" sits right under the text. **Considered:** points under the text, then the link, then the receipt. **Chose:** the floating layout, because it fills the width and makes the receipt the centrepiece. |
| Security felt busy | No lines or dots; it's static. The status is now a quiet grey caption with a small lock, not a pill, so it doesn't look clickable. |
| API demo not working | It had been stuck since the "View request" panel was removed in an earlier round: the script still wrote the request's name and email into that panel, crashed on the first registration and never sent a ticket. That write is now skipped when the panel isn't there. Checked: it runs by itself and the logo click sends more, at 1440 and 375px. |
| "Still have a question?" looked like a ticket | It's now a plain full-width white box with the heading, text and two buttons centred. |

**QA lesson:** the API crash was in the browser console for several rounds. My checks were visual only. From now on, every QA pass also reads the console and runs each interactive demo (picker, registration, API, carousel) at least once.

### Follow-up: event type cut off in the "Try it" bar
On narrower pictures, the picked type was clipped at the bar's right edge ("Conferenc…"). It now sits in its own small box under the bar ("Event type: Conference"), so the bar holds only the prompt and swatches. Checked with the longest name ("Valentine's brunch") at 1440 and 1024px. On phones it stays hidden: the row there is full width and the ticket itself shows the type.

---

# Round 4 (23 Nov): hero motion, new imagery

## Hero: "keep the image, make it motion-y"
Done in code, with no video and no credits:
- **Floating tickets.** Small ticket shapes (with notched sides) and dots drift up behind the picture in the picked event's colour.
- **Photo.** The event photo on the event-page card slowly pans, and a soft stage light sweeps across it.
- **Ticket.** It floats gently, and a glossy sheen passes over it every few seconds.
- **Live numbers.** Registrations count up (412 → ~496, then loop), the progress bar follows, a new buyer pops into "Ticket sold / VIP Pass sold", and the check-in chip moves to the next ticket number and gate.
- **Phones.** The hero ticket floats over the same floating tickets, with the same sheen.

Everything stops for visitors with reduced motion turned on, and the counter pauses when the hero is off screen or the tab is hidden.

**Alternatives considered:**
- AI video loops of each event photo (about 1,600 credits). Heavier to load, and the motion would sit behind a picture that is mostly covered by cards.
- Code motion that tells the product story (tickets selling and scanning live). Chosen.

**QA:**
- Checked at 1440, 1024 and 375 px, and switched to purple: the particles follow the colour.
- Console clean; registration and API demos still run.

**Fixes found in QA:**
- The counter first ran on the live stage instead of the hero's still copy. It now targets the hero picture.
- Particles first travelled by viewport height, so they crossed the panel too fast and were barely visible. They now travel by the panel's own height and are a bit larger.

## New imagery
One sample made first, for style approval: the event-page festival banner (Magnific One, 180 credits). The rest of the set waits for approval of this look.

## Round 4, part 2 (23 Nov): app hero, new imagery, two launch options, copy synced to the live site

| Point | What changed | Why this way |
|---|---|---|
| Hero like the app screenshot, but editable | The last round's motion is replaced. The hero is now one centred column: copy, then the app (browser window: Guest Tickets screen with stats, guest list and check-ins chart; a "Ticket sent via…" toast; a validator phone). The ticket in front is **editable**: click the event name, date, venue or guest, or pick one of five colours. Every edit flows into the breadcrumb, the guest list, the phone and both QR codes. The app runs live (tickets go out by Email/SMS/WhatsApp, guests check in, counts rise) and pauses on hover or while you edit, with the status pill saying so. On phones the window keeps stats and three guest rows, and the ticket sits under it. | Like a free ticket generator: the visitor makes "their" ticket in the first screen, and sees where it goes next (sent, scanned). Built in code, so it's crisp, light and editable, with no video. |
| New images: Clear Wins | Five code-built product-UI collages (inline SVG) in the TG illustration house style: ticket design → send via; payment gateway → payout with $0.00 commission; ticket types (stacked, fading); live chart, check-in split and export; a zero-commission receipt. Desktop gives the art half of each ticket so its UI labels stay legible. | The TG illustration style says feature visuals are built from UI parts, not photos. Collages also explain the feature, where a photo can't. |
| New images: Use Cases, Blog | Eight new photos (Magnific One, about 1,440 credits): conference, charity gala, festival, training workshop, local football; organiser backstage, QR scan at the door, printed tickets. No text or logos in any of them. | Same light, airy, candid look as the approved sample. |
| Launch options: 3 → 2 cards | Direct Ticketing, and **Free & Paid Registrations** (one event page: free sign-up or paid tickets). Grid is two columns, centred. | As asked: free and paid are the same flow with or without a price. |
| Copy same as the live site | A content pass compared both pages with ticket-generator.com line by line. Hero title, lede and buttons; step names and texts; Core Strengths; Use Cases heading; FAQ (two added: "I am organizing an event…" and "How do ticket add-ons work?"); security wording; footer; pricing packs and labels now match. **Prices changed:** $6 / $50 / $400 / $2,500 for 10 / 100 / 1,000 / 10,000 credits (we had $10 / $50 / $500 / $3,000); the estimator uses the same values. The mid-page band now says "Ready to try event ticket generator?" with "Try Ticket Generator". The hero gained "Book a Demo". | |

**Kept different from the live site on purpose** (to confirm):
- **Labels.** "Backstage Pass" (live: "Get Started") and "Reading Room" (live: "Our Blogs") were your renames.
- **"Still have a question?" box.** It leads with Contact us, per the manager's feedback. The live site says "Didn't find your query?" with "See All FAQs".
- **Hero chip.** "1,000,000+ tickets generated" isn't on the live hero.
- **Step 5 "Report".** The live site has no report step.
- **Event page section.** Not on the live homepage.
- **Live prices.** Read from the US-dollar page. The site shows Indian visitors ₹ prices that aren't a straight conversion.

**QA:**
- Checked at 1440, 1024 and 375 px.
- No horizontal overflow, no broken images, equal button heights (hero 52/52), and the console is clean.
- Picker, registration and API demos all run.
- Editing tested by typing into the ticket: the breadcrumb and phone update.
- Pricing estimate checked: 10 + 1,000 credits = $406.

**Fixes found in QA:**
- **Guest names cut off.** The window was too narrow, so guest names were truncated; it's wider now.
- **Phone ticket name.** The event name was cut off on phones; there's more room now.
- **Clear Wins legibility.** The collages were illegible in the narrow stub, so the split is now 50/50.
- **Phone tear line.** On phones the tear line cut through the collage; the stub is now 212px and the line moved with it.
- **Touch wording.** On touch screens "hover to pause" made no sense; it now says "tap the ticket to edit".
- **Stamp overlap.** A connector dot sat on the "Zero commission" stamp; that arrow is removed.

## Round 5 (23 Nov)

| Point | What changed | Why this way |
|---|---|---|
| Hero layout as before, with the new picture | The landscape hero ticket is back: copy on the left, the picture on the stub past the tear line, on the dotted panel. The picture is the live app, recomposed for the narrower stub: the window shows the stats and guest list, the phone sits to the right, the toast at the top and the editable ticket in front. It is laid out at 620px and scaled to fit, so it stays sharp and editable at every desktop width. | The earlier layout was right; only the picture needed to change. Scaling one fixed composition keeps every overlap exactly placed instead of re-flowing. |
| "Pick your event type" and colours were distracting | Replaced with one quiet menu in the picture's corner: "Preview as: Conference ⌄". There are no coloured dots and no separate event-type box. On phones it's a full-width row. | A menu shows the choice exists without asking for attention; the colour still changes with the event type. |
| Event page: new design and images | It's now a light page for Riverside Music Festival, the same event as the hero. The cover slides are designed posters: duotone cut-out performers on blue, orange and violet fields, with the name set large and RIVERSIDE outlined behind. The lineup is duotone cut-outs on colour discs. Phones swipe or use the dots; there are no arrows over the title. | One art direction ("festival print run") makes the images look made, not found. Reusing the hero's event ties the page together. |
| Launch options broken and the wrong layout | Fixed the leftover "Payments go to your account / Get Started" under the cards (a fragment of the old third card). The section is now two separate landscape tickets: copy and Get Started on the main part, the illustration on the stub. | |
| Clear Wins: interactive, polished, subtle | Each collage has one small interaction and a quiet reveal: (1) click a template to recolour the ticket, with send ticks landing in turn; (2) choose a payment gateway, while the payout counts up; (3) hover a ticket type to lift it; (4) the line draws in, with each day's count on hover; (5) the receipt lines tick in, then the stamp lands. No motion with reduced motion. | |
| Blog images looked AI or stock | Designed covers in the same direction as the event posters: duotone cut-out studio portraits on a colour field, with the post's keyword (EVENTS, ENTRY, PRINT) set outlined, filled, outlined. The words slide apart on hover. | The old covers worked because they were art-directed (cut-out person, type behind). This follows that thinking in the new palette. |

**Images used:**
- Ten studio portraits, about 1,800 credits plus 30 for background removal. One (saxophonist, open shirt) was left out.
- Each is cut out and graded the same way: navy shadows, paper-white highlights.

**QA:**
- Checked at 1440, 1024 and 375 px.
- No overflow, no broken images, equal button heights, clean console.
- Demos all run:
  - "Preview as" menu: switches the event type.
  - Registration: open, register, back to the page.
  - API demo.
  - Hero editing: initials, phone and QR follow.
  - Template click recolours the ticket.

**Fixes found in QA:**
- **Hero stub.** The stub app was crowded (the phone covered a stat, the name was cut off, the toast overlapped the status pill), so it was recomposed.
- **Poster arrows on phones.** The slider arrows covered the poster titles; they're hidden there now.
- **Launch art.** The illustrations were faint on the stub; they now sit on a white card.

### Follow-up: simpler hero picture
As asked, the hero app now shows three guest rows. The validator phone, the "Try it: edit the ticket" row with its colour dots, and the "Live demo / Paused" pill are removed. The window now spans the stub, with the check-ins chart beside the guest list and the toast on its top edge. The ticket is still editable by clicking its text. Checked at 1440, 1024 and 375px, with a clean console.

## Round 6 (23 Nov)

| Point | What changed | Why this way |
|---|---|---|
| Launch options don't feel right | Two **portrait** tickets side by side. On top of each, a small product scene in the hero's style replaces the old faint illustrations: (1) a guest list sending tickets to Email, SMS and WhatsApp; (2) a Riverside event page with a working **Free / Paid** switch, which changes the price, the button and the payout note. Below a tear line: number, title, text, two steps, Get Started. | The landscape shape squeezed the copy, and the old art didn't match anything around it. The switch shows the merged "Free & Paid" card's point in one click. |
| Clear Wins images not good enough | All five visuals are rebuilt in HTML, as real UI rather than drawn shapes, with the same cards, type and colours as the hero app. They're laid out at a fixed size and scaled to fit. The interactions stay: template recolours the ticket; gateway selection with the payout counting up; ticket types pull out on hover; the chart draws in, with each day on hover; the receipt ticks in, then the stamp lands. | The SVG drawings read as illustrations; these read as the product. |
| Blog: outlined text doesn't look nice | No outlines anywhere: the keyword rows are now soft tone-on-tone fills, with the middle row in white. The event page posters' RIVERSIDE word is tone-on-tone too. | |

**QA:**
- Checked at 1440, 1024 and 375 px.
- No overflow, no broken images, equal button heights, clean console.
- Demos and interactions all run: registration, "Preview as" menu, gateway pick, template recolour and the Free / Paid switch.

**Fixes found in QA:**
- **Lost layout rule.** A cleanup removed the 50/50 Clear Wins split, which made the scenes tiny. Restored.
- **Receipt scene.** Its heading wrapped and the zigzag edge cut off the last line; both fixed.
- **Launch guest list on phones.** It touched the tear line, so the scene got more height.

### Follow-up: hero ticket and guest rows
- **Ticket.** It no longer gets cut off at the panel's edge: it hangs out past the panel at the bottom-left, so it reads as something you can pick up and edit. It also sits lower, overlapping only the window's bottom edge, which leaves the window less cluttered.
- **QR code.** The ticket's QR has no TG mark in the middle now; it's a plain code. The helper still adds the mark wherever else it's used.
- **Guest rows.** A row is green only while that guest is checked in. Before, a row stayed green after switching back to "Sent".
- **Checked:** 1440 and 1024 px, clean console.

### Follow-up: launch ticket notches and buttons
The notches at the tear line were covered by the scene panel's tinted background, so they read as bumps. The panel now has the same half-circle cuts. Both "Get Started" buttons are the solid blue primary button used everywhere else.

## Round 7 (23 Nov): hero in the style of the reference

| What | How it's done |
|---|---|
| Layout | Centred copy over a light photo, as in the reference. The photo is a new image of a festival lawn at dawn, with a distant stage and tents (about 180 credits). It fades to white behind the headline and is lightened at the bottom so the hero stays airy. |
| Centrepiece | A frosted-glass panel with three live numbers, each with a small chart: Tickets sold, Checked in, Ticket revenue. The first two tick up while the page is open. |
| Floating pieces | A round ticket icon, a tilted "Sales by day" bar card, a "Commission $0.00" chip, and the editable Riverside ticket in brand blue in the spot where the reference has its wallet card. They drift slightly, with no motion for reduced-motion users. |
| Kept from before | The real-site copy and both buttons. The ticket is still editable, and its QR still has no TG mark. The buttons stay brand blue rather than the reference's black. |
| Phones | The same photo behind the hero card. The panel's numbers become rows (number on the left, chart on the right), with the ticket under them. The floating icon, chart card and chip are left out to keep it calm. |

**Adapted, not copied:** the reference is a finance product. Its layout and feel are borrowed, but every number, card and label is Ticket Generator's own.

**QA:**
- Checked at 1440, 1024 and 375 px: no overflow, clean console, and the numbers tick up.

**Fixes found in QA:**
- The bar card covered the first number. Moved down.
- The ticket covered the "Ticket revenue" label. Lifted to the panel's corner.
- The ticket name was cut off. Wider ticket, slightly smaller type.
- At 1024 px the bar card ran past the hero's bottom edge. The hero is taller there now.

## Round 8 (23 Nov): full-width hero, 24 ticket designs, designed QR codes, real interactions

| Point | What changed | Why this way |
|---|---|---|
| Hero should be full width | It now runs edge to edge (no card, no rounded corners) and slides up under the floating nav. The festival-lawn photo fills the whole width. Phones too. | |
| Something interactive, not just floating cards | The floating cards are gone. Instead: **tap the QR to scan the ticket** (a green laser sweeps, an "Admitted" stamp lands, the guest appears checked in at the top of the list, the Checked in count goes up and a toast confirms it). **Scan again** and entry is refused ("Already scanned"), which shows fraud protection without saying it. **New design** flips the ticket to another design. The ticket tilts with the cursor. While nobody is interacting, new tickets keep arriving in the guest list. | Each interaction demonstrates a real feature: scanning, duplicate protection, design freedom, automatic sending. |
| QR code should be designed | Every design has its own QR: module shape (square, dots, rounded, diamonds, leaves), eye shape (square, circle, rounded, leaf, framed), its own colours, and the event's initials in the middle. They are **real codes**, error correction H, that open the app. All 24 were decoded with the browser's barcode reader. | QR codes are the product, so the hero shows they can be on-brand and still scan. |
| 20+ ticket designs, a new one on every refresh | 24 designs (`js/ticket-designs.js`): music festival, concert, conference, private party, eco run, Valentine's brunch, comic con, jazz, pitch night, charity gala, food festival, film premiere, art fair, tech expo, yoga retreat, marathon, Diwali market, kids' science day, wine & paint, Halloween, graduation ball, esports, book launch, ice skating. Each has its own colours, gradient, pattern (waves, grid, sunburst, halftone, mandala, film strip, snow, and more), typeface (Inter, Fraunces, Space Grotesk or JetBrains Mono) and QR style. A visit never shows the same design as the last one. The event name and guest stay editable. | |
| Dashboard looked technical, not like TG | The panel is now the TG app's Guest Tickets screen, as in the app screenshot shared earlier: breadcrumb with the event's name, the Event Details / Ticket Design / Event Page / Guest Tickets / Analytics tabs, Tickets generated / Checked in / Platform commission, and the guest list with delivery channel and status. I couldn't open the live dashboard (it needs a sign-in), so it follows that screenshot. | |

**QA:**
- Checked at 1440, 1024 and 375 px, with a clean console.
- All 24 QR codes decode.
- Scan, double-scan refusal, new design, refresh-to-a-different-design and the live list all work.

**Fixes found in QA:**
- **Long names.** Long event names were cut off; they now shrink to fit, and re-fit once the display fonts load.
- **Long venues.** Three venues were too long and are shortened.
- **App cut off at the bottom.** The app window ran past the hero's bottom at 1024 px, so the stage is taller there.

### Follow-up: the app's tabs work
The five tabs in the hero app are real buttons. The breadcrumb follows the open tab, and every tab keeps the same height so the window never jumps.
- **Event Details:** the current ticket's event name, status (Published), date and time, venue, category and ticket types.
- **Ticket Design:** template thumbnails (the current design plus four others). Click one and the hero ticket flips to it. It also lists the design's colours, QR style (module and eye shape) and centre logo.
- **Event Page:** a mini event page in the ticket's colours with a live "registered" count. "Register now" sends a ticket: the count rises, a row appears in Guest Tickets and a toast confirms it.
- **Guest Tickets:** the live list, as before.
- **Analytics:** ticket sales by day (hover a bar for its number), the check-in rate and the top channel.

On phones the tabs scroll sideways, and the ticket sits just below the app so no pane content is hidden. Checked at 1440 and 375 px with a clean console; every tab, the template swap and Register now were clicked and confirmed.

### Follow-up: ticket placement and cursor glow
- **Ticket placement.** The ticket covered the guest list's "Live" label. The app now takes the left 60% and the ticket sits beside it, lower down, with a clear gap at 1440 and 1024 px.
- **Cursor glow.** A soft, blurred blue glow follows the cursor around the hero. It trails slightly behind, fades in on entry and out on leaving. It's for mouse users only, sits behind the content and doesn't run with reduced motion.

### Follow-up: one event across the page, softer glow, tighter steps
- **One event, one design, three sections.** The visit's event is picked once, never the same as last time. The hero ticket, the Backstage Pass picture and the Event Page section all show it.
  - **Backstage Pass:** the ticket and cards use the design's colours, pattern, typeface and designed QR, with the same name, category, initials and venue.
  - **Event Page:** the page title, link, date, time and venue match. The cover posters use the design's colours with the event name. Music events show the performer cut-outs and a "Lineup"; other events show the organiser cut-outs and "Hosts".
  - **Switching:** "New design" or a template in the hero changes all three at once, on phones too.
- **Picker removed.** The "Preview as: Conference" menu is gone.
- **Cursor glow.** It's now a soft, pale light (low opacity, more blur) instead of a bright blue spot.
- **Backstage Pass spacing.** The five steps sit closer together, with each step's height and padding reduced.
- **Checked:** 1440 and 375 px, clean console. New design was confirmed to update all three sections.

## Round 9 (26 Nov): every visual is new

**Audit (both pages):** every picture was checked against what the old site used.
- **Already new from this redesign:** hero photo and app, the 24 ticket designs and their QR codes, Backstage Pass picture, event page posters and lineup, launch options scenes, Clear Wins scenes, use-case photos, blog covers, pricing receipt.
- **Kept on purpose because they're real, and generating them would mislead:** customer logos, the testimonial headshots of real customers, the ISO/GDPR/SOC 2 certificate seals, the App Store/Google Play badges and the partner logos in the footer.
- **Replaced this round:**
  - **New 3D icon set** (`assets/icons3d/`): eleven icons in one family, soft matte clay in brand blue and white, generated with Magnific One. The first icon set the style and every other one used it as the style reference. Event page (megaphone), ticket design, seating, box office, sending, QR validation, analytics, add-ons, API, support, security.
    - **Core Strengths:** all nine stock line icons replaced with the 3D set, larger, lifting slightly on hover.
    - **Pricing feature cards:** all ten replaced (security, design, validation, seating, on-ground sales, event page, delivery, analytics, support, API).
  - **Security section:** a new 3D illustration of a shield and padlock guarding a QR ticket, floating above the certificate seals.
- **Cleanup:** the old launch-option illustrations are deleted from the repo, and the old event photos are no longer downloaded in the background.
- **QA fixes:** three icons first came back with fake printed text ("Dashboard 128", "BOX OFFICE", "TICKET") and were regenerated blank. The box office sign that remained was cropped off. The feature cards got more top room so the bigger icons don't touch the edge.
- **Credits:** about 1,500 (14 icon renders, 1 illustration and background removal).
- **Checked:** 1440 and 375 px, clean console.

**Decided:** the pixel-art mascot on the loading screen stays (confirmed 26 Nov).

### Follow-up: launch options copy and a working Register
- **Copy.** Updated to the team's text:
  - Direct Ticketing: "Send ready-made or customized tickets automatically to your guests via multiple channels."
  - Free and Paid Registrations: "Create an event page, let guests register for free, or sell tickets and keep 100% of your earnings."
- **Register works.** The Register button in the Free & Paid picture did nothing, which was misleading. It's now a real button.
  - **Free:** a confirmation slides up inside the mini event page: "You're registered!", the ticket on its way to your inbox, a ticket chip, and "Back to event page".
  - **Paid:** the button reads "Buy ticket" and shows "Payment received: $25 paid to the organiser, 0% commission".
  - **Closing:** the confirmation closes by itself after a few seconds, on "Back", or when switching Free/Paid.
- **Checked:** 1440 px, clean console.
- **Content sync still open:** the updated homepage and pricing copy pages (trycon-website…workers.dev) need a login, so they couldn't be read.

### Follow-up: copy synced to the team's updated content (26 Nov)
Source: the team's content pages for the homepage and pricing (trycon-website…workers.dev, read while signed in).

**Pricing:**
- **New pack prices:** 10 credits $5, 100 $40, 1,000 $300, 10,000 $2,000. The per-ticket rates are $0.50, $0.40, $0.30 and $0.20, and the "lowest per ticket" chip now says $0.20. The estimator uses the same values: 10 + 1,000 credits = $305.
- **Lede:** the hero lede is the new one.
- **Labels:** "Get price estimate", "(One ticket = One credit)", "Pricing Breakdown".
- **Feature cards:** reordered to the new order, each keeping its icon (security, red carpet, tickets that do more, seating, deliver, gatecrashers, on-ground sales, crystal ball, automate, sidekick).

**Homepage:**
- **Clear Wins sub-heading:** "The smart, secure, and affordable online ticket generator".
- **Other copy:** FAQ heading "FAQs", blog heading "Learn Best Practices", and the API feature text. The FAQ answers and small wording fixes now match the source.
- **Steps:** these already matched the new copy. Step 1 combines "Sign Up" and "Create Event", and steps 2–4 are Payment, Distribute Tickets and Validate Entries.

**In the source but not built** (they need new sections, or an element we don't have):
- **Homepage:** the stats heading "Launch faster, smarter, anywhere, profitably, securely", "1 Mn+" (we show the 1,000,000+ counter), and the "Learn More" link on "Say goodbye to ticketing headaches".
- **New CTA blocks:** "Get your ticket to effortless ticketing today!" after features, and the "Create Tickets" CTA after use cases.
- **Pricing:** the "Credit Packs" sub-heading and the final CTA line "Sign up to start generating tickets for your event".
- **Help boxes:** both pages keep "Still have a question?" (manager's call). The source has "Didn't find your query?" / "Have specific questions or custom requirements?".

**Ours, not in the source, left in place:** step 5 "Report", the Event Page and API sections, the eyebrows, the pricing chips and footnotes.

**Checked:** pricing card order and icons, pack prices, homepage headings; clean console.

## Round 10 (26 Nov): content additions, new use-case art, Clear Wins fixes, full QA

**Content added (from the team's content pages):**
- **Numbers section:** it now leads with "Launch faster, smarter, anywhere, profitably, securely", and the first stat reads "1 Mn+".
- **Two new call-to-action bands** in the same style as the mid-page band:
  - after Core Strengths: "Get your ticket to effortless ticketing today!", with Sign Up and the footnote "…Just pure ticketing magic";
  - after Use Cases: "Ready to try event ticket generator?" with Create Tickets.
- **"Learn More":** a link on "Say goodbye to ticketing headaches", going to /send-tickets.
- **Pricing:** a "Credit Packs" sub-heading above the packs, and the line "Sign up to start generating tickets for your event" in the closing ticket.

**Use cases: new images.**
- The earlier photos were too close to the old ones. The five cards now use clay 3D dioramas in the same family as the icons Nuveni liked: conference, charity dinner, festival, training workshop, football match.
- Three first came back with printed words ("CHARITY GALA", "WORKSHOP", "ENTRY") and were regenerated blank.

**Backstage Pass:** the text column is wider (up to 660 px) and the columns are rebalanced, so there's no empty band between the text and the picture.

**Clear Wins:**
- **Setup tickets:** "General Admission" stays on one line, and "Sent to 412 guests" no longer breaks.
- **Your tickets, your way:** "+ Add ticket type" works. Each click adds a ticket (Student Pass, Group of 4, Backstage Tour, Family Day Pass) at the bottom of a scrolling stack. The earlier tickets slide up, you can scroll back to them, and the stack never gets taller. After four, it reads "All ticket types added".
- **Real-time insights:** "Export report" opens a small pop-up in the middle of the dashboard. It shows a PDF icon, the file name and a progress bar, then "Report exported as PDF", and closes itself.

**QA, design audit and debugging (desktop):**
- **Images that loaded late or blank:** the image files were all present (66 homepage assets fetched fine, and the live site returns 200). The cause was lazy loading inside moving or stacked containers: the logo carousel, testimonials, event posters, use-case pile and pricing feature carousel. Those images only started loading as they slid in, so they showed blank or popped in. All 107 images on both pages now load with the page at low priority, so the first screen still comes first.
- **Equal button heights:** the closing CTA buttons differed (54 vs 56 px); both are now 56 px.
- **Accessibility:** four template swatches in Clear Wins had no name for screen readers; each now has one ("Blue template" and so on).
- **Checked on both pages:** no horizontal overflow, no broken or unloaded images, no empty links or unnamed buttons, no duplicate ids, all images have alt text, every button pair the same height, clean console.
- **Demos run:** hero scan, event page registration, launch Register, API demo, template click, gateway pick, add ticket type, export report, pricing estimator.
- **Mobile:** not reviewed this round; to follow after Nuveni's go-ahead.

**Credits:** about 830 (8 use-case renders).

## Round 11 (26 Nov): speed, real use-case photos, Clear Wins and Launch fixes

**The site felt stuck and heavy. What was slowing it down, and the fix:**
- **The dotted page background was "fixed".** That made the browser repaint the whole screen on every scroll step. It now scrolls with the page and looks the same.
- **The loading screen waited for every picture on the page** (up to 2.5 s). It now closes as soon as the page and fonts are ready (about 0.2 s after that, never later than 1.2 s). Both pages.
- **Pictures far down the page loaded at the start.** The 3D icons, the security shield and the footer images load again as you get close. Carousels, sliders and use cases still load up front, so nothing shows blank.
- **Looping animations ran all the time**, even in sections off screen (logo marquee, pulses, floating art). Each section now pauses its loops while it's off screen and resumes when it comes back.
- **Heavy shadows and blur:** the hero's cursor light used a live 56 px blur. It is now a plain soft gradient that looks the same. Big or moving tickets had two or three stacked shadow filters. They now have one, or two where the thin outline is needed: logos, testimonials, use cases, Clear Wins, Core Strengths, Launch, receipt. The header no longer animates its shadow.

**Use cases: real photos.** The clay dioramas are replaced by five new photorealistic shots, none from earlier rounds:
- check-in at a conference desk;
- volunteers at a charity fair;
- a ticket scanned at a concert door;
- a hands-on training workshop;
- a ticket scanned at a basketball game.

I checked them for printed words and odd AI artefacts and found none. Alt texts are rewritten. Clay stays only on the icons.

**Clear Wins:**
- **Keep 100%:** the gateway card is smaller. "Payments go straight to your account" is now 9.5 px (it was 11 px), and the card sits clear of the ticket's edges.
- **Your tickets, your way:** back to the original three tickets (Early Bird, General Admission, VIP). The "+ Add ticket type" button is removed, along with its scrolling stack and fade mask. The fade mask was what cut the top ticket.

**Launch options, Free & Paid:**
- "Register" / "Buy ticket" is now a proper primary button: larger, with white text in every state and a soft lift and arrow nudge on hover.
- The old hover was unreadable because a general scene rule overrode the white text colour.

**Pricing page:** no changes, apart from the shared speed fixes (background, loading screen).

**QA:**
- Checked at 1440, 1024 and 375.
- Clean console on both pages, and no horizontal overflow at 375.
- Ran the Register, Export report and gateway demos.
- Use-case images all load at 1200 × 800.
- I could not watch the scroll smoothness or the hover live in the preview pane, because it pauses rendering while hidden. Please check both on the live site.

**Credits:** 500 (5 renders).

## Round 12 (26 Nov): use-case rail, security section

- **Use cases, blue progress lines:** every row in the left-hand list is now the same height, with room for two lines of text (84 px at desktop, 72 px at 1024). The one-line items, Non-Profit Fundraisers and Sports Tournaments, used to get shorter lines. Now all five lines are the same length. I checked the row heights at 1440 and 1024. Phones don't show this list.
- **Security section (homepage):** the 3D clay shield is removed. The section shows the copy beside the ISO 27001, GDPR and SOC 2 seals, centred with the copy. The pricing page still uses the shield, because the pricing page is not being changed. Clean console.

## Round 13 (26 Nov): the ticket in the guest's hand

- **The problem:** on the event page, the third cover image for every non-music event (17 of the 24 events, including Tech Expo 2026) shows a guest holding a completely blank paper ticket. Music events use a singer photo there, and no other event-page photo shows a held ticket.
- **The fix:** the page now prints the current event onto that ticket.
  - It's drawn in code on top of the photo, at the ticket's exact position and tilt, in ink that blends into the paper.
  - It shows only: the event's real QR code (the same scannable matrix as the hero ticket), the event name (up to two lines), the venue, and the date and time. There's no barcode and no made-up text, because nothing is AI-generated.
  - It changes with the event, so "New design" in the hero updates it too.
  - The guest's thumbs stay in front of the ticket.
- **Checked:**
  - Tech Expo 2026, and the longest name ("Book Launch & Reading", which wraps to two lines and fits).
  - The poster at its real size on the event page.
  - Clean console.
  - The blog section's copy of that photo is unchanged, as asked.
