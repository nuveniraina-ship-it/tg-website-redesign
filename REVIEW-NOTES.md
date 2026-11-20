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
