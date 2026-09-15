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
        // A lookup form with no content of its own.
        noindex: true,
    },
    'public': {
        title: 'Public Pastes | BinPaste',
        description:
            'Browse public pastes on BinPaste. Discover code snippets, text, and shared notes from the community, sorted by newest first.',
        // This page is nothing but a list of user-pasted text. It has no value
        // as a search result and the pastes it links to are noindex too, so
        // keep the feed itself out of the index. Kept crawlable (follow) so the
        // footer links to our own pages are still discovered from here.
        noindex: true,
    },
    'pastebin-alternative': {
        title: 'Pastebin Alternative | Why BinPaste is Better | BinPaste',
        description:
            'BinPaste is a free, fast pastebin alternative with custom links, syntax highlighting, expiring pastes, and no account. See how it compares to Pastebin.com.',
    },
    'guides': {
        title: 'Guides | How to Share Code & Text Online | BinPaste',
        description:
            'Fifteen guides on sharing code and text online: Stack Overflow and Discord, logs, SQL, JSON and config files, what never to paste, and how BinPaste compares to Gist and Pastebin.',
    },
    'terms': {
        title: 'Terms of Service | BinPaste',
        description:
            'BinPaste Terms of Service: acceptable use, content responsibility, content removal, and limitation of liability.',
    },
    'privacy': {
        title: 'Privacy Policy | BinPaste',
        description:
            'What BinPaste collects and why: paste storage and retention, analytics, advertising cookies, server logs, and how to request deletion of a paste.',
    },
    'about': {
        title: 'About BinPaste | Who Builds It and Why',
        description:
            'BinPaste is an independent project by developer Manas Jha - a free, no-account way to share code and text. What it does, what it deliberately does not, and how it is funded.',
    },
    'contact': {
        title: 'Contact | BinPaste',
        description:
            'Get in touch with the developer of BinPaste - report or remove a paste, report a bug, request a feature, or ask a privacy question.',
    },
    'guides/how-to-share-code-online': {
        title: 'How to Share Code Online (The Easy Way) | BinPaste',
        description:
            'A practical guide to sharing code snippets online with a shareable link and syntax highlighting - what to include, how to name it, and the mistakes that waste everyone time.',
    },
    'guides/how-to-share-terminal-logs': {
        title: 'How to Share Terminal Logs and Error Messages | BinPaste',
        description:
            'How to share stack traces, terminal output, and error logs so people can actually help you - what to include, what to strip out, and how to link it instead of flooding the chat.',
    },
    'guides/copy-paste-text-between-devices': {
        title: 'How to Copy and Paste Text Between Devices | BinPaste',
        description:
            'Copy and paste text or code between your phone, laptop, and any other device using a link - no app, no cable, and no account. Plus when a shared clipboard is the wrong choice.',
    },
    'guides/best-pastebin-alternative': {
        title: 'The Best Free Pastebin Alternative in 2026 | BinPaste',
        description:
            'How to judge a pastebin alternative - the features that matter, the ones that do not, and when a Gist, a secret sharer, or self-hosting is the better answer.',
    },
    'guides/paste-code-for-stack-overflow-reddit': {
        title: 'Where to Paste Code for a Stack Overflow or Reddit Question | BinPaste',
        description:
            'What belongs inside the question and what belongs behind a link when you post code to Stack Overflow or Reddit - and the four ways Reddit quietly mangles code.',
    },
    'guides/share-code-on-discord': {
        title: 'Sharing Code on Discord: What Breaks and What to Do Instead | BinPaste',
        description:
            'Code blocks, the 2,000 character limit, expiring attachment links, and help-channel etiquette - what actually breaks when you share code on Discord, and the fix for each.',
    },
    'guides/share-code-job-application': {
        title: 'How to Share Code in a Job Application or Take-Home Test | BinPaste',
        description:
            'Repo or paste link, how to present a single file so a reviewer actually reads it, and why publishing a take-home on a public GitHub profile can breach the brief.',
    },
    'guides/share-config-file-safely': {
        title: 'How to Share a Config File Safely (and What to Redact First) | BinPaste',
        description:
            'A redaction process for .env files, docker-compose, and nginx configs: what to strip, what to keep, what everyone forgets, and what to do if a secret has already gone out.',
    },
    'guides/share-sql-query-schema': {
        title: 'How to Share a Long SQL Query or Database Schema | BinPaste',
        description:
            'How to format a wide query, cut a schema down to the tables that matter, and share both without a chat client silently replacing your quote marks.',
    },
    'guides/share-json-readable': {
        title: 'How to Share JSON So It Stays Readable | BinPaste',
        description:
            'Pretty-print, trim, and redact JSON so it stays valid and readable - the one-liners for jq, Python, Node, and PowerShell, plus the six things that corrupt it in transit.',
    },
    'guides/things-never-to-paste': {
        title: '8 Things You Should Never Paste Into a Pastebin | BinPaste',
        description:
            'Credentials, private keys, customer data, live session tokens, and five more things that should never reach a paste link - with what to use for each instead.',
    },
    'guides/are-pastebins-safe': {
        title: 'Are Pastebins Safe? What "Unlisted" Actually Means | BinPaste',
        description:
            'What unlisted really protects against, the ways a paste link leaks, whether your URL can be guessed, and why you should never paste a copied command straight into a terminal.',
    },
    'guides/binpaste-vs-pastebin': {
        title: 'BinPaste vs Pastebin: A Straight Comparison | BinPaste',
        description:
            'Named links, ads on paste pages, accounts, APIs, and language coverage - where each one wins, where neither fits, and which to pick for a given job.',
    },
    'guides/binpaste-vs-github-gist': {
        title: 'BinPaste vs GitHub Gist: Which Should You Use? | BinPaste',
        description:
            'A Gist is a small Git repository; a paste is a message with a URL. A feature-by-feature comparison, where Gist wins outright, and the revision-history trap to know about.',
    },
    'guides/self-host-pastebin': {
        title: "How to Self-Host a Pastebin (and When It's Worth It) | BinPaste",
        description:
            'PrivateBin, Opengist, and wastebin compared, a twenty-minute Docker setup with TLS, the abuse problem nobody mentions, and an honest test for whether it is worth your time.',
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
        html = html
            .replace(/(<meta name="robots" content=")[^"]*(")/, '$1noindex, follow$2')
            .replace(/(<meta name="googlebot" content=")[^"]*(")/, '$1noindex, follow$2');
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(html);
}
