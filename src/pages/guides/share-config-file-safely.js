// src/pages/guides/share-config-file-safely.js
// Article body for /guides/share-config-file-safely.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const shareConfigFileSafely = [
    {
        blocks: [
            {
                p: 'Config files are the single most dangerous thing people paste online, for an annoying reason: they are also the thing people most often need help with. Nobody asks for help with a file full of pure logic. They ask for help with the nginx block that will not route, the `docker-compose.yml` that will not start, and the `.env` that works locally and not in production.',
            },
            {
                p: 'This guide is the process for sharing one of those files without handing over the keys with it: what to strip, what to keep, what people routinely forget, and what to do if you have already pasted something you should not have.',
            },
        ],
    },
    {
        h2: 'What is actually hiding in your config',
        blocks: [
            {
                p: 'Before redacting, it helps to know what you are looking for. Secrets are rarely labelled "secret".',
            },
            {
                table: {
                    caption: 'The usual suspects, by file.',
                    headers: ['File', 'What is usually in there'],
                    rows: [
                        ['`.env`', 'API keys, database URLs with inline passwords, JWT signing secrets, third-party tokens'],
                        ['`docker-compose.yml`', 'Root passwords, mounted host paths, internal service hostnames, exposed ports'],
                        ['`nginx.conf`', 'Upstream internal IPs and hostnames, certificate paths, basic-auth files'],
                        ['CI files (`.github/workflows`)', 'Secret names, deploy targets, registry accounts, cloud account IDs'],
                        ['`settings.py` / `application.yml`', 'Secret keys, mail credentials, allowed-hosts lists, debug flags'],
                        ['`~/.aws/config`', 'Account IDs, role ARNs, SSO start URLs, profile names'],
                        ['`package.json`', 'Private registry URLs, sometimes a token right in the registry line'],
                    ],
                },
            },
            {
                p: 'The pattern to notice: half of these are not credentials at all. Internal hostnames, account IDs, and mounted paths are **reconnaissance**. On their own they open nothing; combined with a credential leaked somewhere else, they tell an attacker exactly where to point it.',
            },
        ],
    },
    {
        h2: 'Redact before you paste, never after',
        blocks: [
            {
                p: 'This is the rule that matters most, because the alternative does not work. Once text has been posted somewhere with a public URL, treat it as copied. Deleting the paste afterwards removes the page; it does not un-read it.',
            },
            {
                p: 'On BinPaste a paste cannot be edited after creation at all, which is deliberate - a link you shared yesterday still shows what you shared yesterday - but it also means there is no "quick fix" after the fact. The only correct sequence is: redact, read it back, then paste.',
            },
            {
                note: 'Cleaning a secret out of a file you have already shared is not a redaction, it is a rotation. If a real credential went out, the credential is burned. Replace it at the source; do not just hide it.',
            },
        ],
    },
    {
        h2: 'Keep the shape, remove the value',
        blocks: [
            {
                p: 'Bad redaction destroys the thing the helper needed. If you delete whole lines, nobody can tell whether your problem is a missing variable. The goal is to keep every key, every structure, and every clue about format, while removing the actual secret.',
            },
            {
                p: 'So, from this:',
            },
            {
                code: {
                    lang: '.env',
                    text: 'DATABASE_URL=postgres://admin:Hunter2!@db-prod-3.internal:5432/orders\nSTRIPE_SECRET_KEY=sk_live_EXAMPLE_ONLY_2eZvKYlo2C9d8\nJWT_SECRET=8f14e45fceea167a5a36dedd4bea2543\nSMTP_HOST=smtp.sendgrid.net\nALLOWED_ORIGINS=https://admin.acme-internal.com',
                },
            },
            {
                p: 'To this:',
            },
            {
                code: {
                    lang: '.env',
                    text: 'DATABASE_URL=postgres://USER:PASSWORD@DB_HOST:5432/orders\nSTRIPE_SECRET_KEY=sk_live_REDACTED_32_CHARS\nJWT_SECRET=REDACTED_32_HEX_CHARS\nSMTP_HOST=smtp.sendgrid.net\nALLOWED_ORIGINS=https://admin.example.com',
                },
            },
            {
                p: 'Every diagnostically useful fact survived. The reader can still see that you are on Postgres, port 5432, using a live Stripe key rather than a test one, that your JWT secret is a 32-character hex string, and that SendGrid is your mail provider. What they cannot do is log in as you.',
            },
            {
                h3: 'The redaction rules',
            },
            {
                ol: [
                    'Replace values, not keys. `API_KEY=REDACTED`, never a deleted line.',
                    'Say how long the real value is when length is plausibly the bug: `REDACTED_32_CHARS`. A surprising number of config problems are a truncated key.',
                    'Keep the prefix of prefixed keys - `sk_live_`, `ghp_`, `AKIA` - because the prefix tells the reader which kind of credential it is. Drop the rest.',
                    'Use `example.com` and `10.0.0.0/8` style placeholders for hostnames and IPs, so the structure is obvious and the target is not.',
                    'Redact consistently: if `db-prod-3.internal` becomes `DB_HOST` on line 1, it is `DB_HOST` everywhere. Inconsistent placeholders create bugs that are not in your real config, and you will get answers to the wrong question.',
                ],
            },
            {
                p: 'If you would rather not do it by hand, this gets you the keys of a `.env` with every value stripped:',
            },
            {
                code: {
                    lang: 'bash',
                    text: "grep -v '^#' .env | sed -E 's/=.*/=REDACTED/'",
                },
            },
            {
                p: 'Pipe that straight into a paste and you have a shareable skeleton in one command. Read it back anyway - the automated version cannot spot the internal hostname sitting in a comment.',
            },
        ],
    },
    {
        h2: 'What people forget',
        blocks: [
            {
                p: 'These are the ones that survive a careful pass, because they do not look like secrets:',
            },
            {
                ul: [
                    '**Comments.** `# ask priya for the new key` names a colleague. `# temp fix until we patch CVE-2026-1234` names an unpatched vulnerability you are running.',
                    '**File paths.** `/Users/manas.jha/work/acme-billing/` leaks your full name, your employer, and an internal project name in one line.',
                    '**Bucket and resource names.** `s3://acme-customer-exports-prod` describes what is in the bucket and hints that it exists.',
                    '**Internal hostnames.** `db-prod-3.internal` confirms your naming scheme, and therefore that `db-prod-1` and `db-prod-2` exist.',
                    '**Git remotes.** An `https://` remote with a token in it is a token, and older tooling wrote them into config files freely.',
                    '**Cloud account IDs and role ARNs.** Not credentials, but they make a targeted phish considerably more convincing.',
                    '**Real customer data in seed or test config.** Test fixtures are where production exports go to be forgotten.',
                ],
            },
        ],
    },
    {
        h2: 'Then set an expiry',
        blocks: [
            {
                p: 'A redacted config still describes your infrastructure. There is no reason for it to sit on the internet forever after the person you asked has replied.',
            },
            {
                table: {
                    headers: ['Expiry', 'Use it for'],
                    rows: [
                        ['10 minutes', 'Someone is on a call with you right now'],
                        ['1 hour', 'A live chat or a support thread you are actively in'],
                        ['1 day', 'A colleague in another timezone who will read it tomorrow'],
                        ['1 week', 'A forum question that needs time to get an answer'],
                        ['Never', 'Reference material with nothing sensitive in it at all'],
                    ],
                },
            },
            {
                p: 'On BinPaste the expiry is a dropdown next to the paste name, and an expired paste stops being accessible and is deleted. Pastes are also unlisted unless you tick "Make Public", and every paste page carries a `noindex` instruction, so a paste does not turn up in search results. That is a sensible default rather than a security control - anyone with the link can still read it, which is exactly why the expiry matters.',
            },
            {
                cta: {
                    text: 'Redacted your config? Paste it, name it after the problem, and set an expiry that matches how long you need the help.',
                    label: 'Create a paste',
                    to: '/',
                },
            },
        ],
    },
    {
        h2: 'If you have already pasted a live secret',
        blocks: [
            {
                p: 'It happens to careful people at three in the morning. Do these in this order, and do not reorder them:',
            },
            {
                ol: [
                    '**Rotate the credential first.** Not after you delete the paste - first. Deletion is cosmetic; rotation is the fix.',
                    'Check for use. Most providers show recent API activity, and cloud logs will tell you whether anything authenticated from an address you do not recognise.',
                    'Delete the paste. On BinPaste, use the Report button on the paste or email the link to [work4manasjha@gmail.com](/contact) and it will be removed.',
                    'Assume search engines and scrapers may have seen it. Automated scanners watch paste sites specifically for key formats, sometimes within minutes.',
                    'Tell whoever needs to know. A leaked key at work is an incident, and the awkward conversation is much smaller now than after somebody bills $40,000 of compute to it.',
                ],
            },
            {
                note: 'Never assume a secret was safe because the paste was unlisted and not indexed. Automated scanners do not need a search engine; some of them simply try candidate URLs.',
            },
        ],
    },
    {
        h2: 'The checklist',
        blocks: [
            {
                ul: [
                    'Every value replaced, every key kept.',
                    'Placeholders consistent across the whole file.',
                    'Comments read, not skimmed.',
                    'Paths, buckets, hostnames, and account IDs genericised.',
                    'Expiry set to roughly how long you need the answer.',
                    'Paste named for the problem, so the link explains itself.',
                    'Read once more, top to bottom, before you press the button.',
                ],
            },
            {
                p: 'One more thing worth saying plainly: BinPaste has no encryption and no password protection, and anyone with the link can read a paste. It is the right tool for a redacted config you want a second opinion on. It is the wrong tool for a real credential - for that, use a dedicated one-time secret sharer, or better, your team password manager. What goes where is covered in [8 things you should never paste into a pastebin](/guides/things-never-to-paste), and what BinPaste itself stores is set out in the [Privacy Policy](/privacy).',
            },
        ],
    },
];

export default shareConfigFileSafely;
