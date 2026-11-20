/* ASRIN GROUP — interactions */
(function () {
  'use strict';
  const d = document, w = window, html = d.documentElement, body = d.body;
  const RM = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesk = () => w.matchMedia('(min-width: 1025px)').matches;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));

  // Remember language choice
  $$('[data-setlang]').forEach((a) => a.addEventListener('click', () => { try { localStorage.setItem('asrin-lang', a.dataset.setlang); } catch (e) {} }));
  try { localStorage.setItem('asrin-lang', body.dataset.lang); } catch (e) {}

  /* ---------- Split headings into lines ---------- */
  function split(el) {
    if (el.dataset.splitDone) return;
    const nodes = Array.from(el.childNodes);
    const frag = d.createDocumentFragment();
    nodes.forEach((n) => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(d.createTextNode(' ')); return; }
          const s = d.createElement('span'); s.className = 'sw'; s.textContent = part; frag.appendChild(s);
        });
      } else if (n.nodeName === 'BR') {
        const s = d.createElement('span'); s.className = 'sw sw--br'; frag.appendChild(s);
      } else {
        const s = d.createElement('span'); s.className = 'sw'; s.appendChild(n.cloneNode(true)); frag.appendChild(s);
      }
    });
    el.innerHTML = ''; el.appendChild(frag);
    // group words by line
    const words = $$('.sw', el); let lines = []; let top = null, cur = null;
    words.forEach((wd) => {
      if (wd.classList.contains('sw--br')) { top = null; return; }
      const t = wd.offsetTop;
      if (top === null || Math.abs(t - top) > 4) { cur = []; lines.push(cur); top = t; }
      cur.push(wd);
    });
    el.innerHTML = '';
    lines.forEach((ln) => {
      const o = d.createElement('span'); o.className = 'sl';
      const i = d.createElement('span');
      ln.forEach((wd, k) => { i.appendChild(wd.firstChild.nodeType === 3 && wd.childNodes.length === 1 ? d.createTextNode(wd.textContent) : wd.firstChild); if (k < ln.length - 1) i.appendChild(d.createTextNode(' ')); });
      o.appendChild(i); el.appendChild(o);
    });
    el.dataset.splitDone = '1';
  }

  /* ---------- Navigation ---------- */
  const nav = $('[data-nav]');
  let lastY = 0;
  function onScrollNav(y) {
    const heroH = ($('.hero, .phero, .prj, .nf') || { offsetHeight: 0 }).offsetHeight;
    nav.classList.toggle('is-solid', y > Math.max(80, heroH - 90));
    const down = y > lastY + 4, up = y < lastY - 4;
    if (down && y > 300 && !body.classList.contains('menu-open')) nav.classList.add('is-hidden');
    else if (up || y < 300) nav.classList.remove('is-hidden');
    body.classList.toggle('past-hero', y > heroH * 0.6);
    lastY = y;
  }

  // menu
  const menu = $('#menu'), openBtn = $('[data-menu-open]'), closeBtn = $('[data-menu-close]');
  let lenis;
  function openMenu() {
    menu.hidden = false; body.classList.add('menu-open'); openBtn.setAttribute('aria-expanded', 'true');
    lenis && lenis.stop();
    if (w.gsap && !RM) {
      gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: .8, ease: 'expo.inOut' });
      gsap.fromTo($$('.menu__big a', menu), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: .05, ease: 'expo.out', delay: .35 });
      gsap.fromTo($$('.menu__small, .menu__foot', menu), { opacity: 0 }, { opacity: 1, duration: .8, delay: .7 });
    }
    setTimeout(() => closeBtn.focus(), 50);
  }
  function closeMenu() {
    const done = () => { menu.hidden = true; body.classList.remove('menu-open'); openBtn.setAttribute('aria-expanded', 'false'); lenis && lenis.start(); openBtn.focus(); };
    if (w.gsap && !RM) gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: .6, ease: 'expo.inOut', onComplete: done }); else done();
  }
  openBtn && openBtn.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  $$('.menu a').forEach((a) => a.addEventListener('click', () => { if (a.getAttribute('href').includes('#') && a.pathname === location.pathname) closeMenu(); }));
  d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) closeMenu(); });

  /* ---------- Lightbox ---------- */
  const lb = $('[data-lb-root]');
  let group = [], idx = 0, lastFocus = null;
  const lbImg = $('[data-lb-img]', lb), lbVid = $('[data-lb-video]', lb), lbCap = $('[data-lb-cap]', lb), lbCount = $('[data-lb-count]', lb);
  function show(i) {
    idx = (i + group.length) % group.length;
    const a = group[idx];
    lbCap.textContent = a.dataset.caption || '';
    lbCount.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(group.length).padStart(2, '0')}`;
    if (a.dataset.video) {
      lbImg.hidden = true; lbVid.hidden = false; lbVid.src = a.getAttribute('href'); lbVid.play().catch(() => {});
    } else {
      lbVid.pause(); lbVid.hidden = true; lbVid.removeAttribute('src'); lbImg.hidden = false;
      lbImg.classList.add('is-loading');
      const im = new Image(); im.onload = () => { lbImg.src = im.src; lbImg.alt = a.dataset.caption || ''; requestAnimationFrame(() => lbImg.classList.remove('is-loading')); };
      im.src = a.getAttribute('href');
    }
    const multi = group.length > 1;
    $('[data-lb-prev]', lb).hidden = !multi; $('[data-lb-next]', lb).hidden = !multi; lbCount.hidden = !multi;
  }
  function openLb(a) {
    const name = a.dataset.lightbox;
    group = $$(`[data-lightbox="${name}"]`).filter((x) => !x.closest('[hidden]'));
    lastFocus = a; lb.hidden = false; requestAnimationFrame(() => lb.classList.add('is-open'));
    lenis && lenis.stop(); body.style.overflow = 'hidden';
    show(group.indexOf(a)); $('[data-lb-close]', lb).focus();
  }
  function closeLb() {
    lb.classList.remove('is-open'); lbVid.pause();
    setTimeout(() => { lb.hidden = true; lbVid.removeAttribute('src'); }, 350);
    lenis && lenis.start(); body.style.overflow = ''; lastFocus && lastFocus.focus();
  }
  d.addEventListener('click', (e) => {
    const a = e.target.closest('[data-lightbox]');
    if (a) { e.preventDefault(); openLb(a); }
  });
  $('[data-lb-close]', lb).addEventListener('click', closeLb);
  $('[data-lb-prev]', lb).addEventListener('click', () => show(idx - 1));
  $('[data-lb-next]', lb).addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lightbox__stage')) closeLb(); });
  d.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'Tab') { const f = $$('button:not([hidden])', lb); const i = f.indexOf(d.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
  });
  let tx0 = null;
  lb.addEventListener('touchstart', (e) => { tx0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => { if (tx0 === null) return; const dx = e.changedTouches[0].clientX - tx0; if (Math.abs(dx) > 50 && group.length > 1) show(idx + (dx < 0 ? 1 : -1)); tx0 = null; });

  /* ---------- Project filter tabs ---------- */
  const tabs = $('[data-tabs]');
  if (tabs) {
    const setF = (f) => {
      $$('[data-filter]', tabs).forEach((b) => { const on = b.dataset.filter === f; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on); });
      let n = 0;
      $$('.pcard').forEach((c) => { const show = f === 'all' || c.dataset.status === f; c.hidden = !show; if (show) n++; });
      $$('[data-empty]').forEach((e) => { e.hidden = !(e.dataset.empty === f && n === 0); });
      w.ScrollTrigger && ScrollTrigger.refresh();
    };
    $$('[data-filter]', tabs).forEach((b) => b.addEventListener('click', () => { setF(b.dataset.filter); history.replaceState(null, '', b.dataset.filter === 'all' ? location.pathname : '#' + b.dataset.filter); }));
    const h = location.hash.slice(1);
    if (['completed', 'building', 'planned'].includes(h)) setF(h);
  }
  const gtabs = $('[data-gtabs]');
  if (gtabs) {
    $$('[data-gfilter]', gtabs).forEach((b) => b.addEventListener('click', () => {
      const f = b.dataset.gfilter;
      $$('[data-gfilter]', gtabs).forEach((x) => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', x === b); });
      $$('.gitem').forEach((g) => { g.hidden = !(f === 'all' || g.dataset.group === f); });
      w.ScrollTrigger && ScrollTrigger.refresh();
    }));
  }

  /* ---------- Contact form → WhatsApp / email ---------- */
  $$('[data-form]').forEach((form) => {
    const qp = new URLSearchParams(location.search).get('p');
    if (qp) { const opt = $$('option', form).find((o) => o.value.toLowerCase().includes(qp.toLowerCase())); if (opt) opt.selected = true; }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const via = (e.submitter && e.submitter.value) || 'wa';
      const f = Object.fromEntries(new FormData(form));
      const err = $('[data-form-error]', form);
      if (!f.name.trim() || (!f.phone.trim() && !f.email.trim())) { err.textContent = form.dataset.required; err.hidden = false; return; }
      err.hidden = true;
      const labels = $$('.field span', form).map((s) => s.textContent.replace(' *', ''));
      const lines = [`${labels[0]}: ${f.name}`, f.phone && `${labels[1]}: ${f.phone}`, f.email && `${labels[2]}: ${f.email}`, f.project && `${labels[3]}: ${f.project}`, f.message && `\n${f.message}`].filter(Boolean).join('\n');
      if (via === 'wa') w.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
      else location.href = `mailto:${form.dataset.mail}?subject=${encodeURIComponent(form.dataset.subject + (f.project ? ' — ' + f.project : ''))}&body=${encodeURIComponent(lines)}`;
    });
  });

  /* ---------- Videos: play only when visible ---------- */
  const vio = 'IntersectionObserver' in w ? new IntersectionObserver((es) => es.forEach((en) => {
    const v = en.target;
    if (en.isIntersecting) { if (v.preload === 'none') { v.preload = 'auto'; v.load(); } if (!RM) v.play().catch(() => {}); } else v.pause();
  }), { rootMargin: '200px 0px' }) : null;
  $$('video[data-autoplay], [data-hero-video], .prj__video').forEach((v) => { if (RM) { v.removeAttribute('autoplay'); v.pause(); } vio && vio.observe(v); });

  /* ---------- Hover list floating image ---------- */
  const flt = $('[data-hover-float]');
  if (flt && w.matchMedia('(hover: hover)').matches) {
    const fi = $('img', flt); let x = 0, y = 0, cx = 0, cy = 0, raf;
    const loop = () => { cx += (x - cx) * .14; cy += (y - cy) * .14; flt.style.left = cx + 'px'; flt.style.top = cy + 'px'; raf = requestAnimationFrame(loop); };
    $$('[data-hover-img]').forEach((a) => {
      a.addEventListener('mouseenter', () => { fi.src = a.dataset.hoverImg; flt.classList.add('is-on'); if (!raf) loop(); });
      a.addEventListener('mouseleave', () => { flt.classList.remove('is-on'); });
    });
    d.addEventListener('mousemove', (e) => { x = e.clientX + 200; y = e.clientY; });
  }


  /* ---------- Cursor & magnetic buttons ---------- */
  if (w.matchMedia('(hover: hover) and (pointer: fine)').matches && !RM) {
    const c = d.createElement('div'); c.className = 'cursor'; c.innerHTML = '<span></span>'; body.appendChild(c);
    const lab = c.firstChild; let mx = -100, my = -100, cx = -100, cy = -100;
    d.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; c.classList.add('is-on'); });
    d.addEventListener('mouseleave', () => c.classList.remove('is-on'));
    (function loop() { cx += (mx - cx) * .2; cy += (my - cy) * .2; c.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; requestAnimationFrame(loop); })();
    d.addEventListener('mouseover', (e) => {
      const t = e.target.closest('[data-cursor], [data-lightbox]');
      if (t) { lab.textContent = t.dataset.cursor || (t.dataset.video ? '▶' : '+'); c.classList.add('is-label'); } else c.classList.remove('is-label');
    });
    $$('[data-magnetic]').forEach((b) => {
      b.addEventListener('mousemove', (e) => { const r = b.getBoundingClientRect(); const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2; b.style.transform = `translate(${x * .22}px, ${y * .3}px)`; });
      b.addEventListener('mouseleave', () => { b.style.transform = ''; });
    });
  }

  /* ---------- Page curtain between pages ---------- */
  const cur = d.createElement('div'); cur.className = 'curtain'; cur.setAttribute('aria-hidden', 'true'); cur.innerHTML = '<i></i><i></i><i></i><i></i><i></i>'; body.appendChild(cur);
  const cols = $$('i', cur);
  if (html.classList.contains('curtain-cover') && w.gsap && !RM) {
    gsap.set(cols, { scaleY: 1, transformOrigin: 'top' }); html.classList.remove('curtain-cover');
    gsap.to(cols, { scaleY: 0, duration: .9, stagger: .06, ease: 'expo.inOut', delay: .1 });
  } else html.classList.remove('curtain-cover');
  d.addEventListener('click', (e) => {
    const a = e.target.closest('a'); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.hasAttribute('download') || a.dataset.lightbox) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash) || !/^\/(tr|en|ru)\//.test(u.pathname) || RM || !w.gsap) return;
    e.preventDefault();
    try { sessionStorage.setItem('asrin-curtain', '1'); } catch (er) {}
    gsap.set(cols, { transformOrigin: 'bottom' });
    gsap.to(cols, { scaleY: 1, duration: .7, stagger: .05, ease: 'expo.inOut', onComplete: () => { location.href = u.href; } });
  });
  w.addEventListener('pageshow', (e) => { if (e.persisted && w.gsap) gsap.set(cols, { scaleY: 0 }); });

  /* ---------- Motion ---------- */
  function initMotion() {
    const gsap = w.gsap, ST = w.ScrollTrigger;
    if (!gsap || !ST || RM) {
      html.classList.add('no-motion');
      $$('[data-split]').forEach((el) => { el.dataset.splitDone = '1'; });
      w.addEventListener('scroll', () => onScrollNav(w.scrollY), { passive: true });
      onScrollNav(w.scrollY);
      $$('[data-count]').forEach((el) => { el.textContent = (+el.dataset.count).toLocaleString('tr-TR'); });
      return;
    }
    gsap.registerPlugin(ST);

    // smooth scroll
    if (w.Lenis) {
      lenis = new Lenis({ lerp: .085, wheelMultiplier: .95, smoothWheel: true, syncTouch: false });
      lenis.on('scroll', (e) => { ST.update(); onScrollNav(e.scroll); });
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { const id = a.getAttribute('href'); if (id.length > 1 && $(id)) { e.preventDefault(); const go = () => lenis.scrollTo($(id), { offset: 0, duration: 1.6, force: true }); if (body.classList.contains('menu-open')) setTimeout(go, 700); else go(); } }));
    } else {
      w.addEventListener('scroll', () => onScrollNav(w.scrollY), { passive: true });
    }
    onScrollNav(w.scrollY);

    // split headings
    $$('[data-split]').forEach(split);
    const heroTitle = $('[data-split="hero"]');
    const heroIntro = () => {
      if (!heroTitle) return;
      const tl = gsap.timeline();
      const hxFrame = $('[data-hx-frame]');
      if (hxFrame) {
        tl.fromTo(hxFrame, { clipPath: 'inset(14% 22% 14% 22% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.9, ease: 'expo.inOut' }, 0)
          .fromTo('.hx__img', { scale: 1.32 }, { scale: w.innerWidth > 760 ? 1.12 : 1, duration: 2.6, ease: 'expo.out' }, .2)
          .fromTo('.hx__sun', { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: 2.4, ease: 'power2.out' }, .9);
      } else {
        const media = $('[data-hero-media]') || $('.phero__media, .prj__media');
        if (media) tl.fromTo(media, { scale: 1.14, opacity: .2 }, { scale: 1, opacity: 1, duration: 2.4, ease: 'expo.out' }, 0);
      }
      tl.fromTo($$('.sl > span', heroTitle), { yPercent: 110 }, { yPercent: 0, duration: 1.5, stagger: .1, ease: 'expo.out' }, hxFrame ? 1.0 : .35)
        .to($$('[data-hero-in]'), { opacity: 1, y: 0, duration: 1.2, stagger: .08, ease: 'expo.out' }, hxFrame ? 1.4 : .9);
      if (hxFrame) tl.call(() => { w.__hxExit && w.__hxExit(); ST.refresh(); });
      gsap.set($$('.phero [data-reveal]'), { opacity: 1, y: 0 });
    };
    // loader (home, first visit in this session)
    const loader = $('[data-loader]');
    if (loader && !html.classList.contains('no-loader')) {
      lenis && lenis.stop();
      const o = { v: 0 }, nEl = $('[data-loader-n]'), bar = $('[data-loader-bar]');
      gsap.timeline({ onComplete: () => { loader.hidden = true; lenis && lenis.start(); try { sessionStorage.setItem('asrin-seen', '1'); } catch (e) {} } })
        .fromTo('.loader__mark', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .9, ease: 'expo.out' })
        .to(o, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => { nEl.textContent = String(Math.round(o.v)).padStart(2, '0'); bar.style.transform = `scaleX(${o.v / 100})`; } }, .2)
        .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '+=.15')
        .add(heroIntro, '-=.75');
    } else {
      if (loader) loader.hidden = true;
      heroIntro();
    }
    $$('[data-split]:not([data-split="hero"])').forEach((el) => {
      gsap.fromTo($$('.sl > span', el), { yPercent: 108 }, { yPercent: 0, duration: 1.3, stagger: .09, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
    });

    // reveals
    ST.batch('[data-reveal]', { start: 'top 90%', onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.15, stagger: .08, ease: 'expo.out', overwrite: true }) });
    $$('[data-clip]').forEach((el) => {
      const im = $('img', el);
      gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 88%' } });
      if (im && !im.hasAttribute('data-parallax-img')) gsap.fromTo(im, { scale: 1.18 }, { scale: 1, duration: 2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });

    // parallax
    $$('[data-parallax]').forEach((el) => {
      const amt = parseFloat(el.dataset.parallax) || .15;
      gsap.fromTo(el, { yPercent: -amt * 30 }, { yPercent: amt * 30, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('[data-parallax-img]').forEach((im) => {
      gsap.fromTo(im, { yPercent: -8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // hero: drift + fade on scroll
    const hero = $('.hero');
    if (hero) {
      gsap.to('.hero__media', { yPercent: 18, scale: 1.06, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero__content, .hero__base', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: '35% top', end: 'bottom top', scrub: true } });
    }

    // counters
    $$('[data-count]').forEach((el) => {
      const n = +el.dataset.count, o = { v: 0 };
      el.textContent = '0';
      gsap.to(o, { v: n, duration: 2.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('tr-TR'); } });
    });

    // horizontal developments
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1025px)', () => {
      const pin = $('[data-hscroll]'), track = $('[data-hscroll-track]');
      if (!pin || !track) return;
      const dist = () => track.scrollWidth - w.innerWidth;
      const htl = gsap.timeline({ scrollTrigger: { trigger: pin, start: 'top top', end: () => '+=' + dist() * 1.25, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
      htl.to({}, { duration: .12 }).to(track, { x: () => -dist(), ease: 'none', duration: 1 }).to({}, { duration: .06 });
      $$('.dcard__media img', track).forEach((im) => gsap.fromTo(im, { xPercent: 6 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: pin, start: 'top top', end: () => '+=' + dist() * 1.1, scrub: true } }));
    });

    // flagship doors: centre-out reveal of the dusk image
    const doors = $('[data-doors]');
    if (doors) {
      const rv = $('[data-doors-reveal]', doors);
      const tl = gsap.timeline({ scrollTrigger: { trigger: doors, start: 'top top', end: 'bottom bottom', scrub: 1.2 } });
      tl.fromTo('.doors__base', { scale: 1.12 }, { scale: 1, ease: 'none', duration: 1 }, 0)
        .fromTo(rv, { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: .7 }, .15)
        .fromTo($('img', rv), { scale: 1.15 }, { scale: 1, ease: 'none', duration: .85 }, .15)
        .fromTo('.doors__text > *', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: .06, duration: .3, ease: 'power2.out' }, .55);
    }

    // lagoon film: inset frame opening as it enters
    const film = $('.lagoon__film');
    if (film) gsap.fromTo(film, { clipPath: 'inset(8% 6% 0% 6% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: film, start: 'top bottom', end: 'top 15%', scrub: true } });

    // completed list stagger
    ST.batch('.done__list li, .tl__item', { start: 'top 92%', onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, stagger: .07, ease: 'expo.out' }) });


    /* ===== v2 home ===== */
    // hero exit: frame shrinks into a card, content lifts away
    const hx = $('[data-hx]');
    if (hx) {
      w.__hxExit = () => {
        const ex = gsap.timeline({ scrollTrigger: { trigger: hx, start: 'top top', end: 'bottom top', scrub: true } });
        ex.fromTo('[data-hx-frame]', { clipPath: 'inset(0% 0% 0% 0% round 0px)' }, { clipPath: 'inset(7% 5% 12% 5% round 22px)', ease: 'none' }, 0)
          .fromTo('.hx__pic', { scale: 1, yPercent: 0 }, { scale: 1.12, yPercent: 5, ease: 'none' }, 0)
          .fromTo('[data-hx-content]', { yPercent: 0, opacity: 1 }, { yPercent: -40, opacity: 0, ease: 'none' }, 0)
          .to('.hx__scroll', { opacity: 0, ease: 'none' }, 0);
      };
      if (w.matchMedia('(hover: hover)').matches) {
        const sun = $('[data-hx-sun]'), im = $('.hx__pic');
        hx.addEventListener('mousemove', (e) => {
          const x = e.clientX / w.innerWidth - .5, y = e.clientY / w.innerHeight - .5;
          gsap.to(im, { x: x * -18, y: y * -12, duration: 1.6, ease: 'power3.out' });
          gsap.to(sun, { x: x * 60, y: y * 40, duration: 2, ease: 'power3.out' });
        });
      }
    }
    // manifesto: words light up as you read
    const mw = $$('[data-words] .mw');
    if (mw.length) ST.create({ trigger: '[data-words]', start: 'top 80%', end: 'bottom 45%', scrub: true, onUpdate: (st) => { const n = Math.round(st.progress * mw.length); mw.forEach((wd, i) => wd.classList.toggle('is-lit', i < n)); } });
    // time-lapse: sweeping light reveals the next hour of the day (same camera, aligned plates)
    const lapse = $('[data-lapse]');
    if (lapse) {
      const steps = $$('.lapse__step', lapse), bar = $('[data-lapse-bar]', lapse);
      const tl = gsap.timeline({ scrollTrigger: { trigger: lapse, start: 'top top', end: 'bottom bottom', scrub: 1, onUpdate: (st) => {
        const p = st.progress; const i = p < .4 ? 0 : p < .75 ? 1 : 2;
        steps.forEach((s, k) => s.classList.toggle('is-on', k === i)); bar.style.transform = `scaleX(${p})`;
      } } });
      tl.fromTo('.lapse__plates', { scale: 1.08 }, { scale: 1, ease: 'none', duration: 1 }, 0)
        .fromTo('[data-plate="1"]', { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', ease: 'power1.inOut', duration: .26 }, .14)
        .fromTo('[data-beam="1"]', { left: '100%', opacity: 1 }, { left: '0%', ease: 'power1.inOut', duration: .26 }, .14)
        .to('[data-beam="1"]', { opacity: 0, duration: .04 }, .4)
        .fromTo('[data-plate="2"]', { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', ease: 'power1.inOut', duration: .26 }, .5)
        .fromTo('[data-beam="2"]', { left: '100%', opacity: 1 }, { left: '0%', ease: 'power1.inOut', duration: .26 }, .5)
        .to('[data-beam="2"]', { opacity: 0, duration: .04 }, .76)
        .to({}, { duration: .2 }, .8);
    }
    // amenities: guided tour across the garden
    const amn = $('[data-amn]');
    if (amn) {
      const hs = $$('[data-hs]', amn), items = $$('[data-hs-item]', amn), map = null;
      const pts = hs.map((h) => [parseFloat(h.style.getPropertyValue('--x')), parseFloat(h.style.getPropertyValue('--y'))]);
      let cur = -1;
      const layers = $$('[data-layer]', amn), nEl = $('[data-amn-n]', amn), capEl = $('[data-amn-cap]', amn);
      const setOn = (i, zoom) => {
        if (i === cur) return; cur = i;
        hs.forEach((h, k) => h.classList.toggle('is-on', k === i)); items.forEach((h, k) => h.classList.toggle('is-on', k === i));
        const to = items[i].dataset.layerTo || 'map';
        layers.forEach((l) => { const on = l.dataset.layer === to; if (on && !l.classList.contains('is-on')) { l.classList.remove('is-on'); void l.offsetWidth; } l.classList.toggle('is-on', on); });
        if (nEl) nEl.textContent = String(i + 1).padStart(2, '0');
        if (capEl) { capEl.classList.remove('is-in'); void capEl.offsetWidth; capEl.textContent = items[i].dataset.cap || ''; capEl.classList.add('is-in'); }
        if (map) { if (zoom && to === 'map') { map.style.setProperty('--fx', pts[i][0] + '%'); map.style.setProperty('--fy', pts[i][1] + '%'); map.style.transform = 'scale(1.5)'; map.style.setProperty('--z', '1.5'); } else { map.style.transform = ''; map.style.setProperty('--z', '1'); } }
      };
      hs.forEach((h, i) => h.addEventListener('click', () => setOn(i, true)));
      items.forEach((h, i) => h.addEventListener('click', () => setOn(i, true)));
      setOn(0, false);
      gsap.matchMedia().add('(min-width: 1025px)', () => {
        const st = ST.create({ trigger: amn, start: 'top top', end: () => '+=' + w.innerHeight * 2.6, pin: '.amn__pin', scrub: true, onUpdate: (s) => setOn(Math.min(items.length - 1, Math.floor(s.progress * items.length)), true), onLeaveBack: () => { if (map) map.style.transform = ''; } });
        return () => st.kill();
      });
    }
    // reel: dark filmstrip — the frame nearest the centre comes forward
    gsap.matchMedia().add('(min-width: 1025px)', () => {
      const pin = $('[data-reel]'), track = $('[data-reel-track]');
      if (!pin || !track) return;
      const items = $$('[data-reel-item]', track), nEl = $('[data-reel-n]'), bar = $('[data-reel-bar]'), word = $('[data-reel-word]');
      const dist = () => track.scrollWidth - w.innerWidth + w.innerWidth * .1;
      const focus = () => {
        const c = w.innerWidth / 2; let best = 0, bd = 1e9;
        items.forEach((it, i) => {
          const r = it.getBoundingClientRect(), m = r.left + r.width / 2, dd = Math.abs(m - c);
          const k = Math.min(1, dd / (w.innerWidth * .6));
          it.style.transform = `scale(${1 - k * .14})`; it.style.opacity = String(1 - k * .55);
          if (dd < bd) { bd = dd; best = i; }
        });
        nEl.textContent = String(best + 1).padStart(2, '0');
      };
      const t = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: pin, start: 'top top', end: () => '+=' + dist() * 1.15, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1, onUpdate: (s) => { bar.style.transform = `scaleX(${s.progress})`; } } });
      gsap.ticker.add(focus);
      gsap.fromTo(word, { xPercent: 0 }, { xPercent: -30, ease: 'none', scrollTrigger: { trigger: pin, start: 'top top', end: () => '+=' + dist() * 1.15, scrub: true } });
      $$('img', track).forEach((im) => gsap.fromTo(im, { xPercent: -5 }, { xPercent: 5, ease: 'none', scrollTrigger: { trigger: im.closest('figure'), containerAnimation: t, start: 'left right', end: 'right left', scrub: true } }));
      return () => gsap.ticker.remove(focus);
    });
    // Gazipaşa: the word opens into a window onto the bay
    const gz = $('[data-gz]');
    if (gz && w.innerWidth > 1024) {
      const mob = w.innerWidth < 761;
      gsap.timeline({ scrollTrigger: { trigger: gz, start: 'top top', end: 'bottom bottom', scrub: 1 } })
        .fromTo('[data-gz-window]', { clipPath: mob ? 'inset(38% 22% 38% 22% round 300px)' : 'inset(34% 38% 34% 38% round 300px)' }, { clipPath: mob ? 'inset(4% 4% 4% 4% round 4px)' : 'inset(7% 5% 7% 5% round 4px)', ease: 'power2.inOut', duration: .55 }, 0)
        .fromTo('[data-gz-window] img', { scale: 1.35 }, { scale: 1, ease: 'none', duration: 1 }, 0)
        .fromTo('[data-gz-word]', { scale: 1, opacity: 1 }, { scale: 1.9, opacity: 0, ease: 'power2.in', duration: .5 }, .08)
        .fromTo('[data-gz-window]', { '--shade': 0 }, { '--shade': 1, duration: .3 }, .5)
        .fromTo('[data-gz-info]', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .3, ease: 'power2.out' }, .6)
        .to({}, { duration: .15 });
    }
    // portfolio: stacking cards, the one underneath recedes
    // bridge: a rounded window opens onto the sea view, the line rises
    const brg = $('[data-brg]');
    if (brg && w.innerWidth > 1024) {
      gsap.timeline({ scrollTrigger: { trigger: brg, start: 'top top', end: 'bottom bottom', scrub: 1 } })
        .fromTo('[data-brg-win]', { clipPath: 'inset(32% 36% 32% 36% round 400px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut', duration: .6 }, 0)
        .fromTo('[data-brg-win] img', { scale: 1.3 }, { scale: 1, ease: 'none', duration: 1 }, 0)
        .fromTo('[data-brg-line]', { yPercent: 60, opacity: 0, letterSpacing: '.04em' }, { yPercent: 0, opacity: 1, letterSpacing: '-.02em', ease: 'power3.out', duration: .45 }, .3)
        .fromTo('[data-brg-sub]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .3 }, .55)
        .to({}, { duration: .2 });
    }
    // background colour follows the section
    $$('[data-bg]').forEach((sec) => ST.create({ trigger: sec, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => { if (s.isActive) body.dataset.bgc = sec.dataset.bg; } }));

    // refresh after media loads
    w.addEventListener('load', () => ST.refresh());
    d.fonts && d.fonts.ready.then(() => ST.refresh());
  }

  let started = false;
  const start = () => { if (started) return; started = true; try { initMotion(); } finally { html.classList.add('motion-ready'); } };
  (d.fonts && d.fonts.ready ? Promise.race([d.fonts.ready, new Promise((r) => setTimeout(r, 1500))]) : Promise.resolve()).then(start);
  // ensure nav state even before load
  onScrollNav(w.scrollY);
})();

/* mobile reel counter (native swipe) */
(() => {
  const tr = document.querySelector('.reel__track');
  const n = document.querySelector('[data-reel-n]');
  const bar = document.querySelector('[data-reel-bar]');
  if (!tr || !n) return;
  const items = [...tr.querySelectorAll('[data-reel-item]')];
  let raf = 0;
  tr.addEventListener('scroll', () => {
    if (window.innerWidth > 1024) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const c = tr.scrollLeft + tr.clientWidth * .35;
      let i = 0; items.forEach((it, k) => { if (it.offsetLeft <= c) i = k; });
      n.textContent = String(i + 1).padStart(2, '0');
      if (bar) bar.style.transform = `scaleX(${(i + 1) / items.length})`;
    });
  }, { passive: true });
})();

/* v4: in-view classes, ethos cursor image, mobile amenity autoplay */
(() => {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add(e.target.dataset.inClass || 'is-in'); io.unobserve(e.target); } }), { threshold: .15 });
  document.querySelectorAll('.mf__media, [data-lagoon-frame], [data-brg]').forEach((el) => io.observe(el));
  document.querySelectorAll('[data-acx]').forEach((el) => { el.dataset.inClass = 'is-drawn'; io.observe(el); });

  const fl = document.querySelector('[data-ethos-float]');
  if (fl && window.matchMedia('(hover: hover) and (min-width: 761px)').matches) {
    const figs = [...fl.querySelectorAll('[data-ef]')];
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, on = false;
    const loop = () => { x += (tx - x) * .14; y += (ty - y) * .14; fl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${(tx - x) * .02}deg)`; raf = requestAnimationFrame(loop); };
    document.querySelectorAll('[data-ethos-item]').forEach((it) => {
      it.addEventListener('mouseenter', (e) => { const i = +it.dataset.ethosItem; figs.forEach((f, k) => f.classList.toggle('is-on', k === i)); if (!on) { x = tx = e.clientX + 120; y = ty = e.clientY; } on = true; fl.classList.add('is-on'); if (!raf) loop(); });
      it.addEventListener('mousemove', (e) => { tx = e.clientX + 140; ty = e.clientY; });
      it.addEventListener('mouseleave', () => { on = false; fl.classList.remove('is-on'); figs.forEach((f) => f.classList.remove('is-on')); });
    });
    window.addEventListener('scroll', () => { if (on) { fl.classList.remove('is-on'); on = false; } }, { passive: true });
  }

  const amn = document.querySelector('[data-amn]');
  if (amn && window.innerWidth <= 1024) {
    const items = [...amn.querySelectorAll('[data-hs-item]')];
    let i = 0, t = 0, vis = false;
    const vio = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { threshold: .4 });
    vio.observe(amn.querySelector('.amn__stage'));
    const tick = () => { if (vis && !document.hidden) { i = (i + 1) % items.length; items[i].click(); } };
    t = setInterval(tick, 3400);
    items.forEach((it, k) => it.addEventListener('pointerdown', () => { clearInterval(t); i = k; }));
  }
})();

