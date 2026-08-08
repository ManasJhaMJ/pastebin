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
            'BinPaste guides: how to share code online, share terminal logs, and pick the best free pastebin alternative.',
    },
    '/terms': {
        title: 'Terms of Service | BinPaste',
        description:
            'BinPaste Terms of Service: acceptable use, content responsibility, content removal, and limitation of liability.',
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

// Static routes that are always safe to index.
const INDEXABLE_PATHS = new Set([
    '/',
    '/public',
    '/pastebin-alternative',
    '/guides',
    '/terms',
]);

// Paste pages (/:slug) are a special case: whether they may be indexed depends
// on the paste's isPublic flag, which only the server knows when it renders the
// shell (see api/paste-meta.js). So we must NOT touch the robots tag on those
// routes - overwriting it here would clobber the server's decision. Raw views
// and /find are never indexable.
function robotsPolicy(pathname) {
    if (INDEXABLE_PATHS.has(pathname) || pathname.startsWith('/guides/')) {
        return 'index';
    }
    if (pathname === '/find' || pathname.endsWith('/raw')) {
        return 'noindex';
    }
    return 'leave-as-is'; // /:slug - decided server-side
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
