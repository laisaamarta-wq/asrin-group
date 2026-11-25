// Static site build: node build.mjs  →  dist/
import fs from 'node:fs/promises';
import fss from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { LANGS, PROJECTS, SITE, ROUTES } from './src/content.mjs';
import * as T from './src/templates.mjs';
import { homePage2 } from './src/home2.mjs';
import { LOGO_MARK, LOGO_ASRIN, LOGO_GROUP } from './src/svg.mjs';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const DIST = path.join(ROOT, 'dist');
const SRC_MEDIA = path.join(ROOT, 'media-src');
const BL = '/home/claude/src/blue-lagoon-village/assets/video';
const V = Date.now().toString(36);
const WIDTHS = [480, 960, 1600, 2400];

const ensure = (d) => fs.mkdir(d, { recursive: true });

async function images() {
  const out = path.join(DIST, 'assets/img');
  await ensure(out);
  const cacheFile = path.join(ROOT, '.imgcache.json');
  let cache = {};
  try { cache = JSON.parse(await fs.readFile(cacheFile, 'utf8')); } catch {}
  const files = (await fs.readdir(SRC_MEDIA)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  const manifest = {};
  await Promise.all(files.map(async (f) => {
    const name = f.replace(/\.(jpe?g|png|webp)$/i, '');
    const src = path.join(SRC_MEDIA, f);
    const st = await fs.stat(src);
    const key = `${st.size}-${st.mtimeMs}`;
    const meta = await sharp(src).metadata();
    const widths = (name === 'ac-hero' ? [...WIDTHS, 3200] : WIDTHS).filter((w) => w < meta.width * 1.02);
    if (!widths.length || meta.width < WIDTHS[0]) widths.push(meta.width);
    if (widths[widths.length - 1] < meta.width && meta.width < 2400 && meta.width - widths[widths.length - 1] > 200) widths.push(meta.width);
    manifest[name] = { w: meta.width, h: meta.height, widths };
    // social preview: 1200x630 JPEG (works in Instagram, WhatsApp, Telegram, iMessage, Facebook)
    const ogOut = path.join(DIST, 'assets/og'); await ensure(ogOut);
    const ogFile = path.join(ogOut, `${name}.jpg`);
    if (cache[name] !== key || !fss.existsSync(ogFile)) await sharp(src).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82, mozjpeg: true }).toFile(ogFile);
    const done = cache[name] === key && widths.every((w) => fss.existsSync(path.join(out, `${name}-${w}.webp`)));
    if (done) return;
    await Promise.all(widths.map((w) => sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: name === 'ac-hero' ? 82 : (w > 1600 ? 74 : 78), effort: 5, smartSubsample: true }).toFile(path.join(out, `${name}-${w}.webp`))));
    cache[name] = key;
  }));
  await fs.writeFile(cacheFile, JSON.stringify(cache));
  return manifest;
}

