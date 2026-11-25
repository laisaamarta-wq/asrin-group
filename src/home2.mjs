// Home page v2 — Asrin City first, cinematic transitions.
import { L, SITE, UI, PROJECTS, CITY, LAGOON, GAZIPASA, ABOUT, STATS, PILLARS, HOME, HOME2, PAGES } from './content.mjs';
import { ALT } from './alts.mjs';
import { ICONS } from './svg.mjs';
import { img, url, page, IMG, logo, roomCard } from './templates.mjs';

const tx = (v, lang) => (v && typeof v === 'object' && 'tr' in v ? v[lang] : v);
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const full = (name) => { const m = IMG[name]; return `/assets/img/${name}-${m.widths[m.widths.length - 1]}.webp`; };
const pUrl = (lang, slug) => url(lang, 'projects', slug);
const wa = (text) => `https://wa.me/${SITE.wa}?text=${encodeURIComponent(text)}`;
const eb = (n, t, cls = '') => `<p class="eyebrow eyebrow--n ${cls}"><span class="eyebrow__n">${n}</span>${t}</p>`;
const srcset = (name) => IMG[name].widths.map((w) => `/assets/img/${name}-${w}.webp ${w}w`).join(', ');

export function homePage2(lang, { contactSection }) {
  const city = PROJECTS[0];
  const others = PROJECTS.filter((p) => !p.flagship);
  const lagoon = PROJECTS.find((p) => p.slug === 'blue-lagoon-village');
  const reel = ['ac-hero', 'ac-road', 'city-detail', 'ac-pool-gold', 'ac-lookup', 'ac-vertical-gold', 'ac-topdown-gold', 'city-pool', 'ac-blue'];
  const words = (() => { let key = false; return tx(HOME2.manifesto, lang).split(' ').map((w) => { if (w.startsWith('[[')) { key = true; w = w.slice(2); } const end = w.includes(']]'); w = w.replace(']]', ''); const out = `<span class="mw${key ? ' mw--key' : ''}">${w}</span>`; if (end) key = false; return out; }).join(' '); })();

  const body = `
<div class="loader" data-loader aria-hidden="true">
  <div class="loader__mark">${logo('loader')}</div>
  <div class="loader__bar"><i data-loader-bar></i></div>
  <span class="loader__n" data-loader-n>00</span>
</div>

<section class="hx" data-theme="dark" data-hx>
  <div class="hx__frame" data-hx-frame>
    <picture class="hx__pic" data-hx-pic>
      <source media="(max-width: 760px) and (orientation: portrait)" srcset="${srcset('ac-hero-m')}" sizes="100vw">
      ${img('ac-hero', lang, { sizes: '100vw', eager: true, cls: 'hx__img', alt: tx(L('Asrin City Gazipaşa konut kulesi, Toros dağları önünde gün batımında', 'The Asrin City Gazipaşa residential tower at sunset, in front of the Taurus mountains', 'Жилая башня Asrin City Gazipaşa на закате на фоне гор Тавра'), lang) })}
    </picture>
    <div class="hx__sun" aria-hidden="true" data-hx-sun></div>
    <p class="hx__badge" aria-hidden="true"><i></i>Asrin City · Gazipaşa</p>
    <div class="hx__shade" aria-hidden="true"></div>
  </div>
  <div class="hx__content wrap" data-hx-content>
    <p class="eyebrow eyebrow--light" data-hero-in>${tx(HOME2.kicker, lang)}<span class="hide-m">&nbsp;· Asrin City Gazipaşa</span></p>
    <h1 class="hx__title" data-split="hero">${tx(HOME2.title, lang)}</h1>
    <div class="hx__row">
      <p class="hx__sub" data-hero-in>${tx(HOME2.sub, lang)}</p>
      <div class="hx__ctas" data-hero-in>
        <a class="btn btn--gold" data-magnetic href="${pUrl(lang, city.slug)}"><span>${tx(UI.cta.discover, lang)}</span>${ICONS.arrowR}</a>
        <a class="btn btn--ghost-light" data-magnetic href="${wa(tx(UI.waProject, lang).replace('{p}', city.name))}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>WhatsApp</span></a>
      </div>
    </div>
    <ul class="hx__chips" data-hero-in>${HOME2.chips.map((c) => `<li>${tx(c, lang)}</li>`).join('')}</ul>
  </div>
  <div class="hx__scroll" data-hero-in aria-hidden="true"><i></i></div>
</section>

<section class="mf" data-theme="light" data-bg="ivory">
  <div class="wrap mf__grid">
    <div class="mf__copy">
      ${eb('01', tx(HOME2.manifestoEyebrow, lang))}
      <p class="mf__text" data-words>${words}</p>
      <div class="stats stats--mf" role="list">
        ${STATS.map((s) => `<div class="stat" role="listitem"><span class="stat__n" ${s.plain ? '' : `data-count="${s.n}"`}>${s.plain ? s.n : s.n.toLocaleString('tr-TR')}</span><span class="stat__l">${tx(s.l, lang)}</span></div>`).join('')}
      </div>
    </div>
    <div class="mf__media" data-mf-media>
      <figure class="mf__fig">${img('ac-vertical-gold', lang, { sizes: '(max-width: 760px) 92vw, 42vw' })}</figure>
      <p class="mf__side" aria-hidden="true"><span>Asrin City</span><i></i><span>Gazipaşa · Antalya</span></p>
      <span class="mf__mark" aria-hidden="true">N 36°16′ · E 32°19′</span>
    </div>
  </div>
</section>

${lapseSection(lang)}

<section class="acx" id="asrin-city" data-theme="light" data-bg="sand">
  <div class="wrap acx__head">
    ${eb('03', tx(HOME2.cityEyebrow, lang))}
    <h2 class="h2 acx__title" data-split>Asrin City <em>Gazipaşa</em></h2>
    <p class="acx__lede" data-reveal>${tx(city.intro, lang)}</p>
  </div>
  <div class="wrap">
    <figure class="acx__plate" data-acx>
      <div class="acx__img">${img('ac-lookup', lang, { sizes: '(max-width: 760px) 100vw, 92vw' })}</div>
      <svg class="acx__lines" viewBox="0 0 1000 558" preserveAspectRatio="none" aria-hidden="true">
        <path d="M60 300 V 64" data-draw pathLength="1"/><path d="M52 300 H 68 M52 64 H 68" data-draw pathLength="1"/>
        <path d="M90 540 H 910" data-draw pathLength="1"/><path d="M90 532 V 548 M910 532 V 548" data-draw pathLength="1"/>
        <path d="M500 40 L 560 18 H 700" data-draw pathLength="1"/>
        <path d="M930 380 H 990" data-draw pathLength="1"/><path d="M978 372 L 990 380 L 978 388" data-draw pathLength="1"/>
      </svg>
      <span class="acx__dot" style="--x:50%;--y:7.2%"></span>
      <figcaption class="acx__note acx__note--ph" style="--x:70.5%;--y:3.2%"><b>${tx(CITY.units[3].k, lang)} · 180 m²</b><span>${tx(CITY.units[3].d, lang)}</span></figcaption>
      <figcaption class="acx__note acx__note--sea"><b>${tx(CITY.facts[2].v, lang)}</b><span>${tx(CITY.facts[2].l, lang)}</span></figcaption>
      <figcaption class="acx__note acx__note--fp" style="--x:50%;--y:93%"><b>${CITY.facts[1].v}</b><span>${tx(CITY.facts[1].l, lang)}</span></figcaption>
      <figcaption class="acx__note acx__note--air" style="--x:92%;--y:62%"><b>${CITY.facts[3].v}</b><span>${tx(CITY.facts[3].l, lang)}</span></figcaption>
    </figure>
    <dl class="acx__facts">${CITY.facts.map((f, i) => `<div data-reveal><dt><span>0${i + 1}</span>${tx(f.l, lang)}</dt><dd>${tx(f.v, lang)}</dd></div>`).join('')}</dl>
  </div>
  <div class="wrap acx__units">
    <div class="acx__units-head">
      ${eb('04', tx(L('Daire tipleri', 'Apartment types', 'Планировки'), lang))}
      <h3 class="h2" data-split>${tx(HOME2.unitsTitle, lang)}</h3>
      <p class="acx__scale-note" data-reveal>${tx(L('Açmak için bir daireye <span class="only-hover">gelin</span><span class="only-touch">dokunun</span> — fiyatı WhatsApp\'tan sorun.', '<span class="only-hover">Hover</span><span class="only-touch">Tap</span> a home to open it — ask the price on WhatsApp.', '<span class="only-hover">Наведите на квартиру</span><span class="only-touch">Нажмите на квартиру</span>, чтобы раскрыть её, — цену можно узнать в WhatsApp.'), lang)}</p>
    </div>
    ${apxPanels(lang, city.name, ['ac-lookup', 'ac-pool-gold', 'ac-golden', 'city-detail'])}
    <div class="acx__ctas" data-reveal>
      <a class="btn btn--dark" data-magnetic href="${pUrl(lang, city.slug)}"><span>${tx(UI.cta.discover, lang)}</span>${ICONS.arrowR}</a>
      <a class="btn btn--line" data-magnetic href="${SITE.phoneHref}">${ICONS.phone}<span>${SITE.phoneDisplay}</span></a>
    </div>
  </div>
</section>

${amenSection(lang)}

<section class="reel reel--dark" id="gallery" data-theme="dark" data-bg="navy">
  <div class="reel__pin" data-reel>
    <div class="reel__bgword" aria-hidden="true" data-reel-word>Asrin City · Gazipaşa · Asrin City · Gazipaşa</div>
    <div class="reel__head wrap">
      <div>${eb('06', tx(HOME2.reelEyebrow, lang), 'eyebrow--gold')}<h2 class="h2 h2--light" data-split>${tx(HOME2.reelTitle, lang)}</h2></div>
      <div class="reel__meta"><span class="reel__count"><b data-reel-n>01</b> / ${String(reel.length).padStart(2, '0')}</span><span class="reel__bar"><i data-reel-bar></i></span><span class="reel__hint">${tx(HOME2.drag, lang)} ${ICONS.arrowR}</span></div>
    </div>
    <div class="reel__track" data-reel-track>
      ${reel.map((n, i) => `<figure class="reel__item reel__item--${i % 4}" data-reel-item>
        <a href="${full(n)}" data-lightbox="reel" data-caption="${esc(tx(ALT[n], lang))}" data-cursor="${esc(tx(HOME2.open, lang))}">${img(n, lang, { sizes: '(max-width: 760px) 84vw, 46vw' })}</a>
        <figcaption><span>${String(i + 1).padStart(2, '0')}</span>${tx(ALT[n], lang)}</figcaption>
      </figure>`).join('')}
    </div>
  </div>
</section>

<section class="gz" data-theme="dark" data-gz>
  <div class="gz__pin">
    <div class="gz__window" data-gz-window>${img('gz-bay-sunset', lang, { sizes: '100vw' })}</div>
    <h2 class="gz__word" data-gz-word aria-label="Gazipaşa">Gazipaşa</h2>
    <div class="gz__info wrap" data-gz-info>
      ${eb('07', tx(HOME2.placeEyebrow, lang), 'eyebrow--gold')}
      <p class="gz__title">${tx(GAZIPASA.title, lang)}</p>
      <p class="gz__p">${tx(GAZIPASA.body, lang)}</p>
      <dl class="gz__dist">${CITY.distances.map((d) => `<div><dd>${d.v}</dd><dt>${tx(d.l, lang)}</dt></div>`).join('')}</dl>
    </div>
  </div>
</section>

<section class="lagoon" id="blue-lagoon" data-theme="dark" data-bg="navy">
  <div class="wrap lagoon__split">
    <div class="lagoon__copy">
      ${eb('08', tx(L('ASRIN GROUP · Butik konaklama', 'ASRIN GROUP · Boutique stay', 'ASRIN GROUP · Бутик-отель'), lang), 'eyebrow--gold')}
      <h2 class="h2 h2--light lagoon__title" data-split>Blue Lagoon <em>Village</em></h2>
      <p class="lagoon__own" data-reveal>${tx(L('ASRIN GROUP\'a ait butik tatil köyü — konaklamak için otel tipi villalar ve odalar.', 'A boutique holiday village owned by ASRIN GROUP — hotel-style villas and rooms to stay in.', 'Бутик-курорт ASRIN GROUP: виллы и номера отельного типа для отдыха.'), lang)}</p>
      <p class="lagoon__tag" data-reveal>${tx(LAGOON.tagline, lang)}</p>
      <ul class="lagoon__chips" data-reveal>
        <li>${tx(L('Sahibi: ASRIN GROUP', 'Owned by ASRIN GROUP', 'Владелец — ASRIN GROUP'), lang)}</li>
        <li>${tx(L('Otel tipi villalar', 'Hotel-style villas', 'Виллы отельного типа'), lang)}</li>
        <li>${tx(L('Günlük konaklama', 'Nightly stays', 'Посуточное проживание'), lang)}</li>
      </ul>
      <div class="lagoon__ctas" data-reveal>
        <a class="btn btn--gold" data-magnetic href="${SITE.blueLagoonSite}" target="_blank" rel="noopener"><span>${tx(UI.cta.book, lang)}</span>${ICONS.ext}</a>
        <a class="btn btn--ghost-light" data-magnetic href="${pUrl(lang, lagoon.slug)}"><span>${tx(UI.cta.discover, lang)}</span>${ICONS.arrowR}</a>
      </div>
    </div>
    <figure class="lagoon__frame" data-lagoon-frame>
      ${img('bl-villas-hq', lang, { sizes: '(max-width: 1024px) 92vw, 56vw' })}
      <figcaption><span>Blue Lagoon Village</span><span>Gazipaşa · Antalya</span></figcaption>
    </figure>
  </div>
  <div class="lagoon__body wrap">
    <p class="lede lede--light" data-reveal>${tx(lagoon.intro, lang)}</p>
    <dl class="lagoon__stats">${LAGOON.stats.map((st) => `<div data-reveal><dd>${st.v}</dd><dt>${tx(st.l, lang)}</dt></div>`).join('')}</dl>
  </div>
  <div class="lagoon__rooms wrap">
    ${LAGOON.rooms.map((r, i) => roomCard(r, lang, i)).join('')}
  </div>
  <div class="lagoon__strip">
    ${['bl-lagoon-topdown', 'bl-pool-sunset', 'bl-lagoon-stairs', 'bl-terrace-sunset'].map((n) => `<figure data-clip>${img(n, lang, { sizes: '(max-width: 760px) 50vw, 25vw' })}</figure>`).join('')}
  </div>
</section>

<section class="pf" id="projects" data-theme="light" data-bg="ivory">
  <div class="wrap pf__head">
    ${eb('09', tx(HOME2.portfolioEyebrow, lang))}
    <h2 class="h2" data-split>${tx(HOME2.portfolioTitle, lang)}</h2>
  </div>
  <div class="pf__stack wrap">
    ${others.map((p, i) => `<article class="pf__card" data-stack style="--i:${i}">
      <a href="${pUrl(lang, p.slug)}" class="pf__link" data-cursor="${esc(tx(HOME2.view, lang))}">
        <div class="pf__media">${img(p.card === 'bl-pool-sunset' ? 'bl-villas-aerial' : p.cover, lang, { sizes: '(max-width: 760px) 92vw, 62vw' })}</div>
        <div class="pf__body">
          <span class="pf__n">0${i + 1} / 0${others.length}</span>
          <h3 class="pf__name">${p.name}</h3>
          <p class="pf__meta">${tx(p.type, lang)} · ${p.date || p.year || tx(UI.status[p.status], lang)}</p>
          <p class="pf__short">${tx(p.short, lang)}</p>
          <span class="link-arrow"><span>${tx(UI.cta.discover, lang)}</span>${ICONS.arrowR}</span>
        </div>
      </a>
    </article>`).join('')}
  </div>
</section>

<section class="ethos2" id="about" data-theme="dark" data-bg="navy" data-ethos>
  <div class="marquee marquee--dark" aria-hidden="true"><div class="marquee__in">${Array(4).fill(PILLARS.map((p) => `<span>${tx(p.t, lang)}</span><i>✦</i>`).join('')).join('')}</div></div>
  <div class="wrap ethos2__grid">
    <div class="ethos2__head">
      ${eb('10', tx(HOME.philosophyEyebrow, lang), 'eyebrow--gold')}
      <h2 class="ethos2__title">${tx(HOME.philosophyTitle, lang).split(/\.\s*/).filter(Boolean).map((w, i) => `<span class="ethos2__w" data-reveal>${i === 1 ? `<em>${w}.</em>` : `${w}.`}</span>`).join('')}</h2>
      <p class="ethos2__p" data-reveal>${tx(ABOUT.p4, lang)}</p>
      <a class="link-arrow link-arrow--light" href="${url(lang, 'about')}" data-reveal><span>${tx(UI.nav.about, lang)}</span>${ICONS.arrowR}</a>
    </div>
    <ol class="ethos2__list">${PILLARS.map((p, i) => `<li class="ethos2__item" data-ethos-item="${i}" data-reveal>
      <span class="ethos2__n">0${i + 1}</span>
      <div class="ethos2__txt"><h3>${tx(p.t, lang)}</h3><p>${tx(p.d, lang)}</p></div>
      <figure class="ethos2__thumb">${img(['city-detail', 'city-pool', 'ac-blue'][i], lang, { sizes: '(max-width: 760px) 86vw, 10vw' })}</figure>
    </li>`).join('')}</ol>
  </div>
  <div class="ethos2__float" data-ethos-float aria-hidden="true">${['city-detail', 'city-pool', 'ac-blue'].map((n, i) => `<figure data-ef="${i}">${img(n, lang, { sizes: '22vw', alt: '' })}</figure>`).join('')}</div>
</section>

<section class="brg" data-theme="dark" data-brg aria-label="${esc(tx(L('Gazipaşa\'da evinize ilk adım', 'Your first step to a home in Gazipaşa', 'Первый шаг к дому в Газипаше'), lang))}">
  <div class="brg__pin">
    <div class="brg__win" data-brg-win>${img('ac-balcony', lang, { sizes: '100vw', alt: tx(L('Asrin City balkonundan Akdeniz manzarası', 'The Mediterranean seen from an Asrin City balcony', 'Вид на Средиземное море с балкона Asrin City'), lang) })}<span class="brg__shade"></span></div>
    <p class="brg__line" data-brg-line>${tx(L('Bu manzara <em>sizin olabilir.</em>', 'This view <em>could be yours.</em>', 'Этот вид <em>может быть вашим.</em>'), lang)}</p>
    <p class="brg__sub" data-brg-sub>${tx(L('4. kattan itibaren — Asrin City Gazipaşa', 'From the 4th floor up — Asrin City Gazipaşa', 'С 4-го этажа и выше — Asrin City Gazipaşa'), lang)}</p>
  </div>
</section>

${contactSection(lang, { project: city.slug, bg: 'ac-balcony' })}`;

  return page({ lang, route: 'home', title: tx(PAGES.home.title, lang), desc: tx(PAGES.home.meta, lang), body, current: 'home', ogImage: 'asrin-group', bodyClass: 'is-home' });
}

