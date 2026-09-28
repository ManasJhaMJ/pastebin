import { useEffect, useRef } from 'react';
import { NATIVE_BANNER } from './adConfig';

// Fluid native widget. invoke.js fills the container div by id, so a fresh
// script element is appended on every mount (a re-appended script re-executes
// even when the URL is cached) and removed on unmount.
function NativeBanner() {
    const wrapRef = useRef(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return undefined;
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = NATIVE_BANNER.src;
        wrap.appendChild(script);
        return () => {
            script.remove();
            const container = wrap.querySelector(`#container-${NATIVE_BANNER.id}`);
            if (container) container.innerHTML = '';
        };
    }, []);

    return (
        <div ref={wrapRef} className="ad-native">
            <div id={`container-${NATIVE_BANNER.id}`} />
        </div>
    );
}

export default NativeBanner;
