// Sitemap for the pages we actually wrote.
//
// Wired up in vercel.json: /sitemap.xml -> /api/sitemap
//
// User-generated paste pages are deliberately NOT listed here, and are served
// with "noindex, follow" by api/paste-meta.js. Reasons:
//   - A paste is text a user pasted; it isn't our content and has no value as a
//     search result. At scale it makes the site look like thin, auto-generated
//     pages, which harms how the whole domain is assessed.
//   - Paste content is often a copy of something already published elsewhere.
//   - Pastes with an expiry disappear, turning indexed URLs into soft 404s.
// /public is excluded for the same reason: it is only a list of those pastes.
//
// The indexability rules here MUST match api/page-meta.js and the
// INDEXABLE_PATHS set in src/components/RouteTracker.jsx.
//
// When adding a guide, add it to this list and to ROUTE_META in api/page-meta.js.

const SITE = 'https://www.binpaste.xyz';

// lastmod should track the `updated` field of the matching guide in
// src/pages/guidesData.js.
const STATIC_PAGES = [
    { path: '', changefreq: 'weekly', priority: '1.0', lastmod: '2026-09-15' },
    { path: 'pastebin-alternative', changefreq: 'monthly', priority: '0.9', lastmod: '2026-09-15' },
    { path: 'guides', changefreq: 'weekly', priority: '0.8', lastmod: '2026-09-15' },
    { path: 'guides/how-to-share-code-online', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/copy-paste-text-between-devices', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/paste-code-for-stack-overflow-reddit', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/share-code-on-discord', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/share-code-job-application', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/how-to-share-terminal-logs', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/share-config-file-safely', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/share-sql-query-schema', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/share-json-readable', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/things-never-to-paste', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/are-pastebins-safe', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/best-pastebin-alternative', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/binpaste-vs-pastebin', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/binpaste-vs-github-gist', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'guides/self-host-pastebin', changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-15' },
    { path: 'about', changefreq: 'monthly', priority: '0.6', lastmod: '2026-09-15' },
    { path: 'contact', changefreq: 'yearly', priority: '0.5', lastmod: '2026-09-15' },
    { path: 'privacy', changefreq: 'yearly', priority: '0.4', lastmod: '2026-09-15' },
    { path: 'terms', changefreq: 'yearly', priority: '0.3', lastmod: '2026-09-15' },
];

function escapeXml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
    const parts = [`    <loc>${escapeXml(loc)}</loc>`];
    if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
    if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
    if (priority) parts.push(`    <priority>${priority}</priority>`);
    return `  <url>\n${parts.join('\n')}\n  </url>`;
}

export default async function handler(req, res) {
    const entries = STATIC_PAGES.map((p) =>
        urlEntry({
            loc: `${SITE}/${p.path}`,
            lastmod: p.lastmod,
            changefreq: p.changefreq,
            priority: p.priority,
        })
    );

    const xml =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        entries.join('\n') +
        '\n</urlset>\n';

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
}