async function copyAssets() {
  const a = path.join(DIST, 'assets');
  await ensure(path.join(a, 'fonts'));
  await ensure(path.join(a, 'js/vendor'));
  await ensure(path.join(a, 'css'));
  await ensure(path.join(a, 'video'));
  await ensure(path.join(a, 'brand'));
  // fonts
  const fonts = [
    ['@fontsource/cormorant-garamond', 'cormorant-garamond', 'cormorant', ['300-normal', '300-italic', '400-normal', '400-italic', '500-normal']],
    ['@fontsource/manrope', 'manrope', 'manrope', ['400-normal', '500-normal', '600-normal']],
  ];
  for (const [pkg, prefix, out, ws] of fonts) {
    for (const sub of ['latin', 'latin-ext', 'cyrillic']) for (const w of ws) {
      const f = `node_modules/${pkg}/files/${prefix}-${sub}-${w}.woff2`;
      if (fss.existsSync(f)) await fs.copyFile(f, path.join(a, 'fonts', `${out}-${sub}-${w}.woff2`));
    }
  }
  await fs.copyFile('node_modules/gsap/dist/gsap.min.js', path.join(a, 'js/vendor/gsap.min.js'));
  await fs.copyFile('node_modules/gsap/dist/ScrollTrigger.min.js', path.join(a, 'js/vendor/ScrollTrigger.min.js'));
  await fs.copyFile('node_modules/lenis/dist/lenis.min.js', path.join(a, 'js/vendor/lenis.min.js'));
  await fs.copyFile('src/main.js', path.join(a, 'js/site.js'));
  await fs.copyFile('src/styles.css', path.join(a, 'css/site.css'));
  // videos (Blue Lagoon originals from the project repository)
  const vids = { 'bl-hero': 'hero-film', 'bl-hero-sm': 'hero-film-sm', 'bl-villas': 'villas', 'bl-sunset': 'sunset', 'bl-descend': 'descend', 'bl-morning-window': 'morning-window', 'bl-lagoon-finale': 'lagoon-finale' };
  for (const [k, v] of Object.entries(vids)) {
    const dst = path.join(a, 'video', `${k}.mp4`);
    const src = fss.existsSync(path.join(ROOT, 'media-video', `${k}.mp4`)) ? path.join(ROOT, 'media-video', `${k}.mp4`) : path.join(BL, `${v}.mp4`);
    if (!fss.existsSync(dst)) await fs.copyFile(src, dst);
  }
  // brand
  const logoSvg = (dark) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 223 67"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16AEEA"/><stop offset="1" stop-color="#1F5E9C"/></linearGradient></defs><path d="${LOGO_MARK}" fill="url(#g)" fill-rule="evenodd"/><path transform="translate(81 0)" d="${LOGO_ASRIN}" fill="${dark ? '#FBF8F2' : '#0D1238'}" fill-rule="evenodd"/><path transform="translate(81 38)" d="${LOGO_GROUP}" fill="${dark ? '#C9AE7C' : '#9B9B9B'}" fill-rule="evenodd"/></svg>`;
  await fs.writeFile(path.join(a, 'brand/asrin-group-logo.svg'), logoSvg(false));
  await fs.writeFile(path.join(a, 'brand/asrin-group-logo-light.svg'), logoSvg(true));
  const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -4 92 75"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16AEEA"/><stop offset="1" stop-color="#1F5E9C"/></linearGradient></defs><rect x="-6" y="-4" width="92" height="75" rx="14" fill="#0B1B2E"/><path d="${LOGO_MARK}" fill="url(#g)" fill-rule="evenodd"/></svg>`;
  await fs.writeFile(path.join(a, 'brand/favicon.svg'), fav);
  await sharp(Buffer.from(fav)).resize(180, 180).png().toFile(path.join(a, 'brand/apple-touch-icon.png'));
  await sharp(Buffer.from(fav)).resize(32, 32).png().toFile(path.join(a, 'brand/favicon-32.png'));
  await sharp(Buffer.from(fav)).resize(512, 512).png().toFile(path.join(a, 'brand/icon-512.png'));
}

async function write(rel, html) {
  const f = path.join(DIST, rel);
  await ensure(path.dirname(f));
  await fs.writeFile(f, html.replaceAll('__V__', V));
}

