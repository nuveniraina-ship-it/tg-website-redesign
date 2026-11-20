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
