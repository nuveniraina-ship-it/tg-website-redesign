/* Pricing page — box office estimator.
   Pick credit packs with the steppers, or type a ticket count and the
   cheapest mix of packs is selected for you. The receipt adds it up. */
(() => {
  const est = document.querySelector('[data-est]');
  if (!est) return;

  const packs = [...est.querySelectorAll('[data-pack]')].map((el) => ({
    el,
    credits: Number(el.dataset.credits),
    price: Number(el.dataset.price),
    qtyEl: el.querySelector('[data-qty]'),
    dec: el.querySelector('[data-dec]'),
    qty: 0,
  }));
  const input = est.querySelector('[data-est-input]');
  const msg = est.querySelector('[data-est-msg]');
  const lines = est.querySelector('[data-est-lines]');
  const creditsEl = est.querySelector('[data-est-credits]');
  const avgEl = est.querySelector('[data-est-avg]');
  const totalEl = est.querySelector('[data-est-total]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MIN = 10;
  const MAX = 10000000;
  const fmt = (n) => n.toLocaleString('en-US');
  const usd = (n, dp = 0) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });

  // Cheapest set of packs covering n credits. Ties go to the option with
  // more credits (same money, more tickets), then to fewer packs.
  const bySize = [...packs].sort((a, b) => b.credits - a.credits);
  const packCount = (o) => Object.values(o.counts).reduce((t, k) => t + k, 0);
  const better = (a, b) => a.cost !== b.cost ? a.cost < b.cost
    : a.credits !== b.credits ? a.credits > b.credits
    : packCount(a) < packCount(b);
  const cheapest = (n, i = 0) => {
    const p = bySize[i];
    if (n <= 0) return { cost: 0, credits: 0, counts: {} };
    if (i === bySize.length - 1) {
      const k = Math.ceil(n / p.credits);
      return { cost: k * p.price, credits: k * p.credits, counts: { [p.credits]: k } };
    }
    const k = Math.floor(n / p.credits);
    const rest = cheapest(n - k * p.credits, i + 1);
    const a = { cost: k * p.price + rest.cost, credits: k * p.credits + rest.credits, counts: { ...rest.counts, [p.credits]: k } };
    const up = Math.ceil(n / p.credits);
    const b = { cost: up * p.price, credits: up * p.credits, counts: { [p.credits]: up } };
    return better(b, a) ? b : a;
  };

  // count-up for the receipt numbers
  const tweens = new WeakMap();
  const animateTo = (el, to, format) => {
    const from = Number(el.dataset.v || 0);
    el.dataset.v = to;
    cancelAnimationFrame(tweens.get(el));
    if (reduceMotion || from === to) { el.textContent = format(to); return; }
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 450);
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = format(from + (to - from) * e);
      if (k < 1) tweens.set(el, requestAnimationFrame(step));
    };
    tweens.set(el, requestAnimationFrame(step));
  };

  const render = () => {
    let credits = 0;
    let cost = 0;
    const html = [];
    packs.forEach((p) => {
      p.qtyEl.textContent = p.qty;
      p.dec.disabled = p.qty === 0;
      p.el.classList.toggle('is-on', p.qty > 0);
      if (!p.qty) return;
      credits += p.qty * p.credits;
      cost += p.qty * p.price;
      html.push(`<li data-key="${p.credits}x${p.qty}"><span>${p.qty} × ${fmt(p.credits)} credits</span><b>${usd(p.qty * p.price)}</b></li>`);
    });

    // only re-print lines that changed, so unchanged ones don't flicker
    const want = html.length ? html : ['<li class="est-empty">Add a credit pack to start</li>'];
    const have = [...lines.children].map((li) => li.outerHTML);
    if (want.join('') !== have.join('')) {
      const tmp = document.createElement('ul');
      tmp.innerHTML = want.join('');
      const keep = new Map([...lines.children].map((li) => [li.dataset.key, li]));
      lines.replaceChildren(...[...tmp.children].map((li) => keep.get(li.dataset.key) || li));
    }

    animateTo(creditsEl, credits, (v) => fmt(Math.round(v)));
    animateTo(totalEl, cost, (v) => usd(Math.round(v)));
    animateTo(avgEl, credits ? cost / credits : 0, (v) => usd(v, 2));
    // phones: the same total in the sticky action bar
    const mTotal = document.querySelector('[data-m-total]');
    if (mTotal) {
      mTotal.textContent = usd(cost);
      document.querySelector('[data-m-credits]').textContent = credits ? `${fmt(credits)} credits` : 'Add a credit pack';
    }
  };

  const bump = (p) => {
    p.el.classList.remove('is-bump');
    void p.el.offsetWidth;
    p.el.classList.add('is-bump');
  };

  packs.forEach((p) => {
    p.el.querySelector('[data-inc]').addEventListener('click', () => {
      p.qty += 1;
      bump(p);
      input.value = '';
      msg.textContent = '';
      render();
    });
    p.dec.addEventListener('click', () => {
      p.qty = Math.max(0, p.qty - 1);
      input.value = '';
      msg.textContent = '';
      render();
    });
  });

  const fromInput = () => {
    const raw = input.value.replace(/[^\d]/g, '');
    msg.classList.remove('is-warn');
    if (!raw) {
      msg.textContent = '';
      return;
    }
    let n = Number(raw);
    if (n > MAX) { n = MAX; input.value = fmt(MAX); msg.classList.add('is-warn'); }
    const wanted = Math.max(MIN, n);
    const best = cheapest(wanted);
    packs.forEach((p) => { p.qty = best.counts[p.credits] || 0; });
    if (n < MIN) {
      msg.classList.add('is-warn');
      msg.textContent = `The minimum is ${MIN} tickets, so we've picked a ${MIN}-credit pack.`;
    } else if (Number(raw) > MAX) {
      msg.textContent = `Estimates go up to ${fmt(MAX)} tickets. For more, talk to us.`;
    } else if (best.credits > wanted) {
      msg.textContent = `Best value: ${fmt(best.credits)} credits for ${usd(best.cost)} covers your ${fmt(wanted)} tickets, with ${fmt(best.credits - wanted)} to spare.`;
    } else {
      msg.textContent = `${fmt(best.credits)} credits for ${usd(best.cost)}, the cheapest mix for ${fmt(wanted)} tickets.`;
    }
    render();
  };

  let typing = 0;
  input.addEventListener('input', () => {
    // keep the field tidy: digits only, with thousands separators
    const digits = input.value.replace(/[^\d]/g, '').slice(0, 9);
    input.value = digits ? fmt(Number(digits)) : '';
    clearTimeout(typing);
    typing = setTimeout(fromInput, 250);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { clearTimeout(typing); fromInput(); }
  });

  render();
})();

