/* eslint-disable react/prop-types -- plain JS project, no PropTypes in use */
import { useEffect, useState } from 'react';
import { BANNERS, BANNER_SCRIPT_HOST } from './adConfig';

// The network's invoke.js reads a global `atOptions` at load time and writes
// its iframe with document.write. Neither works reliably in a React tree with
// several units on one page, so each banner gets its own same-origin iframe
// (srcdoc) with a private global scope and a document that is still open.
function buildSrcDoc({ key, width, height }) {
    return [
        '<!doctype html><html><head><meta charset="utf-8">',
        '<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style>',
        '</head><body>',
        `<script>atOptions={'key':'${key}','format':'iframe','height':${height},'width':${width},'params':{}};</script>`,
        `<script src="${BANNER_SCRIPT_HOST}/${key}/invoke.js"></script>`,
        '</body></html>',
    ].join('');
}

function AdBanner({ size, lazy = false, className = '' }) {
    const unit = BANNERS[size];
    if (!unit) return null;
    return (
        <iframe
            title="Advertisement"
            className={`ad-banner ${className}`.trim()}
            srcDoc={buildSrcDoc(unit)}
            width={unit.width}
            height={unit.height}
            style={{ width: unit.width, height: unit.height }}
            scrolling="no"
            frameBorder="0"
            loading={lazy ? 'lazy' : 'eager'}
        />
    );
}

// Tracks a CSS media query; used to swap the leaderboard for a narrower unit.
function useMediaQuery(query) {
    const [matches, setMatches] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(query).matches
    );
    useEffect(() => {
        const mq = window.matchMedia(query);
        const onChange = (e) => setMatches(e.matches);
        setMatches(mq.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, [query]);
    return matches;
}

// 728x90 on desktop, 468x60 on tablets, 320x50 on phones. Only the matching
// unit is mounted, so a hidden banner never counts as an impression.
export function ResponsiveBanner({ lazy = false }) {
    const isDesktop = useMediaQuery('(min-width: 820px)');
    const isTablet = useMediaQuery('(min-width: 540px)');
    const size = isDesktop ? 'leaderboard' : isTablet ? 'fullBanner' : 'mobile';
    // Keyed so a breakpoint change remounts a fresh iframe rather than resizing.
    return <AdBanner key={size} size={size} lazy={lazy} />;
}

export default AdBanner;
