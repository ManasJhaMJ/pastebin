// src/pages/guideContent.js
// Index of article bodies, keyed by slug. One file per guide lives in
// src/pages/guides/ - this module only assembles them.
//
// The imports are static on purpose. Everything here is already code-split into
// the /guides/:slug chunk by App.jsx, and a guide's prose is the main content of
// the page, so it should arrive in that chunk rather than in a second request
// after the route has rendered.
//
// Kept separate from guidesData.js so the prose loads only on a guide route -
// the homepage and RouteTracker need the metadata, not the bodies.

import howToShareCodeOnline from './guides/how-to-share-code-online';
import copyPasteTextBetweenDevices from './guides/copy-paste-text-between-devices';
import pasteCodeForStackOverflowReddit from './guides/paste-code-for-stack-overflow-reddit';
import shareCodeOnDiscord from './guides/share-code-on-discord';
import shareCodeJobApplication from './guides/share-code-job-application';
import howToShareTerminalLogs from './guides/how-to-share-terminal-logs';
import shareConfigFileSafely from './guides/share-config-file-safely';
import shareSqlQuerySchema from './guides/share-sql-query-schema';
import shareJsonReadable from './guides/share-json-readable';
import thingsNeverToPaste from './guides/things-never-to-paste';
import arePastebinsSafe from './guides/are-pastebins-safe';
import bestPastebinAlternative from './guides/best-pastebin-alternative';
import binpasteVsPastebin from './guides/binpaste-vs-pastebin';
import binpasteVsGithubGist from './guides/binpaste-vs-github-gist';
import selfHostPastebin from './guides/self-host-pastebin';

export const GUIDE_SECTIONS = {
    'how-to-share-code-online': howToShareCodeOnline,
    'copy-paste-text-between-devices': copyPasteTextBetweenDevices,
    'paste-code-for-stack-overflow-reddit': pasteCodeForStackOverflowReddit,
    'share-code-on-discord': shareCodeOnDiscord,
    'share-code-job-application': shareCodeJobApplication,
    'how-to-share-terminal-logs': howToShareTerminalLogs,
    'share-config-file-safely': shareConfigFileSafely,
    'share-sql-query-schema': shareSqlQuerySchema,
    'share-json-readable': shareJsonReadable,
    'things-never-to-paste': thingsNeverToPaste,
    'are-pastebins-safe': arePastebinsSafe,
    'best-pastebin-alternative': bestPastebinAlternative,
    'binpaste-vs-pastebin': binpasteVsPastebin,
    'binpaste-vs-github-gist': binpasteVsGithubGist,
    'self-host-pastebin': selfHostPastebin,
};