/* v5: manifesto image follows the pointer gently */
(() => {
  const m = document.querySelector('[data-mf-media]');
  if (!m || !window.matchMedia('(hover: hover)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const im = m.querySelector('img');
  m.addEventListener('pointermove', (e) => { const r = m.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; im.style.setProperty('--px', (-x * 22).toFixed(1) + 'px'); im.style.setProperty('--py', (-y * 22).toFixed(1) + 'px'); });
  m.addEventListener('pointerleave', () => { im.style.setProperty('--px', '0px'); im.style.setProperty('--py', '0px'); });
})();

/* v5: apartment explorer — tabs, animated area, ruler, measuring cursor, auto tour on first view */
(() => {
  const ux = document.querySelector('[data-ux]'); if (!ux) return;
  const tabs = [...ux.querySelectorAll('[data-ux-tab]')], ghosts = [...ux.querySelectorAll('[data-ux-ghost]')];
  const fill = ux.querySelector('[data-ux-fill]'), num = ux.querySelector('[data-ux-num]'), kEl = ux.querySelector('[data-ux-k]'), dEl = ux.querySelector('[data-ux-d]');
  const beds = [...ux.querySelectorAll('.ux__bed')], eq = ux.querySelector('[data-ux-eq]'), cta = ux.querySelector('[data-ux-cta]'), ctak = ux.querySelector('[data-ux-ctak]');
  const rx = ux.querySelector('[data-ux-rx]'), ry = ux.querySelector('[data-ux-ry]'), stage = ux.querySelector('[data-ux-stage]');
  const cross = ux.querySelector('[data-ux-cross]'), cl = ux.querySelector('[data-ux-cl]');
  const M = ux.dataset.unitM, MAX = Math.sqrt(180), lang = document.documentElement.lang || 'en';
  const fmt = (n) => n.toLocaleString(lang, { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = -1, raf = 0, shown = [50, 50], auto = 0, touched = false;
  const count = (to) => {
    cancelAnimationFrame(raf); const from = shown.slice(), t0 = performance.now(), dur = reduce ? 0 : 900;
    const step = (t) => { const p = dur ? Math.min(1, (t - t0) / dur) : 1, e = 1 - Math.pow(1 - p, 3); shown = [Math.round(from[0] + (to[0] - from[0]) * e), Math.round(from[1] + (to[1] - from[1]) * e)]; num.textContent = shown[0] === shown[1] ? shown[0] : `${shown[0]}–${shown[1]}`; if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  };
  const set = (i) => {
    if (i === cur) return; cur = i; const t = tabs[i];
    tabs.forEach((b, k) => { b.classList.toggle('is-on', k === i); b.setAttribute('aria-selected', k === i); });
    ux.querySelector('.ux__tabs').style.setProperty('--ti', i);
    ghosts.forEach((g, k) => g.classList.toggle('is-on', k === i));
    fill.style.setProperty('--s', t.dataset.side + '%');
    const a0 = +t.dataset.a0, a1 = +t.dataset.a1; count([a0, a1]);
    kEl.textContent = t.dataset.k; dEl.textContent = t.dataset.d; ctak.textContent = t.dataset.k; cta.href = t.dataset.wa;
    const nb = +t.dataset.beds; beds.forEach((b, k) => b.classList.toggle('is-off', k >= nb));
    const sd = Math.sqrt((a0 + a1) / 2); rx.textContent = ry.textContent = `≈ ${fmt(sd)} ${M}`;
    eq.textContent = `≈ ${fmt(sd)} × ${fmt(sd)} ${M}`;
    kEl.animate && !reduce && kEl.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 600, easing: 'cubic-bezier(.22,.8,.2,1)' });
  };
  const stop = () => { touched = true; clearInterval(auto); };
  tabs.forEach((b, i) => { b.addEventListener('click', () => { stop(); set(i); }); b.addEventListener('mouseenter', () => { if (window.matchMedia('(hover: hover)').matches) { stop(); set(i); } }); });
  ux.querySelector('.ux__tabs').addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); stop(); const n = (cur + (e.key === 'ArrowRight' ? 1 : 3)) % 4; set(n); tabs[n].focus(); } });
  // measuring cursor + hover a ghost square to select it
  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect(), x = Math.max(0, Math.min(r.width, e.clientX - r.left)), y = Math.max(0, Math.min(r.height, e.clientY - r.top));
    stage.style.setProperty('--cx', x + 'px'); stage.style.setProperty('--cy', y + 'px');
    const mx = x / r.width * MAX, my = (r.height - y) / r.height * MAX, m = Math.max(mx, my);
    let hit = -1; tabs.forEach((t, k) => { if (hit < 0 && m <= Math.sqrt((+t.dataset.a0 + +t.dataset.a1) / 2)) hit = k; });
    ghosts.forEach((g, k) => g.classList.toggle('is-hov', k === hit));
    cl.textContent = `${fmt(mx)} × ${fmt(my)} ${M}` + (hit >= 0 ? ` · ${tabs[hit].dataset.k}` : '');
  });
  stage.addEventListener('pointerleave', () => ghosts.forEach((g) => g.classList.remove('is-hov')));
  stage.addEventListener('click', () => { const h = ghosts.findIndex((g) => g.classList.contains('is-hov')); if (h >= 0) { stop(); set(h); } });
  set(0);
  // auto tour once, when the block first comes into view
  const io = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting || touched || reduce) return; io.disconnect();
    let i = 0; auto = setInterval(() => { i++; if (i > 3 || touched) { clearInterval(auto); return; } set(i); }, 1500);
  }, { threshold: .55 });
  io.observe(ux);
})();

