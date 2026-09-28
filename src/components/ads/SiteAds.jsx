import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { POPUNDER, SOCIAL_BAR, adsAllowedOn } from './adConfig';

// Loads the page-level ad scripts. They attach to the document once, so each
// is loaded a single time per session rather than on every navigation.
//   - Popunder: every route, including the homepage.
//   - Social bar: first time the visitor is on an ad-enabled route.
function loadOnce(src) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
}

function SiteAds() {
    const { pathname } = useLocation();

    useEffect(() => {
        if (POPUNDER.enabled) loadOnce(POPUNDER.src);
        if (SOCIAL_BAR.enabled && adsAllowedOn(pathname)) loadOnce(SOCIAL_BAR.src);
    }, [pathname]);

    return null;
}

export default SiteAds;
