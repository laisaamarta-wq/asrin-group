import { L, LANGS, LANG_META, SITE, ROUTES, UI, FORM, PROJECTS, CITY, LAGOON, GAZIPASA, ABOUT, STATS, PILLARS, PROCESS, MILESTONES, FAQ, HOME, PAGES } from './content.mjs';
import { ALT } from './alts.mjs';
import { LOGO_MARK, LOGO_ASRIN, LOGO_GROUP, ICONS } from './svg.mjs';
import { lapseSection, amenSection, apxPanels } from './home2.mjs';

export let IMG = {}; // filled by build: name -> {w,h,widths:[]}
export const setImageManifest = (m) => { IMG = m; };

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const tx = (v, lang) => (v && typeof v === 'object' && 'tr' in v ? v[lang] : v);

// ---------- URLs ----------
export const url = (lang, route = 'home', sub = '') => {
  const slug = ROUTES[route][lang];
  let p = `/${lang}/`;
  if (slug) p += `${slug}/`;
  if (sub) p += `${sub}/`;
  return p;
};
const projectUrl = (lang, slug) => url(lang, 'projects', slug);
const wa = (text) => `https://wa.me/${SITE.wa}?text=${encodeURIComponent(text)}`;

// ---------- Images ----------
export function img(name, lang, { sizes = '100vw', cls = '', eager = false, alt, attrs = '' } = {}) {
  const m = IMG[name];
  if (!m) throw new Error('Missing image ' + name);
  const srcset = m.widths.map((w) => `/assets/img/${name}-${w}.webp ${w}w`).join(', ');
  const src = `/assets/img/${name}-${m.widths[Math.min(1, m.widths.length - 1)]}.webp`;
  const a = alt ?? tx(ALT[name], lang) ?? '';
  return `<img class="${cls}" src="${src}" srcset="${srcset}" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(a)}" ${eager ? 'fetchpriority="high"' : (attrs.includes('data-eager') ? '' : 'loading="lazy"')} decoding="async" ${attrs}>`;
}
const full = (name) => { const m = IMG[name]; return `/assets/img/${name}-${m.widths[m.widths.length - 1]}.webp`; };

// lightbox-able figure
function lbFig(name, lang, group, { sizes = '50vw', cls = '', caption } = {}) {
  const cap = caption ?? tx(ALT[name], lang);
  return `<a class="lb ${cls}" href="${full(name)}" data-lightbox="${group}" data-caption="${esc(cap)}" data-w="${IMG[name].w}" data-h="${IMG[name].h}">${img(name, lang, { sizes })}<span class="lb__zoom" aria-hidden="true">${ICONS.plus}</span></a>`;
}

// ---------- Logo ----------
export const logo = (variant = 'light') => `<svg class="logo logo--${variant}" viewBox="0 0 223 67" role="img" aria-label="ASRIN GROUP"><defs><linearGradient id="lg-${variant}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16AEEA"/><stop offset="1" stop-color="#1F5E9C"/></linearGradient></defs><path d="${LOGO_MARK}" fill="url(#lg-${variant})" fill-rule="evenodd"/><path class="logo__asrin" transform="translate(81 0)" d="${LOGO_ASRIN}" fill-rule="evenodd"/><path class="logo__group" transform="translate(81 38)" d="${LOGO_GROUP}" fill-rule="evenodd"/></svg>`;

// ---------- Head ----------
function head({ lang, title, desc, path, alternates, ogImage = 'ac-hero', jsonld = [], noindex = false }) {
  const t = title.includes('ASRIN') ? title : `${title} · ASRIN GROUP`;
  const og = full(ogImage);
  const alt = alternates ? LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE.url}${alternates[l]}">`).join('') + `<link rel="alternate" hreflang="x-default" href="${SITE.url}${alternates.tr}">` : '';
  const org = {
    '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: 'ASRIN GROUP', alternateName: 'ASRIN İNŞAAT',
    url: SITE.url, logo: `${SITE.url}/assets/brand/asrin-group-logo.svg`, image: `${SITE.url}${og}`, telephone: SITE.phone, email: SITE.email, foundingDate: '1990',
    address: { '@type': 'PostalAddress', streetAddress: 'Pazarcı Mah. Uğur Mumcu Cad. Asrın Apt. 101/1', addressLocality: 'Gazipaşa', addressRegion: 'Antalya', postalCode: '07900', addressCountry: 'TR' },
    areaServed: 'Gazipaşa, Antalya',
  };
  const ld = [org, ...jsonld].map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/<\/?strong>/g, '')}</script>`).join('');
  return `<!doctype html>
