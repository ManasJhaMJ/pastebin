import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
import { analytics } from '../firebase';
import { getGuide } from '../pages/guidesData';

const USER_ID_KEY = 'binpaste_uid';

// Canonical URLs must use the www host; binpaste.xyz permanently redirects to it.
const CANONICAL_ORIGIN = 'https://www.binpaste.xyz';

const DEFAULT_DESCRIPTION =
    'BinPaste is the better pastebin alternative - a free, fast way to share code snippets and text online. Create a paste with a custom name, get a shareable link, and share temporary text or code with friends and teammates. No account required.';

const ROUTE_META = {
    '/': {
        title: 'BinPaste | The Better Pastebin Alternative to Share Code & Text',
        description:
            'Create a new paste on BinPaste, the better pastebin alternative. Share code snippets and text online with a custom name, syntax highlighting, and an instant shareable link - no account needed.',
    },
    '/find': {
        title: 'Find a Paste | BinPaste',
        description:
            'Find a paste on BinPaste by entering its name or slug. Open shared code snippets and text instantly.',
    },
    '/public': {
        title: 'Public Pastes | BinPaste',
        description:
            'Browse public pastes on BinPaste. Discover code snippets, text, and shared notes from the community, sorted by newest first.',
    },
    '/pastebin-alternative': {
        title: 'Pastebin Alternative | Why BinPaste is Better | BinPaste',
        description:
            'BinPaste is a free, fast pastebin alternative with custom links, syntax highlighting, expiring pastes, and no account. See how it compares to Pastebin.com.',
    },
    '/guides': {
        title: 'Guides | How to Share Code & Text Online | BinPaste',
        description:
            'Fifteen guides on sharing code and text online: Stack Overflow and Discord, logs, SQL, JSON and config files, what never to paste, and how BinPaste compares to Gist and Pastebin.',
    },
    '/terms': {
        title: 'Terms of Service | BinPaste',
        description:
            'BinPaste Terms of Service: acceptable use, content responsibility, content removal, and limitation of liability.',
    },
    '/privacy': {
        title: 'Privacy Policy | BinPaste',
        description:
            'What BinPaste collects and why: paste storage and retention, analytics, advertising cookies, server logs, and how to request deletion of a paste.',
    },
    '/about': {
        title: 'About BinPaste | Who Builds It and Why',
        description:
            'BinPaste is an independent project by developer Manas Jha - a free, no-account way to share code and text. What it does, what it deliberately does not, and how it is funded.',
    },
    '/contact': {
        title: 'Contact | BinPaste',
        description:
            'Get in touch with the developer of BinPaste - report or remove a paste, report a bug, request a feature, or ask a privacy question.',
    },
};

function getOrCreateUserId() {
    let uid = localStorage.getItem(USER_ID_KEY);
    if (!uid) {
        uid = (crypto.randomUUID && crypto.randomUUID()) ||
            `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem(USER_ID_KEY, uid);
    }
    return uid;
}

function setMetaDescription(content) {
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

function setCanonical(href) {
    let tag = document.querySelector('link[rel="canonical"]');
    if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', 'canonical');
        document.head.appendChild(tag);
    }
    tag.setAttribute('href', href);
}

function setRobots(content) {
    let tag = document.querySelector('meta[name="robots"]');
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'robots');
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

// The only routes we ask search engines to index: the homepage and our own
// editorial / policy pages. Everything else - user-generated paste pages, the
// public feed that lists them, raw views, and the /find lookup form - is
// noindex. User-pasted text is not our content and carries no value for a
// search result, so it is deliberately kept out of the index entirely.
// Must stay in sync with api/sitemap.js and api/page-meta.js.
const INDEXABLE_PATHS = new Set([
    '/',
    '/pastebin-alternative',
    '/guides',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
]);

function robotsPolicy(pathname) {
    if (INDEXABLE_PATHS.has(pathname) || pathname.startsWith('/guides/')) {
        return 'index';
    }
    return 'noindex';
}

function applyRouteMeta(pathname) {
    const known = ROUTE_META[pathname];
    if (known) {
        document.title = known.title;
        setMetaDescription(known.description);
    } else if (pathname.startsWith('/guides/')) {
        // Use the guide's own title/description so each guide has distinct meta
        // rather than one shared generic string.
        const guide = getGuide(pathname.replace('/guides/', ''));
        if (guide) {
            document.title = `${guide.title} | BinPaste`;
            setMetaDescription(guide.description);
        } else {
            document.title = 'BinPaste Guide | Sharing Code & Text Online';
            setMetaDescription(DEFAULT_DESCRIPTION);
        }
    } else {
        const slug = pathname.replace(/^\//, '').replace(/\/raw$/, '');
        if (slug) {
            document.title = `${slug} | Paste on BinPaste`;
            setMetaDescription(
                `View the paste "${slug}" on BinPaste - a free pastebin for sharing code snippets and text online.`
            );
        } else {
            document.title = 'BinPaste | The Better Pastebin Alternative';
            setMetaDescription(DEFAULT_DESCRIPTION);
        }
    }
    // Canonical must always point at the www origin, never the apex domain
    // (the apex 308-redirects, which Google reports as "Page with redirect").
    setCanonical(CANONICAL_ORIGIN + pathname);
    const policy = robotsPolicy(pathname);
    if (policy === 'index') {
        setRobots('index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    } else if (policy === 'noindex') {
        setRobots('noindex, follow');
    }
}

function RouteTracker() {
    const location = useLocation();

    useEffect(() => {
        const uid = getOrCreateUserId();
        setUserId(analytics, uid);
        setUserProperties(analytics, { visitor_id: uid });
    }, []);

    useEffect(() => {
        applyRouteMeta(location.pathname);
        logEvent(analytics, 'page_view', {
            page_path: location.pathname + location.search,
            page_location: window.location.href,
            page_title: document.title,
        });
    }, [location.pathname, location.search]);

    return null;
}

export default RouteTracker;
