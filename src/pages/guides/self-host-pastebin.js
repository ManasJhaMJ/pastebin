// src/pages/guides/self-host-pastebin.js
// Article body for /guides/self-host-pastebin.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const selfHostPastebin = [
    {
        blocks: [
            {
                p: 'Sooner or later someone in the thread says "just self-host a pastebin". It is a reasonable instinct - a pastebin is a small program, and running your own means the text never leaves your infrastructure. For a handful of situations that is exactly right.',
            },
            {
                p: 'For most people it is not, and the reason is not the setup. Setup is twenty minutes. The reason is what happens in month three. This guide covers the honest version: what to run, how to stand it up, the part nobody warns you about, and how to tell which side of the line you are on.',
            },
            {
                note: 'To answer the obvious question first: BinPaste’s own source is not published, so this is not a guide to self-hosting BinPaste. It covers the open-source projects that do this well. Worth checking each project’s current activity before you commit - this space moves.',
            },
        ],
    },
    {
        h2: 'Good reasons to self-host',
        blocks: [
            {
                ul: [
                    '**Compliance or data residency.** A policy says internal code cannot touch third-party services, or must stay in a specific jurisdiction. This is the strongest reason and it settles the argument on its own.',
                    '**An air-gapped or restricted network.** If the machines cannot reach the internet, a hosted service is not an option at any price.',
                    '**Corporate filtering.** Many networks block paste sites as a category, precisely because they are used to exfiltrate data. An internal instance is often the only thing that works.',
                    '**Retention and audit control.** You decide what is kept, for how long, and who can see the logs.',
                    '**Internal authentication.** You want SSO in front of it so only staff can read a paste - something no public pastebin can offer.',
                    '**You want to learn.** Deploying a small service behind a reverse proxy with TLS is a genuinely good weekend project.',
                ],
            },
        ],
    },
    {
        h2: 'The options',
        blocks: [
            {
                table: {
                    caption: 'The established self-hosted pastebins, and what distinguishes each.',
                    headers: ['Project', 'Stack', 'Distinguishing feature'],
                    rows: [
                        ['PrivateBin', 'PHP, filesystem or database', 'Client-side encryption - the server cannot read the pastes it stores'],
                        ['Opengist', 'Go, Git-backed', 'A self-hosted Gist: revisions, and push over Git or SSH'],
                        ['wastebin', 'Rust, SQLite', 'Small, fast, one binary, syntax highlighting, no dependencies to speak of'],
                        ['MicroBin', 'Rust, SQLite', 'Pastes plus file uploads and URL shortening in one small service'],
                        ['haste-server', 'Node, filesystem or Redis', 'The classic minimal hastebin, with a well-known CLI workflow'],
                        ['Rustypaste', 'Rust, filesystem', 'Built for `curl` uploads from scripts and CI'],
                    ],
                },
            },
            {
                p: 'If you want one recommendation: **PrivateBin** if the point is confidentiality, **Opengist** if the point is replacing Gist internally, **wastebin** if the point is the smallest possible thing that works.',
            },
            {
                p: 'PrivateBin deserves the extra sentence. Because encryption and decryption happen in the browser, with the key carried in the URL fragment, the server genuinely cannot read the content - which is a stronger guarantee than any hosted pastebin can make, including this one. If your requirement is "the operator must not be able to read it", that is the category you want, not a self-hosted plaintext bin.',
            },
        ],
    },
    {
        h2: 'The twenty-minute version',
        blocks: [
            {
                p: 'Assuming a small VPS, Docker installed, and a DNS record pointing at it. PrivateBin publishes a container that needs no database:',
            },
            {
                code: {
                    lang: 'bash',
                    text: 'docker run -d \\\n  --name privatebin \\\n  --restart unless-stopped \\\n  -p 127.0.0.1:8080:8080 \\\n  -v privatebin-data:/srv/data \\\n  privatebin/nginx-fpm-alpine',
                },
            },
            {
                p: 'Note the `127.0.0.1:` on the port binding. Without it, Docker will happily publish the container to the whole internet on port 8080, bypassing the firewall rules you thought you had. Then put a reverse proxy in front for TLS. With Caddy that is the entire config file:',
            },
            {
                code: {
                    lang: 'Caddyfile',
                    text: 'paste.example.com {\n    reverse_proxy 127.0.0.1:8080\n}',
                },
            },
            {
                p: 'Caddy obtains and renews the certificate automatically. That is a working, HTTPS-secured, encrypted pastebin on your own domain, and the hard part is over.',
            },
            {
                p: 'Before you tell anyone the URL, change the defaults: set a maximum paste size, set a default expiry and a maximum retention, turn off any public listing, and decide whether unauthenticated people can create pastes at all. Every one of these projects ships permissive defaults because they cannot know your situation.',
            },
        ],
    },
    {
        h2: 'The part nobody warns you about',
        blocks: [
            {
                p: 'An open pastebin on a public IP is, to a certain kind of automation, free anonymous hosting. Within days of going live you can expect phishing pages, malware droppers, spam link farms, and stolen credential dumps - not because anyone targeted you, but because scanners find open paste endpoints continuously and use whatever they find.',
            },
            {
                p: 'The consequences land on you:',
            },
            {
                ul: [
                    'Your domain gets listed in blocklists, and then your legitimate mail from that domain starts bouncing.',
                    'Your hosting provider forwards abuse complaints to you, with a deadline.',
                    'Your IP reputation degrades, which affects everything else on the box.',
                    'Somebody has to read the reports and delete the content. That somebody is you, on a Sunday.',
                    'If content is hosted long enough, you may acquire legal obligations about responding to takedown requests in your jurisdiction.',
                ],
            },
            {
                p: 'This is the actual cost of self-hosting, and it is ongoing rather than one-off. It is also entirely avoidable:',
            },
            {
                ol: [
                    'Do not expose it publicly. Put it on a VPN, or behind SSO, or bind it to an internal network. An internal-only pastebin has essentially none of these problems.',
                    'If it must be public, require authentication to create a paste while allowing anyone with a link to read one.',
                    'Force a maximum expiry. Content that deletes itself cannot host a long-running phishing campaign.',
                    'Rate limit creation per IP, and cap paste size.',
                    'Serve `noindex` and block crawlers, so your instance does not become a search result.',
                    'Publish an abuse contact and actually monitor it.',
                    'Set up monitoring, and back up whatever store you chose.',
                ],
            },
            {
                note: 'Step one is the whole answer for most teams. Almost every good reason to self-host is an internal reason, and internal instances do not attract abuse. If you find yourself building anti-abuse tooling for a public instance, ask what you are getting that a hosted service does not already give you.',
            },
        ],
    },
    {
        h2: 'What it actually costs',
        blocks: [
            {
                table: {
                    headers: ['Item', 'Realistic cost'],
                    rows: [
                        ['VPS', 'A few dollars a month - the workload is tiny'],
                        ['Domain', 'Roughly $10-15 a year'],
                        ['TLS certificate', 'Free, via Caddy or Certbot'],
                        ['Initial setup', '20 minutes if it goes well, an evening if DNS is involved'],
                        ['Patching and upgrades', 'An hour every month or two, forever'],
                        ['Backups and testing restores', 'An hour to set up, and worthless until you have tested it'],
                        ['Abuse handling, if public', 'Unbounded. This is the line item that matters'],
                    ],
                },
            },
            {
                p: 'The money is negligible. The recurring attention is not, and it is the thing people leave out of the comparison when they say self-hosting is free.',
            },
        ],
    },
    {
        h2: 'So which side of the line are you on?',
        blocks: [
            {
                table: {
                    headers: ['Your situation', 'Do this'],
                    rows: [
                        ['Policy forbids third-party services', 'Self-host, internal only'],
                        ['Air-gapped network', 'Self-host - nothing else works'],
                        ['You need SSO in front of pastes', 'Self-host, behind your identity provider'],
                        ['The operator must not be able to read it', 'Self-host PrivateBin, or use a one-time secret tool'],
                        ['You want to learn to run a service', 'Self-host, and enjoy it'],
                        ['You share code with people outside your company', 'Hosted. An internal instance they cannot reach is not sharing'],
                        ['You just want to send someone a snippet', 'Hosted, every time'],
                        ['You are sharing a log at 2am and want to go to bed', 'Hosted'],
                    ],
                },
            },
            {
                p: 'The pattern: **self-host when the requirement is control, use a hosted service when the requirement is sharing.** Those pull in opposite directions, which is why the answer is genuinely different for different people rather than a matter of taste.',
            },
        ],
    },
    {
        h2: 'If you land on hosted',
        blocks: [
            {
                p: 'That is what BinPaste is for, and it is deliberately narrow: no account to create, a link you name yourself, syntax highlighting with line numbers, expiry from ten minutes to never, a raw view and a one-click download, a QR code for getting a paste onto a phone, and no ads on paste pages. Nothing to patch, nothing to back up, and no abuse queue with your name on it.',
            },
            {
                cta: {
                    text: 'Skip the VPS for today and just share the snippet - no account, no install, and you pick the link.',
                    label: 'Create a paste',
                    to: '/',
                },
            },
            {
                p: 'The limits are stated just as plainly: no encryption, no password protection, no editing after creation, and anyone with the link can read a paste. What is stored and for how long is in the [Privacy Policy](/privacy), and how to judge any pastebin - hosted or not - is in [the best free pastebin alternative in 2026](/guides/best-pastebin-alternative).',
            },
            {
                p: 'A reasonable middle path, incidentally, is to use both: a hosted pastebin for anything you share outside the company, and an internal instance for anything covered by policy. That is a five-second decision per paste, and it beats forcing every case through one tool.',
            },
        ],
    },
];

export default selfHostPastebin;