async function main() {
  await ensure(DIST);
  const manifest = await images();
  T.setImageManifest(manifest);
  await copyAssets();
  // branded share card for the home pages and the bare domain
  {
    const logo = await fs.readFile(path.join(DIST, 'assets/brand/asrin-group-logo-light.svg'));
    const shade = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#0B1B2E" stop-opacity="0"/><stop offset="1" stop-color="#0B1B2E" stop-opacity=".82"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>');
    const mark = await sharp(logo, { density: 300 }).resize({ width: 330 }).png().toBuffer();
    await sharp(path.join(SRC_MEDIA, 'ac-hero.jpg')).resize(1200, 630, { fit: 'cover', position: 'attention' })
      .composite([{ input: shade }, { input: mark, left: 64, top: 630 - 64 - Math.round(330 * 67 / 223) }])
      .jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(DIST, 'assets/og/asrin-group.jpg'));
  }
  const urls = [];
  for (const lang of LANGS) {
    const pages = [
      ['home', '', homePage2(lang, { contactSection: T.contactSection })],
      ['about', '', T.aboutPage(lang)],
      ['projects', '', T.projectsPage(lang)],
      ...PROJECTS.map((p) => ['projects', p.slug, T.projectPage(lang, p)]),
      ['videos', '', T.videosPage(lang)],
      ['news', '', T.newsPage(lang)],
      ['faq', '', T.faqPage(lang)],
      ['contact', '', T.contactPage(lang)],
    ];
    for (const [route, sub, html] of pages) {
      const u = T.url(lang, route, sub);
      await write(path.join(u, 'index.html'), html);
      urls.push({ route, sub, lang, u });
    }
  }
  await write('404.html', T.notFoundPage('tr'));
  // root: language chooser / redirect
  await write('index.html', `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>ASRIN GROUP</title><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="canonical" href="${SITE.url}/tr/">${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE.url}/${l}/">`).join('')}<link rel="alternate" hreflang="x-default" href="${SITE.url}/tr/"><meta name="robots" content="noindex"><meta name="google-site-verification" content="nMxQEJxO6FgRMxFvoRx2lxK6jQSLlZCEtx3bbdWh3zg"><meta name="description" content="ASRIN GROUP / ASRIN İNŞAAT — Gazipaşa, Antalya. 1990'dan beri Avrupa standartlarında konut: Asrin City, Blue Lagoon Village."><meta property="og:type" content="website"><meta property="og:site_name" content="ASRIN GROUP"><meta property="og:title" content="ASRIN GROUP — Gazipaşa, Antalya"><meta property="og:description" content="1990'dan beri Gazipaşa'da Avrupa standartlarında konut. Asrin City, Blue Lagoon Village ve tamamlanan projelerimiz."><meta property="og:url" content="${SITE.url}/"><meta property="og:image" content="${SITE.url}/assets/og/asrin-group.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:type" content="image/jpeg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${SITE.url}/assets/og/asrin-group.jpg"><link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml"><link rel="icon" href="/assets/brand/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png"><script>(function(){var l;try{l=localStorage.getItem('asrin-lang')}catch(e){}if(!l){var n=(navigator.languages||[navigator.language||'tr']).join(',').toLowerCase();l=/^ru|,ru/.test(n)?'ru':/^tr|,tr/.test(n)?'tr':/^en|,en/.test(n)?'en':'tr'}location.replace('/'+(['tr','en','ru'].indexOf(l)>-1?l:'tr')+'/')})();</script><noscript><meta http-equiv="refresh" content="0;url=/tr/"></noscript><style>body{background:#0B1B2E}</style></head><body></body></html>`);
  // sitemap with hreflang
  const groups = {};
  for (const x of urls) (groups[`${x.route}|${x.sub}`] ||= {})[x.lang] = x.u;
  const sm = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${Object.values(groups).flatMap((g) => LANGS.map((l) => `<url><loc>${SITE.url}${g[l]}</loc>${LANGS.map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${SITE.url}${g[a]}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE.url}${g.tr}"/></url>`)).join('\n')}\n</urlset>`;
  await write('sitemap.xml', sm);
  await write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);
  // Vercel config: clean URLs, caching, redirects from the old site's URLs
  const r = (source, destination) => ({ source, destination, permanent: true });
  const vercel = {
    trailingSlash: true,
    redirects: [
      r('/index.php', '/'),
      r('/tr/sayfa/:slug*', '/tr/kurumsal/'),
      r('/tr/kadromuz', '/tr/kurumsal/#team'),
      r('/tr/projeler/planlanmis-projeler-87', '/tr/projeler/#planned'),
      r('/tr/projeler/yapimda-olan-projeler-95', '/tr/projeler/#building'),
      r('/tr/projeler/tamamlanmis-projeler-97', '/tr/projeler/#completed'),
      r('/tr/proje/asrin-city-gazipasa-98', '/tr/projeler/asrin-city-gazipasa/'),
      r('/tr/proje/asrin10-11finish-on-2017-99', '/tr/projeler/asrin-10-11/'),
      r('/tr/proje/special-villa-s-100', '/tr/projeler/special-villas/'),
      r('/tr/proje/asrin-town-15-finished-02-01-2020-96', '/tr/projeler/asrin-town-15/'),
      r('/tr/proje/asrin-7-8-finished-on-2015-97', '/tr/projeler/asrin-7-8/'),
      r('/tr/galeri/:slug*', '/tr/'),
      r('/en/gallery/:slug*', '/en/'),
      r('/ru/galereya/:slug*', '/ru/'),
    ],
    headers: [
      { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }] },
    ],
  };
  await write('vercel.json', JSON.stringify(vercel, null, 2));
  console.log(`Built ${urls.length} pages, ${Object.keys(manifest).length} images, v=${V}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
