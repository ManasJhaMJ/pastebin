// src/pages/guides/share-code-on-discord.js
// Article body for /guides/share-code-on-discord.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const shareCodeOnDiscord = [
    {
        blocks: [
            {
                p: 'Discord is where a large amount of programming help now happens - framework servers, university course channels, indie game dev communities, and every open-source project with a `#help` channel. It is also a chat app, which means it is good at conversation and merely tolerable at code.',
            },
            {
                p: 'The good news is that Discord is better at code than most chat apps. The bad news is that its limits arrive suddenly, and the workarounds people reach for first - screenshots, split messages, file uploads - each fail in their own way. Here is what actually breaks, and what to do instead.',
            },
        ],
    },
    {
        h2: 'What Discord genuinely does well',
        blocks: [
            {
                p: 'Credit where it is due, because it changes the advice:',
            },
            {
                ul: [
                    'Triple-backtick code blocks work, and they take a language hint, so you get real syntax highlighting in the channel.',
                    'Single backticks are fine for inline identifiers.',
                    'Messages are editable after the fact, which no pastebin gives you.',
                    'Threads keep a long debugging conversation out of the main channel.',
                ],
            },
            {
                p: 'For a snippet of ten or twenty lines, a fenced code block in the channel is the right answer. Do that, not a link:',
            },
            {
                code: {
                    lang: 'markdown',
                    text: '```js\nconst rate = limits.find(l => l.key === key)\nif (!rate) throw new Error("no limit configured")\n```',
                },
            },
            {
                note: 'The language hint goes immediately after the three opening backticks, with no space between them - js, py, ts, sql, json. Get it wrong and you still get a monospaced block, just without the colour.',
            },
        ],
    },
    {
        h2: 'Where it falls apart',
        blocks: [
            {
                p: 'Past roughly thirty lines, every one of these starts to bite:',
            },
            {
                table: {
                    caption: 'The limits you hit, in the order you hit them.',
                    headers: ['Problem', 'What it means in practice'],
                    rows: [
                        ['2,000 character message limit', 'A medium-sized file simply will not send. Nitro raises it, but your reader’s client still has to render it'],
                        ['Splitting across messages', 'Each fragment is a separate code block; indentation context is lost and nobody can copy the whole thing'],
                        ['No line numbers', '"The error is on line 47" means somebody counts by hand'],
                        ['Narrow columns', 'Long lines scroll horizontally inside a box a third of your screen wide'],
                        ['Mobile rendering', 'Code blocks on phones are small, and copying grabs the backticks too'],
                        ['Channel scroll', 'A 200-line wall pushes the actual conversation off screen, which is why help channels have rules about it'],
                        ['Search', 'Discord searches message text, not the contents of uploaded files'],
                        ['Expiring attachment links', 'Discord CDN file links are signed and time-limited, so a link copied out of Discord stops working later'],
                    ],
                },
            },
            {
                p: 'That last row is the one that catches people out. Uploading `error.log` as a file feels like the clean solution, and inside Discord it mostly is - but the direct URL is not a stable link. Copy it into a GitHub issue or an email and it will be dead when someone clicks it next month.',
            },
        ],
    },
    {
        h2: 'The screenshot problem',
        blocks: [
            {
                p: 'Posting a screenshot of code is the single most common mistake in help channels, and it is worth spelling out why it annoys people who were about to help you:',
            },
            {
                ul: [
                    'Nobody can copy your code to run it, so nobody can reproduce your bug.',
                    'Nobody can copy your error message to search it.',
                    'Nobody can paste a corrected fragment back to you.',
                    'It is unreadable to anyone on a phone, and to anyone using a screen reader.',
                    'The crop always cuts off the line that mattered.',
                ],
            },
            {
                p: 'A screenshot is right for exactly one thing: showing a visual bug - a broken layout, a wrong chart, a rendering glitch. If it contains text you want someone to read, it should not be an image.',
            },
        ],
    },
    {
        h2: 'What to do instead',
        blocks: [
            {
                table: {
                    headers: ['What you have', 'Where it should go'],
                    rows: [
                        ['1-30 lines', 'A fenced code block in the channel'],
                        ['30-200 lines', 'A paste link, plus the 5 key lines in a code block'],
                        ['A whole file', 'A paste link'],
                        ['A stack trace or build log', 'A paste link, plus the first three lines in the channel'],
                        ['A config file', 'A paste link, redacted first'],
                        ['A visual bug', 'A screenshot - this is what they are for'],
                        ['Something you will reference for weeks', 'A paste link with expiry set to Never'],
                    ],
                },
            },
            {
                p: 'The pattern for anything long is the same: **a sentence, the key lines inline, then the link.** That way the channel can help without leaving Discord, and the person who wants the full picture has it one click away.',
            },
            {
                code: {
                    lang: 'markdown',
                    text: 'Getting `TypeError: cannot read properties of null` on submit, only in prod.\n```js\nconst user = session.user      // null here, works locally\nreturn user.preferences.theme\n```\nFull component + the build log: www.binpaste.xyz/prod-session-null',
                },
            },
        ],
    },
    {
        h2: 'Why the link unfurls into something useful',
        blocks: [
            {
                p: 'A bare paste link in a chat channel is a small act of faith - people are wary of opaque URLs from strangers, and rightly so. BinPaste links are built to answer that before anyone clicks.',
            },
            {
                ul: [
                    '**You choose the name,** so the URL describes itself: `www.binpaste.xyz/prod-session-null`, not `xY7kQ2mZ`.',
                    '**The link unfurls with a real preview.** Paste pages are served with per-paste metadata and a generated preview card, so Discord shows the paste name, the language, and a snippet of the contents instead of a generic site card.',
                    '**No account is needed to read it,** so nobody in the channel bounces off a login wall.',
                    '**The link is stable.** It is not a signed CDN URL that expires on its own - it lasts until the expiry you chose, or indefinitely if you chose Never.',
                ],
            },
            {
                p: 'The preview is the part that changes behaviour. A card that says "prod-session-null - JavaScript snippet" with the first few lines visible gets opened. A bare URL gets ignored, or gets a "what is that?" reply that costs you another ten minutes.',
            },
            {
                cta: {
                    text: 'Got more than thirty lines to share? Name it, paste it, drop one link in the channel.',
                    label: 'Create a paste',
                    to: '/',
                },
            },
        ],
    },
    {
        h2: 'Help channel etiquette',
        blocks: [
            {
                p: 'None of this is Discord-specific, but help channels enforce it more visibly than most places:',
            },
            {
                ol: [
                    'Read the pinned messages. Many servers explicitly require a paste link over long messages, and some have a bot that deletes code walls.',
                    'Ask the question in the message, not in the link. "Anyone know why this breaks?" plus a URL is asking people to do your triage.',
                    'Say what the link contains and how long it is. "Full 180-line component, the error is at line 42" is enough.',
                    'Post once. Do not re-ask in three channels, and do not ping a role because nobody replied in four minutes.',
                    'Include what you already tried. It is the difference between a conversation and a request for free labour.',
                    'When someone solves it, say what the fix was in the channel. The next person searching finds the answer, rather than a dead link and a "nvm, fixed it".',
                ],
            },
            {
                note: 'That last one matters more than people realise. A thread that ends in "fixed it, thanks" with an expired paste link is the reason help channel regulars get tired. Ninety seconds of writing up the fix repays the help you just got.',
            },
        ],
    },
    {
        h2: 'Choosing an expiry for chat',
        blocks: [
            {
                table: {
                    headers: ['Expiry', 'When'],
                    rows: [
                        ['10 minutes', 'Somebody is looking at it with you right now'],
                        ['1 hour', 'An active back-and-forth in a busy channel'],
                        ['1 day', 'A quiet server, or a timezone gap between you and the people who know'],
                        ['1 week', 'A question in a low-traffic channel'],
                        ['Never', 'Anything you will link from an issue tracker, a wiki, or a forum post'],
                    ],
                },
            },
            {
                p: 'Err on the long side. An expired link in a solved thread is a small piece of vandalism against everybody who finds that thread later - the same reasoning behind using Never on Stack Overflow, covered in [where to paste code for a Stack Overflow or Reddit question](/guides/paste-code-for-stack-overflow-reddit).',
            },
            {
                p: 'And before you paste a config, an environment file, or anything copied out of a browser’s network tab, run it past [8 things you should never paste into a pastebin](/guides/things-never-to-paste). Help channels are public, indexed by bots, and often logged - a token pasted into one is a token that has been published.',
            },
        ],
    },
];

export default shareCodeOnDiscord;
