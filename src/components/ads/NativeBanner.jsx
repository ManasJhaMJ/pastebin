import { useEffect, useRef, useState } from 'react';
import { NATIVE_BANNER } from './adConfig';
import { AD_SANDBOX, buildAdDocument } from './adFrame';

// Upper bound on the height the frame will accept, so a misbehaving script
// cannot stretch the page.
const MAX_HEIGHT = 800;

// Fluid native widget. invoke.js fills the container div by id; it runs in a
// sandboxed iframe (see adFrame.js) rather than the page itself, and a tiny
// script inside the frame reports the rendered height so it can grow to fit.
function buildSrcDoc() {
    return buildAdDocument(
        `<div id="container-${NATIVE_BANNER.id}"></div>` +
            `<script async data-cfasync="false" src="${NATIVE_BANNER.src}"></script>` +
            '<script>(function(){var last=-1;function post(){' +
            'var h=Math.ceil(document.body.getBoundingClientRect().height);' +
            "if(h!==last){last=h;parent.postMessage({binpasteAdHeight:h},'*')}}" +
            'new ResizeObserver(post).observe(document.body);window.addEventListener("load",post);})();</script>'
    );
}

function NativeBanner() {
    const frameRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const onMessage = (e) => {
            if (!frameRef.current || e.source !== frameRef.current.contentWindow) return;
            const h = e.data && e.data.binpasteAdHeight;
            if (typeof h === 'number' && h >= 0) setHeight(Math.min(h, MAX_HEIGHT));
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, []);

    return (
        <div className="ad-native">
            <iframe
                ref={frameRef}
                title="Advertisement"
                className="ad-native-frame"
                srcDoc={buildSrcDoc()}
                sandbox={AD_SANDBOX}
                style={{ height }}
                scrolling="no"
                frameBorder="0"
            />
        </div>
    );
}

export default NativeBanner;