/* "What a credit gets you" — the section pins. First the wide blue
   "1 credit = 1 ticket" ticket stands alone; as you scroll it steps back and
   the feature tickets fly in from both sides, then the row slides sideways
   with the scroll. Position follows the scroll with a little easing. */
(() => {
  const scroller = document.querySelector('[data-fc-scroll]');
  if (!scroller) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;   // phones get a plain swipe row (css/mobile.css)

  const pin = scroller.querySelector('.fc-pin');
  const hero = scroller.querySelector('[data-fc-hero]');
  const cards = [...scroller.querySelectorAll('[data-fc]')];
  const bar = scroller.querySelector('[data-fc-bar]');
  const now = scroller.querySelector('[data-fc-now]');
  const n = cards.length;
  const GAP = 32;
  const INTRO = 0.22;       // share of the scroll spent on the blue ticket + fly-in
  let step = 362;
  let target = 0;
  let pos = 0;
  let raf = 0;
  let shown = -1;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  // u: 0→1 over the whole pinned scroll
  const place = (u) => {
    const e = clamp(u / INTRO, 0, 1);                           // intro progress
    const x = clamp((u - INTRO) / (1 - INTRO), 0, 1) * (n - 1); // carousel position
    const far = window.innerWidth * 0.55;

    // the blue ticket steps back and fades over the first part of the intro
    const h = ease(clamp(e / 0.55, 0, 1));
    hero.style.transform = `translate3d(0, ${(-h * 40).toFixed(1)}px, 0) scale(${(1 - h * 0.18).toFixed(3)})`;
    hero.style.opacity = (1 - h).toFixed(3);
    hero.style.visibility = h >= 1 ? 'hidden' : '';

    cards.forEach((card, i) => {
      // the row is a loop: each ticket takes the shortest way round, so there are
      // always tickets on both sides (one only jumps sides while it's faded out)
      let d = (((i - x) % n) + n) % n;
      if (d > n / 2) d -= n;
      const a = Math.abs(d);
      const k = Math.min(a, 3);
      const scale = 1 - k * 0.08;
      let lift = k * k * 7;                    // neighbours drop slightly: a gentle arc
      let tilt = clamp(d * 2.4, -7, 7);
      let fade = a > 3.4 ? 0 : 1 - clamp(a - 0.6, 0, 3) * 0.3;
      let tx = d * step;
      // fly in from their side once the blue ticket starts stepping back, nearest first
      const f = ease(clamp((e - 0.25) / 0.75 * 1.3 - a * 0.12, 0, 1));
      const side = Math.sign(d) || 0;
      tx += (1 - f) * side * far;
      lift += (1 - f) * 110;
      tilt += (1 - f) * side * 14;
      fade *= f;
      card.style.transform = `translate3d(${tx.toFixed(1)}px, ${lift.toFixed(1)}px, 0) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = fade.toFixed(3);
      card.style.zIndex = String(100 - Math.round(a * 10));
    });
    bar?.style.setProperty('--fc-p', (x / (n - 1)).toFixed(4));
    const centre = Math.round(x) % n;
    const key = e < 1 ? -1 : centre;
    if (key !== shown) {
      shown = key;
      if (now) now.textContent = String(centre + 1).padStart(2, '0');
      // only the ticket in focus is reachable by keyboard / screen readers
      cards.forEach((card, i) => card.toggleAttribute('inert', key === -1 || i !== centre));
      hero.toggleAttribute('inert', key !== -1);
    }
  };

  const read = () => {
    const run = scroller.offsetHeight - pin.offsetHeight;
    const top = scroller.getBoundingClientRect().top - parseFloat(getComputedStyle(pin).top || 0);
    // small holds at both ends: the blue ticket gets a moment alone, and so does the last one
    target = clamp((-top / run - 0.06) / 0.9, 0, 1);
  };

  const tick = () => {
    pos += (target - pos) * 0.16;
    if (Math.abs(target - pos) < 0.00005) pos = target;
    place(pos);
    raf = pos === target ? 0 : requestAnimationFrame(tick);
  };

  const measure = () => {
    step = cards[0].offsetWidth + GAP;
    read();
    pos = target;
    place(pos);
  };

  window.addEventListener('scroll', () => {
    read();
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
  window.addEventListener('resize', measure);
  measure();
})();
