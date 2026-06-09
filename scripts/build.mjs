import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE, CATEGORIES, TOOL_SEO, getAllTools } from '../js/data.js';
import { renderSeoArticle, renderFaq, faqSchemaJson } from '../js/seo-content.js';

const FOOTER_TEXT = '© 2026 CalcMaster. Tüm Hakları Saklıdır. Bir Erun Yazılım markasıdır.';
const FOOTER_DISCLAIMER = 'Sonuçlar tahmini olup finansal/teknik tavsiye niteliği taşımaz.';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, 'index.html');

const HUB_DESCRIPTIONS = {
  t1: 'Filament, elektrik ve işçilik maliyetinizi anlık hesaplayın.',
  t2: 'Makarada kalan gram değerinden metre cinsinden uzunluğu hesaplayın.',
  t3: 'Baskı parametrelerinize göre tahmini süreyi optimize edin.',
  t4: 'Filament türü ve ortam nemine göre ideal kurutma reçetesini öğrenin.',
  t5: 'Borcunuzun kaç ayda kapanacağını ve toplam faiz yükünü görün.',
  t6: 'Minimum saatlik ücret ve vergi dahil fatura tutarınızı hesaplayın.',
  t7: 'Web sitenizin veya uygulamanızın tahmini reklam gelirini hesaplayın.',
  t8: 'Brüt gelirinizden devlete ödenecek vergiyi ve elinize geçeni hesaplayın.',
  t9: 'Trendyol, Hepsiburada, N11 gibi platformlardaki net kârınızı hesaplayın.',
  t10: 'Paketin boyutlarından desi değerini ve kargo maliyetini hesaplayın.',
  t11: 'Stoğunuzun yılda kaç kez döndüğünü ve ideal stok sürenizi hesaplayın.',
  t12: 'Yatırımınızın geri dönüş oranını (ROI) hesaplayın.',
  t13: 'Seyahat bütçenizi ve kişi başına düşen maliyeti hesaplayın.',
  t14: 'Aracınızın gittiği her km\'de ne kadar masraf ettiğini hesaplayın.',
  t15: 'Bir sonraki ağır bakım ve kayış değişim zamanını hesaplayın.',
  t16: 'Akünüzün ne zaman dolacağını hesaplayın.',
  t17: 'Aylık bandwidth ihtiyacınızı ve aşım riskini önceden belirleyin.',
  t18: 'Projenizin tahmini adam/saat ve bütçesini hesaplayın.',
  t19: 'Sisteminiz için güvenli minimum güç kaynağı wattajını hesaplayın.',
  t20: 'IP adresi ve subnet maskesinden ağ bilgilerini hesaplayın.'
};

function extractPanels(html) {
  const panels = {};
  const start = html.indexOf('function buildPanels()');
  const end = html.indexOf('/* ======================================================\n   CALCULATOR FUNCTIONS');
  const buildSection = html.slice(start, end);
  const chunks = buildSection.split(/\/\/ ---- T\d+:/);
  chunks.shift();
  chunks.forEach(chunk => {
    const idMatch = chunk.match(/panel-(t\d+)/);
    const panelMatch = chunk.match(/<section id="panel-t\d+"[\s\S]*<\/section>/);
    if (idMatch && panelMatch) panels[idMatch[1]] = panelMatch[0];
  });
  return panels;
}

function stripLegacySeo(html) {
  return html.replace(/\s*<section class="seo-block[^"]*"[^>]*>[\s\S]*?<\/section>(?=\s*<\/section>\s*$)/, '');
}

function semanticPanel(html, toolId) {
  const stripped = stripLegacySeo(html);
  const calculator = stripped
    .replace(/<section id="panel-\w+" class="tool-panel[^"]*">/, '<article class="tool-content" itemscope itemtype="https://schema.org/WebApplication">')
    .replace(/<div class="ptitle">([^<]+)<\/div>/, '<h1 class="ptitle" itemprop="name">$1</h1>')
    .replace(/<div class="psub">([^<]+)<\/div>/, '<p class="psub" itemprop="description">$1</p>')
    .replace(/<\/section>\s*$/, '');

  const seoBlock = `
<div class="seo-wrap">
${renderSeoArticle(toolId)}
${renderFaq(toolId)}
</div>
</article>`;

  return calculator + seoBlock;
}

const FINANCIAL_TOOLS = new Set(['t5', 't6', 't7', 't8', 't9', 't11', 't12']);