export function lapseSection(lang) {
  return `<section class="lapse" data-theme="dark" data-lapse>
  <div class="lapse__pin">
    <div class="lapse__plates">
      <div class="lapse__plate" data-plate="0">${img('ac-golden', lang, { sizes: '100vw', alt: tx(L('Asrin City, altın saatte', 'Asrin City at golden hour', 'Asrin City в золотой час'), lang) })}</div>
      <div class="lapse__plate" data-plate="1">${img('ac-sunset', lang, { sizes: '100vw', alt: tx(L('Asrin City, gün batımında', 'Asrin City at sunset', 'Asrin City на закате'), lang) })}</div>
      <div class="lapse__plate" data-plate="2">${img('ac-blue', lang, { sizes: '100vw', alt: tx(L('Asrin City, mavi saatte ışıklar yanarken', 'Asrin City at blue hour, lights coming on', 'Asrin City в синий час, зажигаются огни'), lang) })}</div>
      <i class="lapse__beam" data-beam="1"></i><i class="lapse__beam" data-beam="2"></i>
    </div>
    <div class="lapse__shade" aria-hidden="true"></div>
    <div class="lapse__ui wrap">
      <div class="lapse__head">
        ${eb('02', tx(HOME2.lapseEyebrow, lang), 'eyebrow--gold')}
        <h2 class="h2 h2--light" data-split>${tx(HOME2.lapseTitle, lang)}</h2>
      </div>
      <ol class="lapse__steps">
        ${HOME2.lapse.map((s, i) => `<li class="lapse__step${i === 0 ? ' is-on' : ''}" data-step="${i}"><span class="lapse__t">${s.t}</span><span class="lapse__l">${tx(s.l, lang)}</span><span class="lapse__n">${tx(s.n, lang)}</span></li>`).join('')}
      </ol>
      <div class="lapse__progress" aria-hidden="true"><i data-lapse-bar></i></div>
    </div>
  </div>
</section>`;
}
export function amenSection(lang) {
  const amenMap = Object.fromEntries(CITY.amenities.map(([k, l]) => [k, l]));
  const caps = {
    pool: L('Havuz başında akşam ışığı', 'Evening light at the pool', 'Вечерний свет у бассейна'),
    play: L('Bahçedeki oyun parkı', 'The playground in the garden', 'Детская площадка во дворе'),
    gazebo: L('Gölgeli kamelyalar', 'Shaded gazebos', 'Беседки в тени'),
    court: L('Spor sahası, sitenin içinde', 'The sports court, inside the site', 'Спортплощадка на территории'),
    parking: L('Kapalı otopark ve güvenlikli giriş, binanın kendisinde', 'Covered parking and the secured entrance, in the building itself', 'Крытая парковка и охраняемый въезд — в самом здании'),
  };
  return `<section class="amn" data-theme="dark" data-amn>
  <div class="amn__pin">
    <div class="amn__stage">
      ${HOME2.hotspots.map((h, i) => `<div class="amn__layer${i === 0 ? ' is-on' : ''}" data-layer="${h.k}">${img(({ pool: 'ac-pool-gold', play: 'amn-play', gazebo: 'amn-gazebo', court: 'amn-court', parking: 'city-gate' })[h.k], lang, { sizes: '(max-width: 1024px) 100vw, 62vw', alt: tx(caps[h.k], lang), attrs: 'data-eager' })}</div>`).join('')}
      <div class="amn__hud">
        <span class="amn__count"><b data-amn-n>01</b> / 0${HOME2.hotspots.length}</span>
        <p class="amn__cap" data-amn-cap aria-live="polite">${tx(caps[HOME2.hotspots[0].k], lang)}</p>
      </div>
    </div>
    <div class="amn__panel">
      ${eb('05', tx(HOME2.amenEyebrow, lang), 'eyebrow--gold')}
      <h2 class="h2 h2--light" data-split>${tx(HOME2.amenTitle, lang)}</h2>
      <ol class="amn__list">
        ${HOME2.hotspots.map((h, i) => `<li data-hs-item="${i}" data-layer-to="${h.k}" data-cap="${esc(tx(caps[h.k], lang))}"${i === 0 ? ' class="is-on"' : ''}><span class="amn__ix">0${i + 1}</span><span class="amn__ic">${ICONS[h.k]}</span><span class="amn__lb">${tx(amenMap[h.k], lang)}</span></li>`).join('')}
      </ol>
      <ul class="amn__more">${CITY.amenities.filter(([k]) => !HOME2.hotspots.some((h) => h.k === k)).map(([k, l]) => `<li>${ICONS[k]}<span>${tx(l, lang)}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>`;
}

export function apxPanels(lang, pname, pics) {
  return `    <div class="apx" data-apx>
      ${CITY.units.map((u, i) => `<a class="apx__p${i === 1 ? ' is-on' : ''}" data-apx-p href="${wa(tx(UI.waProject, lang).replace('{p}', `${pname} — ${tx(u.k, lang)}`))}" target="_blank" rel="noopener" data-cursor="WhatsApp">
        ${img(pics[i], lang, { sizes: '(max-width: 760px) 92vw, 50vw', alt: '' })}
        <span class="apx__shade" aria-hidden="true"></span>
        <span class="apx__n">0${i + 1}</span>
        <span class="apx__vk" aria-hidden="true">${tx(u.k, lang)} · ${u.v}</span>
        <span class="apx__plus" aria-hidden="true"><i></i><em>${tx(L('Aç', 'Open', 'Открыть'), lang)}</em></span>
        <span class="apx__info">
          <span class="apx__k">${tx(u.k, lang)}</span>
          <span class="apx__d">${tx(u.d, lang)}</span>
          <span class="apx__v">${u.v}</span>
          <span class="apx__go">${ICONS.whatsapp}<span>${tx(L('Fiyat sor', 'Ask the price', 'Узнать цену'), lang)}</span>${ICONS.arrowR}</span>
        </span>
      </a>`).join('')}
    </div>`;
}