/* v6: apartment panels — hover (desktop) / tap (touch) opens a panel */
(() => {
  const ps = [...document.querySelectorAll('[data-apx-p]')]; if (!ps.length) return;
  const hover = window.matchMedia('(hover: hover) and (min-width: 761px)').matches;
  const on = (p) => ps.forEach((x) => x.classList.toggle('is-on', x === p));
  ps.forEach((p) => {
    if (hover) p.addEventListener('mouseenter', () => on(p));
    p.addEventListener('focus', () => on(p));
    p.addEventListener('click', (e) => { if (!p.classList.contains('is-on')) { e.preventDefault(); on(p); } });
  });
})();

/* v7: phone galleries become swipeable carousels with a counter */
(() => {
  if (window.innerWidth > 760) return;
  const lang = document.documentElement.lang;
  const hint = { tr: 'Kaydırın →', en: 'Swipe →', ru: 'Листайте →' }[lang] || 'Swipe →';
  document.querySelectorAll('.masonry').forEach((m) => {
    const ui = document.createElement('div'); ui.className = 'gcar__ui';
    ui.innerHTML = '<span class="gcar__n"><b>01</b> / <span></span></span><span class="gcar__bar"><i></i></span><span class="gcar__hint">' + hint + '</span>';
    m.after(ui);
    const nb = ui.querySelector('b'), tot = ui.querySelector('.gcar__n span'), bar = ui.querySelector('i');
    const upd = () => {
      const items = [...m.children].filter((c) => !c.hidden && c.offsetParent !== null);
      const n = items.length || 1; tot.textContent = String(n).padStart(2, '0');
      const w = items[0] ? items[0].getBoundingClientRect().width + 10 : 1;
      const i = Math.min(n - 1, Math.round(m.scrollLeft / w));
      nb.textContent = String(i + 1).padStart(2, '0'); bar.style.transform = `scaleX(${(i + 1) / n})`;
    };
    let raf = 0; m.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(upd); }, { passive: true });
    upd();
    document.addEventListener('click', (e) => { if (e.target.closest('[data-filter]')) setTimeout(() => { m.scrollLeft = 0; upd(); }, 60); });
  });
})();

/* v8 — process block: reveal + rail progress */
(() => {
  const root = document.querySelector('[data-pr3]');
  if (!root) return;
  const steps = [...root.querySelectorAll('[data-pr3-step]')];
  const rail = root.querySelector('.pr3__rail');
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in'); io.unobserve(e.target);
  }), { threshold: 0.18 });
  io.observe(root); steps.forEach((s) => io.observe(s));
  let raf = 0;
  const upd = () => {
    raf = 0;
    const r = root.getBoundingClientRect(), vh = innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height * 0.75)));
    if (rail) rail.style.setProperty('--p', p.toFixed(3));
  };
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
  addEventListener('resize', upd); upd();
})();
