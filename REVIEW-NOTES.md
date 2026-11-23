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
