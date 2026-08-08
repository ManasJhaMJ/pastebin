// Serves the SPA's index.html for known static routes, but with per-route
// canonical / title / description injected server-side.
//
// Why this exists: every route used to be rewritten to the SPA shell, which
// hard-codes <link rel="canonical" href="https://www.binpaste.xyz/">. Google
// reads the canonical from the raw HTML, so /guides, /terms, etc. all declared
// the homepage as their canonical and were dropped as duplicates. RouteTracker
// fixes the canonical client-side, but that is too late/unreliable for crawlers.
//
// Wired up in vercel.json: /guides -> /api/page-meta?path=guides
//
// Guide slugs are kept in sync with src/pages/guidesData.js by hand. An unknown
// guide slug falls back to the /guides index metadata, which is safe.

const SITE = 'https://www.binpaste.xyz';

const DEFAULT_DESCRIPTION =
    'BinPaste is the better pastebin alternative - a free, fast way to share code snippets and text online. Create a paste with a custom name, get a shareable link, and share temporary text or code with friends and teammates. No account required.';

// path (no leading slash) -> { title, description, noindex? }
const ROUTE_META = {
    'find': {
        title: 'Find a Paste | BinPaste',
        description:
            'Find a paste on BinPaste by entering its name or slug. Open shared code snippets and text instantly.',
        // /find is disallowed in robots.txt; keep it out of the index too.
        noindex: true,
    },
    'public': {
        title: 'Public Pastes | BinPaste',
        description:
            'Browse public pastes on BinPaste. Discover code snippets, text, and shared notes from the community, sorted by newest first.',
    },
    'pastebin-alternative': {
        title: 'Pastebin Alternative | Why BinPaste is Better | BinPaste',
        description:
            'BinPaste is a free, fast pastebin alternative with custom links, syntax highlighting, expiring pastes, and no account. See how it compares to Pastebin.com.',
    },
    'guides': {
        title: 'Guides | How to Share Code & Text Online | BinPaste',
        description:
            'BinPaste guides: how to share code online, share terminal logs, and pick the best free pastebin alternative.',
    },
    'terms': {
        title: 'Terms of Service | BinPaste',
        description:
            'BinPaste Terms of Service: acceptable use, content responsibility, content removal, and limitation of liability.',
    },
    'guides/how-to-share-code-online': {
        title: 'How to Share Code Online (The Easy Way) | BinPaste',
        description:
            'A simple, free way to share code snippets online with a shareable link and syntax highlighting - no account required.',
    },
    'guides/how-to-share-terminal-logs': {
        title: 'How to Share Terminal Logs and Error Messages | BinPaste',
        description:
            'Share terminal output, stack traces, and error logs with a clean link instead of pasting walls of text into chat.',
    },
    'guides/best-pastebin-alternative': {
        title: 'The Best Free Pastebin Alternative in 2026 | BinPaste',
        description:
            'What to look for in a pastebin alternative - custom links, syntax highlighting, expiring pastes, raw view, and no sign-up.',
    },
};

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
    const rawPath = (req.query.path || '').toString().replace(/^\/+|\/+$/g, '');
    const host = req.headers.host || 'www.binpaste.xyz';
    const proto = (req.headers['x-forwarded-proto'] || 'https').toString().split(',')[0];
    const origin = `${proto}://${host}`;

    // Always fetch the built index.html so hashed asset paths stay correct.
    let html;
    try {
        const baseRes = await fetch(`${origin}/index.html`);
        html = await baseRes.text();
    } catch {
        res.setHeader('Location', '/');
        res.status(302).end();
        return;
    }

    const meta =
        ROUTE_META[rawPath] ||
        (rawPath.startsWith('guides/') ? ROUTE_META['guides'] : null) || {
            title: 'BinPaste | The Better Pastebin Alternative to Share Code & Text',
            description: DEFAULT_DESCRIPTION,
        };

    const pageUrl = `${SITE}/${rawPath}`;
    const t = escapeHtml(meta.title);
    const d = escapeHtml(meta.description);
    const u = escapeHtml(pageUrl);

    html = html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
        .replace(/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`)
        .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
        .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`)
        .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${u}$2`)
        .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
        .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`)
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${u}$2`);

    if (meta.noindex) {
        html = html.replace(
            /(<meta name="robots" content=")[^"]*(")/,
            '$1noindex, follow$2'
        );
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(html);
}
