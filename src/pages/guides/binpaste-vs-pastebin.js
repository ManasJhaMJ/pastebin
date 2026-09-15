// src/pages/guides/binpaste-vs-pastebin.js
// Article body for /guides/binpaste-vs-pastebin.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const binpasteVsPastebin = [
    {
        blocks: [
            {
                p: 'Pastebin.com invented this category and has been running it for two decades. Any comparison that starts by pretending otherwise is not worth reading, so let us start there: it works, it is not going anywhere, and for some jobs it is still the better choice.',
            },
            {
                p: 'What follows is where the two differ in practice, which one fits which job, and the honest cases where you should not use BinPaste.',
            },
            {
                note: 'Disclosure: I built BinPaste, so treat the framing accordingly. What I have tried to do is state BinPaste’s limits as plainly as its advantages, and give Pastebin credit where it has it. Features on any site change - check the current one before relying on a detail here.',
            },
        ],
    },
    {
        h2: 'Side by side',
        blocks: [
            {
                table: {
                    caption: 'The differences that change how the tool feels to use.',
                    headers: ['', 'BinPaste', 'Pastebin.com'],
                    rows: [
                        ['Account to paste', 'None, ever', 'Optional - but features are attached to having one'],
                        ['You choose the URL', 'Yes, you type the name', 'No, a generated key'],
                        ['Ads on paste pages', 'None - the ad script is stripped from paste pages', 'Yes, on the free tier'],
                        ['Ads elsewhere on the site', 'Yes, on content pages like this one', 'Yes'],
                        ['Interstitials or captchas', 'None', 'Guests may hit verification steps'],
                        ['Default visibility', 'Unlisted, and served `noindex`', 'Public unless you change it'],
                        ['Public feed', 'Opt-in, by ticking "Make Public"', 'Yes, with a large public archive'],
                        ['Languages highlighted', '8', 'Several hundred'],
                        ['Expiry options', '10 min to 1 month, or never', 'A comparable range, including longer periods'],
                        ['Paste history', 'No - there are no accounts', 'Yes, with an account'],
                        ['Editing', 'No', 'Yes, with an account'],
                        ['Public API', 'No', 'Yes'],
                        ['QR code for the link', 'Yes, on every paste page', 'No'],
                        ['View counter', 'Yes', 'Yes'],
                        ['Raw plain text', 'Yes, at `/<name>/raw`', 'Yes'],
                        ['Size limit', '400,000 characters', 'Varies by tier'],
                        ['Age', 'New', 'Two decades of uptime'],
                    ],
                },
            },
        ],
    },
    {
        h2: 'What Pastebin does better',
        blocks: [
            {
                ul: [
                    '**Longevity.** A link from 2010 still resolves. Nothing a new site says can match twenty years of evidence, and if you are putting a link in documentation that must survive a decade, that record is a real argument.',
                    '**Language coverage.** Several hundred languages against eight. If you are sharing Rust, Go, YAML, SQL, PHP, or anything outside the common set and you want proper colouring, Pastebin has it and BinPaste does not.',
                    '**An account with your history.** Signed in, you get a list of everything you have posted, folders, and the ability to edit or delete later. BinPaste has no accounts, which means it also has no history - if you lose the link, the paste is gone as far as you are concerned.',
                    '**A public API.** For scripts, CI pipelines, and tooling, Pastebin has a documented API. BinPaste has none.',
                    '**Private pastes.** Tied to an account, readable only by you. BinPaste has no equivalent, because it has nobody to tie a paste to.',
                    '**The archive.** The public paste stream is genuinely useful to security researchers, and it exists at a scale nothing else has.',
                ],
            },
            {
                p: 'That is a serious list. If two or more of those matter to you, the rest of this page is academic - use Pastebin.',
            },
        ],
    },
    {
        h2: 'What BinPaste does better',
        blocks: [
            {
                h3: 'You name the link',
            },
            {
                p: 'This is the whole reason the site exists, and it is the difference you notice within one use.',
            },
            {
                table: {
                    headers: ['Link', 'Can you...'],
                    rows: [
                        ['`pastebin.com/xY7kQ2mZ`', 'Read it over the phone? No. Type it from memory? No. Tell what it contains? No'],
                        ['`www.binpaste.xyz/nginx-502-config`', 'Read it aloud, type it on a laptop, and know what is in it before clicking'],
                    ],
                },
            },
            {
                p: 'A random key is fine when the link travels by copy and paste. It is useless the moment a human has to carry it - across devices, into a meeting, onto a whiteboard, or into a ticket somebody reads next month.',
            },
            {
                h3: 'No ads on paste pages',
            },
            {
                p: 'BinPaste runs ads on content pages - this page has them, and they pay for the hosting. They are stripped from paste pages entirely, so the ad script does not even load there. Two reasons: nobody should have an advert placed next to arbitrary text somebody else submitted, and the reader you sent the link to is not your traffic to monetise.',
            },
            {
                h3: 'Nothing between the link and the text',
            },
            {
                p: 'No sign-up prompt, no verification step, no "continue to paste" page. Click the link, read the text. This is the part people notice most about the older sites and complain about least loudly, because they have got used to it.',
            },
            {
                h3: 'Unlisted and noindexed by default',
            },
            {
                p: 'A BinPaste paste stays off the [public feed](/public) unless you tick "Make Public", and every paste page carries a `noindex` instruction, so pastes do not turn up in search results. That is a default, not a security control - anyone with the link can still read it, which is explained properly in [are pastebins safe?](/guides/are-pastebins-safe).',
            },
            {
                h3: 'It works properly on a phone',
            },
            {
                p: 'Every paste page has a QR code, so getting a paste from a laptop onto a phone means pointing a camera at the screen. Combined with a name you can type, it is the fastest way to move text between devices without an app or a cable - see [how to copy and paste text between devices](/guides/copy-paste-text-between-devices).',
            },
            {
                cta: {
                    text: 'Try the difference on one paste: type the name you want, pick the language, and share a link that reads like a sentence.',
                    label: 'Create a paste',
                    to: '/',
                },
            },
        ],
    },
    {
        h2: 'The blocked-at-work problem',
        blocks: [
            {
                p: 'Worth raising because it is the most common reason people go looking for an alternative in the first place: plenty of corporate networks block pastebin.com. That is not arbitrary - a site with a large public archive of anonymous text gets used to exfiltrate data and to host stages of attacks, so security vendors categorise it accordingly.',
            },
            {
                p: 'A smaller site is often not on those lists, so BinPaste frequently works where the big ones do not. Two honest caveats:',
            },
            {
                ul: [
                    'Some filters block the entire "file sharing" or "pastebin" category by pattern, in which case nothing in this category will work and the answer is an internal instance - see [how to self-host a pastebin](/guides/self-host-pastebin).',
                    'If your employer blocks paste sites to stop code leaving the building, routing around the block is a policy problem, not a technical one. Ask first.',
                ],
            },
        ],
    },
    {
        h2: 'Where neither one is the answer',
        blocks: [
            {
                ul: [
                    '**Secrets.** Credentials, private keys, or customer data belong in a password manager or a one-time secret tool. Neither site is encrypted at rest in a way that protects you from its operator.',
                    '**Multi-file projects.** Use a Git repository, or a Gist - see [BinPaste vs GitHub Gist](/guides/binpaste-vs-github-gist).',
                    '**Large files.** A pastebin is not a file transfer service, and both have size limits for good reasons.',
                    '**Anything needing an audit trail or revision history.** Use version control.',
                    '**Long-term collaborative editing.** A paste is a snapshot; on BinPaste it cannot be edited at all.',
                ],
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
                        ['Sending a log to someone in chat right now', 'BinPaste'],
                        ['A link that must resolve in 2040', 'Pastebin, on the strength of its record'],
                        ['Automating paste creation from a script', 'Pastebin - it has the API'],
                        ['Getting a snippet from your phone to your laptop', 'BinPaste'],
                        ['Sharing Rust or YAML and you want highlighting', 'Pastebin - more languages'],
                        ['A link you have to read out loud on a call', 'BinPaste'],
                        ['You want a searchable archive of your own pastes', 'Pastebin, with an account'],
                        ['pastebin.com is blocked on your network', 'BinPaste, or self-host'],
                        ['Sharing a redacted config that should vanish tomorrow', 'Either - both do expiry'],
                        ['You do not want to see an ad next to your own paste', 'BinPaste'],
                    ],
                },
            },
        ],
    },
    {
        h2: 'The summary',
        blocks: [
            {
                p: 'Pastebin is a **platform**: accounts, history, an API, an archive, and twenty years of proving it will still be there. BinPaste is a **tool**: one screen, no account, a link you name yourself, and no advertising on the page you send to someone else.',
            },
            {
                p: 'If you need the platform, use the platform. If what you actually needed was to get some text in front of a person without ceremony, that is the narrower thing BinPaste is built for - and the criteria for judging any of these sites, including this one, are in [the best free pastebin alternative in 2026](/guides/best-pastebin-alternative).',
            },
        ],
    },
];

export default binpasteVsPastebin;
