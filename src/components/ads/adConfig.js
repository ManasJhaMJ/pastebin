// Ad network unit ids for binpaste.xyz. Every ad component reads from here so
// swapping or disabling a unit is a one-line change.

// Fixed-size iframe banners (highrevenueformat "atOptions" units).
export const BANNERS = {
    leaderboard: { key: '74ec47aefec35139f94a2095abe67dab', width: 728, height: 90 },
    rectangle: { key: '67250023e951a884b6544ed207e9037b', width: 300, height: 250 },
    fullBanner: { key: '2d0af2945d4298215121590ce483ac1a', width: 468, height: 60 },
    halfSkyscraper: { key: 'c764da585fa42a8398508ae486a32979', width: 160, height: 300 },
    skyscraper: { key: '007c1ee146f9a714c176c69633bab788', width: 160, height: 600 },
    mobile: { key: '709efcbd97e0841465304e64f323e3ac', width: 320, height: 50 },
};

export const BANNER_SCRIPT_HOST = 'https://www.highrevenueformat.com';

// Native banner (fluid 4:1 widget).
export const NATIVE_BANNER = {
    id: '2e59f47a0e1fdc0c0797eb6215003ed3',
    src: 'https://pl31556767.profitableratecpmnetwork.com/2e59f47a0e1fdc0c0797eb6215003ed3/invoke.js',
};

// Site-wide floating script; flip `enabled` to false to disable. Kept off the
// homepage so the landing screen stays clear. No popunder is used anywhere.
export const SOCIAL_BAR = {
    enabled: true,
    src: 'https://pl31556768.profitableratecpmnetwork.com/e0/03/30/e003308cfc7ddc0efb8b4f8228fe8c54.js',
};

export const SMARTLINK =
    'https://www.profitableratecpmnetwork.com/hktu5ve865?key=34f283627ab3cea5329da98f14e7351f';

// On-page ads are shown everywhere except the raw plain-text view, which exists
// precisely to be chrome-free. On the homepage they sit between the sections
// below the editor, never above it.
export function adsAllowedOn(pathname) {
    return !pathname.endsWith('/raw');
}

export function socialBarAllowedOn(pathname) {
    return pathname !== '/' && adsAllowedOn(pathname);
}
