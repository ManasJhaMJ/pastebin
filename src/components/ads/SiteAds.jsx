import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SOCIAL_BAR, adsAllowedOn } from './adConfig';

// Loads the page-level social bar script the first time the visitor is on an
// ad-enabled route. It attaches to the document once, so it is loaded a single
// time per session rather than on every navigation.
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
        if (SOCIAL_BAR.enabled && adsAllowedOn(pathname)) loadOnce(SOCIAL_BAR.src);
    }, [pathname]);

    return null;
}

export default SiteAds;
