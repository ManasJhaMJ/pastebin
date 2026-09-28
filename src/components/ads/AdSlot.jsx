/* eslint-disable react/prop-types -- plain JS project, no PropTypes in use */
import { useLocation } from 'react-router-dom';
import { adsAllowedOn } from './adConfig';
import AdBanner, { ResponsiveBanner } from './AdBanner';
import NativeBanner from './NativeBanner';

// A labelled, centred ad container. `type` picks the unit:
//   'banner'    - responsive leaderboard / full banner / mobile strip
//   'rectangle' - 300x250
//   'native'    - fluid native widget
// Renders nothing on routes where on-page ads are disabled, so pages can drop
// a slot in without checking the route themselves.
function AdSlot({ type = 'banner', lazy = false, className = '' }) {
    const { pathname } = useLocation();
    if (!adsAllowedOn(pathname)) return null;

    let unit;
    if (type === 'native') unit = <NativeBanner />;
    else if (type === 'rectangle') unit = <AdBanner size="rectangle" lazy={lazy} />;
    else unit = <ResponsiveBanner lazy={lazy} />;

    return (
        <aside className={`ad-slot ad-slot-${type} ${className}`.trim()} aria-label="Advertisement">
            <span className="ad-label">Advertisement</span>
            {unit}
        </aside>
    );
}

export default AdSlot;