function schemaJsonLd(tool, seo) {
  const url = `${SITE.url}/${tool.slug}.html`;
  const graph = [
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#app`,
        name: seo.schemaName,
        description: seo.description,
        url,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'ComputationCalculator',
        operatingSystem: 'Web Browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
        inLanguage: 'tr',
        isAccessibleForFree: true,
        browserRequirements: 'Requires JavaScript',
        provider: { '@type': 'Organization', name: SITE.name, url: SITE.url }
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        isPartOf: { '@type': 'WebSite', '@id': `${SITE.url}/#website`, name: SITE.name, url: SITE.url },
        about: { '@id': `${url}#app` },
        inLanguage: 'tr-TR'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE.url + '/' },
          { '@type': 'ListItem', position: 2, name: seo.schemaName, item: url }
        ]
      }
  ];
  if (FINANCIAL_TOOLS.has(tool.id)) {
    graph.push({
      '@type': 'FinancialProduct',
      name: seo.schemaName,
      description: seo.description,
      url,
      category: 'Hesaplama Aracı',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' }
    });
  }
  const faqSchema = faqSchemaJson(tool.id);
  if (faqSchema) graph.push(faqSchema);
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

function headBlock({ title, description, keywords, canonical, schema, isHome }) {
  return `<!DOCTYPE html>
<html lang="tr" class="dark">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${title}</title>
<meta name="description" content="${description}"/>
<meta name="keywords" content="${keywords}"/>
<meta name="robots" content="index,follow"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:type" content="${isHome ? 'website' : 'article'}"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:locale" content="tr_TR"/>
<meta property="og:site_name" content="${SITE.name}"/>
<link rel="canonical" href="${canonical}"/>
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config={darkMode:'class',theme:{extend:{colors:{brand:'#6366f1',accent:'#a78bfa'},fontFamily:{sans:['"DM Sans"','sans-serif'],mono:['"JetBrains Mono"','monospace']}}}}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="style.css"/>
${schema ? `<script type="application/ld+json">\n${schema}\n</script>` : ''}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8736537702558948" crossorigin="anonymous"></script>
</head>`;
}

function navBlock() {
  return `<!-- NAV -->
<nav class="nav-bar" aria-label="Ana navigasyon">
  <div class="max-w-7xl mx-auto px-4">
    <div class="hidden md:flex items-center justify-between h-14 gap-2">
      <a href="index.html" class="flex items-center gap-2 logo-link">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">C</div>
        <span class="logo-text">CalcMaster</span>
      </a>
      <div class="flex items-center gap-1" id="desktopNav"></div>
    </div>
    <div class="md:hidden flex items-center justify-between h-14">
      <a href="index.html" class="flex items-center gap-2 logo-link">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs">C</div>
        <span class="logo-text text-base">CalcMaster</span>
      </a>
      <button id="mobToggle" type="button" aria-label="Menüyü aç" class="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition">
        <svg id="mobIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
      </button>
    </div>
  </div>
  <div class="mob-menu" id="mobMenu"></div>
</nav>`;
}

function adsAndFooter() {
  return `  <div class="2xl:hidden mt-6">
    <div class="ad w-full h-[90px]">Reklam Alanı — 320×100 Mobile Banner</div>
  </div>
</main>

<footer class="border-t border-slate-800">
  <div class="max-w-7xl mx-auto px-4 py-5">
    <div class="ad w-full h-[60px] mb-4">Reklam Alanı — 728×90 Footer</div>
    <div class="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-600 text-xs">
      <span>${FOOTER_TEXT}</span>
      <div class="flex gap-4"><a href="#" class="hover:text-slate-400">Gizlilik</a><a href="#" class="hover:text-slate-400">İletişim</a></div>
    </div>
    <p class="text-center text-slate-700 text-[10px] mt-2">${FOOTER_DISCLAIMER}</p>
  </div>
</footer>

<script src="js/data.js"></script>
<script src="js/utils.js"></script>
<script src="js/nav.js"></script>`;
}

function buildToolPage(tool, panelHtml) {
  const seo = TOOL_SEO[tool.id];
  const content = semanticPanel(panelHtml, tool.id);
  const schema = schemaJsonLd(tool, seo);

  return `${headBlock({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: `${SITE.url}/${tool.slug}.html`,
    schema,
    isHome: false
  })}
<body class="dark" data-active-tool="${tool.slug}">

<div class="max-w-7xl mx-auto px-4 pt-4">
  <div class="ad w-full h-[60px] mb-3">Reklam Alanı — 728×90 Leaderboard</div>
</div>

${navBlock()}

<main class="max-w-7xl mx-auto px-4 py-6 pb-20">
  <div class="flex gap-5">
    <aside class="hidden 2xl:flex flex-col gap-4 w-[150px] flex-shrink-0" aria-label="Sol reklam alanı">
      <div class="ad w-full h-[600px]" style="writing-mode:vertical-rl">Reklam 160×600</div>
    </aside>
    <div class="flex-1 min-w-0">
${content}
    </div>
    <aside class="hidden 2xl:flex flex-col gap-4 w-[150px] flex-shrink-0" aria-label="Sağ reklam alanı">
      <div class="ad w-full h-[600px]" style="writing-mode:vertical-rl">Reklam 160×600</div>
    </aside>
  </div>
${adsAndFooter()}
<script src="js/calculators.js"></script>
<script>document.addEventListener('DOMContentLoaded',()=>initCalculator('${tool.id}'));</script>
</body>
</html>`;
}

