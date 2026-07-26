import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
import { analytics } from '../firebase';

const USER_ID_KEY = 'binpaste_uid';

const DEFAULT_DESCRIPTION =
    'BinPaste is the better pastebin alternative — a free, fast way to share code snippets and text online. Create a paste with a custom name, get a shareable link, and share temporary text or code with friends and teammates. No account required.';

const ROUTE_META = {
    '/': {
        title: 'BinPaste — The Better Pastebin Alternative to Share Code & Text',
        description:
            'Create a new paste on BinPaste, the better pastebin alternative. Share code snippets and text online with a custom name, syntax highlighting, and an instant shareable link — no account needed.',
    },
    '/find': {
        title: 'Find a Paste — BinPaste',
        description:
            'Find a paste on BinPaste by entering its name or slug. Open shared code snippets and text instantly.',
    },
    '/public': {
        title: 'Public Pastes — BinPaste',
        description:
            'Browse public pastes on BinPaste. Discover code snippets, text, and shared notes from the community, sorted by newest first.',
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

function applyRouteMeta(pathname) {
    const known = ROUTE_META[pathname];
    if (known) {
        document.title = known.title;
        setMetaDescription(known.description);
    } else {
        const slug = pathname.replace(/^\//, '');
        if (slug) {
            document.title = `${slug} — Paste on BinPaste`;
            setMetaDescription(
                `View the paste "${slug}" on BinPaste — a free pastebin for sharing code snippets and text online.`
            );
        } else {
            document.title = 'BinPaste — The Better Pastebin Alternative';
            setMetaDescription(DEFAULT_DESCRIPTION);
        }
    }
    setCanonical(window.location.origin + pathname);
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
