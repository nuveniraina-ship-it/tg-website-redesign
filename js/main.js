(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // Decorative QR-style pattern (not a scannable code), seeded so it's stable.
  const drawQR = (svg, text) => {
    const SIZE = 25;
    let seed = [...text].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261) >>> 0;
    const rand = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const reserved = (x, y) =>
      (x < 8 && y < 8) || (x > SIZE - 9 && y < 8) || (x < 8 && y > SIZE - 9) ||
      x === 6 || y === 6 || (x >= 16 && x <= 20 && y >= 16 && y <= 20);
    let d = '';
    const finder = (ox, oy) => {
      d += `M${ox} ${oy}h7v7h-7zM${ox + 1} ${oy + 1}v5h5v-5zM${ox + 2} ${oy + 2}h3v3h-3z`;
    };
    finder(0, 0);
    finder(SIZE - 7, 0);
    finder(0, SIZE - 7);
    d += 'M16 16h5v5h-5zM17 17v3h3v-3zM18 18h1v1h-1z';
    for (let i = 8; i < SIZE - 8; i += 2) d += `M${i} 6h1v1h-1zM6 ${i}h1v1h-1z`;
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (!reserved(x, y) && rand() > 0.52) d += `M${x} ${y}h1v1h-1z`;
      }
    }
    svg.innerHTML = `<path fill="currentColor" fill-rule="evenodd" d="${d}"/>`;
  };

  const finalQR = document.querySelector('[data-final-qr]');
  if (finalQR) drawQR(finalQR, 'Your event');

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
  tickets.forEach((sec) => {
    const stub = document.createElement('div');
    stub.className = 'tkt-stub';
    stub.setAttribute('aria-hidden', 'true');
    stub.innerHTML = `<span><b>${sec.dataset.tkt}</b></span>`;
    sec.prepend(stub);
  });

  // every ticket after the first flies in, alternating sides like letters through the window
  const flyers = [...tickets.slice(1), ...document.querySelectorAll('.final-ticket')];
  flyers.forEach((el, i) => {
    const left = i % 2 === 0;
    el.classList.add('fly');
    el.style.setProperty('--fx', left ? '-24vw' : '24vw');
    el.style.setProperty('--fr', left ? '-11deg' : '10deg');
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

  /* ---------- Testimonial stubs: a small QR in the corner of each ---------- */
  document.querySelectorAll('.tq-stub').forEach((stub, i) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'tq-qr');
    svg.setAttribute('viewBox', '0 0 25 25');
    svg.setAttribute('shape-rendering', 'crispEdges');
    svg.setAttribute('aria-hidden', 'true');
    stub.prepend(svg);
    drawQR(svg, `review-${i}`);
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

    const runway = () => ucScroll.offsetHeight - pin.offsetHeight;
    const onUcScroll = () => {
      if (reduceMotion) return show(cards.length - 1);
      const p = Math.min(1, Math.max(0, -ucScroll.getBoundingClientRect().top / runway()));
      const pos = p * cards.length;
      const n = Math.min(cards.length - 1, Math.floor(pos));
      show(n);
      // how far through each use case we are: done = 1, current = 0→1, upcoming = 0
      const seg = (i) => Math.min(1, Math.max(0, pos - i)).toFixed(4);
      railItems.forEach((li, i) => li.style.setProperty('--seg', seg(i)));
      cards.forEach((c, i) => c.style.setProperty('--z', seg(i)));
    };
    let ucTick = false;
    window.addEventListener('scroll', () => {
      if (ucTick) return;
      ucTick = true;
      requestAnimationFrame(() => { onUcScroll(); ucTick = false; });
    }, { passive: true });
    onUcScroll();

    // rail buttons jump to that ticket's slice of the runway
    ucScroll.querySelectorAll('[data-uc-go]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.ucGo);
        const top = ucScroll.getBoundingClientRect().top + window.scrollY + runway() * ((i + 0.5) / cards.length);
        window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ---------- Testimonials: a messy deck that shuffles as you scroll ---------- */
  const tmScroll = document.querySelector('[data-tm-scroll]');
  if (tmScroll) {
    const pin = tmScroll.querySelector('.tm-pin');
    const deck = [...tmScroll.querySelectorAll('[data-tq]')];
    const dots = [...tmScroll.querySelectorAll('[data-tm-dots] li')];
    const nowEl = tmScroll.querySelector('[data-tm-now]');
    const n = deck.length;
    // pile positions by depth (0 = top): x, y, rotation, scale, opacity — deliberately untidy
    const onPhone = phone.matches;
    const PILE = onPhone ? [
      [0, 0, 0, 1, 1],
      [10, -18, 2.5, 0.96, 1],
      [-10, -32, -3.5, 0.92, 1],
      [0, -38, 1.5, 0.9, 0],
    ] : [
      [0, 0, -1.5, 1, 1],
      [30, -16, 5, 0.975, 1],
      [-34, -28, -7, 0.955, 1],
      [44, -40, 9, 0.94, 1],
      [-22, -50, -11, 0.925, 1],
      [0, -58, 3, 0.91, 0],
    ];
    const timers = new Map();
    const set = (card, [x, y, r, s, o], z, unit = 'px') => {
      const k = onPhone ? 1 : window.innerWidth < 960 ? 0.45 : 1;
      card.style.setProperty('--tx', unit === '%' ? `${x}%` : `${x * k}px`);
      card.style.setProperty('--ty', `${y * k}px`);
      card.style.setProperty('--tr', `${r}deg`);
      card.style.setProperty('--ts', s);
      card.style.setProperty('--to', o);
      card.style.setProperty('--tz', z);
    };
    const place = (card, depth) => set(card, PILE[Math.min(depth, PILE.length - 1)], 50 - depth);
    // always swing out to the right (away from the heading), with a little variety per card
    const side = (i) => [i % 2 ? 66 : 78, i % 2 ? -14 : 6, i % 2 ? 19 : 12, 1, 1];

    let top = -1;
    const shuffleTo = (k) => {
      if (k === top) return;
      const prev = top;
      top = k;
      deck.forEach((card, i) => {
        const d = (i - k + n) % n;
        const pd = prev < 0 ? d : (i - prev + n) % n;
        clearTimeout(timers.get(card));
        card.classList.toggle('is-buried', d !== 0);
        if (reduceMotion || prev < 0) return place(card, d);
        if (d - pd > n / 2) {
          // leaving the top: slide out to the side, then tuck under the pile
          set(card, side(i), 60, '%');
          timers.set(card, setTimeout(() => place(card, d), 330));
        } else if (pd - d > n / 2) {
          // coming back (scrolling up): slip out from under the pile, then land on top
          set(card, side(i), 1, '%');
          timers.set(card, setTimeout(() => place(card, d), 330));
        } else {
          place(card, d);
        }
      });
      if (nowEl) nowEl.textContent = String(k + 1).padStart(2, '0');
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === k));
    };

    const absTop = (el) => { let t = 0; for (let e = el; e; e = e.offsetParent) t += e.offsetTop; return t; };
    const onTmScroll = () => {
      if (reduceMotion || onPhone) return shuffleTo(Math.max(top, 0));
      const run = tmScroll.offsetHeight - pin.offsetHeight;
      const p = Math.min(1, Math.max(0, (window.scrollY - absTop(tmScroll)) / run));
      shuffleTo(Math.min(n - 1, Math.floor(p * n)));
    };
    let tmTick = false;
    window.addEventListener('scroll', () => {
      if (tmTick) return;
      tmTick = true;
      requestAnimationFrame(() => { onTmScroll(); tmTick = false; });
    }, { passive: true });
    window.addEventListener('resize', () => { const k = top; top = -1; shuffleTo(Math.max(k, 0)); });
    onTmScroll();

    // phones: the deck doesn't pin. Tap, swipe or use the arrows to bring up the next review.
    if (onPhone) {
      const deckEl = tmScroll.querySelector('[data-tm-deck]');
      const nav = document.createElement('div');
      nav.className = 'm-deck-nav';
      nav.innerHTML = `<button type="button" aria-label="Previous review"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M15.833 10H4.167M10 15.833 4.167 10 10 4.167" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <span class="mono"><b>01</b> / ${String(n).padStart(2, '0')}</span>
        <button type="button" aria-label="Next review"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
      deckEl.after(nav);
      const [prevBtn, nextBtn] = nav.querySelectorAll('button');
      const nowB = nav.querySelector('b');
      const go = (d) => {
        const k = (top + d + n) % n;
        shuffleTo(k);
        nowB.textContent = String(k + 1).padStart(2, '0');
      };
      // the deck deals the next review by itself; a tap or swipe takes over for a while
      let auto = 0;
      let resume = 0;
      let inView = false;
      const play = () => {
        clearInterval(auto);
        clearTimeout(resume);
        if (inView && !reduceMotion) auto = setInterval(() => go(1), 5000);
      };
      const byHand = (d) => {
        go(d);
        clearInterval(auto);
        clearTimeout(resume);
        resume = setTimeout(play, 9000);
      };
      prevBtn.addEventListener('click', () => byHand(-1));
      nextBtn.addEventListener('click', () => byHand(1));
      deckEl.addEventListener('click', () => byHand(1));
      onSwipe(deckEl, byHand);
      new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; play(); }, { threshold: 0.5 }).observe(deckEl);
      // every review ticket is as tall as the longest one, so the deck never jumps
      const size = () => {
        deckEl.style.removeProperty('--card-h');
        deckEl.style.setProperty('--card-h', `${Math.max(...deck.map((c) => c.offsetHeight))}px`);
      };
      size();
      window.addEventListener('load', size);
      window.addEventListener('resize', size);
    }
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
    drawQR(q('[data-mini-qr]'), 'api-ticket');

    // Route the three delivery wires from the API's centre to the middle of each channel card.
    const wireSvg = wireOut.querySelector('svg');
    const tracks = [...wireSvg.querySelectorAll('.track')];
    const flashes = [...wireSvg.querySelectorAll('.flash')];
    const routeWires = () => {
      const box = wireOut.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const w = box.width;
      const y0 = core.getBoundingClientRect();
      const from = y0.top + y0.height / 2 - box.top;
      wireSvg.setAttribute('viewBox', `0 0 ${w} ${box.height}`);
      dests.forEach((d, i) => {
        const r = d.getBoundingClientRect();
        const to = r.top + r.height / 2 - box.top;
        const path = `M0 ${from} C ${w * 0.55} ${from} ${w * 0.45} ${to} ${w} ${to}`;
        tracks[i]?.setAttribute('d', path);
        flashes[i]?.setAttribute('d', path);
      });
    };
    routeWires();
    const wireRO = new ResizeObserver(routeWires);
    [q('.flow'), core, q('.node-dests')].forEach((el) => el && wireRO.observe(el));
    window.addEventListener('load', routeWires);

    const ROWS = window.matchMedia('(max-width: 768px)').matches ? 3 : 5;   // registrations shown in the app window
    let idx = 0;
    let issued = 0;
    let ticketNo = 540;
    let steps = [];
    const at = (ms, fn) => steps.push(setTimeout(fn, reduceMotion ? 0 : ms));
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
      if (visible && !reduceMotion) autoTimer = setTimeout(() => { if (!pending()) enqueue(); }, 1900);
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
      q('[data-json-name]').textContent = `"${p.name}"`;
      q('[data-json-email]').textContent = `"${p.email}"`;
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

    const fire = q('[data-api-fire]');
    fire.addEventListener('click', () => {
      // at most a window-full waiting, so no registration ever scrolls away unsent
      if (pending() >= ROWS) return restart(fire, 'is-full');
      clearTimeout(autoTimer);
      enqueue();
    });
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

  drawQR(canvas.querySelector('[data-qr]'), 'Annual Client Summit');

  // Template swatches: click one and the whole stage (ticket, tracker, cards) takes that colour.
  const picks = [...canvas.querySelectorAll('[data-theme-pick]')];
  picks.forEach((btn) => btn.addEventListener('click', () => {
    const theme = btn.dataset.themePick;
    if (theme === 'blue') canvas.removeAttribute('data-theme'); else canvas.dataset.theme = theme;
    picks.forEach((b) => b.classList.toggle('is-on', b === btn));
  }));

  // Scale the fixed-size canvas to whatever space the panel has.
  const fitTo = (box, cv) => {
    const { width, height } = box.getBoundingClientRect();
    const pad = phone.matches ? 6 : 24;
    const scale = Math.min(1, (width - pad) / 560, (height - pad) / 540);
    cv.style.setProperty('--scale', Math.max(scale, 0.3).toFixed(3));
  };
  new ResizeObserver(() => fitTo(panel, canvas)).observe(panel);

  // phones: a still copy of the opening scene sits in the hero, taken before anything animates
  let heroShot = null;
  if (phone.matches) {
    heroShot = panel.cloneNode(true);
    heroShot.classList.add('m-shot');
    heroShot.setAttribute('aria-hidden', 'true');
    const shotCanvas = heroShot.querySelector('.stage-canvas');
    shotCanvas.removeAttribute('data-stage');
    new ResizeObserver(() => fitTo(heroShot, shotCanvas)).observe(heroShot);
  }
  const STEP_NAMES = ['Create', 'Sell', 'Send', 'Scan', 'Report'];
  let tabBtns = [];
  let nextStepBtn = null;

  /* Per-scene micro-animations, cancelled whenever the scene changes */
  let timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, reduceMotion ? 0 : ms));
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

  const countUp = (el, to, { prefix = '', from = 0, ms = 900 } = {}) => {
    if (reduceMotion) { el.textContent = prefix + to.toLocaleString('en-US'); return; }
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
    let active = 0;
    steps.forEach((s) => {
      if (s.getBoundingClientRect().top <= line) active = Number(s.dataset.step);
    });
    setState(active);
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

  /* Phones: the hero and the five steps become two tickets. The steps are tabs over the
     animation: tap a step (or swipe) and the ticket plays that part of its journey. */
  if (heroShot) {
    const card = (cls) => { const d = document.createElement('div'); d.className = `m-card ${cls}`; return d; };
    const hero = journey.querySelector('.j-hero');
    const stepsCol = journey.querySelector('.j-steps');
    const intro = stepsCol.querySelector('.j-intro');

    const heroCard = card('m-card--hero');
    hero.before(heroCard);
    heroCard.append(hero, heroShot);

    const stepsCard = card('m-card--steps');
    stepsCol.before(stepsCard);
    const stub = document.createElement('div');
    stub.className = 'tkt-stub';
    stub.setAttribute('aria-hidden', 'true');
    stub.innerHTML = '<span><b>How it works</b></span>';
    stepsCard.append(stub, stepsCol);

    const tabs = document.createElement('div');
    tabs.className = 'm-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'The five steps');
    tabs.innerHTML = STEP_NAMES.map((name) => `<button type="button" role="tab">${name}</button>`).join('');
    intro.after(tabs);
    tabs.after(stageCol);
    tabBtns = [...tabs.children];

    const end = document.querySelector('.j-end');
    if (end) stepsCol.append(end);

    // the steps play on a loop by themselves; tapping a tab or swiping takes over for a while
    const STEP_MS = 4500;
    let auto = 0;
    let resume = 0;
    let inView = false;
    const play = () => {
      clearInterval(auto);
      clearTimeout(resume);
      const on = inView && !reduceMotion;
      tabs.classList.toggle('is-auto', on);
      if (on) auto = setInterval(() => setState((current % 5) + 1), STEP_MS);
    };
    const byHand = (n) => {
      setState(((n - 1 + 5) % 5) + 1);
      clearInterval(auto);
      clearTimeout(resume);
      tabs.classList.remove('is-auto');
      resume = setTimeout(play, 8000);
    };
    tabBtns.forEach((b, i) => b.addEventListener('click', () => byHand(i + 1)));
    onSwipe(stageCol, (d) => byHand(current + d));
    onSwipe(stepRow, (d) => byHand(current + d));
    new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; play(); }, { threshold: 0.35 }).observe(stageCol);
    setState(1);
  }
})();
