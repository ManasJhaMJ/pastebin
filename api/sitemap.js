// Dynamic sitemap: static marketing/guide pages plus every public, long-lived
// paste. A static public/sitemap.xml can't list user-generated pastes, so
// without this Google has no way to discover them at scale.
//
// Wired up in vercel.json: /sitemap.xml -> /api/sitemap
//
// The indexability rules here MUST match api/paste-meta.js, otherwise we'd
// submit URLs that serve a noindex tag (which Search Console reports as an
// error). Both require: isPublic === true, not expired, and >7 days of life.
//
// Requires the DATABASE_URL env var (Firebase Realtime DB URL).

const SITE = 'https://www.binpaste.xyz';

// Keep in sync with api/paste-meta.js.
const MIN_REMAINING_MS = 7 * 24 * 60 * 60 * 1000;

// Sitemaps allow at most 50,000 URLs / 50MB uncompressed. Newest pastes first.
const MAX_PASTE_URLS = 20000;

const STATIC_PAGES = [
    { path: '', changefreq: 'weekly', priority: '1.0' },
    { path: 'public', changefreq: 'daily', priority: '0.8' },
    { path: 'pastebin-alternative', changefreq: 'monthly', priority: '0.9' },
    { path: 'guides', changefreq: 'weekly', priority: '0.7' },
    { path: 'terms', changefreq: 'yearly', priority: '0.3' },
    { path: 'guides/how-to-share-code-online', changefreq: 'monthly', priority: '0.6' },
    { path: 'guides/how-to-share-terminal-logs', changefreq: 'monthly', priority: '0.6' },
    { path: 'guides/best-pastebin-alternative', changefreq: 'monthly', priority: '0.6' },
];

function escapeXml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Slugs are restricted to [A-Za-z0-9_-] at creation time; re-validate here so a
// hand-written DB key can't inject markup into the sitemap.
function isSafeSlug(slug) {
    return /^[A-Za-z0-9_-]+$/.test(slug);
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
    const parts = [`    <loc>${escapeXml(loc)}</loc>`];
    if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
    if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
    if (priority) parts.push(`    <priority>${priority}</priority>`);
    return `  <url>\n${parts.join('\n')}\n  </url>`;
}

export default async function handler(req, res) {
    const now = Date.now();
    const entries = STATIC_PAGES.map((p) =>
        urlEntry({
            loc: `${SITE}/${p.path}`,
            changefreq: p.changefreq,
            priority: p.priority,
        })
    );

    try {
        const dbUrl = process.env.DATABASE_URL;
        if (dbUrl) {
            const base = dbUrl.replace(/\/$/, '');

            // Prefer a server-side ordered query, but it 400s unless the DB
            // rules declare {"pastes": {".indexOn": "createdAt"}}. Fall back to
            // an unordered fetch (sorted below) so the sitemap works either way.
            let data = null;
            const ordered = await fetch(
                `${base}/pastes.json?orderBy=%22createdAt%22&limitToLast=${MAX_PASTE_URLS}`
            );
            if (ordered.ok) {
                data = await ordered.json();
            } else {
                const plain = await fetch(`${base}/pastes.json`);
                if (plain.ok) data = await plain.json();
            }

            if (data && typeof data === 'object') {
                const pastes = Object.entries(data)
                    .filter(([slug, v]) => isSafeSlug(slug) && v && v.isPublic === true)
                    .filter(([, v]) => !v.expiresAt || v.expiresAt - now > MIN_REMAINING_MS)
                    .sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0))
                    .slice(0, MAX_PASTE_URLS);

                for (const [slug, v] of pastes) {
                    entries.push(
                        urlEntry({
                            loc: `${SITE}/${slug}`,
                            lastmod: v.createdAt
                                ? new Date(v.createdAt).toISOString().slice(0, 10)
                                : undefined,
                            changefreq: 'monthly',
                            priority: '0.5',
                        })
                    );
                }
            }
        }
    } catch {
        // On any failure still serve the static pages rather than a 500 -
        // a partial sitemap is far better than an unfetchable one.
    }

    const xml =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        entries.join('\n') +
        '\n</urlset>\n';

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
}