<html lang="${LANG_META[lang].html}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="format-detection" content="telephone=no">
<title>${esc(t)}</title>
<meta name="description" content="${esc(String(desc).replace(/<[^>]+>/g, ''))}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${SITE.url}${path}">
${alt}
<meta property="og:type" content="website">
<meta property="og:site_name" content="ASRIN GROUP">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(String(desc).replace(/<[^>]+>/g, ''))}">
<meta property="og:url" content="${SITE.url}${path}">
<meta property="og:image" content="${SITE.url}${og}">
<meta property="og:locale" content="${LANG_META[lang].locale}">
${LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${LANG_META[l].locale}">`).join('')}
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0B1B2E">
<link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/cormorant-${lang === 'ru' ? 'cyrillic' : 'latin'}-300-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/manrope-${lang === 'ru' ? 'cyrillic' : 'latin'}-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css?v=__V__">
<script>(function(h){try{if(sessionStorage.getItem('asrin-seen'))h.classList.add('no-loader');if(sessionStorage.getItem('asrin-curtain')){h.classList.add('curtain-cover');sessionStorage.removeItem('asrin-curtain')}}catch(e){}if(!matchMedia('(prefers-reduced-motion: reduce)').matches){h.classList.add('js');setTimeout(function(){if(!h.classList.contains('motion-ready'))h.classList.add('no-motion');h.classList.remove('curtain-cover')},5000)}else{h.classList.add('no-loader')}})(document.documentElement)</script>
${ld}
</head>`;
}

// ---------- Nav ----------
function nav(lang, alternates, current) {
  const items = [
    ['projects', url(lang, 'projects'), UI.nav.projects],
    ['city', projectUrl(lang, 'asrin-city-gazipasa'), UI.nav.city],
    ['lagoon', projectUrl(lang, 'blue-lagoon-village'), UI.nav.lagoon],
    ['about', url(lang, 'about'), UI.nav.about],
    ['gallery', url(lang, 'gallery'), UI.nav.gallery],
    ['contact', url(lang, 'contact'), UI.nav.contact],
  ];
  const langs = LANGS.map((l) => `<a href="${alternates[l]}" hreflang="${l}" lang="${l}" class="lang__opt${l === lang ? ' is-active' : ''}" data-setlang="${l}" ${l === lang ? 'aria-current="true"' : ''}>${LANG_META[l].short}</a>`).join('<span class="lang__sep" aria-hidden="true"></span>');
  const menuLinks = [
    [url(lang, 'home'), UI.cta.home],
    [url(lang, 'projects'), UI.nav.projects],
    [projectUrl(lang, 'asrin-city-gazipasa'), 'Asrin City Gazipaşa'],
    [projectUrl(lang, 'blue-lagoon-village'), 'Blue Lagoon Village'],
    [url(lang, 'about'), UI.nav.about],
    [url(lang, 'gallery'), UI.nav.gallery],
    [url(lang, 'contact'), UI.nav.contact],
  ];
  const menuSmall = [
    [url(lang, 'about') + '#team', UI.nav.team],
    [url(lang, 'projects') + '#completed', UI.nav.completed],
    [url(lang, 'videos'), UI.nav.videos],
    [url(lang, 'news'), UI.nav.news],
    [url(lang, 'faq'), UI.nav.faq],
  ];
  return `<a class="skip" href="#main">${tx(UI.skip, lang)}</a>
<header class="nav" data-nav>
  <div class="nav__inner">
    <a class="nav__logo" href="${url(lang)}" aria-label="ASRIN GROUP — ${tx(UI.cta.home, lang)}">${logo('nav')}</a>
    <nav class="nav__links" aria-label="${tx(UI.menu, lang)}">
      ${items.map(([k, h, l]) => `<a href="${h}" class="nav__link${current === k ? ' is-current' : ''}" ${current === k ? 'aria-current="page"' : ''}><span>${tx(l, lang)}</span></a>`).join('')}
    </nav>
    <div class="nav__end">
      <div class="lang" role="group" aria-label="${tx(UI.lang, lang)}">${langs}</div>
      <a class="btn btn--wa nav__wa" href="${wa(tx(UI.waText, lang))}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>WhatsApp</span></a>
      <button class="nav__burger" type="button" aria-expanded="false" aria-controls="menu" data-menu-open><span class="sr">${tx(UI.menu, lang)}</span><i></i><i></i></button>
    </div>
  </div>
</header>
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="${tx(UI.menu, lang)}" hidden>
  <div class="menu__bg" aria-hidden="true">${img('ac-blue', lang, { sizes: '100vw', alt: '' })}</div>
  <div class="menu__inner">
    <div class="menu__top">
      <a class="nav__logo" href="${url(lang)}">${logo('menu')}</a>
      <button class="menu__close" type="button" data-menu-close><span class="sr">${tx(UI.close, lang)}</span>${ICONS.close}</button>
    </div>
    <nav class="menu__nav">
      <ol class="menu__big">${menuLinks.map(([h, l], i) => `<li><a href="${h}"><span class="menu__n">0${i + 1}</span>${tx(l, lang)}</a></li>`).join('')}</ol>
      <ul class="menu__small">${menuSmall.map(([h, l]) => `<li><a href="${h}">${tx(l, lang)}</a></li>`).join('')}</ul>
    </nav>
    <div class="menu__foot">
      <div class="lang lang--menu">${langs}</div>
      <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a>
      <a href="mailto:${SITE.email}">${SITE.email}</a>
    </div>
  </div>
</div>`;
}

// ---------- Footer ----------
function footer(lang, alternates) {
  const col = (title, links) => `<div class="foot__col"><h3 class="eyebrow">${tx(title, lang)}</h3><ul>${links.map(([h, l, ext]) => `<li><a href="${h}"${ext ? ' target="_blank" rel="noopener"' : ''}>${tx(l, lang)}</a></li>`).join('')}</ul></div>`;
  return `<footer class="foot foot--min" data-theme="dark">
  <div class="wrap fm">
    <div class="fm__top">
      <p class="fm__tag" data-split>${tx(UI.tagline, lang)}</p>
      <a class="fm__cta" data-magnetic href="${wa(tx(UI.waText, lang))}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>${tx(UI.cta.contact, lang)}</span>${ICONS.arrowR}</a>
    </div>
    <div class="fm__mid">
      <a href="${url(lang)}" class="fm__logo" aria-label="ASRIN GROUP">${logo('foot')}</a>
      <nav class="fm__nav" aria-label="${tx(UI.nav.projects, lang)}">
        <a href="${url(lang, 'projects')}">${tx(UI.nav.projects, lang)}</a>
        <a href="${projectUrl(lang, 'asrin-city-gazipasa')}">Asrin City</a>
        <a href="${projectUrl(lang, 'blue-lagoon-village')}">Blue Lagoon</a>
        <a href="${url(lang, 'about')}">${tx(UI.nav.about, lang)}</a>
        <a href="${url(lang, 'gallery')}">${tx(UI.nav.gallery || UI.nav.photos, lang)}</a>
        <a href="${url(lang, 'contact')}">${tx(UI.nav.contact, lang)}</a>
      </nav>
      <div class="fm__contact">
        <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a>
        <a class="fm__wa" href="${wa(tx(UI.waText, lang))}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>WhatsApp ${SITE.phoneDisplay}</span></a>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
      </div>
    </div>
    <div class="fm__base">
      <span>© ${new Date().getFullYear()} ASRIN GROUP · Gazipaşa / Antalya</span>
      <div class="lang lang--foot">${LANGS.map((l) => `<a href="${alternates[l]}" hreflang="${l}" data-setlang="${l}" class="lang__opt${l === lang ? ' is-active' : ''}">${l.toUpperCase()}</a>`).join('')}</div>
    </div>
  </div>
</footer>
<nav class="dock" aria-label="${tx(UI.nav.contact, lang)}">
  <a href="${SITE.phoneHref}">${ICONS.phone}<span>${tx(UI.cta.call, lang)}</span></a>
  <a href="${wa(tx(UI.waText, lang))}" target="_blank" rel="noopener" class="dock__wa">${ICONS.whatsapp}<span>WhatsApp</span></a>
  <a href="mailto:${SITE.email}">${ICONS.mail}<span>${tx(UI.cta.email, lang)}</span></a>
</nav>
<a class="wa-float" href="${wa(tx(UI.waText, lang))}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONS.whatsapp}</a>
<div class="lightbox" data-lb-root hidden role="dialog" aria-modal="true" aria-label="${tx(UI.labels.gallery, lang)}">
  <div class="lightbox__stage"><img alt="" data-lb-img><video data-lb-video playsinline controls hidden></video></div>
  <p class="lightbox__cap" data-lb-cap></p>
  <span class="lightbox__count" data-lb-count></span>
  <button class="lightbox__btn lightbox__close" type="button" data-lb-close aria-label="${tx(UI.close, lang)}">${ICONS.close}</button>
  <button class="lightbox__btn lightbox__prev" type="button" data-lb-prev aria-label="←">${ICONS.arrowL}</button>
  <button class="lightbox__btn lightbox__next" type="button" data-lb-next aria-label="→">${ICONS.arrowR}</button>
</div>
<div class="grain" aria-hidden="true"></div>
<script src="/assets/js/vendor/gsap.min.js" defer></script>
<script src="/assets/js/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/vendor/lenis.min.js" defer></script>
<script src="/assets/js/site.js?v=__V__" defer></script>`;
}

export function page({ lang, route, sub = '', title, desc, body, current, ogImage, jsonld, theme = 'dark', bodyClass = '' }) {
  const alternates = Object.fromEntries(LANGS.map((l) => [l, url(l, route, sub)]));
  const path = alternates[lang];
  return `${head({ lang, title, desc, path, alternates, ogImage, jsonld })}
<body class="${bodyClass}" data-hero="${theme}" data-lang="${lang}">
${nav(lang, alternates, current)}
<main id="main">
${body}
</main>
${footer(lang, alternates)}
</body>
</html>`;
}

// ---------- Shared components ----------
const processBlock = (lang) => `<div class="wrap pr2" data-reveal>
    <p class="pr2__eb">${tx(L('Süreç', 'How we build', 'Как мы строим'), lang)}</p>
    <ol class="pr2__list">${PROCESS.map((s, i) => `<li class="pr2__step"><span class="pr2__n">0${i + 1}</span><div class="pr2__txt"><b>${tx(s.t, lang)}</b><p>${tx(s.d, lang)}</p></div></li>`).join('')}</ol>
  </div>`;
const ruUnit = (v, lang) => lang === 'ru' ? String(v).replace(/\bkm\b/g, 'км').replace(/(\d)\s*m\b/g, '$1 м') : String(v);
const ruPlural = (n, one, few, many) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? few : many; };
const inspSection = (lang) => {
  const groups = [
    { id: 'apt', t: UI.labels.apartment, items: CITY.apartment, pic: 'ac-balcony' },
    { id: 'tech', t: UI.labels.technical, items: CITY.technical, pic: 'city-detail' },
  ];
  const count = (n) => lang === 'ru' ? `${n} ${ruPlural(n, 'пункт', 'пункта', 'пунктов')}` : lang === 'tr' ? `${n} özellik` : `${n} features`;
  const stops = CITY.distances;
  return `<div class="wrap insp">
    <div class="insp__acc">${groups.map((g) => `<article class="insp__item" data-insp-item>
      <button class="insp__row" type="button" aria-expanded="false" aria-controls="insp-${g.id}">
        <span class="insp__t">${tx(g.t, lang)}</span>
        <span class="insp__c">${count(g.items.length)}</span>
        <span class="insp__plus" aria-hidden="true"><i></i><i></i></span>
      </button>
      <div class="insp__panel" id="insp-${g.id}" role="region">
        <div class="insp__inner">
          <figure class="insp__img">${img(g.pic, lang, { sizes: '(max-width: 760px) 92vw, 38vw' })}</figure>
          <ul class="insp__list">${g.items.map((a, i) => `<li style="--i:${i}">${tx(a, lang)}</li>`).join('')}</ul>
        </div>
      </div>
    </article>`).join('')}</div>
    <div class="route" data-route>
      <h3 class="route__t">${tx(UI.labels.distances, lang)}</h3>
      <div class="route__track">
        <span class="route__line" aria-hidden="true"><i></i></span>
        <span class="route__home"><em>Asrin City</em></span>
        <ol class="route__stops">${stops.map((d, i) => `<li class="route__stop" style="--i:${i}"><b>${ruUnit(d.v, lang).replace(/\s*(km|m|км|м)$/, '<small>$1</small>')}</b><span>${tx(d.l, lang)}</span></li>`).join('')}</ol>
      </div>
    </div>
  </div>`;
};
const eyebrow = (t, cls = '') => `<p class="eyebrow ${cls}">${t}</p>`;
const btnArrow = (href, label, cls = 'btn--dark', ext = false) => `<a class="btn ${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${label}</span>${ICONS.arrowR}</a>`;
const statusLabel = (p, lang) => tx(UI.status[p.status], lang);

function pageHero(lang, { title, lead, image, eyebrowText, crumbs = [] }) {
  return `<section class="phero" data-theme="dark">
  <div class="phero__media" data-parallax="0.18">${img(image, lang, { sizes: '100vw', eager: true, cls: 'phero__img' })}</div>
  <div class="phero__shade" aria-hidden="true"></div>
  <div class="phero__content wrap">
    <nav class="crumbs" aria-label="breadcrumb"><a href="${url(lang)}">ASRIN GROUP</a>${crumbs.map(([h, l]) => `<span>/</span>${h ? `<a href="${h}">${l}</a>` : `<span aria-current="page">${l}</span>`}`).join('')}</nav>
    ${eyebrowText ? eyebrow(eyebrowText, 'eyebrow--light') : ''}
    <h1 class="phero__title" data-split="hero">${title}</h1>
    ${lead ? `<p class="phero__lead" data-reveal>${lead}</p>` : ''}
  </div>
</section>`;
}

function projectCard(p, lang, { sizes = '(max-width: 760px) 86vw, 33vw', cls = '' } = {}) {
  return `<a class="pcard ${cls}" href="${projectUrl(lang, p.slug)}" data-status="${p.status === 'operating' ? 'completed' : p.status}">
  <div class="pcard__media">${img(p.card, lang, { sizes })}</div>
  <div class="pcard__body">
    <span class="pcard__meta">${tx(p.location, lang)} · ${p.year ? p.year : statusLabel(p, lang)}</span>
    <h3 class="pcard__title">${p.name}</h3>
    <p class="pcard__type">${tx(p.type, lang)}</p>
    <span class="pcard__go" aria-hidden="true">${ICONS.arrowR}</span>
  </div>
</a>`;
}

function contactBlock(lang, { project = '' } = {}) {
  const opts = [`<option value="">${tx(FORM.general, lang)}</option>`, ...PROJECTS.map((p) => `<option value="${p.name}"${p.slug === project ? ' selected' : ''}>${p.name}</option>`)].join('');
  return `<form class="form" data-form novalidate data-subject="${esc(tx(FORM.subject, lang))}" data-required="${esc(tx(FORM.required, lang))}" data-wa="${SITE.wa}" data-mail="${SITE.email}">
  <h3 class="form__title">${tx(FORM.title, lang)}</h3>
  <div class="form__grid">
    <label class="field"><span>${tx(FORM.name, lang)} *</span><input name="name" autocomplete="name" required></label>
    <label class="field"><span>${tx(FORM.phone, lang)}</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel"></label>
    <label class="field"><span>${tx(FORM.email, lang)}</span><input name="email" type="email" autocomplete="email"></label>
    <label class="field"><span>${tx(FORM.project, lang)}</span><select name="project">${opts}</select></label>
    <label class="field field--full"><span>${tx(FORM.message, lang)}</span><textarea name="message" rows="4" placeholder="${esc(tx(FORM.messagePh, lang))}"></textarea></label>
  </div>
  <p class="form__error" data-form-error role="alert" hidden></p>
  <div class="form__send">
    <button class="btn btn--wa" type="submit" value="wa">${ICONS.whatsapp}<span>${tx(FORM.sendWa, lang)}</span></button>
    <button class="btn btn--dark" type="submit" value="mail">${ICONS.mail}<span>${tx(FORM.sendMail, lang)}</span></button>
  </div>
  <p class="form__note">${tx(FORM.note, lang)} ${tx(FORM.consent, lang)}</p>
</form>`;
}

export function contactSection(lang, { title = HOME.contactTitle, project = '', bg = 'ac-balcony' } = {}) {
  return `<section class="contact" id="contact" data-theme="dark">
  <div class="contact__bg" aria-hidden="true" data-parallax="0.12">${img(bg, lang, { sizes: '100vw', alt: '' })}</div>
  <div class="contact__inner wrap">
    <div class="contact__info">
      ${eyebrow(tx(HOME.contactEyebrow, lang), 'eyebrow--gold')}
      <h2 class="h2 h2--light" data-split>${tx(title, lang)}</h2>
      <p class="contact__text" data-reveal>${tx(HOME.contactText, lang)}</p>
      <ul class="contact__ways" data-reveal>
        <li><a href="${SITE.phoneHref}"><span class="contact__k">${tx(FORM.phone, lang)}</span><span class="contact__v">${SITE.phoneDisplay}</span></a></li>
        <li><a href="${wa(project ? tx(UI.waProject, lang).replace('{p}', PROJECTS.find((p) => p.slug === project)?.name) : tx(UI.waText, lang))}" target="_blank" rel="noopener"><span class="contact__k">WhatsApp</span><span class="contact__v">${SITE.phoneDisplay}</span></a></li>
        <li><a href="mailto:${SITE.email}"><span class="contact__k">${tx(FORM.email, lang)}</span><span class="contact__v">${SITE.email}</span></a></li>
        <li><span class="contact__k">${tx(PAGES.contact.office, lang)}</span><address class="contact__v contact__v--addr">${SITE.addressShort}<br>07900 Gazipaşa / Antalya</address></li>
      </ul>
    </div>
    <div class="contact__form" data-reveal>${contactBlock(lang, { project })}</div>
  </div>
</section>`;
}

const amenityList = (lang) => `<ul class="amen">${CITY.amenities.map(([ic, l]) => `<li class="amen__item" data-reveal><span class="amen__ic">${ICONS[ic]}</span><span>${tx(l, lang)}</span></li>`).join('')}</ul>`;

// ---------- HOME ----------
export function homePage(lang) {
  const city = PROJECTS[0], lagoon = PROJECTS[1];
  const completed = PROJECTS.filter((p) => !p.flagship);
  const body = `
<section class="hero" data-theme="dark">
  <div class="hero__media" data-hero-media>
    <video class="hero__video" autoplay muted loop playsinline preload="auto" poster="${full('bl-poster-hero')}" aria-hidden="true" data-hero-video>
      <source src="/assets/video/bl-hero-sm.mp4" type="video/mp4" media="(max-width: 760px)">
      <source src="/assets/video/bl-hero.mp4" type="video/mp4">
    </video>
  </div>
  <div class="hero__shade" aria-hidden="true"></div>
  <div class="hero__content wrap">
    <p class="eyebrow eyebrow--light hero__eyebrow" data-hero-in>${tx(HOME.heroEyebrow, lang)}</p>
    <h1 class="hero__title" data-split="hero">${tx(HOME.heroTitle, lang)}</h1>
    <div class="hero__row">
      <p class="hero__sub" data-hero-in>${tx(HOME.heroSub, lang)}</p>
      <div class="hero__ctas" data-hero-in>
        <a class="btn btn--gold" href="${url(lang, 'projects')}"><span>${tx(UI.cta.explore, lang)}</span>${ICONS.arrowR}</a>
        <a class="btn btn--ghost-light" href="#contact"><span>${tx(UI.cta.contact, lang)}</span></a>
      </div>
    </div>
  </div>
  <div class="hero__base wrap" data-hero-in>
    <span class="hero__scroll"><i></i>${tx(UI.scroll, lang)}</span>
    <span class="hero__cap">${tx(HOME.heroCaption, lang)}</span>
  </div>
</section>

<section class="intro" data-theme="light">
  <div class="wrap intro__grid">
    <div class="intro__head">
      ${eyebrow(tx(ABOUT.eyebrow, lang))}
      <h2 class="statement" data-split>${tx(ABOUT.statement, lang).replace(/(35)/, '<em>$1</em>')}</h2>
    </div>
    <div class="intro__text">
      <p data-reveal>${tx(ABOUT.p1, lang)}</p>
      <p data-reveal>${tx(ABOUT.p3, lang)}</p>
      <a class="link-arrow" href="${url(lang, 'about')}" data-reveal><span>${tx(UI.nav.about, lang)}</span>${ICONS.arrowR}</a>
    </div>
  </div>
  <div class="wrap intro__media">
    <figure class="intro__tall" data-clip>${img('city-detail', lang, { sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-parallax-img' })}</figure>
    <figure class="intro__wide" data-clip>${img('gazipasa-coast', lang, { sizes: '(max-width: 760px) 92vw, 50vw', attrs: 'data-parallax-img' })}<figcaption>Gazipaşa · Antalya</figcaption></figure>
  </div>
  <div class="wrap stats" role="list">
    ${STATS.map((s) => `<div class="stat" role="listitem"><span class="stat__n" ${s.plain ? '' : `data-count="${s.n}"`}>${s.plain ? s.n : s.n.toLocaleString('tr-TR')}</span><span class="stat__l">${tx(s.l, lang)}</span></div>`).join('')}
  </div>
</section>

<section class="dev" data-theme="dark" id="projects">
  <div class="dev__pin" data-hscroll>
    <div class="dev__track" data-hscroll-track>
      <div class="dev__intro">
        ${eyebrow(tx(HOME.projectsEyebrow, lang), 'eyebrow--gold')}
        <h2 class="h2 h2--light" data-split>${tx(HOME.projectsTitle, lang)}</h2>
        <p class="dev__lead">${tx(PAGES.projects.lead, lang)}</p>
        ${btnArrow(url(lang, 'projects'), tx(UI.cta.allProjects, lang), 'btn--ghost-light')}
      </div>
      ${PROJECTS.map((p, i) => `<a class="dcard" href="${projectUrl(lang, p.slug)}">
        <div class="dcard__media">${img(p.card, lang, { sizes: '(max-width: 760px) 80vw, 34vw' })}</div>
        <div class="dcard__body"><span class="dcard__n">0${i + 1}</span><h3>${p.name}</h3><p>${tx(p.location, lang)} · ${p.year || statusLabel(p, lang)}</p></div>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="flag" id="asrin-city">
  <div class="doors" data-doors data-theme="dark">
    <div class="doors__sticky">
      <div class="doors__base" aria-hidden="true">${img('city-hero', lang, { sizes: '100vw', alt: '' })}</div>
      <div class="doors__reveal" data-doors-reveal>${img('city-dusk', lang, { sizes: '100vw' })}</div>
      <div class="doors__shade" aria-hidden="true"></div>
      <div class="doors__text wrap">
        ${eyebrow(tx(HOME.flagship, lang), 'eyebrow--gold')}
        <h2 class="display">Asrin City <em>Gazipaşa</em></h2>
        <p class="doors__lead">${tx(HOME.cityTitle, lang)}</p>
      </div>
    </div>
  </div>
  <div class="flag__body" data-theme="light">
    <div class="wrap flag__grid">
      <div class="flag__lead">
        ${eyebrow(tx(UI.status.completed, lang) + ' · Gazipaşa')}
        <p class="lede" data-reveal>${tx(city.intro, lang)}</p>
        <div class="flag__ctas" data-reveal>
          ${btnArrow(projectUrl(lang, city.slug), tx(UI.cta.discover, lang))}
          <a class="btn btn--wa" href="${wa(tx(UI.waProject, lang).replace('{p}', city.name))}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>WhatsApp</span></a>
        </div>
      </div>
      <dl class="facts">${CITY.facts.map((f) => `<div class="fact" data-reveal><dt>${tx(f.l, lang)}</dt><dd>${tx(f.v, lang)}</dd></div>`).join('')}</dl>
    </div>
    <div class="wrap flag__duo">
      <figure class="flag__a" data-clip>${img('city-pool', lang, { sizes: '(max-width: 760px) 92vw, 58vw', attrs: 'data-parallax-img' })}</figure>
      <figure class="flag__b" data-clip>${img('city-topdown', lang, { sizes: '(max-width: 760px) 92vw, 34vw', attrs: 'data-parallax-img' })}</figure>
    </div>
    <div class="wrap flag__specs">
      <div class="units">
        <h3 class="h3">${tx(UI.labels.units, lang)}</h3>
        <ul>${CITY.units.map((u) => `<li data-reveal><span class="units__k">${tx(u.k, lang)}</span><span class="units__d">${tx(u.d, lang)}</span><span class="units__v">${u.v}</span></li>`).join('')}</ul>
      </div>
      <div>
        <h3 class="h3">${tx(UI.labels.amenities, lang)}</h3>
        ${amenityList(lang)}
      </div>
    </div>
  </div>
</section>

<section class="lagoon" id="blue-lagoon" data-theme="dark">
  <div class="lagoon__film">
    <video class="lagoon__video" muted loop playsinline preload="none" poster="${full('bl-poster-villas')}" data-autoplay aria-hidden="true">
      <source src="/assets/video/bl-villas.mp4" type="video/mp4">
    </video>
    <div class="lagoon__shade" aria-hidden="true"></div>
    <div class="lagoon__head wrap">
      ${eyebrow(tx(HOME.lagoonEyebrow, lang), 'eyebrow--light')}
      <h2 class="display">Blue Lagoon <em>Village</em></h2>
      <p class="lagoon__tag" data-split>${tx(LAGOON.tagline, lang)}</p>
    </div>
  </div>
  <div class="lagoon__body wrap">
    <div class="lagoon__intro">
      <p class="lede lede--light" data-reveal>${tx(lagoon.intro, lang)}</p>
      <div class="lagoon__ctas" data-reveal>
        ${btnArrow(projectUrl(lang, lagoon.slug), tx(UI.cta.discover, lang), 'btn--gold')}
        <a class="btn btn--ghost-light" href="${SITE.blueLagoonSite}" target="_blank" rel="noopener"><span>${tx(UI.cta.book, lang)}</span>${ICONS.ext}</a>
      </div>
    </div>
    <dl class="lagoon__stats">${LAGOON.stats.map((s) => `<div data-reveal><dd>${s.v}</dd><dt>${tx(s.l, lang)}</dt></div>`).join('')}</dl>
  </div>
  <div class="lagoon__rooms wrap">
    ${LAGOON.rooms.map((r) => `<article class="room" data-reveal>
      <div class="room__media">${img(r.img, lang, { sizes: '(max-width: 760px) 86vw, 30vw' })}</div>
      <h3>${tx(r.name, lang)}</h3><p>${tx(r.spec, lang)}</p>
    </article>`).join('')}
  </div>
  <div class="lagoon__strip">
    ${['bl-lagoon-topdown', 'bl-pool-sunset', 'bl-lagoon-stairs', 'bl-terrace-sunset'].map((n) => `<figure data-clip>${img(n, lang, { sizes: '(max-width: 760px) 50vw, 25vw' })}</figure>`).join('')}
  </div>
</section>

<section class="done" data-theme="light">
  <div class="wrap">
    <div class="done__head">
      ${eyebrow(tx(HOME.completedEyebrow, lang))}
      <h2 class="h2" data-split>${tx(HOME.completedTitle, lang)}</h2>
    </div>
    <ol class="done__list" data-hoverlist>
      ${[...completed, city].map((p) => `<li><a href="${projectUrl(lang, p.slug)}" data-hover-img="${full(p.card)}">
        <span class="done__year">${p.year || '—'}</span>
        <span class="done__name">${p.name}</span>
        <span class="done__type">${tx(p.type, lang)}</span>
        <span class="done__thumb">${img(p.card, lang, { sizes: '30vw' })}</span>
        <span class="done__go">${ICONS.arrowR}</span>
      </a></li>`).join('')}
    </ol>
  </div>
  <div class="done__float" aria-hidden="true" data-hover-float><img alt=""></div>
</section>

<section class="ethos" data-theme="light">
  <div class="wrap ethos__grid">
    <div class="ethos__head">
      ${eyebrow(tx(HOME.philosophyEyebrow, lang))}
      <h2 class="h2" data-split>${tx(HOME.philosophyTitle, lang).replace(/\.\s/g, '.<br>')}</h2>
      <p class="ethos__p" data-reveal>${tx(ABOUT.p4, lang)}</p>
    </div>
    <ol class="pillars">${PILLARS.map((p, i) => `<li class="pillar" data-reveal><span class="pillar__n">0${i + 1}</span><h3>${tx(p.t, lang)}</h3><p>${tx(p.d, lang)}</p></li>`).join('')}</ol>
  </div>
  ${processBlock(lang)}
</section>

<section class="place" data-theme="dark">
  <div class="place__media" data-parallax="0.2">${img('gazipasa-09', lang, { sizes: '100vw' })}</div>
  <div class="place__shade" aria-hidden="true"></div>
  <div class="place__inner wrap">
    <h2 class="h2 h2--light place__title" data-split>${tx(GAZIPASA.title, lang)}</h2>
    <p class="place__p" data-reveal>${tx(GAZIPASA.body, lang)}</p>
    <dl class="place__dist">${CITY.distances.map((d) => `<div data-reveal><dd>${d.v}</dd><dt>${tx(d.l, lang)}</dt></div>`).join('')}</dl>
  </div>
</section>

<section class="gal" data-theme="light">
  <div class="wrap gal__head">
    <div>${eyebrow(tx(HOME.galleryEyebrow, lang))}<h2 class="h2" data-split>${tx(HOME.galleryTitle, lang)}</h2></div>
    ${btnArrow(url(lang, 'gallery'), tx(UI.cta.allGallery, lang), 'btn--line')}
  </div>
  <div class="wrap bento">
    ${lbFig('city-vertical', lang, 'home', { cls: 'bento__a', sizes: '(max-width: 760px) 92vw, 33vw' })}
    ${lbFig('bl-approach', lang, 'home', { cls: 'bento__b', sizes: '(max-width: 760px) 92vw, 50vw' })}
    ${lbFig('villa-pool', lang, 'home', { cls: 'bento__c', sizes: '(max-width: 760px) 46vw, 25vw' })}
    ${lbFig('bl-romantic-room', lang, 'home', { cls: 'bento__d', sizes: '(max-width: 760px) 46vw, 25vw' })}
    <a class="bento__e lb lb--video" href="/assets/video/bl-sunset.mp4" data-lightbox="home" data-video="1" data-caption="${esc(tx(LAGOON.films[3].title, lang))} — Blue Lagoon Village">
      ${img('bl-poster-sunset', lang, { sizes: '(max-width: 760px) 92vw, 33vw' })}<span class="lb__play">${ICONS.play}</span>
    </a>
    ${lbFig('gazipasa-08', lang, 'home', { cls: 'bento__f', sizes: '(max-width: 760px) 46vw, 25vw' })}
    ${lbFig('town15-main', lang, 'home', { cls: 'bento__g', sizes: '(max-width: 760px) 46vw, 25vw' })}
  </div>
</section>

${contactSection(lang)}`;
  return page({
    lang, route: 'home', title: tx(PAGES.home.title, lang), desc: tx(PAGES.home.meta, lang), body, current: 'home', ogImage: 'city-hero', bodyClass: 'is-home',
  });
}

// ---------- ABOUT ----------
export function aboutPage(lang) {
  const body = `${pageHero(lang, { title: tx(PAGES.about.title, lang), lead: tx(ABOUT.statement, lang), image: 'ac-lookup', eyebrowText: 'ASRIN İNŞAAT · 1990', crumbs: [[null, tx(PAGES.about.title, lang)]] })}
<section class="story" data-theme="light">
  <div class="wrap story__grid">
    <div class="story__years" aria-hidden="true"><span>1990</span><span>1999</span></div>
    <div class="story__text">
      <p class="lede" data-reveal>${tx(ABOUT.p1, lang)}</p>
      <p data-reveal>${tx(ABOUT.p2, lang)}</p>
      <p data-reveal>${tx(ABOUT.p3, lang)}</p>
      <p class="story__quote" data-reveal>${tx(ABOUT.p4, lang)}</p>
    </div>
  </div>
  <div class="wrap stats" role="list">
    ${STATS.map((s) => `<div class="stat" role="listitem"><span class="stat__n" ${s.plain ? '' : `data-count="${s.n}"`}>${s.plain ? s.n : s.n.toLocaleString('tr-TR')}</span><span class="stat__l">${tx(s.l, lang)}</span></div>`).join('')}
  </div>
</section>
<section class="ethos" data-theme="light">
  <div class="wrap ethos__grid">
    <div class="ethos__head">
      ${eyebrow(tx(HOME.philosophyEyebrow, lang))}
      <h2 class="h2" data-split>${tx(HOME.philosophyTitle, lang).replace(/\.\s/g, '.<br>')}</h2>
    </div>
    <ol class="pillars">${PILLARS.map((p, i) => `<li class="pillar" data-reveal><span class="pillar__n">0${i + 1}</span><h3>${tx(p.t, lang)}</h3><p>${tx(p.d, lang)}</p></li>`).join('')}</ol>
  </div>
  ${processBlock(lang)}
</section>
<section class="team" id="team" data-theme="dark">
  <div class="team__media" data-parallax="0.15">${img('city-pool', lang, { sizes: '100vw' })}</div>
  <div class="team__shade" aria-hidden="true"></div>
  <div class="wrap team__inner">
    ${eyebrow(tx(ABOUT.teamTitle, lang), 'eyebrow--gold')}
    <h2 class="h2 h2--light" data-split>${tx(UI.tagline, lang)}</h2>
    <p data-reveal>${tx(ABOUT.teamBody, lang)}</p>
  </div>
</section>
${timeline(lang)}
${contactSection(lang)}`;
  return page({ lang, route: 'about', title: tx(PAGES.about.title, lang), desc: tx(PAGES.about.meta, lang), body, current: 'about', ogImage: 'city-detail', jsonld: [crumbsLd(lang, [[tx(PAGES.about.title, lang), url(lang, 'about')]])] });
}

function timeline(lang) {
  return `<section class="tl" data-theme="light">
  <div class="wrap">
    ${eyebrow(tx(PAGES.news.title, lang))}
    <h2 class="h2" data-split>${tx(PAGES.news.lead, lang)}</h2>
    <ol class="tl__list">
      ${MILESTONES.map((m) => `<li class="tl__item" data-reveal>
        <span class="tl__y">${tx(m.y, lang)}</span>
        <div class="tl__body"><h3>${tx(m.t, lang)}</h3><p>${tx(m.d, lang)}</p>${m.p ? `<a class="link-arrow" href="${projectUrl(lang, m.p)}"><span>${tx(UI.cta.discover, lang)}</span>${ICONS.arrowR}</a>` : ''}</div>
        ${m.img ? `<figure class="tl__img">${img(m.img, lang, { sizes: '(max-width: 760px) 92vw, 30vw' })}</figure>` : '<span></span>'}
      </li>`).join('')}
    </ol>
  </div>
</section>`;
}

// ---------- PROJECTS ----------
export function projectsPage(lang) {
  const tabs = [['completed', UI.nav.completed, PROJECTS.length]];
  const body = `${pageHero(lang, { title: tx(PAGES.projects.title, lang), lead: tx(PAGES.projects.lead, lang), image: 'ac-road', eyebrowText: 'ASRIN GROUP', crumbs: [[null, tx(PAGES.projects.title, lang)]] })}
<section class="plist" data-theme="light">
  <div class="wrap">
    <div class="tabs" role="tablist" data-tabs>
      ${tabs.map(([k, l, n], i) => `<button role="tab" id="${k}" class="tab${i === 0 ? ' is-active' : ''}" aria-selected="${i === 0}" data-filter="${k}">${tx(l, lang)}<sup>${n}</sup></button>`).join('')}
    </div>
    <div class="pgrid" data-grid>
      ${PROJECTS.map((p, i) => projectCard(p, lang, { cls: i < 2 ? 'pcard--wide' : '', sizes: i < 2 ? '(max-width: 760px) 92vw, 50vw' : '(max-width: 760px) 92vw, 33vw' })).join('')}
    </div>
    <div class="empty" data-empty="building" hidden>
      <p>${tx(PAGES.projects.emptyBuilding, lang)}</p>${btnArrow(url(lang, 'contact'), tx(PAGES.projects.notify, lang))}
    </div>
    <div class="empty" data-empty="planned" hidden>
      <p>${tx(PAGES.projects.emptyPlanned, lang)}</p>${btnArrow(url(lang, 'contact'), tx(PAGES.projects.notify, lang))}
    </div>
  </div>
</section>
${contactSection(lang)}`;
  return page({ lang, route: 'projects', title: tx(PAGES.projects.title, lang), desc: tx(PAGES.projects.meta, lang), body, current: 'projects', ogImage: 'city-dusk', jsonld: [crumbsLd(lang, [[tx(PAGES.projects.title, lang), url(lang, 'projects')]])] });
}

// ---------- PROJECT DETAIL ----------
// Blue Lagoon has its own reception number: swap every call/WhatsApp number on its page (structured data keeps the company number)
const LAGOON_PHONE = { display: '+90 (544) 156 40 41', plain: '+90 544 156 40 41', digits: '905441564041', email: 'info@bluelagoonvillage.net' };
function withPhone(html, ph) {
  return html.split(/(<script type="application\/ld\+json">[\s\S]*?<\/script>)/).map((part, i) => i % 2 ? part : part
    .split(SITE.phoneDisplay).join(ph.display)
    .split(SITE.phone).join(ph.plain)
    .split(SITE.wa).join(ph.digits)
    .split(SITE.email).join(ph.email)).join('');
}
export function projectPage(lang, p) {
  const i = PROJECTS.indexOf(p);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const isCity = p.slug === 'asrin-city-gazipasa';
  const isLagoon = p.slug === 'blue-lagoon-village';
  const isVillas = p.slug === 'special-villas';
  const waMsg = tx(UI.waProject, lang).replace('{p}', p.name);
  const factsBar = `<dl class="pfacts wrap">
    <div><dt>${tx(UI.labels.location, lang)}</dt><dd>${tx(p.location, lang)}</dd></div>
    <div><dt>${tx(UI.labels.type, lang)}</dt><dd>${tx(p.type, lang)}</dd></div>
    <div><dt>${tx(UI.labels.status, lang)}</dt><dd>${statusLabel(p, lang)}</dd></div>
    ${p.date || p.year ? `<div><dt>${tx(UI.labels.year, lang)}</dt><dd>${p.date || p.year}</dd></div>` : isCity ? `<div><dt>${tx(UI.labels.plot, lang)}</dt><dd>5.000 m²</dd></div>` : `<div><dt>${tx(UI.labels.rooms, lang)}</dt><dd>7</dd></div>`}
  </dl>`;

  const cover = isLagoon
    ? `<video class="prj__video" autoplay muted loop playsinline poster="${full('bl-poster-hero')}" aria-hidden="true"><source src="/assets/video/bl-hero-sm.mp4" type="video/mp4" media="(max-width: 760px)"><source src="/assets/video/bl-hero.mp4" type="video/mp4"></video>`
    : `<picture>${p.coverMobile ? `<source media="(max-width: 760px)" srcset="${IMG[p.coverMobile].widths.map((w) => `/assets/img/${p.coverMobile}-${w}.webp ${w}w`).join(', ')}" sizes="100vw">` : ''}${img(p.cover, lang, { sizes: '100vw', eager: true, cls: 'prj__img' })}</picture>`;

  let specifics = '';
  if (isCity) {
    specifics = `
${lapseSection(lang)}
<section class="spec" data-theme="light">
  <div class="wrap spec__facts"><dl class="facts facts--4">${CITY.facts.map((f) => `<div class="fact" data-reveal><dt>${tx(f.l, lang)}</dt><dd>${tx(f.v, lang)}</dd></div>`).join('')}</dl></div>
  <div class="wrap flag__duo">
    <figure class="flag__a" data-clip>${img('ac-pool-gold', lang, { sizes: '(max-width: 760px) 92vw, 58vw', attrs: 'data-parallax-img' })}</figure>
    <figure class="flag__b" data-clip>${img('ac-lookup', lang, { sizes: '(max-width: 760px) 92vw, 34vw', attrs: 'data-parallax-img' })}</figure>
  </div>
  <div class="wrap">
    <h2 class="h2" data-split>${tx(L('Size uygun daireyi seçin.', 'Choose the home that fits you.', 'Выберите свою квартиру.'), lang)}</h2>
    <p class="acx__scale-note" data-reveal>${tx(L('Açmak için bir daireye <span class="only-hover">gelin</span><span class="only-touch">dokunun</span> — fiyatı WhatsApp\'tan sorun.', '<span class="only-hover">Hover</span><span class="only-touch">Tap</span> a home to open it — ask the price on WhatsApp.', '<span class="only-hover">Наведите на квартиру</span><span class="only-touch">Нажмите на квартиру</span>, чтобы раскрыть её, — цену можно узнать в WhatsApp.'), lang)}</p>
    <div class="spec__apx">${apxPanels(lang, 'Asrin City Gazipaşa', ['city-gate', 'ac-golden', 'ac-sunset', 'city-vertical'])}</div>
  </div>
</section>
${amenSection(lang)}
<section class="spec" data-theme="light">
  ${inspSection(lang)}
</section>`;
  }
  if (isVillas) {
    const feats = [
      L('Deniz manzaralı sonsuzluk havuzu', 'Infinity pool facing the sea', 'Бассейн-инфинити с видом на море'),
      L('Traverten teraslar', 'Travertine terraces', 'Травертиновые террасы'),
      L('Mermer merdiven', 'Marble staircase', 'Мраморная лестница'),
      L('Yerden tavana camlar', 'Floor-to-ceiling glazing', 'Панорамные окна в пол'),
      L('Çatı terası', 'Roof terrace', 'Терраса на крыше'),
      L('Deniz ve dağ manzarası', 'Sea and mountain views', 'Вид на море и горы'),
    ];
    const fig = (n, cls) => `<figure class="nv__f ${cls}" data-clip>${lbFig(n, lang, 'nv', { sizes: '(max-width: 760px) 92vw, 60vw' })}</figure>`;
    specifics = `
<section class="nv" data-theme="dark" id="new-villa">
  <div class="wrap">
    <header class="nv__head">
      <p class="eyebrow eyebrow--gold">${tx(L('Yeni · Yakın zamanda tamamlandı', 'New · Recently completed', 'Новинка · Недавно построена'), lang)}</p>
      <h2 class="nv__title" data-split>${tx(L('Denizin üzerinde <em>beyaz bir villa.</em>', 'A white villa <em>above the sea.</em>', 'Белая вилла <em>над морем.</em>'), lang)}</h2>
      <p class="nv__lead" data-reveal>${tx(L('Muz bahçeleriyle çevrili yamaçta yeni villamız: traverten teraslar, açık denize bakan sonsuzluk havuzu ve ışıkla dolu, yerden tavana camlı yaşam alanı.', 'Our newest villa on a hillside among banana terraces: travertine terraces, an infinity pool facing the open sea and a light-filled living space with floor-to-ceiling glass.', 'Наша новая вилла на склоне среди банановых террас: травертиновые террасы, бассейн-инфинити с видом на открытое море и светлая гостиная с окнами в пол.'), lang)}</p>
    </header>
    <div class="nv__grid">
      ${fig('nv-facade', 'nv__a')}
      ${fig('nv-terrace', 'nv__b')}
      <ul class="nv__feats" data-reveal>${feats.map((f) => `<li>${tx(f, lang)}</li>`).join('')}</ul>
      ${fig('nv-living', 'nv__c')}
      ${fig('nv-stairs', 'nv__d')}
      ${fig('nv-pool', 'nv__e')}
    </div>
    <div class="nv__cta" data-reveal>
      <a class="btn btn--wa" href="${wa(tx(UI.waProject, lang).replace('{p}', 'Special Villas — ' + tx(L('yeni villa', 'the new villa', 'новая вилла'), lang)))}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>${tx(L('Villa hakkında sor', 'Ask about the villa', 'Узнать о вилле'), lang)}</span></a>
      <a class="btn btn--line btn--light" href="#gallery">${tx(L('Tüm fotoğraflar', 'All photos', 'Все фото'), lang)}</a>
    </div>
  </div>
</section>`;
  }
  if (isLagoon) {
    specifics = `
<section class="spec spec--lagoon" data-theme="light">
  <div class="wrap"><dl class="facts facts--4">${LAGOON.stats.map((s) => `<div class="fact" data-reveal><dt>${tx(s.l, lang)}</dt><dd>${s.v}</dd></div>`).join('')}</dl></div>
  <div class="wrap">
    <h2 class="h2" data-split>${tx(UI.labels.rooms, lang)}</h2>
    <div class="lagoon__rooms lagoon__rooms--light">
      ${LAGOON.rooms.map((r) => `<article class="room" data-reveal><div class="room__media">${img(r.img, lang, { sizes: '(max-width: 760px) 86vw, 30vw' })}</div><h3>${tx(r.name, lang)}</h3><p>${tx(r.spec, lang)}</p></article>`).join('')}
    </div>
  </div>
  <div class="wrap lg2">
    <div class="lg2__col" data-route>
      <h3 class="lg2__eb">${tx(UI.labels.distances, lang)}</h3>
      <ol class="vroute">
        <li class="vroute__home"><span>Blue Lagoon Village</span></li>
        ${LAGOON.distances.map((d, i) => `<li class="vroute__stop" style="--i:${i}"><b>${ruUnit(lang === 'en' && d.vEn ? d.vEn : lang === 'ru' && d.vRu ? d.vRu : d.v, lang).replace(/\s*(km|m|min|dk|мин|км|м)$/, ' <small>$1</small>')}</b><span>${tx(d.l, lang)}</span></li>`).join('')}
      </ol>
    </div>
    <div class="lg2__col" data-reveal>
      <h3 class="lg2__eb">${tx(UI.labels.rules, lang)}</h3>
      <ul class="lg2__list">${LAGOON.rules.map((r) => `<li>${tx(r, lang)}</li>`).join('')}</ul>
      <p class="lg2__addr">${LAGOON.address}</p>
    </div>
    <div class="lg2__col lg2__col--yoga" data-reveal>
      <h3 class="lg2__eb">${tx(L('Yoga ve inziva', 'Yoga &amp; retreats', 'Йога и ретриты'), lang)}</h3>
      <p class="lg2__p">${tx(LAGOON.yoga, lang)}</p>
      ${btnArrow(SITE.blueLagoonSite, tx(UI.cta.book, lang), 'btn--dark', true)}
    </div>
  </div>
</section>
<section class="films" data-theme="dark">
  <div class="wrap">
    ${eyebrow(tx(UI.labels.films, lang), 'eyebrow--gold')}
    <div class="films__grid">${LAGOON.films.map((f) => filmCard(f, lang, 'lagoon-films')).join('')}</div>
  </div>
</section>`;
  }

  const body = `
<section class="prj${isCity ? ' prj--right' : ''}" data-theme="dark">
  <div class="prj__media" data-parallax="0.16">${cover}</div>
  <div class="prj__shade" aria-hidden="true"></div>
  <div class="prj__content wrap">
    <nav class="crumbs" aria-label="breadcrumb"><a href="${url(lang)}">ASRIN GROUP</a><span>/</span><a href="${url(lang, 'projects')}">${tx(PAGES.projects.title, lang)}</a><span>/</span><span aria-current="page">${p.name}</span></nav>
    <p class="eyebrow eyebrow--light">${tx(p.location, lang)} · ${statusLabel(p, lang)}</p>
    <h1 class="prj__title" data-split="hero">${p.name.replace(/ (\S+)$/, ' <em>$1</em>')}</h1>
    <p class="prj__lead" data-hero-in>${tx(isLagoon ? LAGOON.tagline : p.short, lang)}</p>
  </div>
</section>
${factsBar}
<section class="pintro" data-theme="light">
  <div class="wrap pintro__grid">
    <p class="lede" data-reveal>${tx(p.intro, lang)}</p>
    <div class="pintro__ctas" data-reveal>
      <a class="btn btn--dark" href="#contact"><span>${tx(UI.cta.inquireProject, lang)}</span>${ICONS.arrowR}</a>
      <a class="btn btn--wa" href="${wa(waMsg)}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>WhatsApp</span></a>
      <a class="btn btn--line" href="${SITE.phoneHref}">${ICONS.phone}<span>${SITE.phoneDisplay}</span></a>
    </div>
  </div>
</section>
${specifics}
<section class="pgal" id="gallery" data-theme="light">
  <div class="wrap">
    <div class="gal__head"><div>${eyebrow(`${p.gallery.length} ${tx(UI.labels.photoCount, lang)}${isVillas ? ' · ' + tx(L('tüm villalar', 'all villas', 'все виллы'), lang) : ''}`)}<h2 class="h2">${isVillas ? tx(L('Tüm <em>villalarımız</em>', 'All our <em>villas</em>', 'Все наши <em>виллы</em>'), lang) : tx(UI.labels.gallery, lang)}</h2>${isVillas ? `<p class="gal__note">${tx(L('Önce yeni beyaz villamız, ardından taş duvarlı, kemerli teraslı diğer Special Villas.', 'First our new white villa, then the other Special Villas — stone walls, arched terraces and sea-view pools.', 'Сначала — наша новая белая вилла, дальше — другие Special Villas: каменная кладка, арочные террасы и бассейны с видом на море.'), lang)}</p>` : ''}</div></div>
    ${isVillas ? (() => {
      const nvs = p.gallery.filter((n) => n.startsWith('nv-')), rest = p.gallery.filter((n) => !n.startsWith('nv-'));
      const grp = (label, list) => `<h3 class="gal__sub"><span>${tx(label, lang)}</span><i>${list.length}</i></h3><div class="masonry">${list.map((n) => lbFig(n, lang, p.slug, { sizes: '(max-width: 760px) 92vw, 33vw' })).join('')}</div>`;
      return grp(L('Yeni villa', 'The new villa', 'Новая вилла'), nvs) + grp(L('Diğer villalar', 'Our other villas', 'Другие виллы'), rest);
    })() : `<div class="masonry">${p.gallery.map((n) => lbFig(n, lang, p.slug, { sizes: '(max-width: 760px) 92vw, 33vw' })).join('')}</div>`}
  </div>
</section>
<a class="pnext" href="${projectUrl(lang, next.slug)}" data-theme="dark">
  <div class="pnext__media">${img(next.card, lang, { sizes: '100vw', alt: '' })}</div>
  <div class="pnext__shade" aria-hidden="true"></div>
  <div class="wrap pnext__inner"><span class="eyebrow eyebrow--light">${tx(UI.cta.next, lang)}</span><span class="pnext__name">${next.name}</span><span class="pnext__btn"><span>${tx(L('Projeyi gör', 'View project', 'Смотреть проект'), lang)}</span>${ICONS.arrowR}</span></div>
</a>
${contactSection(lang, { title: L(`${p.name} hakkında bilgi alın.`, `Ask us about ${p.name}.`, `Узнайте больше о ${p.name}.`), project: p.slug })}`;

  const ld = [crumbsLd(lang, [[tx(PAGES.projects.title, lang), url(lang, 'projects')], [p.name, projectUrl(lang, p.slug)]])];
  if (isLagoon) ld.push({ '@context': 'https://schema.org', '@type': 'LodgingBusiness', name: 'Blue Lagoon Village', address: { '@type': 'PostalAddress', streetAddress: 'Kanal Yolu Sokak 326, Koru Mah.', addressLocality: 'Gazipaşa', addressRegion: 'Antalya', postalCode: '07900', addressCountry: 'TR' }, checkinTime: '15:00', checkoutTime: '10:30', petsAllowed: false, url: SITE.blueLagoonSite });
  else ld.push({ '@context': 'https://schema.org', '@type': 'ApartmentComplex', name: p.name, description: tx(p.intro, lang), address: { '@type': 'PostalAddress', addressLocality: 'Gazipaşa', addressRegion: 'Antalya', addressCountry: 'TR' }, image: `${SITE.url}${full(p.cover)}` });
  const html = page({ lang, route: 'projects', sub: p.slug, title: p.name, desc: tx(p.intro, lang).slice(0, 158), body, current: isCity ? 'city' : isLagoon ? 'lagoon' : 'projects', ogImage: isLagoon ? 'bl-poster-hero' : p.cover, jsonld: ld });
  return isLagoon ? withPhone(html, LAGOON_PHONE) : html;
}

function filmCard(f, lang, group) {
  return `<a class="film film--live lb lb--video" href="/assets/video/${f.file}.mp4" data-lightbox="${group}" data-video="1" data-caption="${esc(tx(f.title, lang))} — Blue Lagoon Village">
    <span class="film__media"><video muted loop playsinline preload="none" poster="${full(f.poster)}" data-autoplay aria-hidden="true"><source src="/assets/video/${f.file}.mp4" type="video/mp4"></video>
    <span class="film__t">${tx(f.title, lang)}</span><span class="film__x" aria-hidden="true">${ICONS.arrowR}</span></span>
  </a>`;
}

// ---------- GALLERY ----------
export function galleryPage(lang) {
  const groups = [
    ...PROJECTS.map((p) => ({ id: p.slug, name: p.name, items: p.gallery })),
    { id: 'gazipasa', name: tx(PAGES.gallery.region, lang), items: GAZIPASA.album },
  ];
  const body = `${pageHero(lang, { title: tx(PAGES.gallery.title, lang), lead: tx(PAGES.gallery.lead, lang), image: 'gz-bay-sunset', crumbs: [[null, tx(PAGES.gallery.title, lang)]] })}
<section class="gallery" data-theme="light">
  <div class="wrap">
    <div class="tabs tabs--scroll" role="tablist" data-gtabs>
      <button class="tab is-active" role="tab" aria-selected="true" data-gfilter="all">${tx(PAGES.projects.all, lang)}</button>
      ${groups.map((g) => `<button class="tab" role="tab" aria-selected="false" data-gfilter="${g.id}">${g.name}<sup>${g.items.length}</sup></button>`).join('')}
      <a class="tab tab--link" href="${url(lang, 'videos')}">${tx(UI.nav.videos, lang)} ${ICONS.arrowR}</a>
    </div>
    <div class="masonry masonry--gallery" data-ggrid>
      ${groups.map((g) => g.items.map((n) => `<div class="gitem" data-group="${g.id}">${lbFig(n, lang, 'gallery', { sizes: '(max-width: 760px) 92vw, (max-width: 1200px) 46vw, 31vw', caption: `${g.name} — ${tx(ALT[n], lang)}` })}</div>`).join('')).join('')}
    </div>
    <p class="note">${tx(UI.enhanced, lang)}</p>
  </div>
</section>`;
  return page({ lang, route: 'gallery', title: tx(PAGES.gallery.title, lang), desc: tx(PAGES.gallery.meta, lang), body, current: 'gallery', ogImage: 'gz-bay-sunset', jsonld: [crumbsLd(lang, [[tx(PAGES.gallery.title, lang), url(lang, 'gallery')]])] });
}

// ---------- VIDEOS ----------
export function videosPage(lang) {
  const [first, ...rest] = LAGOON.films;
  const body = `${pageHero(lang, { title: tx(PAGES.videos.title, lang), lead: tx(PAGES.videos.lead, lang), image: 'bl-poster-lagoon-finale', crumbs: [[url(lang, 'gallery'), tx(PAGES.gallery.title, lang)], [null, tx(PAGES.videos.title, lang)]] })}
<section class="vids" data-theme="dark">
  <div class="wrap">
    <a class="vfeature lb lb--video" href="/assets/video/${first.file}.mp4" data-lightbox="films" data-video="1" data-caption="${esc(tx(first.title, lang))} — Blue Lagoon Village">
      <video class="vfeature__v" muted loop playsinline preload="none" poster="${full(first.poster)}" data-autoplay aria-hidden="true"><source src="/assets/video/${first.file}.mp4" type="video/mp4"></video>
      <span class="vfeature__t"><span class="eyebrow eyebrow--light">Blue Lagoon Village</span><b>${tx(first.title, lang)}</b></span>
    </a>
    <div class="films__grid">${rest.map((f) => filmCard(f, lang, 'films')).join('')}</div>
  </div>
</section>`;
  return page({ lang, route: 'videos', title: tx(PAGES.videos.title, lang), desc: tx(PAGES.videos.meta, lang), body, current: 'gallery', ogImage: 'bl-poster-lagoon-finale', jsonld: [crumbsLd(lang, [[tx(PAGES.videos.title, lang), url(lang, 'videos')]])] });
}

// ---------- NEWS ----------
export function newsPage(lang) {
  const body = `${pageHero(lang, { title: tx(PAGES.news.title, lang), lead: tx(PAGES.news.lead, lang), image: 'gz-coves-sunset', crumbs: [[null, tx(PAGES.news.title, lang)]] })}
${timeline(lang)}
${contactSection(lang)}`;
  return page({ lang, route: 'news', title: tx(PAGES.news.title, lang), desc: tx(PAGES.news.meta, lang), body, current: 'about', ogImage: 'gazipasa-coast', jsonld: [crumbsLd(lang, [[tx(PAGES.news.title, lang), url(lang, 'news')]])] });
}

// ---------- FAQ ----------
export function faqPage(lang) {
  const body = `${pageHero(lang, { title: tx(PAGES.faq.title, lang), lead: tx(PAGES.faq.lead, lang), image: 'city-palm', crumbs: [[null, tx(PAGES.faq.title, lang)]] })}
<section class="faq" data-theme="light">
  <div class="wrap faq__grid">
    <div class="faq__aside">
      ${eyebrow(tx(PAGES.faq.more, lang))}
      <p class="lede">${tx(HOME.contactText, lang)}</p>
      <div class="faq__ctas">
        <a class="btn btn--wa" href="${wa(tx(UI.waText, lang))}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>WhatsApp</span></a>
        <a class="btn btn--line" href="${SITE.phoneHref}">${ICONS.phone}<span>${SITE.phoneDisplay}</span></a>
      </div>
    </div>
    <div class="faq__list">
      ${FAQ.map((f, i) => `<details class="qa" data-reveal${i === 0 ? ' open' : ''}><summary><span class="qa__n">${String(i + 1).padStart(2, '0')}</span><span class="qa__q">${tx(f.q, lang)}</span><span class="qa__ic" aria-hidden="true"></span></summary><div class="qa__a"><p>${tx(f.a, lang)}</p></div></details>`).join('')}
    </div>
  </div>
</section>
${contactSection(lang)}`;
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: tx(f.q, lang), acceptedAnswer: { '@type': 'Answer', text: tx(f.a, lang) } })) };
  return page({ lang, route: 'faq', title: tx(PAGES.faq.title, lang), desc: tx(PAGES.faq.meta, lang), body, current: '', ogImage: 'city-palm', jsonld: [ld, crumbsLd(lang, [[tx(PAGES.faq.title, lang), url(lang, 'faq')]])] });
}

// ---------- CONTACT ----------
export function contactPage(lang) {
  const map = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`;
  const body = `${pageHero(lang, { title: tx(PAGES.contact.title, lang), lead: tx(HOME.contactText, lang), image: 'ac-blue', crumbs: [[null, tx(PAGES.contact.title, lang)]] })}
<section class="cpage" data-theme="light">
  <div class="wrap cpage__grid">
    <div class="cpage__info">
      <ul class="cways">
        <li data-reveal><a href="${SITE.phoneHref}"><span class="cways__ic">${ICONS.phone}</span><span><small>${tx(FORM.phone, lang)}</small><b>${SITE.phoneDisplay}</b></span></a></li>
        <li data-reveal><a href="${wa(tx(UI.waText, lang))}" target="_blank" rel="noopener"><span class="cways__ic cways__ic--wa">${ICONS.whatsapp}</span><span><small>WhatsApp</small><b>${SITE.phoneDisplay}</b></span></a></li>
        <li data-reveal><a href="mailto:${SITE.email}"><span class="cways__ic">${ICONS.mail}</span><span><small>${tx(FORM.email, lang)}</small><b>${SITE.email}</b></span></a></li>
        <li data-reveal><a href="${mapLink}" target="_blank" rel="noopener"><span class="cways__ic">${ICONS.pin}</span><span><small>${tx(PAGES.contact.office, lang)}</small><b>${SITE.addressShort}<br>07900 Gazipaşa / Antalya</b></span></a></li>
      </ul>
      <div class="map" data-reveal><iframe title="ASRIN GROUP — ${esc(SITE.address)}" src="${map}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </div>
    <div class="cpage__form" data-reveal>${contactBlock(lang)}</div>
  </div>
</section>`;
  return page({ lang, route: 'contact', title: tx(PAGES.contact.title, lang), desc: tx(PAGES.contact.meta, lang), body, current: 'contact', ogImage: 'bl-pool-sunset', jsonld: [crumbsLd(lang, [[tx(PAGES.contact.title, lang), url(lang, 'contact')]])] });
}

// ---------- 404 ----------
export function notFoundPage(lang = 'tr') {
  const body = `<section class="nf" data-theme="dark">
  <div class="nf__media">${img('city-dusk', lang, { sizes: '100vw', eager: true, alt: '' })}</div>
  <div class="phero__shade"></div>
  <div class="wrap nf__inner">
    <p class="eyebrow eyebrow--light">404</p>
    ${LANGS.map((l) => `<p class="nf__t" lang="${l}">${tx(PAGES.notFound.title, l)}</p>`).join('')}
    <div class="nf__links">${LANGS.map((l) => `<a class="btn btn--ghost-light" href="/${l}/">${LANG_META[l].name}</a>`).join('')}</div>
  </div>
</section>`;
  const alternates = { tr: '/tr/', en: '/en/', ru: '/ru/' };
  return `${head({ lang, title: '404', desc: tx(PAGES.notFound.text, lang), path: '/404', alternates: null, noindex: true })}
<body data-hero="dark" data-lang="${lang}">${nav(lang, alternates, '')}<main id="main">${body}</main>${footer(lang, alternates)}</body></html>`;
}

function crumbsLd(lang, items) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['ASRIN GROUP', url(lang)], ...items].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE.url + u })) };
}