function buildIndexPage() {
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        description: '20 ücretsiz online hesaplayıcı — 3D baskı, finans, e-ticaret, araç bakım ve yazılım araçları.',
        inLanguage: 'tr-TR',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE.url}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'ItemList',
        name: 'CalcMaster Hesaplama Araçları',
        numberOfItems: 20,
        itemListElement: getAllTools().map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: TOOL_SEO[t.id].schemaName,
          url: `${SITE.url}/${t.slug}.html`
        }))
      }
    ]
  }, null, 2);

  let categoriesHtml = '';
  CATEGORIES.forEach(cat => {
    categoriesHtml += `<section class="hub-cat" aria-labelledby="${cat.id}">
      <h2 class="hub-cat-title" id="${cat.id}">${cat.label}</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">`;
    cat.tools.forEach(t => {
      const seo = TOOL_SEO[t.id];
      categoriesHtml += `<a href="${t.slug}.html" class="tool-card">
        <h3>${t.label}</h3>
        <p>${HUB_DESCRIPTIONS[t.id]}</p>
        <span class="tool-card-arrow" aria-hidden="true">→</span>
      </a>`;
    });
    categoriesHtml += `</div></section>`;
  });

  return `${headBlock({
    title: 'CalcMaster – 20 Ücretsiz Online Hesaplayıcı | Akıllı Hesaplama Araçları',
    description: 'CalcMaster ile 3D baskı, finans, e-ticaret, araç bakım ve yazılım hesaplamalarını ücretsiz, anında yapın. 20 farklı akıllı hesaplayıcı tek merkezde.',
    keywords: 'online hesaplayıcı, 3d baskı maliyet, borç simülatörü, freelance fiyat, kargo desi, subnet hesaplayıcı, yakıt maliyet, filament metraj',
    canonical: `${SITE.url}/`,
    schema,
    isHome: true
  })}
<body class="dark" data-active-tool="index">

<div class="max-w-7xl mx-auto px-4 pt-4">
  <div class="ad w-full h-[60px] mb-3">Reklam Alanı — 728×90 Leaderboard</div>
</div>

${navBlock()}

<main class="max-w-7xl mx-auto px-4 py-6 pb-20">
  <header class="hub-hero">
    <h1>20 Akıllı Hesaplama Aracı — 2026</h1>
    <p>3D baskı, finans, e-ticaret, araç yönetimi ve yazılım hesaplamalarını ücretsiz, anında yapın. Her araç bağımsız sayfada, güncel SEO rehberleri ve SSS ile.</p>
  </header>
  ${categoriesHtml}
  <div class="2xl:hidden mt-6">
    <div class="ad w-full h-[90px]">Reklam Alanı — 320×100 Mobile Banner</div>
  </div>
</main>

<footer class="border-t border-slate-800">
  <div class="max-w-7xl mx-auto px-4 py-5">
    <div class="ad w-full h-[60px] mb-4">Reklam Alanı — 728×90 Footer</div>
    <div class="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-600 text-xs">
      <span>${FOOTER_TEXT}</span>
      <div class="flex gap-4"><a href="#" class="hover:text-slate-400">Gizlilik</a><a href="#" class="hover:text-slate-400">İletişim</a></div>
    </div>
    <p class="text-center text-slate-700 text-[10px] mt-2">${FOOTER_DISCLAIMER}</p>
  </div>
</footer>

<script src="js/data.js"></script>
<script src="js/nav.js"></script>
</body>
</html>`;
}

function buildSitemap() {
  const today = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += `  <url><loc>${SITE.url}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>\n`;
  getAllTools().forEach(t => {
    xml += `  <url><loc>${SITE.url}/${t.slug}.html</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>\n`;
  });
  xml += `</urlset>\n`;
  return xml;
}

// Main — read from backup (original monolithic source)
const sourcePath = fs.existsSync(path.join(ROOT, 'index.original.html'))
  ? path.join(ROOT, 'index.original.html')
  : SOURCE;
const sourceHtml = fs.readFileSync(sourcePath, 'utf8');
const panels = extractPanels(sourceHtml);

if (Object.keys(panels).length < 20) {
  console.error('Panel extraction failed. Found:', Object.keys(panels));
  process.exit(1);
}

// Backup original
const backupPath = path.join(ROOT, 'index.original.html');
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(SOURCE, backupPath);
  console.log('Backed up original index.html → index.original.html');
}

// Generate tool pages
getAllTools().forEach(tool => {
  const panel = panels[tool.id];
  if (!panel) { console.warn('Missing panel:', tool.id); return; }
  const page = buildToolPage(tool, panel);
  fs.writeFileSync(path.join(ROOT, `${tool.slug}.html`), page);
  console.log('Generated:', tool.slug + '.html');
});

// Generate index
fs.writeFileSync(path.join(ROOT, 'index.html'), buildIndexPage());
console.log('Generated: index.html');

// Sitemap & robots
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap());
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
console.log('Generated: sitemap.xml, robots.txt');
console.log('Done!');
