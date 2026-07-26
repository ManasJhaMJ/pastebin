// Serves the SPA's index.html for a paste URL, but with paste-specific
// Open Graph / Twitter tags injected so shared links get a rich preview.
// Wired up in vercel.json: /:slug -> /api/paste-meta?slug=:slug
//
// Requires the DATABASE_URL env var (Firebase Realtime DB URL) to be set in
// the Vercel project settings.

const SITE = 'https://www.binpaste.xyz';

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
    const slug = (req.query.slug || '').toString();
    const host = req.headers.host || 'www.binpaste.xyz';
    const proto = (req.headers['x-forwarded-proto'] || 'https').toString().split(',')[0];
    const origin = `${proto}://${host}`;

    // Always fetch the built index.html so asset paths stay correct.
    let html;
    try {
        const baseRes = await fetch(`${origin}/index.html`);
        html = await baseRes.text();
    } catch {
        // If we can't get the shell, fall back to a redirect to the SPA root.
        res.setHeader('Location', '/');
        res.status(302).end();
        return;
    }

    // Look up the paste to build a meaningful preview.
    let title = slug;
    let lang = '';
    let description = 'View this paste on BinPaste - the better pastebin alternative.';
    try {
        const dbUrl = process.env.DATABASE_URL;
        if (dbUrl && slug) {
            const dataRes = await fetch(`${dbUrl.replace(/\/$/, '')}/pastes/${encodeURIComponent(slug)}.json`);
            const data = await dataRes.json();
            if (data && (!data.expiresAt || data.expiresAt > Date.now())) {
                lang = (data.language || '').toString();
                const snippet = (data.text || '').toString().replace(/\s+/g, ' ').trim().slice(0, 160);
                if (snippet) description = snippet;
            }
        }
    } catch {
        // Ignore lookup failures; fall back to generic preview text.
    }

    const pageTitle = `${title} | Paste on BinPaste`;
    const pageUrl = `${SITE}/${encodeURIComponent(slug)}`;
    const imageUrl = `${SITE}/api/og?title=${encodeURIComponent(title)}&lang=${encodeURIComponent(lang)}`;

    const t = escapeHtml(pageTitle);
    const d = escapeHtml(description);

    // Replace the default meta tags with paste-specific ones.
    html = html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
        .replace(/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`)
        .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
        .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`)
        .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${escapeHtml(pageUrl)}$2`)
        .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${escapeHtml(imageUrl)}$2`)
        .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
        .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`)
        .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${escapeHtml(imageUrl)}$2`)
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escapeHtml(pageUrl)}$2`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
    res.status(200).send(html);
}
