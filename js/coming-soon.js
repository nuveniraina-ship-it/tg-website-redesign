/* Coming soon: Mira types, looks up, the terminal prints the ticket, she apologises, smiles,
   then goes back to work (glancing up every so often). */
(() => {
  const root = document.querySelector('[data-cs]');
  if (!root) return;
  const status = root.querySelector('[data-cs-status]');

  // each unfinished page has its own address; name it on the ticket
  const NAMES = { api: 'API', faqs: 'FAQs', demo: 'Book a Demo', 'ticket-validator-web': 'Ticket Validator' };
  const slug = location.pathname.replace(/^\/|\.html$|\/$/g, '');
  if (/^[a-z0-9-]+$/.test(slug) && slug !== 'coming-soon' && slug !== '404') {
    const name = NAMES[slug] || slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
    root.querySelector('h1').textContent = `The ${name} page is still at the printer`;
    document.title = `${name} — coming soon — Ticket Generator`;
  }
  const say = (state, text) => { root.dataset.state = state; status.textContent = text; };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('is-printed');
    say('front', 'Back soon');
    return;
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const blink = async () => { root.classList.add('is-blink'); await wait(160); root.classList.remove('is-blink'); };

  (async () => {
    say('typing', 'Working on this page…');
    await wait(1900);
    say('front', 'Oh, hello!');
    await wait(700);
    status.textContent = 'Printing your ticket…';
    root.classList.add('is-printing');
    await wait(1750);
    root.classList.replace('is-printing', 'is-printed');
    say('sorry', 'Sorry, not ready yet');
    await wait(2600);
    say('front', 'Back soon, promise');
    await wait(900);
    await blink();
    await wait(1400);
    // back to work; every few seconds she glances up
    for (;;) {
      say('typing', 'Working on this page…');
      await wait(4200);
      say('front', 'Almost there');
      await wait(700);
      await blink();
      await wait(900);
    }
  })();
})();
