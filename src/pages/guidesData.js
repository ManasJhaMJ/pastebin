// src/pages/guidesData.js
// Guide metadata: titles, descriptions, topics, and dates. Deliberately holds no
// article prose - the bodies live in src/pages/guides/ and are only pulled in by
// the /guides/:slug route, so the homepage bundle stays small.
//
// This list is imported by the homepage (WhyBinPaste), the /guides index, and
// RouteTracker (for client-side <title>/<meta> per route).
//
// When adding a guide: add it here, add its body file to src/pages/guides/ and
// import it in guideContent.js, then add it to ROUTE_META in api/page-meta.js
// and STATIC_PAGES in api/sitemap.js.
//
// Order matters. It sets the order of the /guides index, and getRelatedGuides
// walks this list, so topically adjacent guides should sit next to each other.

const AUTHOR = 'Manas Jha';

// Section headings on the /guides index, in display order.
export const TOPICS = [
    'Start here',
    'Sharing in a specific place',
    'Sharing a specific kind of file',
    'Safety and privacy',
    'Choosing a tool',
];

export const GUIDES = [
    {
        slug: 'how-to-share-code-online',
        title: 'How to share code online (the easy way)',
        description:
            'A practical guide to sharing code snippets online with a shareable link and syntax highlighting - what to include, how to name it, and the mistakes that waste everyone time.',
        topic: 'Start here',
        author: AUTHOR,
        published: '2026-07-26',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
    {
        slug: 'copy-paste-text-between-devices',
        title: 'How to copy and paste text between devices',
        description:
            'Copy and paste text or code between your phone, laptop, and any other device using a link - no app, no cable, and no account. Plus when a shared clipboard is the wrong choice.',
        topic: 'Start here',
        author: AUTHOR,
        published: '2026-08-08',
        updated: '2026-09-15',
        readingTime: '5 min read',
    },
    {
        slug: 'paste-code-for-stack-overflow-reddit',
        title: 'Where to paste code for a Stack Overflow or Reddit question',
        description:
            'What belongs inside the question and what belongs behind a link when you post code to Stack Overflow or Reddit - and the four ways Reddit quietly mangles code.',
        topic: 'Sharing in a specific place',
        author: AUTHOR,
        published: '2026-09-15',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
    {
        slug: 'share-code-on-discord',
        title: 'Sharing code on Discord: what breaks and what to do instead',
        description:
            'Code blocks, the 2,000 character limit, expiring attachment links, and help-channel etiquette - what actually breaks when you share code on Discord, and the fix for each.',
        topic: 'Sharing in a specific place',
        author: AUTHOR,
        published: '2026-09-15',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
    {
        slug: 'share-code-job-application',
        title: 'How to share code in a job application or take-home test',
        description:
            'Repo or paste link, how to present a single file so a reviewer actually reads it, and why publishing a take-home on a public GitHub profile can breach the brief.',
        topic: 'Sharing in a specific place',
        author: AUTHOR,
        published: '2026-09-15',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
    {
        slug: 'how-to-share-terminal-logs',
        title: 'How to share terminal logs and error messages',
        description:
            'How to share stack traces, terminal output, and error logs so people can actually help you - what to include, what to strip out, and how to link it instead of flooding the chat.',
        topic: 'Sharing a specific kind of file',
        author: AUTHOR,
        published: '2026-07-26',
        updated: '2026-09-15',
        readingTime: '5 min read',
    },
    {
        slug: 'share-config-file-safely',
        title: 'How to share a config file safely (and what to redact first)',
        description:
            'A redaction process for .env files, docker-compose, and nginx configs: what to strip, what to keep, what everyone forgets, and what to do if a secret has already gone out.',
        topic: 'Sharing a specific kind of file',
        author: AUTHOR,
        published: '2026-09-15',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
    {
        slug: 'share-sql-query-schema',
        title: 'How to share a long SQL query or database schema',
        description:
            'How to format a wide query, cut a schema down to the tables that matter, and share both without a chat client silently replacing your quote marks.',
        topic: 'Sharing a specific kind of file',
        author: AUTHOR,
        published: '2026-09-15',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
    {
        slug: 'share-json-readable',
        title: 'How to share JSON so it stays readable',
        description:
            'Pretty-print, trim, and redact JSON so it stays valid and readable - the one-liners for jq, Python, Node, and PowerShell, plus the six things that corrupt it in transit.',
        topic: 'Sharing a specific kind of file',
        author: AUTHOR,
        published: '2026-09-15',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
    {
        slug: 'things-never-to-paste',
        title: '8 things you should never paste into a pastebin',
        description:
            'Credentials, private keys, customer data, live session tokens, and five more things that should never reach a paste link - with what to use for each instead.',
        topic: 'Safety and privacy',
        author: AUTHOR,
        published: '2026-09-15',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
    {
        slug: 'are-pastebins-safe',
        title: 'Are pastebins safe? What "unlisted" actually means',
        description:
            'What unlisted really protects against, the ways a paste link leaks, whether your URL can be guessed, and why you should never paste a copied command straight into a terminal.',
        topic: 'Safety and privacy',
        author: AUTHOR,
        published: '2026-09-15',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
    {
        slug: 'best-pastebin-alternative',
        title: 'The best free pastebin alternative in 2026',
        description:
            'How to judge a pastebin alternative - the features that matter, the ones that do not, and when a Gist, a secret sharer, or self-hosting is the better answer.',
        topic: 'Choosing a tool',
        author: AUTHOR,
        published: '2026-07-26',
        updated: '2026-09-15',
        readingTime: '5 min read',
    },
    {
        slug: 'binpaste-vs-pastebin',
        title: 'BinPaste vs Pastebin: a straight comparison',
        description:
            'Named links, ads on paste pages, accounts, APIs, and language coverage - where each one wins, where neither fits, and which to pick for a given job.',
        topic: 'Choosing a tool',
        author: AUTHOR,
        published: '2026-09-15',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
    {
        slug: 'binpaste-vs-github-gist',
        title: 'BinPaste vs GitHub Gist: which should you use?',
        description:
            'A Gist is a small Git repository; a paste is a message with a URL. A feature-by-feature comparison, where Gist wins outright, and the revision-history trap to know about.',
        topic: 'Choosing a tool',
        author: AUTHOR,
        published: '2026-09-15',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
    {
        slug: 'self-host-pastebin',
        title: "How to self-host a pastebin (and when it's worth it)",
        description:
            'PrivateBin, Opengist, and wastebin compared, a twenty-minute Docker setup with TLS, the abuse problem nobody mentions, and an honest test for whether it is worth your time.',
        topic: 'Choosing a tool',
        author: AUTHOR,
        published: '2026-09-15',
        updated: '2026-09-15',
        readingTime: '6 min read',
    },
];

export function getGuide(slug) {
    return GUIDES.find((g) => g.slug === slug);
}

// Guides for the "keep reading" links at the end of an article. Walks forward
// from the current guide and wraps around, so each guide points at different
// neighbours instead of every article linking to the first two in the list.
export function getRelatedGuides(slug, limit = 2) {
    const start = GUIDES.findIndex((g) => g.slug === slug);
    if (start === -1) return GUIDES.slice(0, limit);

    const related = [];
    for (let step = 1; step < GUIDES.length && related.length < limit; step += 1) {
        related.push(GUIDES[(start + step) % GUIDES.length]);
    }
    return related;
}

// Guides grouped under the TOPICS headings, for the /guides index.
export function getGuidesByTopic() {
    return TOPICS.map((topic) => ({
        topic,
        guides: GUIDES.filter((g) => g.topic === topic),
    })).filter((group) => group.guides.length > 0);
}
