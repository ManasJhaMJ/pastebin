// src/pages/guides/best-pastebin-alternative.js
// Article body for /guides/best-pastebin-alternative.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const bestPastebinAlternative = [
    {
        blocks: [
            {
                p: 'Searching for a pastebin alternative usually means one of two things: the tool you were using has become an obstacle - an interstitial ad, a sign-up wall, a captcha before you can read a snippet - or it is blocked on your network and you need something that is not.',
            },
            {
                p: 'Either way, the useful question is not "which one is best" in the abstract. It is "which properties actually matter for what I am doing". This guide sets out the criteria worth caring about, explains how BinPaste handles each, and is honest about the cases where a pastebin is the wrong tool.',
            },
        ],
    },
    {
        h2: 'The criteria that actually matter',
        blocks: [
            {
                p: 'Ranked roughly by how often they turn out to be the thing that annoys you:',
            },
            {
                ol: [
                    'No account, for you or your reader. A sign-up wall between someone and a snippet you sent them is the single biggest failure mode of a sharing tool.',
                    'A link you can read and retype. Random IDs are fine for throwaway snippets and miserable for anything you need to type on a phone or recognise in a ticket six weeks later.',
                    'Fast, uncluttered page loads. If the reader has to dismiss something before they can see the code, the tool has failed at its one job.',
                    'Expiry you control. Most shared text has a short useful life, and cleaning up manually is something nobody does.',
                    'A raw view. Plain text over HTTP is what makes a paste scriptable - curl it, grep it, pipe it.',
                    'Syntax highlighting with line numbers. Highlighting is nice; line numbers are what let two people talk about the same line.',
                    'One-click copy and download. Small, and the thing readers use most.',
                ],
            },
            {
                p: 'Things that sound important and usually are not: an enormous language list, when eight cover the overwhelming majority of real pastes; and social features on a tool people use once and leave.',
            },
        ],
    },
    {
        h2: 'How BinPaste handles each',
        blocks: [
            {
                p: 'BinPaste was built against exactly that list.',
            },
            {
                ul: [
                    'No account, ever - not to create a paste and not to read one. There is no login to build.',
                    'You choose the name, so the URL is www.binpaste.xyz/whatever-you-typed. A Random button generates an unused 8-to-10-character name when you do not care.',
                    'Expiry from 10 minutes to a month, or never.',
                    'A raw plain-text view on every paste at /name/raw, and a one-click download with the right file extension for the language.',
                    'Syntax highlighting with line numbers for Plain Text, JavaScript, Python, Java, C, C++, HTML, and CSS.',
                    'A QR code on every paste, for moving a snippet onto a phone without typing.',
                    'A view counter and creation timestamp, so you can tell whether the person you sent it to has actually opened it.',
                    'Pastes are unlisted by default. Ticking "Make Public" adds one to the public feed; leave it alone and it stays out of the feed and out of search results.',
                ],
            },
            {
                p: 'Two deliberate limitations, since they will affect whether it suits you. Pastes cannot be edited after creation - a link you shared yesterday still shows what you shared yesterday, and if you need a change you create a new paste. And the size ceiling is around 400,000 characters, which is generous for snippets and logs but not intended for large files.',
            },
        ],
    },
    {
        h2: 'BinPaste vs a typical pastebin',
        blocks: [
            {
                p: 'The differences that show up in day-to-day use, rather than on a feature matrix:',
            },
            {
                ul: [
                    'Custom names instead of random IDs. This is the one people notice first and miss most when they go back.',
                    'No interstitial or sign-up prompt between the reader and the content.',
                    'A QR code built in, rather than copying the URL into a separate generator.',
                    'Unlisted by default rather than public by default - a meaningful difference if you have ever pasted something without checking the visibility dropdown.',
                ],
            },
            {
                p: 'And where established pastebins win, plainly: account history so you can find everything you have ever posted, paste editing and revisions, folders, a longer language list, per-paste passwords, and much larger size limits. If you need those, use a tool that has them.',
            },
        ],
    },
    {
        h2: 'When to use something else entirely',
        blocks: [
            {
                p: 'No pastebin is the right answer for these, including this one:',
            },
            {
                ul: [
                    'Secrets. Passwords, keys, and tokens belong in a password manager or a purpose-built one-time secret sharer, not on any pastebin. "Unlisted" is not "encrypted".',
                    'Code you will keep changing. A Gist or a Git branch gives you revision history and comments; immutable pastes give you a growing pile of stale links.',
                    'A whole project. If the reader needs to navigate between files, give them a repository.',
                    'Anything you must not lose. Pastes expire and no free service guarantees durability. Keep the original.',
                    'Regulated or confidential company data. Use whatever your organisation has approved - typically self-hosted, and there are good open-source pastebins if you want to run one yourself.',
                ],
            },
        ],
    },
    {
        h2: 'Why pastebins get blocked, and what to do about it',
        blocks: [
            {
                p: 'A lot of searches for a pastebin alternative start with a corporate firewall. Pastebins get blocked on managed networks for a reason that has nothing to do with the tool itself: because anyone can post anonymous text to them, they get used to stage stolen credentials and to exfiltrate data, so blanket blocks on the well-known domains are a standard control.',
            },
            {
                p: 'That is worth understanding before you go hunting for a domain that is not blocked yet. If your employer blocks pastebins, routing around the block to move company code or logs off the network is very likely a policy violation, whatever the technical merits. The honest answer in that situation is not a different pastebin - it is your organisation\'s approved tool, or a self-hosted instance that IT is happy with.',
            },
            {
                p: 'Where an alternative genuinely helps is the ordinary case: a personal project, a snippet for a friend, a question on a forum, a log you are sharing with a stranger who is helping you debug. That is what a free pastebin is for, and there is no reason to accept a bad one.',
            },
        ],
    },
    {
        h2: 'A quick way to decide',
        blocks: [
            {
                p: 'If you want a snippet, log, or block of text in front of someone in the next ten seconds, with a link they can open without an account and you can retype from memory - that is what BinPaste is for, and it is free.',
            },
            {
                p: 'If you need history, editing, encryption, large files, or an audit trail, reach for the tool built for that instead. Using a paste link for something it was never meant to hold is how people end up rotating credentials on a Friday evening.',
            },
        ],
    },
];

export default bestPastebinAlternative;
