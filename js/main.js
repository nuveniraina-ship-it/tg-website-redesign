(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // the old logo-cycle trial is over: forget any saved choice
  try { localStorage.removeItem('tg-logo'); } catch (e) { /* storage blocked */ }

  // offline page: a service worker shows Mira at her laptop when the network can't be reached
  if ('serviceWorker' in navigator && window.isSecureContext) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }

  /* ---------- Pages that aren't redesigned yet go to the coming-soon page ---------- */
  // Only the homepage and pricing exist so far: links to other pages of the Ticket Generator
  // site, and placeholder links with nowhere to go, all open coming-soon.html instead.
  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    const otherPage = /^https:\/\/(support\.)?ticket-generator\.com(\/|$)/.test(href);
    const deadHash = /^#[\w-]+$/.test(href) && !document.getElementById(href.slice(1));
    if (!otherPage && !deadHash) return;
    a.setAttribute('href', 'coming-soon.html');
    a.removeAttribute('target');
  });

  /* ---------- Header: border on scroll + mobile menu ---------- */
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('main-nav');

  const scrim = document.createElement('div');
  scrim.className = 'nav-scrim';
  document.body.append(scrim);
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('nav-open', open);   // dims the page and stops it scrolling
  };
  const closeMenu = () => setMenu(false);
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
  scrim.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width: 961px)').addEventListener('change', closeMenu);

  /* ---------- Logo carousel: duplicate for a seamless loop ---------- */
  const rollTrack = document.querySelector('[data-roll-track]');
  if (rollTrack) {
    const items = [...rollTrack.children];
    if (!reduceMotion) {
      items.forEach((li) => {
        const clone = li.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelector('img').alt = '';
        rollTrack.appendChild(clone);
      });
    }
  }

  // Brand QR: only where scanning is the story (the ticket at the gate, the delivered ticket).
  // Round dots, soft finder eyes and the TG mark in the middle, in the ticket's own colour.
  // Brand QR, in one of several designs (module shape + eye shape), to show QR codes are
  // customisable too. Each event type on the demo ticket gets its own design.
  const QR_STYLES = {
    square:  { mod: 'square',  eye: 'square' },   // conference: crisp and formal
    dots:    { mod: 'dot',     eye: 'circle' },   // private party: round and playful
    leaf:    { mod: 'leaf',    eye: 'leaf' },     // eco run: leaf-shaped modules
    diamond: { mod: 'diamond', eye: 'frame' },    // concert: sharp, stage-light diamonds
    soft:    { mod: 'soft',    eye: 'soft' },     // valentine's brunch: soft rounded squares
  };
  const drawBrandQR = (svg, text, styleKey = 'soft', logo = true) => {
    const st = QR_STYLES[styleKey] || QR_STYLES.soft;
    const SIZE = 25;
    let seed = [...text].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261) >>> 0;
    const rand = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const finderAt = (x, y) => (x < 8 && y < 8) || (x > SIZE - 9 && y < 8) || (x < 8 && y > SIZE - 9);
    const centre = (x, y) => logo && x >= 8 && x <= 16 && y >= 8 && y <= 16;
    const mod = (x, y) => {
      switch (st.mod) {
        case 'square': return `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`;
        case 'dot': return `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.44"/>`;
        case 'leaf': return `<path d="M${x + 0.5} ${y + 0.04}h0.46v0.46a0.46 0.46 0 0 1-0.46 0.46h-0.46v-0.46a0.46 0.46 0 0 1 0.46-0.46z"/>`;
        case 'diamond': return `<path d="M${x + 0.5} ${y + 0.02}l0.48 0.48-0.48 0.48-0.48-0.48z"/>`;
        default: return `<rect x="${x + 0.06}" y="${y + 0.06}" width="0.88" height="0.88" rx="0.3"/>`;
      }
    };
    let dots = '';
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (!finderAt(x, y) && !centre(x, y) && rand() > 0.5) dots += mod(x, y);
      }
    }
    const eye = (x, y) => {
      const o = `fill="none" stroke="currentColor" stroke-width="1"`;
      switch (st.eye) {
        case 'square': return `<rect x="${x + 0.5}" y="${y + 0.5}" width="6" height="6" ${o}/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
        case 'circle': return `<circle cx="${x + 3.5}" cy="${y + 3.5}" r="3" ${o}/><circle cx="${x + 3.5}" cy="${y + 3.5}" r="1.5"/>`;
        case 'leaf': return `<path d="M${x + 3.5} ${y + 0.5}h3v3a3 3 0 0 1-3 3h-3v-3a3 3 0 0 1 3-3z" ${o}/><path d="M${x + 3.5} ${y + 2}h1.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-1.5v-1.5a1.5 1.5 0 0 1 1.5-1.5z"/>`;
        case 'frame': return `<rect x="${x + 0.5}" y="${y + 0.5}" width="6" height="6" rx="0.6" ${o}/><path d="M${x + 3.5} ${y + 1.8}l1.7 1.7-1.7 1.7-1.7-1.7z"/>`;
        default: return `<rect x="${x + 0.5}" y="${y + 0.5}" width="6" height="6" rx="1.8" ${o}/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx="0.9"/>`;
      }
    };
    svg.setAttribute('shape-rendering', 'geometricPrecision');
    svg.dataset.qrStyle = styleKey;
    svg.innerHTML = `<g fill="currentColor">${dots}${eye(0, 0)}${eye(SIZE - 7, 0)}${eye(0, SIZE - 7)}</g>` + (logo ?
      `<rect x="8.6" y="8.6" width="7.8" height="7.8" rx="2" fill="#fff"/><rect x="8.6" y="8.6" width="7.8" height="7.8" rx="2" fill="currentColor" opacity=".08"/>` +
      `<image href="assets/tg-icon.svg" x="9.4" y="9.4" width="6.2" height="6.2"/>` : '');
  };

  // Seal: the brand's admit stamp. It replaces the decorative QR codes on the CTA ticket,
  // the review tickets and the receipt, where nothing is actually scanned.
  let sealN = 0;
  const drawSeal = (svg, text) => {
    const id = `seal-path-${sealN++}`;
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.removeAttribute('shape-rendering');
    svg.innerHTML =
      `<defs><path id="${id}" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0"/></defs>` +
      `<circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="1.6"/>` +
      `<circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2.4" opacity=".55"/>` +
      `<g class="seal-ring"><text fill="currentColor" font-size="9.2" font-weight="600" letter-spacing="1.6" font-family="'JetBrains Mono', ui-monospace, monospace"><textPath href="#${id}" textLength="230" lengthAdjust="spacing">${text}</textPath></text></g>` +
      `<image href="assets/tg-icon.svg" x="35" y="35" width="30" height="30"/>`;
  };
  document.querySelectorAll('[data-seal]').forEach((s) => drawSeal(s, s.dataset.seal));

  /* ---------- Reveal-on-view sections (numbers: stat count-up + receipt print) ---------- */
  const fmt = (n) => n.toLocaleString('en-US');
  const countStat = (el) => {
    const to = Number(el.dataset.countTo);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = fmt(to) + suffix; return; }
    const start = performance.now();
    const ms = 1600;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / ms);
      el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - p, 4)))) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      entry.target.querySelectorAll('[data-count-to]').forEach(countStat);
      revealIO.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -25% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el) => revealIO.observe(el));

  /* ---------- Phones: no pinned scrolling; decks and steps are driven by taps and swipes ---------- */
  const phone = window.matchMedia('(max-width: 768px)');
  // a sideways flick on `el` calls fn(+1) for "next" or fn(-1) for "previous"
  const onSwipe = (el, fn) => {
    let x0 = 0;
    let y0 = 0;
    el.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) fn(dx < 0 ? 1 : -1);
    }, { passive: true });
  };

  const mCta = document.querySelector('[data-m-cta]');
  if (mCta) {
    // hide the bar while one of the page's own buttons for the same action is on screen
    const rivals = [...document.querySelectorAll('.hero-cta, .j-end, .est-buy, .final, .site-footer')];
    const onScreen = new Set();
    const sync = () => mCta.classList.toggle('is-on', window.scrollY > 320 && onScreen.size === 0);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
      sync();
    });
    rivals.forEach((el) => io.observe(el));
    window.addEventListener('scroll', sync, { passive: true });
    sync();
  }

  /* ---------- Receipts print out of their slot as you scroll ---------- */
  const printers = [...document.querySelectorAll('[data-print]')];
  if (printers.length) {
    const STEPS = 30;       // paper feeds in small jerks, like a real printer
    const feed = () => {
      const vh = window.innerHeight;
      printers.forEach((el) => {
        if (el.dataset.printed) return;
        // starts as the slot comes into view, done by the time it's ~a third of the way up
        const raw = reduceMotion ? 1 : (vh * 0.9 - el.getBoundingClientRect().top) / (vh * 0.55);
        const p = Math.round(Math.min(1, Math.max(0, raw)) * STEPS) / STEPS;
        el.style.setProperty('--print', p);
      });
    };
    let printTick = false;
    window.addEventListener('scroll', () => {
      if (printTick) return;
      printTick = true;
      requestAnimationFrame(() => { feed(); printTick = false; });
    }, { passive: true });
    window.addEventListener('resize', feed);
    feed();
    // a receipt that's being used (the price estimator) finishes printing right away and stays out
    printers.forEach((el) => {
      const host = el.closest('[data-est]');
      if (!host) return;
      const flush = () => {
        if (el.dataset.printed) return;
        el.dataset.printed = '1';
        el.classList.add('is-flush');
        el.style.setProperty('--print', 1);
      };
      host.addEventListener('click', flush);
      host.addEventListener('input', flush);
    });
  }

  /* ---------- Every section is a ticket: stub strip + flying-letter entrance ---------- */
  const tickets = [...document.querySelectorAll('[data-tkt]')];
  // the strip carries the section's blue heading (its eyebrow), moved up above the tear line
  tickets.forEach((sec) => {
    const stub = document.createElement('div');
    stub.className = 'tkt-stub';
    stub.setAttribute('aria-hidden', 'true');
    let label = sec.dataset.eyebrow || '';
    let tone = '';
    const landscape = sec.classList.contains('tkt--land') && !window.matchMedia('(max-width: 768px)').matches;
    if (!label && !sec.classList.contains('tkt--hero') && !landscape) {
      const eb = sec.querySelector('.eyebrow');
      if (eb) {
        label = eb.textContent.trim();
        tone = getComputedStyle(eb).color;      // keeps the section's own shade (lighter on dark tickets)
        eb.classList.add('is-in-stub');
      }
    }
    if (label) {
      stub.innerHTML = '<span class="tkt-eyebrow"></span>';
      stub.firstChild.textContent = label;
      if (tone) stub.firstChild.style.color = tone;
    }
    sec.prepend(stub);
  });

  // every ticket after the first flies in, alternating sides like letters through the window
  const flyers = [...tickets.slice(1), ...document.querySelectorAll('.final-ticket')];
  flyers.forEach((el, i) => {
    const left = i % 2 === 0;
    el.classList.add('fly');
    el.style.setProperty('--fx', left ? '-6vw' : '6vw');      // a small drift, not a big swing
    el.style.setProperty('--fr', left ? '-2.5deg' : '2.5deg');
  });
  if (!CSS.supports('animation-timeline: view()') && !reduceMotion) {
    document.documentElement.classList.add('no-sda');
    const landIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-landed');
        landIO.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    flyers.forEach((el) => landIO.observe(el));

    // the closing ticket tears once it has settled in the middle of the screen
    const finalSec = document.querySelector('.final');
    if (finalSec) {
      const tearIO = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => finalSec.classList.add('is-torn'), 350);
        tearIO.disconnect();
      }, { rootMargin: '0px 0px -40% 0px', threshold: 0.6 });
      tearIO.observe(finalSec.querySelector('.final-ticket'));
    }
  }

  /* ---------- Review tickets: a faint TG mark in the top-right corner of each ---------- */
  document.querySelectorAll('.tq-body').forEach((body) => {
    const mark = document.createElement('img');
    mark.className = 'tq-mark';
    mark.src = 'assets/tg-icon.svg';
    mark.alt = '';
    mark.width = 22; mark.height = 22;
    body.append(mark);
  });

  /* ---------- Use cases: deal one ticket onto the pile per scroll step ---------- */
  const ucScroll = document.querySelector('[data-uc-scroll]');
  if (ucScroll) {
    const pin = ucScroll.querySelector('.uc-pin');
    const cards = [...ucScroll.querySelectorAll('[data-uct]')];
    const railItems = [...ucScroll.querySelectorAll('[data-uc-rail] li')];
    let shown = -1;

    const show = (n) => {
      if (n === shown) return;
      shown = n;
      cards.forEach((c, i) => {
        c.classList.toggle('is-in', i <= n);
        c.classList.toggle('is-under', i < n);
        c.classList.toggle('is-under-2', i < n - 1);
      });
      railItems.forEach((li, i) => {
        li.classList.toggle('is-active', i === n);
        li.classList.toggle('is-done', i < n);
      });
    };

    // desktop: pin the box just under the header and give it a runway of its own height + 4 steps
    const HEADER = 96;
    const fit = () => {
      if (phone.matches || reduceMotion) return;
      const h = pin.offsetHeight;
      ucScroll.style.setProperty('--uc-pin-h', `${h}px`);
      ucScroll.style.setProperty('--uc-top', `${HEADER + 24}px`);   // pinned just under the header, no empty band above
    };
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('load', fit);
    const pinTop = () => parseFloat(getComputedStyle(pin).top) || 0;
    const runway = () => Math.max(1, ucScroll.offsetHeight - pin.offsetHeight);
    const onUcScroll = () => {
      if (reduceMotion) return show(cards.length - 1);
      const p = Math.min(1, Math.max(0, (pinTop() - ucScroll.getBoundingClientRect().top) / runway()));
      const pos = p * cards.length;
      const n = Math.min(cards.length - 1, Math.floor(pos));
      show(n);
      // how far through each use case we are: done = 1, current = 0→1, upcoming = 0
      const seg = (i) => Math.min(1, Math.max(0, pos - i)).toFixed(4);
      railItems.forEach((li, i) => li.style.setProperty('--seg', seg(i)));
      cards.forEach((c, i) => c.style.setProperty('--z', seg(i)));
    };
    let ucTick = false;
    if (!phone.matches) {
      window.addEventListener('scroll', () => {
        if (ucTick) return;
        ucTick = true;
        requestAnimationFrame(() => { onUcScroll(); ucTick = false; });
      }, { passive: true });
      onUcScroll();
    } else {
      // phones: every ticket is shown; they stack on scroll with position: sticky (css/mobile.css)
      cards.forEach((c) => c.classList.add('is-in'));
    }

    // rail buttons jump to that ticket's slice of the runway
    ucScroll.querySelectorAll('[data-uc-go]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.ucGo);
        const top = ucScroll.getBoundingClientRect().top + window.scrollY - pinTop() + runway() * ((i + 0.5) / cards.length);
        window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ---------- Testimonials: a curved carousel ----------
     The review in the middle faces you; its neighbours angle in from the sides.
     Like the customer logos, it moves on by itself (every few seconds while it is
     on screen), so nothing waits on the scroll. Drag or swipe it, click a side
     review or use the arrow keys to move it yourself; it pauses while you do,
     and while the pointer rests on it. */
  const tmScroll = document.querySelector('[data-tm-scroll]');
  if (tmScroll && !reduceMotion) {
    const deckEl = tmScroll.querySelector('[data-tm-deck]');
    const deck = [...deckEl.querySelectorAll('[data-tq]')];
    const n = deck.length;
    const EVERY = 2500;        // ms per review
    let step = 300;
    let pos = 0;
    const wrap = (o) => ((((o + n / 2) % n) + n) % n) - n / 2;
    const render = (p) => deck.forEach((card, i) => {
      const o = wrap(i - p);
      const a = Math.abs(o);
      card.style.setProperty('--tx', `${(o * step).toFixed(1)}px`);
      card.style.setProperty('--ry', `${(Math.max(-1, Math.min(1, o)) * -24).toFixed(2)}deg`);
      card.style.setProperty('--ts', (1 - Math.min(a, 1) * 0.1).toFixed(3));
      card.style.setProperty('--to', a < 1.6 ? (1 - Math.min(a, 1) * 0.5).toFixed(2) : 0);
      card.style.setProperty('--tz', 50 - Math.round(a * 10));
      card.classList.toggle('is-buried', a > 0.5);
      card.setAttribute('aria-hidden', String(a > 0.5));
    });
    const go = (p) => { pos = p; render(pos); };

    // the timer: runs only while the carousel is on screen and nobody is handling it
    let timer = 0;
    let inView = false;
    let held = false;
    let resume = 0;
    const play = () => {
      clearInterval(timer);
      if (inView && !held && !document.hidden) timer = setInterval(() => go(Math.round(pos) + 1), EVERY);
    };
    const hold = (ms = 5000) => {
      clearInterval(timer);
      clearTimeout(resume);
      resume = setTimeout(play, ms);
    };
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; play(); }, { threshold: 0.4 }).observe(deckEl);
    document.addEventListener('visibilitychange', play);
    deckEl.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { held = true; clearInterval(timer); } });
    deckEl.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { held = false; play(); } });

    // drag with a finger or the mouse; a short flick is enough to move one review
    let x0 = 0;
    let y0 = 0;
    let p0 = 0;
    let mode = '';
    let dx = 0;
    let moved = false;
    deckEl.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      x0 = e.clientX;
      y0 = e.clientY;
      p0 = Math.round(pos);
      mode = '';
      dx = 0;
      moved = false;
    });
    deckEl.addEventListener('pointermove', (e) => {
      if (e.buttons !== 1 && e.pointerType === 'mouse') return;
      dx = e.clientX - x0;
      const dy = e.clientY - y0;
      if (!mode && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        mode = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (mode === 'x') { deckEl.setPointerCapture(e.pointerId); deckEl.classList.add('is-dragging'); clearInterval(timer); }
      }
      if (mode !== 'x') return;
      moved = true;
      render(p0 - dx / step);
    });
    const drop = () => {
      if (mode !== 'x') return;
      mode = '';
      deckEl.classList.remove('is-dragging');
      let move = Math.round(-dx / step);
      if (!move && Math.abs(dx) > 36) move = dx < 0 ? 1 : -1;
      go(p0 + move);
      hold();
    };
    deckEl.addEventListener('pointerup', drop);
    deckEl.addEventListener('pointercancel', drop);
    // a click on a side review brings it to the front
    deckEl.addEventListener('click', (e) => {
      if (moved) { moved = false; e.preventDefault(); return; }
      const card = e.target.closest('[data-tq]');
      if (!card || !card.classList.contains('is-buried')) return;
      e.preventDefault();
      go(Math.round(pos) + Math.round(wrap(deck.indexOf(card) - pos)));
      hold();
    }, true);
    // arrows, for anyone who wants to read them all without waiting
    const arrow = (d) => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="${d}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const nav = document.createElement('div');
    nav.className = 'tm-arrows';
    nav.innerHTML = `<button type="button" class="tm-arrow" aria-label="Previous review">${arrow('M15.833 10H4.167M10 15.833 4.167 10 10 4.167')}</button>
      <button type="button" class="tm-arrow" aria-label="Next review">${arrow('M4.167 10h11.666M10 4.167 15.833 10 10 15.833')}</button>`;
    deckEl.after(nav);
    const [prevBtn, nextBtn] = nav.querySelectorAll('button');
    prevBtn.addEventListener('click', () => { go(Math.round(pos) - 1); hold(8000); });
    nextBtn.addEventListener('click', () => { go(Math.round(pos) + 1); hold(8000); });

    deckEl.tabIndex = 0;
    deckEl.setAttribute('aria-label', 'Reviews. Use the left and right arrow keys to see more.');
    deckEl.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      go(Math.round(pos) + (e.key === 'ArrowRight' ? 1 : -1));
      hold();
    });

    // every review ticket is as tall as the longest one, so the deck never jumps
    const size = () => {
      deckEl.style.removeProperty('--card-h');
      deck.forEach((c) => c.style.setProperty('--tx', '0px'));
      deckEl.style.setProperty('--card-h', `${Math.max(...deck.map((c) => c.offsetHeight))}px`);
      step = deck[0].offsetWidth + (phone.matches ? 10 : 28);
      render(pos);
    };
    size();
    window.addEventListener('load', size);
    window.addEventListener('resize', size);
  }

  /* ---------- Desktop hero: where the bottom stub (the "Ready to issue" card) tears off ---------- */
  const heroTkt = document.querySelector('.tkt--hero');
  const heroEnd = heroTkt?.querySelector('.j-end');
  if (heroEnd) {
    const placeStub = () => {
      if (!heroTkt.contains(heroEnd)) { heroTkt.style.removeProperty('--stub-y'); return; }   // split: the card lives in Get Started
      const y = heroEnd.getBoundingClientRect().top - heroTkt.getBoundingClientRect().top - 28;
      heroTkt.style.setProperty('--stub-y', `${Math.round(y)}px`);
    };
    placeStub();
    window.addEventListener('load', placeStub);
    window.addEventListener('resize', placeStub);
    new ResizeObserver(placeStub).observe(heroTkt);
  }

  /* ---------- Core strengths: every ticket as tall as the tallest one ---------- */
  const hfGrid = document.querySelector('.hf-grid');
  if (hfGrid) {
    const level = () => {
      hfGrid.style.removeProperty('--hf-h');
      const h = Math.max(...[...hfGrid.children].map((c) => c.offsetHeight));
      hfGrid.style.setProperty('--hf-h', `${h}px`);
    };
    level();
    window.addEventListener('load', level);
    window.addEventListener('resize', level);
    document.fonts?.ready.then(level);
  }

  /* ---------- Stacks: the pile stops when the last ticket lands, then leaves as one ----------
     A sticky ticket lets go when the bottom of its list reaches its own bottom, so without help the
     last ticket lets go first and slides up over the others. Extra bottom margin on each earlier
     ticket (taken back from the next one's top margin, so the spacing doesn't change) makes them all
     let go together. Only for single-column sticky stacks (clear wins, launch options and, on
     phones, core strengths, use cases and pricing features). */
  const stacks = [...document.querySelectorAll('.cw-grid, .lo-grid, .hf-grid, .uc-pile, .fc-track')];
  const evenStack = (list) => {
    const cards = [...list.children];
    cards.forEach((c) => { c.style.marginTop = ''; c.style.marginBottom = ''; });
    const sticky = cards.length > 1 && cards.every((c) => getComputedStyle(c).position === 'sticky');
    const tops = cards.map((c) => c.offsetTop);
    if (!sticky || new Set(tops).size !== cards.length) return;   // not a one-column sticky stack
    const ends = cards.map((c) => parseFloat(getComputedStyle(c).top) + c.offsetHeight);
    const end = Math.max(...ends);
    cards.forEach((c, i) => {
      const extra = end - ends[i];
      if (!extra) return;
      c.style.marginBottom = `${extra}px`;
      if (cards[i + 1]) cards[i + 1].style.marginTop = `${-extra}px`;
    });
  };
  if (stacks.length) {
    const evenAll = () => stacks.forEach(evenStack);
    evenAll();
    window.addEventListener('load', evenAll);
    window.addEventListener('resize', evenAll);
    document.fonts?.ready.then(evenAll);
  }

  /* ---------- Event page: registration always closes a week from today ----------
     The festival runs for five days and ends the day registration closes (as on the live demo page). */
  const epCloses = document.querySelector('[data-ep-closes]');
  if (epCloses) {
    const day = 86400000;
    const today = new Date(); today.setHours(12, 0, 0, 0);
    const close = new Date(today.getTime() + 7 * day);
    const start = new Date(close.getTime() - 4 * day);
    const M = (d, len) => d.toLocaleString('en-US', { month: len });
    epCloses.textContent = `${M(close, 'long')} ${close.getDate()}, ${close.getFullYear()}`;
    const dates = document.querySelector('[data-ep-dates]');
    if (dates) {
      dates.textContent = start.getMonth() === close.getMonth()
        ? `${M(start, 'long')} ${start.getDate()}–${close.getDate()}, ${close.getFullYear()}`
        : `${M(start, 'short')} ${start.getDate()} – ${M(close, 'short')} ${close.getDate()}, ${close.getFullYear()}`;
    }
    const pd = start.getMonth() === close.getMonth()
      ? `${M(start, 'short')} ${start.getDate()}–${close.getDate()}`
      : `${M(start, 'short')} ${start.getDate()} – ${M(close, 'short')} ${close.getDate()}`;
    document.querySelectorAll('[data-ep-pdate]').forEach((el) => { el.textContent = pd.toUpperCase(); });   // the cover posters
    const startEl = document.querySelector('[data-ep-start]');
    if (startEl) startEl.textContent = `${M(start, 'short')} ${start.getDate()}`;
  }

  /* ---------- Event page: "Register Now" opens the registration step inside the frame, with a way back ---------- */
  const epReg = document.querySelector('[data-ep-reg]');
  const epOpen = document.querySelector('[data-ep-register]');
  if (epReg && epOpen) {
    const epPage = document.querySelector('.ep-page');
    const form = epReg.querySelector('[data-ep-form]');
    const done = epReg.querySelector('[data-ep-done]');
    const total = epReg.querySelector('[data-ep-total]');
    const opts = [...epReg.querySelectorAll('.ep-opt')];
    const prices = ['$25', '$60'];
    const showReg = (on) => {
      // about the same height as the event page (capped, so the step never sits in a big empty frame)
      if (on) epReg.style.minHeight = `${Math.min(epPage.offsetHeight, 640)}px`;
      epPage.hidden = on;
      epReg.hidden = !on;
      if (on) { form.hidden = false; done.hidden = true; epReg.querySelector('[data-ep-back]').focus({ preventScroll: true }); }
      else epOpen.focus({ preventScroll: true });
      // bring the top of the window into view, clear of the floating header
      const frame = epReg.closest('.ep-frame');
      const top = frame.getBoundingClientRect().top;
      if (top < 90 || top > innerHeight * 0.4) window.scrollTo({ top: scrollY + top - 110, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    epOpen.addEventListener('click', () => showReg(true));
    epReg.querySelector('[data-ep-back]').addEventListener('click', () => showReg(false));
    opts.forEach((o, i) => o.addEventListener('click', () => {
      opts.forEach((x) => { x.classList.toggle('is-on', x === o); x.setAttribute('aria-checked', String(x === o)); });
      total.textContent = prices[i];
    }));
    epReg.querySelector('[data-ep-confirm]').addEventListener('click', () => { form.hidden = true; done.hidden = false; });
    epReg.querySelector('[data-ep-again]')?.addEventListener('click', () => showReg(false));
  }

  /* ---------- Event page: the cover images slide by themselves; arrows and dots move them ---------- */
  const epCover = document.querySelector('[data-ep-cover]');
  if (epCover) {
    const track = epCover.querySelector('.ep-slides');
    const pips = [...epCover.querySelectorAll('.ep-pips button')];
    const count = track.children.length;
    let cur = 0;
    let auto = 0;
    let inView = false;
    let hover = false;
    const show = (k) => {
      cur = (k + count) % count;
      track.style.transform = `translateX(${-cur * 100}%)`;
      pips.forEach((b, i) => { b.classList.toggle('is-on', i === cur); b.setAttribute('aria-current', String(i === cur)); });
    };
    const play = () => {
      clearInterval(auto);
      if (inView && !hover && !reduceMotion) auto = setInterval(() => show(cur + 1), 3500);
    };
    epCover.querySelector('.ep-arrow--prev').addEventListener('click', () => { show(cur - 1); play(); });
    epCover.querySelector('.ep-arrow--next').addEventListener('click', () => { show(cur + 1); play(); });
    pips.forEach((b, i) => b.addEventListener('click', () => { show(i); play(); }));
    epCover.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hover = true; play(); } });
    epCover.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { hover = false; play(); } });
    onSwipe(epCover, (d) => { show(cur + d); play(); });
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; play(); }, { threshold: 0.4 }).observe(epCover);
  }

  /* ---------- API pipeline: registration → API → ticket → channels ---------- */
  const api = document.querySelector('[data-api]');
  if (api) {
    const people = [
      { name: 'Lina Park',     email: 'lina@acme.io',      phone: '+1 ••• ••• 4821',  av: '#b2ddff' },
      { name: 'Sam Okafor',    email: 'sam@umbrella.org',  phone: '+234 ••• ••• 58',  av: '#fecdca' },
      { name: 'Olivia Chen',   email: 'olivia@globex.co',  phone: '+65 ••• ••• 9034', av: '#fedf89' },
      { name: 'Ram Iyer',      email: 'ram@initech.in',    phone: '+91 ••• ••• 2207', av: '#abefc6' },
      { name: 'Priya Shah',    email: 'priya@hooli.com',   phone: '+44 ••• ••• 6615', av: '#d9d6fe' },
      { name: 'Marco Diaz',    email: 'marco@soylent.es',  phone: '+34 ••• ••• 117',  av: '#fddcab' },
      { name: 'Aiko Tanaka',   email: 'aiko@wayne.jp',     phone: '+81 ••• ••• 0392', av: '#c7d7fe' },
      { name: 'Lena Fischer',  email: 'lena@stark.de',     phone: '+49 ••• ••• 7710', av: '#fcceee' },
      { name: 'Noah Williams', email: 'noah@wonka.com',    phone: '+1 ••• ••• 3358',  av: '#a6f4c5' },
      { name: 'Zara Ahmed',    email: 'zara@pied.ae',      phone: '+971 ••• ••• 46',  av: '#fee4e2' },
    ];
    const q = (sel) => api.querySelector(sel);
    const list = q('[data-reg-list]');
    const core = q('[data-core]');
    const status = q('[data-core-status]');
    const wireIn = q('[data-wire-in]');
    const wireOut = q('[data-wire-out]');
    const dests = [...api.querySelectorAll('[data-dest]')];
    const countEl = q('[data-api-count]');
    drawBrandQR(q('[data-mini-qr]'), 'api-ticket');

    // Route the three delivery wires from the API's centre to the middle of each channel card.
    const wireSvg = wireOut.querySelector('svg');
    const tracks = [...wireSvg.querySelectorAll('.track')];
    const flashes = [...wireSvg.querySelectorAll('.flash')];
    const routeWires = () => {
      const box = wireOut.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const w = box.width;
      // desktop: lower the logo to the middle of the row (extra space above it), so the line from the
      // list, the logo and the middle channel card share one centre line
      const wideRow = getComputedStyle(q('.flow')).gridTemplateColumns.split(' ').length >= 5;
      core.style.removeProperty('padding-top');
      if (wideRow) {
        const cr = core.getBoundingClientRect();
        const rr = core.querySelector('.core-ring').getBoundingClientRect();
        const ringMid = rr.top + rr.height / 2;
        const extra = (cr.bottom - ringMid) - (ringMid - cr.top);
        if (extra > 0) core.style.paddingTop = `${parseFloat(getComputedStyle(core).paddingTop) + extra}px`;
      }
      // the wires meet the logo (not the middle of the API block, which has text under the logo)
      const y0 = core.querySelector('.core-ring').getBoundingClientRect();
      const ringY = y0.top + y0.height / 2;
      const from = ringY - box.top;
      // desktop: the line in leaves the registration list at the logo's height too
      const wide = getComputedStyle(q('.flow')).gridTemplateColumns.split(' ').length >= 5;
      if (wide) {
        wireIn.style.alignSelf = 'start';
        wireIn.style.marginTop = '0px';
        wireIn.style.marginRight = '0px';
        const wi = wireIn.getBoundingClientRect();
        wireIn.style.marginTop = `${Math.round(ringY - wi.top - 1)}px`;
        wireIn.style.marginRight = `${-Math.max(0, Math.round(y0.left - wi.right - 6))}px`;   // runs right up to the logo
      } else {
        ['align-self', 'margin-top', 'margin-right'].forEach((p) => wireIn.style.removeProperty(p));
      }
      const startX = wide ? Math.min(0, y0.right + 6 - box.left) : 0;   // the lines out start at the logo's edge
      wireSvg.setAttribute('viewBox', `0 0 ${w} ${box.height}`);
      dests.forEach((d, i) => {
        const r = d.getBoundingClientRect();
        const to = r.top + r.height / 2 - box.top;
        const span = w - startX;
        const path = `M${startX} ${from} C ${startX + span * 0.55} ${from} ${startX + span * 0.45} ${to} ${w} ${to}`;
        tracks[i]?.setAttribute('d', path);
        flashes[i]?.setAttribute('d', path);
      });
    };
    routeWires();
    const wireRO = new ResizeObserver(routeWires);
    [q('.flow'), core, q('.node-dests')].forEach((el) => el && wireRO.observe(el));
    window.addEventListener('load', routeWires);
    window.addEventListener('resize', routeWires);

    const ROWS = window.matchMedia('(max-width: 768px)').matches ? 3 : 5;   // registrations shown in the app window
    let idx = 0;
    let issued = 0;
    let ticketNo = 540;
    let steps = [];
    const SPEED = 0.5;   // the whole request-to-delivery run takes under two seconds
    const at = (ms, fn) => steps.push(setTimeout(fn, reduceMotion ? 0 : ms * SPEED));
    const initials = (n) => n.split(' ').map((w) => w[0]).join('');
    const restart = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
    const mini = q('[data-mini-ticket]');

    const addRow = (p, sent) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="reg-av" style="--av:${p.av}">${initials(p.name)}</span>
        <span class="reg-who">${p.name}<span>${p.email}</span></span>
        <span class="reg-tag${sent ? ' is-sent' : ''}">${sent ? 'Ticket sent' : 'New'}</span>`;
      if (!sent) li.classList.add('is-new');
      list.prepend(li);
      while (list.children.length > ROWS) list.lastElementChild.remove();
      return li;
    };

    // The ticket hanging out of the slot is cut loose: it drops, tumbles and fades away.
    const cutTicket = () => {
      if (reduceMotion || !core.classList.contains('is-printed')) return;
      const from = mini.getBoundingClientRect();
      const box = core.getBoundingClientRect();
      const fall = mini.cloneNode(true);
      fall.removeAttribute('data-mini-ticket');
      fall.classList.add('is-falling');
      fall.style.left = `${from.left - box.left}px`;
      fall.style.top = `${from.top - box.top}px`;
      fall.style.setProperty('--spin', `${idx % 2 ? -26 : 24}deg`);
      fall.style.setProperty('--drift', `${idx % 2 ? -22 : 26}px`);
      core.append(fall);
      fall.addEventListener('animationend', () => fall.remove(), { once: true });
    };

    // Registrations are handled strictly one at a time, oldest first, so every
    // name that comes in gets its own ticket, its own delivery and its own "Ticket sent".
    const queue = [];
    let busy = false;
    let visible = false;
    let autoTimer = 0;
    const pending = () => queue.length + (busy ? 1 : 0);

    const enqueue = () => {
      const p = people[idx++ % people.length];
      queue.push({ p, row: addRow(p, false) });
      pump();
    };

    const scheduleAuto = () => {
      clearTimeout(autoTimer);
      if (visible && !reduceMotion) autoTimer = setTimeout(() => { if (!pending()) enqueue(); }, 700);
    };

    const pump = () => {
      if (busy) return;
      const job = queue.shift();
      if (!job) return scheduleAuto();
      busy = true;
      clearTimeout(autoTimer);
      steps.forEach(clearTimeout);
      steps = [];
      const { p, row } = job;
      const no = String(++ticketNo).padStart(6, '0');
      const tag = row.querySelector('.reg-tag');

      row.classList.add('is-active');
      tag.textContent = 'Sending…';
      // (the request panel was removed; write to it only if a page still has one)
      const jn = q('[data-json-name]'), je = q('[data-json-email]');
      if (jn) jn.textContent = `"${p.name}"`;
      if (je) je.textContent = `"${p.email}"`;
      core.classList.remove('is-busy', 'is-done');
      status.textContent = 'Request received';
      dests.forEach((d) => d.classList.remove('is-on'));
      wireOut.classList.remove('is-on');

      at(250, () => restart(wireIn, 'is-on'));
      at(750, () => {
        core.classList.add('is-busy');
        status.textContent = `Generating ticket for ${p.name.split(' ')[0]}…`;
        cutTicket();                               // the previous ticket is cut and falls away
        core.classList.remove('is-printed');       // the slot is empty again
        q('[data-mini-no]').textContent = no;
      });
      at(1450, () => core.classList.add('is-printed'));   // …and the new one prints out
      at(2300, () => {
        core.classList.replace('is-busy', 'is-done');
        status.textContent = `Ticket No. ${no} created`;
        routeWires();
        restart(wireOut, 'is-on');
      });
      const to = [p.email, p.phone, p.phone];
      dests.forEach((d, i) => at(2750 + i * 160, () => {
        d.querySelector('[data-dest-to]').textContent = `${p.name.split(' ')[0]} · ${to[i]}`;
        d.classList.add('is-on');
      }));
      at(3250, () => {
        row.classList.remove('is-new', 'is-active');
        tag.textContent = 'Ticket sent';
        tag.classList.add('is-sent');
        countEl.textContent = String(++issued);
        q('[data-api-noun]').textContent = issued === 1 ? 'ticket' : 'tickets';
      });
      at(3750, () => { busy = false; pump(); });
    };

    // earlier registrations so the app isn't empty
    people.slice(-(ROWS - 1)).forEach((p) => addRow(p, true));

    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { if (!pending()) scheduleAuto(); } else clearTimeout(autoTimer);
    }, { threshold: 0.35 }).observe(q('.flow'));

    // the logo in the middle is the only control: click (or tap) it to send a registration
    const ring = core.querySelector('.core-ring');
    const send = () => {
      // at most a window-full waiting, so no registration ever scrolls away unsent
      if (pending() >= ROWS) return restart(ring, 'is-full');
      clearTimeout(autoTimer);
      enqueue();
    };
    ring.setAttribute('role', 'button');
    ring.setAttribute('tabindex', '0');
    ring.setAttribute('aria-label', 'Send a test registration');
    ring.addEventListener('click', send);
    ring.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); send(); } });
    if (reduceMotion) enqueue();

  }

  /* ---------- Journey ---------- */
  const journey = document.querySelector('[data-journey]');
  if (!journey) return;

  const canvas = journey.querySelector('[data-stage]');
  const panel = canvas.parentElement;
  const stageCol = journey.querySelector('.j-stage');
  const ticket = canvas.querySelector('[data-ticket]');
  const steps = [...journey.querySelectorAll('[data-step]')];
  const trackerItems = [...canvas.querySelectorAll('.tracker li')];
  const stepRow = journey.querySelector('[data-step-row]');
  const rowSteps = stepRow ? [...stepRow.querySelectorAll('[data-step]')] : [];

  drawBrandQR(canvas.querySelector('[data-qr]'), 'Leaders Summit', 'square');

  // Template swatches: click one and the whole stage (ticket, tracker, cards) takes that colour.
  const picks = [...panel.querySelectorAll('[data-theme-pick]')];   // the corner bar's swatches
  // Every colour has its own event: pink is a Valentine's night, green a city run, and so on.
  // The name, category, logo letters, venue and the faded photo behind the ticket all change with it.
  const EVENTS = {
    blue:   { name: 'Leaders Summit',       cat: 'CONFERENCE',     logo: 'LS', venue: 'Grand Hall',     place: 'Grand Hall, Convention Centre', photo: 'summit' },
    ink:    { name: 'Midnight Soirée',      cat: 'PRIVATE PARTY',  logo: 'MS', venue: 'The Loft',       place: 'The Loft, Old Town',          photo: 'night' },
    green:  { name: 'Earth Day Run 10K',    cat: 'ECO RUN',        logo: 'ED', venue: 'Riverside Park', place: 'Riverside Park, North Gate',  photo: 'run' },
    purple: { name: 'Neon Nights Live',     cat: 'CONCERT',        logo: 'NN', venue: 'City Arena',     place: 'City Arena, Downtown',        photo: 'concert' },
    pink:   { name: 'Valentine’s Brunch',   cat: 'BRUNCH PARTY',   logo: 'VB', venue: 'Rose Terrace',   place: 'Rose Terrace, Harbour Tower', photo: 'rooftop' },
    red:    { name: 'Opening Night',        cat: 'THEATRE PREMIERE', logo: 'ON', venue: 'Grand Theatre', place: 'Grand Theatre, Main Street', photo: 'premiere' },
    yellow: { name: 'Charity Fun Day',      cat: 'CHARITY',        logo: 'CF', venue: 'Central Square', place: 'Central Square, City Centre', photo: 'charity' },
    teal:   { name: 'Rooftop Beats',        cat: 'DJ PARTY',       logo: 'RB', venue: 'Sky Terrace',    place: 'Sky Terrace, Harbour Tower',  photo: 'rooftop' },
  };
  // a picked colour → the closest event family by hue
  const eventForHex = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    const sat = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    if (sat < 0.12) return 'ink';
    let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
    if (h >= 290 && h < 345) return 'pink';
    if (h >= 345 || h < 15) return l > 0.7 ? 'pink' : 'red';
    if (h < 40) return 'red';
    if (h < 70) return 'yellow';
    if (h < 165) return 'green';
    if (h < 195) return 'teal';
    if (h < 250) return 'blue';
    return 'purple';
  };
  const setEvent = (key) => {
    const ev = EVENTS[key] || EVENTS.blue;
    document.querySelectorAll('.stage-canvas, .m-pass').forEach((cv) => {
      cv.style.setProperty("--t-photo", ev.photo ? `url("${location.origin}/assets/tickets/${ev.photo}.webp")` : "none");   // no photo yet: just the colour
      ['name', 'cat', 'logo', 'venue', 'place'].forEach((f) => cv.querySelectorAll(`[data-ev="${f}"]`).forEach((el) => { el.textContent = ev[f]; }));
    });
  };
  // fetch the photos ahead of time, so a colour change swaps them at once
  window.addEventListener('load', () => setTimeout(() => {
    Object.values(EVENTS).filter((ev) => ev.photo).forEach((ev) => { const im = new Image(); im.src = `${location.origin}/assets/tickets/${ev.photo}.webp`; });
  }, 1500));

  // the ticket's text turns dark on a light colour, so it always stays readable
  const setInk = (hex) => {
    const props = ['--t-ink', '--t-ink-soft', '--t-line'];
    let light = false;
    if (hex) {
      const n = parseInt(hex.slice(1), 16);
      const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
      const L = 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
      light = L > 0.4;   // white text would fall below about 2.3:1 here
    }
    if (light) {
      canvas.style.setProperty('--t-ink', '#181d27');
      canvas.style.setProperty('--t-ink-soft', 'rgba(24, 29, 39, .68)');
      canvas.style.setProperty('--t-line', 'rgba(24, 29, 39, .24)');
    } else props.forEach((p) => canvas.style.removeProperty(p));
  };
  // any colour: the picker sets --pick and the custom theme builds the whole scale from it
  const anyPick = panel.querySelector('[data-theme-any]');
  if (anyPick) {
    const dot = anyPick.parentElement;
    anyPick.addEventListener('input', () => {
      canvas.dataset.theme = 'custom';
      canvas.style.setProperty('--pick', anyPick.value);
      setInk(anyPick.value);
      setEvent(eventForHex(anyPick.value));
      dot.style.setProperty('--c', anyPick.value);
      dot.classList.add('is-set', 'is-on');
      picks.forEach((b) => b.classList.remove('is-on'));
    });
  }
  // One colour choice for the whole page: any set of dots (hero or Get Started, desktop or phone)
  // recolours every picture and ticket and switches them all to that colour's event.
  const applyTheme = (theme) => {
    anyPick?.parentElement.classList.remove('is-on');
    setInk(null);   // the preset colours are all dark enough for white text
    setEvent(theme);
    document.querySelectorAll('[data-ev-select]').forEach((sel) => { if (sel.value !== theme) sel.value = theme; });
    const qrStyle = { blue: 'square', ink: 'dots', green: 'leaf', purple: 'diamond', pink: 'soft' }[theme] || 'soft';
    document.querySelectorAll('.ticket-qr, .m-pass-qr').forEach((q) => drawBrandQR(q, (EVENTS[theme] || EVENTS.blue).name, qrStyle));
    document.querySelectorAll('.stage-canvas, .m-pass').forEach((el) => {
      if (theme === 'blue') el.removeAttribute('data-theme'); else el.dataset.theme = theme;
    });
    document.querySelectorAll('[data-theme-pick]').forEach((b) => b.classList.toggle('is-on', b.dataset.themePick === theme));
  };
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-theme-pick]');
    if (b) applyTheme(b.dataset.themePick);
  });
  // the quiet "Preview as" menu in the picture's corner switches the event type
  document.querySelectorAll('[data-ev-select]').forEach((sel) => sel.addEventListener('change', () => applyTheme(sel.value)));

  // Scale the fixed-size canvas to whatever space the panel has.
  const fitTo = (box, cv) => {
    const { width, height } = box.getBoundingClientRect();
    const pad = phone.matches ? 6 : 24;
    const scale = Math.min(1, (width - pad) / 560, (height - pad) / 540);
    cv.style.setProperty('--scale', Math.max(scale, 0.3).toFixed(3));
  };
  new ResizeObserver(() => fitTo(panel, canvas)).observe(panel);

  // phones: a still copy of the opening scene sits in the hero, taken before anything animates
  // phones: the hero's picture is one clean ticket (no overlapping cards and chips)
  let heroShot = null;
  if (phone.matches) {
    heroShot = document.createElement('div');
    heroShot.className = 'm-pass';
    heroShot.setAttribute('aria-hidden', 'true');
    heroShot.innerHTML = `
      <div class="m-pass-tkt">
        <div class="m-pass-top">
          <div class="m-pass-row"><span class="m-pass-logo" data-ev="logo">LS</span><span class="m-pass-cat" data-ev="cat">CONFERENCE</span><span class="m-pass-type">General Admission</span></div>
          <p class="m-pass-title" data-ev="name">Leaders Summit</p>
          <dl class="m-pass-meta">
            <div><dt>Date</dt><dd>Sat, 14 Mar</dd></div>
            <div><dt>Time</dt><dd>7:00 PM</dd></div>
            <div><dt>Venue</dt><dd data-ev="venue">Grand Hall</dd></div>
          </dl>
        </div>
        <div class="m-pass-stub">
          <svg class="m-pass-qr" viewBox="0 0 25 25" shape-rendering="crispEdges"></svg>
          <div class="m-pass-side">
            <p class="m-pass-scan">Scan at entry</p>
            <p class="m-pass-no">No. 000539</p>
            <p class="m-pass-ok"><i></i>Valid ticket</p>
          </div>
        </div>
      </div>`;
    drawBrandQR(heroShot.querySelector('.m-pass-qr'), 'Leaders Summit', 'square');

  }

  const STEP_NAMES = ['Create', 'Sell', 'Send', 'Scan', 'Report'];
  let tabBtns = [];
  let nextStepBtn = null;

  /* Per-scene micro-animations, cancelled whenever the scene changes */
  let timers = [];
  let instant = false;   // phones: jump each scene straight to its end state to take a still copy
  const later = (fn, ms) => { if (instant) { fn(); return; } timers.push(setTimeout(fn, reduceMotion ? 0 : ms)); };
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

  const countUp = (el, to, { prefix = '', from = 0, ms = 900 } = {}) => {
    if (reduceMotion || instant) { el.textContent = prefix + to.toLocaleString('en-US'); return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / ms);
      const v = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      el.textContent = prefix + v.toLocaleString('en-US');
      if (p < 1 && canvas.dataset.state !== '0') requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const scenes = {
    1() {
      const bar = canvas.querySelector('[data-upload]');
      bar.style.transition = 'none';
      bar.style.width = '0';
      void bar.offsetWidth;
      bar.style.transition = '';
      later(() => { bar.style.width = '100%'; }, 250);
    },
    2() {
      const pay = canvas.querySelector('[data-pay]');
      pay.classList.remove('is-paid');
      later(() => pay.classList.add('is-paid'), 1400);
    },
    3() {
      const chans = canvas.querySelectorAll('[data-ch]');
      chans.forEach((c) => c.classList.remove('is-on'));
      chans.forEach((c, i) => later(() => c.classList.add('is-on'), 300 + i * 350));
      const count = canvas.querySelector('[data-send-count]');
      const bar = canvas.querySelector('[data-send-bar]');
      bar.style.width = '63%';
      later(() => {
        countUp(count, 200, { from: 126, ms: 1600 });
        bar.style.transition = 'width 1.6s ease';
        bar.style.width = '100%';
      }, 400);
    },
    4() {
      const log = canvas.querySelectorAll('.v-log li');
      log.forEach((li) => li.classList.remove('is-in'));
      ticket.classList.remove('is-scanning', 'is-admitted', 'is-torn');
      void ticket.offsetWidth;
      later(() => ticket.classList.add('is-scanning'), 200);
      later(() => ticket.classList.add('is-admitted'), 1400);
      later(() => ticket.classList.add('is-torn'), 2000);
      // older scans first; this ticket's "Valid" lands when the stamp does
      log.forEach((li, i) => later(() => li.classList.add('is-in'), i === 0 ? 1500 : 300 + i * 250));
    },
    5() {
      ticket.classList.add('is-admitted', 'is-torn');
      canvas.querySelectorAll('[data-count]').forEach((el) =>
        countUp(el, Number(el.dataset.count), { prefix: el.dataset.prefix || '' }));
    },
  };

  let current = -1;
  const setState = (n) => {
    if (n === current) return;
    current = n;
    clearTimers();

    canvas.dataset.state = String(n);
    for (let i = 1; i <= 5; i++) canvas.classList.toggle(`gte-${i}`, n >= i);
    trackerItems.forEach((li) => {
      const t = Number(li.dataset.t);
      li.classList.toggle('is-done', t < n);
      li.classList.toggle('is-current', t === n);
    });
    steps.forEach((s) => s.classList.toggle('is-active', Number(s.dataset.step) === n));
    tabBtns.forEach((b, i) => {
      b.classList.toggle('is-on', i + 1 === n);
      b.setAttribute('aria-selected', String(i + 1 === n));
    });
    if (nextStepBtn) nextStepBtn.firstChild.textContent = n < 5 ? `Next: ${STEP_NAMES[n]} ` : 'Back to step 1 ';

    if (n < 4) ticket.classList.remove('is-scanning', 'is-admitted', 'is-torn');
    scenes[n]?.();
  };

  // The active step is the last one whose top has crossed the reading line.
  const pick = () => {
    if (heroShot) return;                // phones pick the step with the tabs, not by scrolling
    const stacked = window.matchMedia('(max-width: 960px)').matches;
    let line = window.innerHeight * 0.55;
    if (stacked) {
      const stageBottom = stageCol.getBoundingClientRect().bottom;
      line = stageBottom + (window.innerHeight - stageBottom) * 0.45;
    }
    let active = journey.dataset.split ? 1 : 0;   // split desktop: the steps' picture starts at step 1
    steps.forEach((s) => {
      if (s.getBoundingClientRect().top <= line) active = Number(s.dataset.step);
    });
    setState(journey.dataset.split ? Math.max(1, active) : active);
  };

  let ticking = false;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 4);
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { pick(); ticking = false; });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* Desktop: the hero and Get Started are two separate tickets. The hero keeps its copy and a still
     picture of the opening scene; the five steps, their live picture and "Ready to issue" move into
     their own ticket right under it. */
  if (!heroShot && window.matchMedia('(min-width: 961px)').matches) {
    const heroSec = journey.closest('section');
    const stepsSec = document.createElement('section');
    stepsSec.className = 'tkt tkt--steps';
    stepsSec.setAttribute('aria-labelledby', 'steps-title');
    stepsSec.innerHTML = '<div class="tkt-stub" aria-hidden="true"><span class="tkt-eyebrow">Backstage Pass</span></div>';
    const grid = document.createElement('div');
    grid.className = 'container journey journey--steps';
    stepsSec.append(grid);
    const stepsCol = journey.querySelector('.j-steps');
    stepsCol.querySelector('.j-intro .eyebrow')?.classList.add('is-in-stub');
    stepsCol.querySelector('.j-intro h2')?.setAttribute('id', 'steps-title');
    const endWrap = heroSec.querySelector('.j-end')?.parentElement;
    grid.append(stepsCol, stageCol);
    // the heading and line sit centred above the steps and the picture, like every other section
    const introEl = stepsCol.querySelector('.j-intro');
    if (introEl) {
      const head = document.createElement('div');
      head.className = 'container sec-head';
      head.append(introEl);
      grid.before(head);
    }
    if (endWrap) stepsSec.append(endWrap);
    heroSec.after(stepsSec);
    // the hero is one centred column over its photo: copy, then the frosted dashboard (css/hero-app.css, .hx)
    heroSec.classList.remove('tkt--land');
    journey.dataset.split = '1';
    heroSec.style.removeProperty('--stub-y');
    onScroll();
  }

  /* Phones: the hero and the five steps become two tickets; the steps stack as you scroll. */
  if (heroShot) {
    const card = (cls) => { const d = document.createElement('div'); d.className = `m-card ${cls}`; return d; };
    const hero = journey.querySelector('.j-hero');
    const stepsCol = journey.querySelector('.j-steps');
    const intro = stepsCol.querySelector('.j-intro');

    const heroCard = card('m-card--hero');
    hero.before(heroCard);
    heroCard.append(hero);   // the hero's picture is the app (inside .j-hero), not the still ticket

    const stepsCard = card('m-card--steps');
    stepsCol.before(stepsCard);
    const stub = document.createElement('div');
    stub.className = 'tkt-stub';
    stub.setAttribute('aria-hidden', 'true');
    stub.innerHTML = '<span class="tkt-eyebrow is-light">Backstage Pass</span>';
    stepsCard.append(stub, stepsCol);

    // Phones: the five steps are five tickets that stack as you scroll. Each one has its label and
    // heading at the top (so the stacked edges read like tabs), a still picture of that step, then
    // its text. Same stack rules as everywhere else: 14px apart, a clear edge of each one showing
    // once stacked, and the pile leaves as one (js: evenStack).
    const tryBar = panel.querySelector('.stage-try');
    if (tryBar) intro.after(tryBar);              // one colour row for all five pictures
    const list = document.createElement('ol');
    list.className = 'm-steps';
    (tryBar || intro).after(list);
    const shots = [];
    instant = true;
    steps.filter((el) => el.matches('.step')).forEach((stepEl, i) => {
      const n = i + 1;
      setState(n);
      const li = document.createElement('li');
      li.className = 'm-step';
      li.style.setProperty('--i', i);
      const head = document.createElement('div');
      head.className = 'm-step-head';
      const num = stepEl.querySelector('.step-num');
      const h3 = stepEl.querySelector('h3');
      head.append(num.cloneNode(true), h3.cloneNode(true));
      const pic = panel.cloneNode(true);
      pic.classList.add('m-step-pic');
      pic.setAttribute('aria-hidden', 'true');
      pic.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
      const picCanvas = pic.querySelector('.stage-canvas');
      picCanvas.removeAttribute('data-stage');
      shots.push(picCanvas);
      new ResizeObserver(() => fitTo(pic, picCanvas)).observe(pic);
      const text = document.createElement('div');
      text.className = 'm-step-text';
      stepEl.querySelectorAll('p').forEach((p) => text.append(p.cloneNode(true)));
      const tkt = document.createElement('div');
      tkt.className = 'm-step-tkt';
      tkt.append(head, pic, text);
      li.append(tkt);
      list.append(li);
    });
    instant = false;
    clearTimers();
    stageCol.hidden = true;
    if (stepRow) stepRow.hidden = true;

    // the colour row recolours all five pictures
    const syncTheme = () => shots.forEach((c) => {
      if (canvas.dataset.theme) c.dataset.theme = canvas.dataset.theme; else c.removeAttribute('data-theme');
      ['--pick', '--t-ink', '--t-ink-soft', '--t-line'].forEach((prop) => {
        const v = canvas.style.getPropertyValue(prop);
        if (v) c.style.setProperty(prop, v); else c.style.removeProperty(prop);
      });
    });
    new MutationObserver(syncTheme).observe(canvas, { attributes: true, attributeFilter: ['data-theme', 'style'] });


    stacks.push(list);
    // the stacked edge of each ticket is as tall as the tallest heading row, so no heading is cut;
    // the notches sit on the two tear lines
    const evenSteps = () => {
      const heads = [...list.querySelectorAll('.m-step-head')];
      heads.forEach((h) => { h.style.minHeight = ''; });
      const peek = Math.ceil(Math.max(...heads.map((h) => h.offsetHeight)));
      list.style.setProperty('--peek', `${peek}px`);
      heads.forEach((h) => { h.style.minHeight = `${peek}px`; });
      list.querySelectorAll('.m-step-tkt').forEach((t) => {
        const pic = t.querySelector('.m-step-pic');
        t.style.setProperty('--cut1', `${peek}px`);
        t.style.setProperty('--cut2', `${peek + pic.offsetHeight}px`);
      });
      evenStack(list);
    };
    evenSteps();
    window.addEventListener('load', evenSteps);
    window.addEventListener('resize', evenSteps);
    document.fonts?.ready.then(evenSteps);
  }
  /* ---------- Hero: the app, and a ticket in one of many designs ----------
     A different design on every visit (never the same as last time). Its QR is a real code, drawn in
     the design's own style (module shape, eye shape, colours, the event's initials in the middle).
     Tap the QR: it scans, the guest checks in on the dashboard; scan again: "already scanned".
     "New design" swaps the ticket. New tickets keep arriving in the guest list. */
  const hx = document.querySelector('[data-hx]');
  const DESIGNS = window.TG_TICKET_DESIGNS || [];
  if (hx && DESIGNS.length) {
    const one = (sel) => hx.querySelector(sel);
    const tkEl = one('[data-hx-ticket]');
    const list = one('[data-hx-list]');
    const gen = one('[data-hx-gen]'), chk = one('[data-hx-in]'), evName = one('[data-hx-event]');
    const toastEl = one('[data-hx-toast]');
    const fmt = (n) => n.toLocaleString('en-US');
    let nGen = 1251, nIn = 814, cur = null, scanned = false, busy = false;
    const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    // a real QR matrix, drawn in a designed style
    const drawDesignQR = (svg, d) => {
      const q = d.qr, n = q.n;
      const bits = q.m.map((h) => [...h].map((c) => parseInt(c, 16).toString(2).padStart(4, '0')).join('').slice(-n));
      const on = (x, y) => bits[y] && bits[y][x] === '1';
      const inEye = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
      const c0 = Math.floor(n / 2) - 4, c1 = c0 + 8;                 // the middle 9x9 holds the badge
      const inBadge = (x, y) => x >= c0 && x <= c1 && y >= c0 && y <= c1;
      const mod = (x, y) => {
        switch (q.mod) {
          case 'dot': return `<circle cx="${x + .5}" cy="${y + .5}" r=".46"/>`;
          case 'rounded': return `<rect x="${x + .06}" y="${y + .06}" width=".88" height=".88" rx=".32"/>`;
          case 'diamond': return `<path d="M${x + .5} ${y - .04}l.54 .54-.54 .54-.54-.54z"/>`;
          case 'leaf': return `<path d="M${x + .5} ${y + .02}h.48v.48a.48 .48 0 0 1-.48 .48h-.48v-.48a.48 .48 0 0 1 .48-.48z"/>`;
          default: return `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`;
        }
      };
      let dots = '';
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (on(x, y) && !inEye(x, y) && !inBadge(x, y)) dots += mod(x, y);
      const eye = (x, y) => {
        const ring = `fill="none" stroke="${q.eye_c}" stroke-width="1"`;
        const ball = `fill="${q.ball_c}"`;
        switch (q.eye) {
          case 'circle': return `<circle cx="${x + 3.5}" cy="${y + 3.5}" r="3" ${ring}/><circle cx="${x + 3.5}" cy="${y + 3.5}" r="1.55" ${ball}/>`;
          case 'rounded': return `<rect x="${x + .5}" y="${y + .5}" width="6" height="6" rx="1.9" ${ring}/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx=".95" ${ball}/>`;
          case 'leaf': return `<path d="M${x + 3.5} ${y + .5}h3v3a3 3 0 0 1-3 3h-3v-3a3 3 0 0 1 3-3z" ${ring}/><path d="M${x + 3.5} ${y + 2}h1.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-1.5v-1.5a1.5 1.5 0 0 1 1.5-1.5z" ${ball}/>`;
          case 'frame': return `<rect x="${x + .5}" y="${y + .5}" width="6" height="6" rx=".7" ${ring}/><circle cx="${x + 3.5}" cy="${y + 3.5}" r="1.6" ${ball}/>`;
          default: return `<rect x="${x + .5}" y="${y + .5}" width="6" height="6" ${ring}/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" ${ball}/>`;
        }
      };
      const b0 = c0 + .6, bs = 7.8;
      svg.setAttribute('viewBox', `-2 -2 ${n + 4} ${n + 4}`);
      svg.innerHTML =
        `<rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" rx="2.4" fill="#fff"/>` +
        `<g fill="${q.fg}">${dots}</g>${eye(0, 0)}${eye(n - 7, 0)}${eye(0, n - 7)}` +
        `<rect x="${b0}" y="${b0}" width="${bs}" height="${bs}" rx="2" fill="${d.bg}"/>` +
        `<text x="${b0 + bs / 2}" y="${b0 + bs / 2 + 1.35}" text-anchor="middle" font-size="3.6" font-weight="700" font-family="Inter, sans-serif" fill="${d.ink}">${esc(d.logo)}</text>`;
    };

    // long event names shrink to fit the ticket instead of being cut off
    const fitName = () => {
      const inp = tkEl.querySelector('[data-hx-edit="name"]');
      if (!inp) return;
      inp.style.fontSize = '';
      let fs = parseFloat(getComputedStyle(inp).fontSize);
      while (inp.scrollWidth > inp.clientWidth + 1 && fs > 13) { fs -= 1; inp.style.fontSize = `${fs}px`; }
    };
    const render = (d) => {
      cur = d; scanned = false;
      tkEl.className = `hx-ticket pat-${d.pattern} font-${d.font}`;
      tkEl.style.cssText = `--bg:${d.bg};--bg2:${d.bg2};--ink:${d.ink};--accent:${d.accent};--stub:${d.qr.stub}`;
      tkEl.innerHTML = `
        <div class="hx-tk-main">
          <div class="hx-tk-top"><span class="hx-logo">${esc(d.logo)}</span><span class="hx-cat">${esc(d.cat)}</span><span class="hx-type">${esc(d.type)}</span></div>
          <label class="hx-name"><span class="sr-only">Event name</span><input type="text" value="${esc(d.name)}" maxlength="30" spellcheck="false" autocomplete="off" data-hx-edit="name"></label>
          <p class="hx-meta"><span><small>Date</small>${esc(d.date)}</span><span><small>Time</small>${esc(d.time)}</span><span><small>Venue</small>${esc(d.venue)}</span></p>
          <p class="hx-guest">Guest <label><span class="sr-only">Guest name</span><input type="text" value="${esc(d.guest)}" maxlength="22" spellcheck="false" autocomplete="off" data-hx-edit="guest"></label></p>
          <span class="hx-stamp" aria-hidden="true">Admitted</span>
        </div>
        <div class="hx-tk-stub">
          <button type="button" class="hx-qr-btn" data-hx-scan aria-label="Scan this ticket"><svg class="hx-qr" aria-hidden="true"></svg><i class="hx-laser"></i><span class="hx-ok" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
          <small class="mono">SCAN AT ENTRY</small>
          <b class="mono">${esc(d.code)}</b>
        </div>`;
      drawDesignQR(tkEl.querySelector('.hx-qr'), d);
      if (evName) evName.textContent = d.name;
      fitName();
      tkEl.querySelectorAll('[data-hx-edit]').forEach((inp) => {
        inp.addEventListener('input', () => {
          const v = inp.value.trim();
          if (inp.dataset.hxEdit === 'name') { if (evName) evName.textContent = v || 'Your Event'; fitName(); }
          if (inp.dataset.hxEdit === 'guest') cur = { ...cur, guest: v || 'Guest' };
        });
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') inp.blur(); });
      });
      try { localStorage.setItem('tg-hero-design', String(d.id)); } catch (e) { /* private mode */ }
    };

    // a different design on every visit
    let last = null;
    try { last = Number(localStorage.getItem('tg-hero-design')); } catch (e) { /* private mode */ }
    const pick = (not) => { const pool = DESIGNS.filter((d) => d.id !== not); return pool[Math.floor(Math.random() * pool.length)]; };
    render(pick(last));
    document.fonts?.ready.then(fitName);   // the display fonts arrive after the first draw

    const toast = (html, kind) => {
      if (!toastEl) return;
      toastEl.className = `hx-toast is-on${kind ? ' is-' + kind : ''}`;
      toastEl.innerHTML = html;
      clearTimeout(toastEl._t);
      toastEl._t = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
    };
    const initials = (nm) => nm.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();
    const TICK = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const addRow = (name, type, ch, checked) => {
      const li = document.createElement('li');
      li.className = 'hx-row is-new';
      li.innerHTML = `<span class="hx-av">${esc(initials(name))}</span><span class="hx-who"><b>${esc(name)}</b><small>${esc(type)}</small></span>` +
        `<span class="hx-ch hx-ch--${ch === 'SMS' ? 'sms' : ch === 'WhatsApp' ? 'wa' : 'mail'}">${esc(ch)}</span>` +
        (checked ? `<span class="hx-st is-in">${TICK}Checked in</span>` : '<span class="hx-st">Sent</span>');
      list.prepend(li);
      while (list.children.length > 3) list.lastElementChild.remove();
      requestAnimationFrame(() => li.classList.remove('is-new'));
    };

    // tap the QR: it scans
    hx.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-hx-scan]');
      if (!btn || busy) return;
      busy = true;
      tkEl.classList.add('is-scanning');
      setTimeout(() => {
        tkEl.classList.remove('is-scanning');
        busy = false;
        if (scanned) { toast(`<b>Already scanned</b><span>${esc(cur.guest)} came in a minute ago · entry refused</span>`, 'warn'); tkEl.classList.add('is-refused'); setTimeout(() => tkEl.classList.remove('is-refused'), 700); return; }
        scanned = true;
        tkEl.classList.add('is-admitted');
        nIn += 1; if (chk) chk.textContent = fmt(nIn);
        addRow(cur.guest, cur.type, 'Email', true);
        toast(`<b>${TICK} Checked in</b><span>${esc(cur.guest)} · Gate A · just now</span>`, 'ok');
      }, reduceMotion ? 50 : 900);
    });

    // "New design": swap the ticket
    one('[data-hx-next]')?.addEventListener('click', () => {
      if (busy) return;
      const next = pick(cur.id);
      if (reduceMotion) { render(next); return; }
      busy = true;
      tkEl.classList.add('is-flip-out');
      setTimeout(() => {
        render(next);
        tkEl.classList.add('is-flip-in');
        requestAnimationFrame(() => requestAnimationFrame(() => tkEl.classList.remove('is-flip-in')));
        busy = false;
      }, 260);
    });

    // the ticket follows the cursor a little
    const wrap = one('[data-hx-tilt]');
    if (wrap && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
      wrap.addEventListener('pointermove', (e) => {
        const r = wrap.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        wrap.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
        wrap.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
      });
      wrap.addEventListener('pointerleave', () => { wrap.style.setProperty('--rx', '0deg'); wrap.style.setProperty('--ry', '0deg'); });
    }

    // tickets keep going out while nobody is busy with the hero
    let visible = true, hovering = false, editing = false;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hx);
    hx.addEventListener('pointerenter', () => { hovering = true; });
    hx.addEventListener('pointerleave', () => { hovering = false; });
    hx.addEventListener('focusin', () => { editing = true; });
    hx.addEventListener('focusout', () => { setTimeout(() => { editing = hx.contains(document.activeElement); }, 0); });
    const people = [['Maya Chen', 'General Admission', 'Email'], ['Leo Okafor', 'VIP Pass', 'WhatsApp'], ['Nina Park', 'General Admission', 'SMS'], ['Ravi Menon', 'Early Bird', 'Email'], ['Zoe Martin', 'General Admission', 'WhatsApp'], ['Ethan Wright', 'VIP Pass', 'SMS']];
    let k = 0;
    if (!reduceMotion) setInterval(() => {
      if (!visible || hovering || editing || document.hidden) return;
      const [nm, ty, ch] = people[k++ % people.length];
      nGen += 1; if (gen) gen.textContent = fmt(nGen);
      addRow(nm, ty, ch, false);
    }, 3600);
  }

  /* ---------- Product scenes (Clear Wins, Launch Options) ----------
     Each scene is laid out at a fixed size and scaled to its box. The ticket that holds it learns the
     scene's height (--art-h) so its tear line sits right under it. Small interactions, quiet reveals. */
  document.querySelectorAll('[data-fit]').forEach((box) => {
    const sc = box.firstElementChild;
    const holder = box.closest('.cw, .lo3');
    const art = box.closest('.cw-art, .lo3-art');
    const fitScene = () => {
      const k = Math.min(1.15, box.clientWidth / sc.offsetWidth);
      sc.style.setProperty('--fit', k.toFixed(4));
      box.style.height = `${Math.round(sc.offsetHeight * k)}px`;
      if (holder && art) holder.style.setProperty('--art-h', `${art.offsetHeight}px`);
    };
    new ResizeObserver(fitScene).observe(box);
    fitScene();

    new IntersectionObserver((entries, io) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      box.classList.add('is-in');
      io.disconnect();
      box.querySelectorAll('[data-sc-count]').forEach((el) => {        // the payout counts up once
        const to = Number(el.dataset.scCount);
        if (reduceMotion) return;
        const t0 = performance.now();
        const step = (now) => {
          const k = Math.min(1, (now - t0) / 1200);
          el.textContent = '$' + Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString('en-US') + '.00';
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.3 }).observe(box);

    box.querySelectorAll('[data-sc-qr]').forEach((q) => drawBrandQR(q, q.dataset.scQr, 'square'));
    box.querySelectorAll('[data-sc-tpl]').forEach((b) => b.addEventListener('click', () => {   // a template recolours the ticket
      box.querySelector('[data-sc-ticket]')?.style.setProperty('--tc', b.dataset.scTpl);
      box.querySelectorAll('[data-sc-tpl]').forEach((x) => x.classList.toggle('is-on', x === b));
    }));
    box.querySelectorAll('.sc2-gw').forEach((g) => g.addEventListener('click', () => {         // pick a gateway
      box.querySelectorAll('.sc2-gw').forEach((x) => x.classList.toggle('is-on', x === g));
    }));
    box.querySelectorAll('[data-sc-set]').forEach((b) => b.addEventListener('click', () => {   // free or paid event page
      const page = box.querySelector('[data-sc-mode]');
      if (page) page.dataset.scMode = b.dataset.scSet;
      box.querySelectorAll('[data-sc-set]').forEach((x) => x.classList.toggle('is-on', x === b));
    }));
  });
})();
