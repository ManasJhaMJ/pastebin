// src/pages/guides/binpaste-vs-github-gist.js
// Article body for /guides/binpaste-vs-github-gist.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const binpasteVsGithubGist = [
    {
        blocks: [
            {
                p: 'GitHub Gist and a pastebin look like the same tool, and they are not. Gist is a tiny Git repository with a web page attached. A pastebin is a text box with a URL. That difference explains every practical distinction between them, and it means the right answer genuinely depends on what you are doing rather than which one is better.',
            },
            {
                p: 'This is a straight comparison, including the places where Gist wins outright.',
            },
        ],
    },
    {
        h2: 'The one-line answer',
        blocks: [
            {
                p: 'Use **Gist** when the snippet is a small artefact you want to keep, revise, and be credited for. Use **[BinPaste](/)** when the snippet is a message you need to get to someone right now.',
            },
        ],
    },
    {
        h2: 'Side by side',
        blocks: [
            {
                table: {
                    caption: 'Reading either one is free and account-free. Creating is where they diverge.',
                    headers: ['', 'BinPaste', 'GitHub Gist'],
                    rows: [
                        ['Account to create', 'None', 'GitHub account required'],
                        ['Account to read', 'None', 'None'],
                        ['You choose the URL', 'Yes - you type the name', 'No - a long generated hash'],
                        ['Expiry', '10 min, 1 hour, 1 day, 1 week, 1 month, or never', 'None - gists stay until you delete them'],
                        ['Version history', 'No - a paste cannot be edited', 'Yes, full revision history'],
                        ['Editing', 'No', 'Yes'],
                        ['Multiple files per item', 'No', 'Yes'],
                        ['Comments', 'No', 'Yes, from signed-in users'],
                        ['Languages highlighted', '8 (plain text, JS, Python, Java, C, C++, HTML, CSS)', 'Hundreds, auto-detected'],
                        ['Embed in a blog post', 'No', 'Yes, a script embed'],
                        ['Clone with git', 'No', 'Yes'],
                        ['Raw plain text', 'Yes, at `/<name>/raw`', 'Yes'],
                        ['One-click download', 'Yes, with the right extension', 'Yes'],
                        ['QR code for the link', 'Yes, on the paste page', 'No'],
                        ['View counter', 'Yes', 'No'],
                        ['Tied to your public identity', 'No', 'Yes, by default'],
                        ['Search indexing', 'Pastes are served `noindex`', 'Public gists are indexed and searchable'],
                        ['Ads', 'None on paste pages', 'None'],
                    ],
                },
            },
        ],
    },
    {
        h2: 'Where Gist is clearly better',
        blocks: [
            {
                p: 'No hedging - if any of these describe your situation, use Gist and stop reading:',
            },
            {
                ul: [
                    '**You need revisions.** Gist is Git. You can edit, and every version is retrievable. A paste is immutable by design, so "here is v2" means a new link.',
                    '**The snippet needs more than one file.** A component plus its test plus a config file belongs in a gist.',
                    '**You want discussion attached to the code.** Gist comments live with the snippet; a paste has nowhere to put a reply.',
                    '**You are embedding it in a blog post or documentation.** The Gist embed script is the standard way to do this, and it stays in sync when you edit.',
                    '**It is a portfolio piece.** A gist sits on your GitHub profile, with your name on it, forever. That is a feature when you want credit.',
                    '**You want to clone or `curl` it into a script long-term,** or use an API to manage it programmatically.',
                    '**The language is unusual.** Gist highlights hundreds of languages; BinPaste currently highlights eight. If you are sharing Rust, Go, SQL, or YAML and colour matters to you, that is a real point for Gist.',
                ],
            },
        ],
    },
    {
        h2: 'Where BinPaste is clearly better',
        blocks: [
            {
                ul: [
                    '**No account.** Nothing to sign into, which matters more than it sounds - see below.',
                    '**You choose the link.** `www.binpaste.xyz/prod-session-null` versus `gist.github.com/user/4f9a2c8e1b7d3a5f6e0c9b8a7d6e5f4c`. One of those can be read aloud, typed on a phone, or dropped into a ticket where it still means something.',
                    '**Expiry.** A paste can delete itself in ten minutes. Gists have no expiry at all - they stay until you remember to remove them.',
                    '**Nothing lands on your public profile.** A build log from work does not need to be a permanent artefact under your name.',
                    '**Sharing with non-developers.** Handing a recruiter, a designer, or a client a `gist.github.com` URL invites confusion. A plain page with text on it does not.',
                    '**Phone to laptop.** Paste on one device, open the QR code or type the short name on the other. This is the most-used trick on the site - see [how to copy and paste text between devices](/guides/copy-paste-text-between-devices).',
                    '**Speed.** Paste, name, submit. No repository, no commit, no dialog.',
                ],
            },
            {
                cta: {
                    text: 'Just need to get a snippet to someone now? Name your link, pick the language, and send it.',
                    label: 'Create a paste',
                    to: '/',
                },
            },
        ],
    },
    {
        h2: 'The account question is the real dividing line',
        blocks: [
            {
                p: 'Creating a gist requires being logged into GitHub. Anonymous gists were removed years ago, so there is no way around it. Most of the time that is fine, because you are already logged in.',
            },
            {
                p: 'The times it is not fine are specific and common:',
            },
            {
                ul: [
                    'On a colleague’s machine, or a lab machine, where logging into your GitHub account is a bad idea.',
                    'On a phone, where the GitHub web editor is not where you want to be at all.',
                    'When the person you are helping needs to send **you** something, and they do not have a GitHub account. This is most of the world.',
                    'On a locked-down network where GitHub is restricted but general web browsing is not.',
                    'When you do not want the thing you are sharing associated with your identity in any way.',
                ],
            },
        ],
    },
    {
        h2: 'The retention question, and one thing worth knowing',
        blocks: [
            {
                p: 'Gists are permanent by default and BinPaste pastes can be temporary. Which you want depends on whether the snippet is reference material or a message - but there is a specific trap on the Gist side that is worth spelling out.',
            },
            {
                note: 'Editing a secret out of a gist does not remove it. Gist is backed by Git, and the revision history is part of the public page. If you paste an API key into a gist and then edit it out, the key is still visible under the revisions tab of that gist - and it is attached to your GitHub identity. The only fix is to delete the entire gist, and then rotate the key anyway.',
            },
            {
                p: 'The BinPaste equivalent is simpler in one way and no better in another: pastes cannot be edited at all, so there is no revision history to leak - but a paste that has been read has been read. Either way, the rule does not change: redact before you share, and if a live credential got out, rotate it. That is covered in [how to share a config file safely](/guides/share-config-file-safely) and [8 things you should never paste into a pastebin](/guides/things-never-to-paste).',
            },
            {
                p: 'One more asymmetry: a "secret" gist is unlisted, not private. It does not appear on your profile and is not surfaced in GitHub search, but anyone with the URL can read it, exactly like an unlisted paste. Both tools are the same shape here, and neither is a place for secrets. [Are pastebins safe? What "unlisted" actually means](/guides/are-pastebins-safe) applies to both.',
            },
        ],
    },
    {
        h2: 'By scenario',
        blocks: [
            {
                table: {
                    headers: ['What you are doing', 'Use'],
                    rows: [
                        ['Sending a 200-line file to a colleague on Slack', 'BinPaste'],
                        ['Publishing a utility script you want people to find and star', 'Gist'],
                        ['Sharing a stack trace in a Discord help channel', 'BinPaste'],
                        ['A snippet you will embed in a blog post and keep updating', 'Gist'],
                        ['Getting text from your phone to your laptop', 'BinPaste'],
                        ['A dotfile or config you maintain across machines', 'Gist'],
                        ['Sharing a redacted config with a short expiry', 'BinPaste'],
                        ['A code sample for a job application', 'Either - BinPaste if the brief says do not publish it'],
                        ['A snippet needing three files and a README', 'Gist, or a real repo'],
                        ['Something you need to be gone by tomorrow', 'BinPaste'],
                    ],
                },
            },
        ],
    },
    {
        h2: 'The realistic answer: both',
        blocks: [
            {
                p: 'Anyone doing this a lot ends up using both, and the split settles roughly here: **Gist for things you are keeping, a paste for things you are sending.** A gist is a small publication. A paste is closer to a message that happens to have a URL.',
            },
            {
                p: 'Asking "which is better" is a bit like asking whether a document or an email is better. If the snippet will still matter in six months and you want your name on it, make a gist. If it needs to be in front of somebody in the next thirty seconds and the process should include no logins at all, paste it.',
            },
            {
                p: 'If you are also weighing up the older paste sites, the head-to-head is in [BinPaste vs Pastebin](/guides/binpaste-vs-pastebin), and the general criteria for judging any of them are in [the best free pastebin alternative in 2026](/guides/best-pastebin-alternative).',
            },
        ],
    },
];

export default binpasteVsGithubGist;
