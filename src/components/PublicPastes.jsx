// src/components/PublicPastes.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { ref, query, orderByChild, limitToLast, endBefore, get } from 'firebase/database';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

// Pastes fetched per request. Private ones are filtered out after they arrive,
// so a request can yield fewer than this many cards - the scroll handler simply
// fetches the next page until the screen is full.
const PAGE_SIZE = 20;

// Characters of the body shown on a card.
const PREVIEW_CHARS = 150;

// Everything loaded this visit is kept in sessionStorage so returning from a
// paste is instant instead of re-fetching. Bump the version if the cached shape
// changes, so old shapes are ignored rather than rendered wrong.
const CACHE_KEY = 'publicPastes:v2';
const CACHE_TTL = 2 * 60 * 1000;
const CACHE_MAX_ITEMS = 200;

function readCache() {
    try {
        const stored = sessionStorage.getItem(CACHE_KEY);
        if (!stored) return null;
        const cached = JSON.parse(stored);
        if (!Array.isArray(cached.pastes) || !cached.pastes.length) return null;
        if (Date.now() - cached.savedAt > CACHE_TTL) return null;
        return cached;
    } catch {
        // Unparseable or unavailable storage; just load from the network.
        return null;
    }
}

function writeCache({ pastes, cursor, hasMore }) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            pastes: pastes.slice(0, CACHE_MAX_ITEMS),
            cursor,
            hasMore,
            savedAt: Date.now(),
        }));
    } catch {
        // Storage can be full or blocked (private mode); caching is optional.
    }
}

// Fetch one page of pastes, newest first, and reduce it to public cards.
// `cursor` is the oldest paste already seen; passing it returns the page below.
async function fetchPage(cursor) {
    const constraints = [orderByChild('createdAt')];
    // The key disambiguates pastes sharing a createdAt millisecond, which a
    // value-only cursor would skip.
    if (cursor) constraints.push(endBefore(cursor.createdAt, cursor.slug));
    constraints.push(limitToLast(PAGE_SIZE));

    const snapshot = await get(query(ref(db, 'pastes'), ...constraints));

    // forEach keeps the query's ordering; Object.entries would discard it.
    const rows = [];
    snapshot.forEach((child) => {
        rows.push({ slug: child.key, ...child.val() });
    });
    rows.reverse(); // limitToLast returns ascending, we render newest first.

    const now = Date.now();
    const cards = rows
        .filter((row) => row.isPublic)
        .filter((row) => !row.expiresAt || row.expiresAt > now)
        // Keep only what a card renders. Paste bodies run to 400k characters,
        // which must not sit in state or go anywhere near sessionStorage.
        .map((row) => ({
            slug: row.slug,
            preview: (row.text || '').slice(0, PREVIEW_CHARS),
            truncated: (row.text || '').length > PREVIEW_CHARS,
        }));

    const oldest = rows.length ? rows[rows.length - 1] : null;

    return {
        cards,
        // Both of these are measured on the unfiltered rows. Most pastes are
        // private, so a page yielding no cards must still advance the cursor
        // and report more to come, or the feed would stall on it.
        hasMore: rows.length === PAGE_SIZE,
        cursor: oldest ? { slug: oldest.slug, createdAt: oldest.createdAt } : cursor,
    };
}

function PublicPastes() {
    const [pastes, setPastes] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState('');

    // Empty element below the grid. Once it scrolls into view, load the next page.
    const sentinelRef = useRef(null);

    // First paint: reuse a fresh cache if we have one, else fetch page one.
    useEffect(() => {
        const cached = readCache();
        if (cached) {
            setPastes(cached.pastes);
            setCursor(cached.cursor);
            setHasMore(cached.hasMore);
            setLoading(false);
            return;
        }

        let active = true;
        (async () => {
            try {
                const page = await fetchPage(null);
                if (!active) return;
                setPastes(page.cards);
                setCursor(page.cursor);
                setHasMore(page.hasMore);
            } catch {
                if (active) setError('Could not load public pastes. Please refresh to try again.');
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => { active = false; };
    }, []);

    const loadMore = useCallback(async () => {
        setLoadingMore(true);
        try {
            const page = await fetchPage(cursor);
            setPastes((current) => {
                // Guard against a paste created mid-scroll shifting the window.
                const seen = new Set(current.map((paste) => paste.slug));
                return [...current, ...page.cards.filter((paste) => !seen.has(paste.slug))];
            });
            setCursor(page.cursor);
            setHasMore(page.hasMore);
        } catch {
            // Stop observing rather than retrying in a loop on every scroll.
            setError('Could not load more pastes.');
            setHasMore(false);
        } finally {
            setLoadingMore(false);
        }
    }, [cursor]);

    // Append the next page when the sentinel approaches the viewport. Not
    // observed while a request is in flight, so one scroll fetches one page.
    // Also drives the initial fill: if a page held no public pastes, the
    // sentinel is still on screen and the next page loads immediately.
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || loading || loadingMore || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) loadMore(); },
            { rootMargin: '300px' }, // start fetching just before it is visible
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loading, loadingMore, hasMore, loadMore]);

    // Keep the cache in step so a return visit restores every loaded page,
    // not just the first one.
    useEffect(() => {
        if (loading || !pastes.length) return;
        writeCache({ pastes, cursor, hasMore });
    }, [pastes, cursor, hasMore, loading]);

    // While paging past private pastes there may be nothing to show yet, so the
    // spinner has to stay up until the search is actually exhausted.
    const searching = loading || (!pastes.length && hasMore && !error);

    return (
        <div className='public'>
            <h1>Public Pastes</h1>
            {searching ? (
                <div className='loading'>
                    <span className='spinner' />
                    <p>Loading public pastes...</p>
                    <span ref={sentinelRef} className='paste-sentinel' aria-hidden='true' />
                </div>
            ) : pastes.length === 0 ? (
                <p className='empty'>
                    {error || 'No public pastes yet. Create one and mark it public!'}
                </p>
            ) : (
                <>
                    <div className="pastes-grid">
                        {pastes.map((paste) => (
                            <div key={paste.slug} className="paste-card">
                                <h3>{paste.slug}</h3>
                                <p>{paste.preview}{paste.truncated ? '...' : ''}</p>
                                {/* A real <a href> (not navigate()) so crawlers can
                                    discover and follow public paste pages. */}
                                <Link to={`/${paste.slug}`}>View</Link>
                            </div>
                        ))}
                    </div>
                    <div ref={sentinelRef} className='paste-sentinel' aria-hidden='true' />
                    {loadingMore && (
                        <div className='loading'>
                            <span className='spinner' />
                            <p>Loading more...</p>
                        </div>
                    )}
                    {error && <p className='empty'>{error}</p>}
                </>
            )}
        </div>
    );
}

export default PublicPastes;
