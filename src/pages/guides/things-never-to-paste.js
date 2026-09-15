// src/pages/guides/things-never-to-paste.js
// Article body for /guides/things-never-to-paste.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const thingsNeverToPaste = [
    {
        blocks: [
            {
                p: 'A pastebin is a good tool with one sharp edge: a paste link works for anybody who has it. No login, no permission check, no expiry unless you set one. That is exactly why it is fast, and exactly why some things must never go into one.',
            },
            {
                p: 'This is the list. For each item there is a reason it is worse than it looks, and the tool you should be reaching for instead. If you only remember one line, remember this: **automated scanners monitor paste sites specifically, looking for credential formats.** People have had AWS keys abused within minutes of pasting them.',
            },
        ],
    },
    {
        h2: 'The short version',
        blocks: [
            {
                table: {
                    caption: 'What to use instead, item by item.',
                    headers: ['Instead of pasting this', 'Use this'],
                    rows: [
                        ['Passwords and API keys', 'A password manager, or a one-time secret link'],
                        ['SSH and TLS private keys', 'Never share them; generate a new keypair per machine'],
                        ['Customer or user personal data', 'Anonymised sample rows you generated yourself'],
                        ['A whole database dump', 'A schema plus fake rows, or a private file transfer'],
                        ['Source code you do not own', 'Your employer’s own repo, or a redacted extract'],
                        ['Session cookies and live tokens', 'Reproduce the request with a fresh test token'],
                        ['Medical, financial, or ID numbers', 'Nothing. Do not put it online at all'],
                        ['Other people’s private messages', 'A paraphrase, with names removed'],
                    ],
                },
            },
        ],
    },
    {
        h2: '1. Passwords and API keys',
        blocks: [
            {
                p: 'The obvious one, and still the most common. It is rarely deliberate - the key is on line 14 of a config file you pasted to ask about line 40.',
            },
            {
                p: 'Keys with recognisable prefixes are the highest risk, because they are trivially greppable at scale: `sk_live_` (Stripe), `ghp_` (GitHub), `AKIA` (AWS), `xoxb-` (Slack), `AIza` (Google). A scanner does not need to understand your paste. It needs one regex.',
            },
            {
                ul: [
                    '**Instead:** redact the value and keep the key, as described in [how to share a config file safely](/guides/share-config-file-safely).',
                    '**If a real secret has to reach a person:** use a one-time secret link or your team password manager, not a paste.',
                ],
            },
        ],
    },
    {
        h2: '2. Private keys and certificates',
        blocks: [
            {
                p: 'If a block of text starts with `-----BEGIN`, stop. An `id_rsa`, a `.pem`, or a signing key is not a credential for one service - it is often an identity that unlocks several machines at once.',
            },
            {
                p: 'And unlike an API key, a private key is frequently not rotatable in five minutes. It may be baked into deploy pipelines, authorised on servers you have forgotten about, or issued by a CA that will charge you to reissue.',
            },
            {
                note: 'A private key never needs to be sent to anyone, ever. That is the entire point of the design: you send the public half. If a workflow seems to require sharing the private half, the workflow is the bug.',
            },
        ],
    },
    {
        h2: '3. Customer or user personal data',
        blocks: [
            {
                p: 'A "quick sample of the failing rows" is the classic route for real names, emails, phone numbers, and addresses to end up on a public URL. Three things follow from that, and only one of them is technical:',
            },
            {
                ol: [
                    'Under the GDPR and similar laws, that is a personal data breach involving people who never agreed to it - with notification duties attached.',
                    'You cannot un-share it. Deleting the paste does not retrieve the copies.',
                    'It is almost never necessary. The bug is in the shape of the data, not in whose data it is.',
                ],
            },
            {
                ul: [
                    '**Instead:** replace values with obviously fake ones you made up. Keep the format - same lengths, same nulls, same odd characters - because the format is what reproduces the bug.',
                ],
            },
        ],
    },
    {
        h2: '4. A whole database dump',
        blocks: [
            {
                p: 'Two separate problems. First, a dump nearly always contains user data, so item 3 applies. Second, it is the wrong shape for help: nobody is reading 60,000 rows to find your bug, and a pastebin is not a file transfer service. BinPaste caps a paste at 400,000 characters for exactly this reason.',
            },
            {
                ul: [
                    '**Instead:** paste the schema and a handful of invented rows. [How to share a long SQL query or database schema](/guides/share-sql-query-schema) covers how to trim a schema down to the tables that matter.',
                ],
            },
        ],
    },
    {
        h2: '5. Code you do not own',
        blocks: [
            {
                p: 'Your employer’s source code is your employer’s. Pasting a proprietary module to a public URL to ask a question is, in most contracts, a disclosure - and the fact that it was well-intentioned does not change that. The same goes for a client’s code, for anything under NDA, and for a take-home test you were asked not to publish.',
            },
            {
                ul: [
                    '**Instead:** reduce it to a minimal example that uses no proprietary names, no internal logic, and no business rules. This is not just a legal dodge - a minimal example gets better answers, because the reader is not wading through your domain model.',
                    '**For a take-home test:** read the brief. See [how to share code in a job application or take-home test](/guides/share-code-job-application).',
                ],
            },
        ],
    },
    {
        h2: '6. Session cookies and live tokens',
        blocks: [
            {
                p: 'This one hides inside a reasonable action: you copy a failing request as cURL from browser devtools and paste it so somebody can see the headers. That copy includes your `Cookie` header and your `Authorization: Bearer` token.',
            },
            {
                p: 'A live session token is a password with the login step already done. Depending on the app, whoever holds it may be able to act as you until it expires - and "until it expires" is sometimes weeks.',
            },
            {
                code: {
                    lang: 'bash',
                    text: "curl 'https://api.example.com/v2/orders' \\\n  -H 'Authorization: Bearer REDACTED' \\\n  -H 'Cookie: session=REDACTED' \\\n  -H 'Content-Type: application/json'",
                },
            },
            {
                ul: [
                    '**Instead:** strip `Authorization` and `Cookie` to `REDACTED` before pasting, as above. Keep every other header - those are usually where the actual problem is.',
                ],
            },
        ],
    },
    {
        h2: '7. Medical, financial, and government ID numbers',
        blocks: [
            {
                p: 'Health records, card numbers, bank details, national insurance or social security numbers, passport scans, tax IDs. These sit in a separate legal category almost everywhere, and the consequences of leaking them fall on a person who cannot do anything about it.',
            },
            {
                p: 'There is no redaction advice here, because there is no version of this that belongs in a paste. If you are debugging a payment flow, use the provider’s test card numbers - every payment processor publishes them for exactly this purpose.',
            },
        ],
    },
    {
        h2: '8. Other people’s private conversations',
        blocks: [
            {
                p: 'Dumping a Slack thread or a group chat to a public link to prove a point puts other people’s words, names, and often their contact details on the internet without asking them. It also tends to include far more context than the point required.',
            },
            {
                ul: [
                    '**Instead:** paraphrase, or paste only the lines that matter with names removed.',
                ],
            },
        ],
    },
    {
        h2: 'Two things that sound safe but are not',
        blocks: [
            {
                p: '**"It is unlisted, so it is private."** Unlisted means not listed and not indexed. It does not mean access-controlled. On BinPaste, pastes stay off the [public feed](/public) unless you tick "Make Public", and every paste page is served with a `noindex` instruction so search engines leave it out of results - but anyone with the link can still open it, and a scanner that guesses URLs does not need a search engine at all. [Are pastebins safe? What "unlisted" actually means](/guides/are-pastebins-safe) goes into this properly.',
            },
            {
                p: '**"I will delete it in a minute."** Deletion removes the page, not the copies. Between posting and deleting, a scraper may have read it. Treat "posted" as "published".',
            },
        ],
    },
    {
        h2: 'What a pastebin is genuinely good for',
        blocks: [
            {
                p: 'None of this is an argument against pastes. It is an argument for knowing the boundary. Inside it, a paste link is the fastest tool available:',
            },
            {
                ul: [
                    'A code snippet or a whole file you want a second opinion on.',
                    'A stack trace or a build log that would flood a chat channel - see [how to share terminal logs](/guides/how-to-share-terminal-logs).',
                    'A redacted config, so somebody can spot the missing directive.',
                    'A long SQL query, a JSON payload, or a schema.',
                    'Text you need to get from your phone onto your laptop with no cable and no app.',
                    'Anything you would otherwise send as a screenshot, which nobody can copy from or search.',
                ],
            },
            {
                cta: {
                    text: 'Sharing something from the safe list? Name your own link, set an expiry, and skip the sign-up.',
                    label: 'Create a paste',
                    to: '/',
                },
            },
            {
                p: 'And if you have already pasted something from the list above: rotate the credential first, then get the paste taken down - Report on the paste page, or email the link via the [contact page](/contact). Rotation is the fix. Deletion is tidying up afterwards.',
            },
        ],
    },
];

export default thingsNeverToPaste;
