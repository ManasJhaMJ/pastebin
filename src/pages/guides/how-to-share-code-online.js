// src/pages/guides/how-to-share-code-online.js
// Article body for /guides/how-to-share-code-online.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const howToShareCodeOnline = [
    {
        blocks: [
            {
                p: 'Sharing code should take seconds. In practice it often turns into a mess: a screenshot nobody can copy from, a chat message that eats the indentation, or a file attachment that the other person has to download and open in an editor before they can even read it.',
            },
            {
                p: 'This guide covers how to share a code snippet online properly - using BinPaste as the example, though most of the advice applies to any pastebin. It also covers the parts people usually get wrong: what to include, how to name the link, and when a paste is the wrong tool entirely.',
            },
        ],
    },
    {
        h2: 'Why not just paste it into chat?',
        blocks: [
            {
                p: 'Chat apps are built for conversation, not code. Pasting more than a handful of lines into Slack, Discord, WhatsApp, or a comment box causes predictable problems:',
            },
            {
                ul: [
                    'Indentation gets collapsed or converted, which matters enormously in Python and YAML.',
                    'Straight quotes get "smartened" into curly quotes, so the code no longer runs if the reader copies it back out.',
                    'Long lines wrap in a way that makes the structure unreadable.',
                    'A 200-line paste pushes the rest of the conversation off the screen for everyone in the channel.',
                    'Screenshots are worst of all - the reader cannot copy, search, or run what you sent them.',
                ],
            },
            {
                p: 'A link solves all of this at once. The code stays exactly as you wrote it, the channel stays readable, and the person helping you can copy the snippet straight into their own editor.',
            },
        ],
    },
    {
        h2: 'Step 1: Decide what to include',
        blocks: [
            {
                p: 'This is the step almost everyone skips, and it is the one that determines whether you get a useful answer. Before you paste, think about what the reader needs in order to understand the snippet without asking you follow-up questions.',
            },
            {
                p: 'Include enough surrounding context to make the code runnable or at least intelligible - the imports, the function signature, the type or class definitions it depends on. A single line lifted out of a 600-line file is rarely enough. On the other hand, do not paste the entire repository: if you are asking about one broken function, the other forty functions in the file are noise.',
            },
            {
                p: 'A good rule of thumb is the smallest snippet that still reproduces or demonstrates the thing you are talking about. If you can trim a line without losing the point, trim it.',
            },
            {
                note: 'Strip credentials before you paste. API keys, database passwords, connection strings, and access tokens have a habit of hiding in config blocks and example code. A paste link is readable by anyone who has it, so treat anything you paste as public.',
            },
        ],
    },
    {
        h2: 'Step 2: Paste it and pick the language',
        blocks: [
            {
                p: 'Open BinPaste and paste your code into the text box. It handles anything from a one-line shell command up to roughly 400,000 characters, which is more than large enough for a full source file or a long log.',
            },
            {
                p: 'Then choose the language from the dropdown. BinPaste highlights Plain Text, JavaScript, Python, Java, C, C++, HTML, and CSS, with line numbers on every paste. Picking the right language does two useful things: it colours the syntax so the structure is obvious at a glance, and it sets the file extension used if the reader downloads the snippet - so JavaScript comes down as a .js file rather than a .txt.',
            },
            {
                p: 'If your content is not really code - a config file, a log, a block of prose, a list of values - leave it as Plain Text. Forcing highlighting onto something that is not source code usually makes it harder to read, not easier.',
            },
        ],
    },
    {
        h2: 'Step 3: Name the link so it means something',
        blocks: [
            {
                p: 'Most pastebins give you a random string of characters. BinPaste lets you type your own name, and the paste lives at that URL - for example www.binpaste.xyz/login-bug-repro. Names can contain letters, numbers, hyphens, and underscores.',
            },
            {
                p: 'A descriptive name is worth the five seconds it takes. It tells the reader what they are about to open, it survives being pasted into a ticket or a commit message where the surrounding context is lost, and it is far easier to find again next week when you need it. Compare these two:',
            },
            {
                code: {
                    lang: 'text',
                    text: 'www.binpaste.xyz/a7Kd92Lp     <- what is this?\nwww.binpaste.xyz/nginx-502-log  <- obviously the nginx log',
                },
            },
            {
                p: 'If you genuinely do not care - a throwaway snippet in a one-off conversation - click the Random button and BinPaste generates an unused 8-to-10-character name for you. If the name you want is already taken, you will be told before the paste is created, so nothing is ever silently overwritten.',
            },
        ],
    },
    {
        h2: 'Step 4: Set an expiry if the snippet is temporary',
        blocks: [
            {
                p: 'Most shared code has a short useful life. The stack trace you are debugging today is irrelevant next week; the config you are comparing against gets fixed and forgotten. BinPaste lets you set the paste to expire after 10 minutes, an hour, a day, a week, or a month - or never, if you want it to stick around.',
            },
            {
                p: 'Expiry is the right default for anything you would rather not leave lying around indefinitely. It is not a security feature - anyone who opens the link before it expires can copy the contents - but it does mean you are not accumulating a trail of old snippets you have forgotten about.',
            },
            {
                p: 'There is also a "Make Public" checkbox, which is off by default. Leaving it off means your paste is unlisted: reachable by anyone with the link, but not shown in the public feed and not submitted to search engines. Only tick it if you actively want the snippet listed publicly.',
            },
        ],
    },
    {
        h2: 'Step 5: Share, and know what the reader can do',
        blocks: [
            {
                p: 'Click Create Paste. You are taken straight to the paste page and the shareable link is copied to your clipboard automatically, so you can paste it into chat or a ticket immediately.',
            },
            {
                p: 'Anyone who opens that link - no account, no sign-up - can:',
            },
            {
                ul: [
                    'Read the snippet with syntax highlighting and line numbers, so they can refer to "line 34" and you both mean the same line.',
                    'Copy the whole thing to their clipboard with one button.',
                    'Download it as a file with the correct extension for the language.',
                    'Open the raw view at /your-name/raw, which serves plain text with no interface around it - handy for piping into a command or grepping through.',
                    'Scan a QR code to open the same paste on a phone.',
                ],
            },
            {
                p: 'One thing to be aware of: a paste cannot be edited after it is created. This is deliberate - a link you shared yesterday still shows what you actually shared yesterday, which matters when someone is quoting it back to you. If you need to change something, create a new paste and share the new link.',
            },
        ],
    },
    {
        h2: 'When a paste is the wrong tool',
        blocks: [
            {
                p: 'Pastes are for sharing, not storing. A few cases where you want something else:',
            },
            {
                ul: [
                    'Anything you cannot afford to lose. Use version control or a real file store; a paste is not a backup.',
                    'Secrets of any kind - passwords, keys, tokens, personal data. Use a proper secret manager or an end-to-end encrypted channel.',
                    'Code you want to keep iterating on with others. A Git branch or a Gist with revision history fits better than a series of immutable pastes.',
                    'A whole project. If the reader needs more than a couple of files to understand the problem, point them at a repository instead.',
                ],
            },
        ],
    },
    {
        h2: 'The short version',
        blocks: [
            {
                ol: [
                    'Trim the snippet down to the smallest thing that makes your point, and remove any credentials.',
                    'Paste it, and pick the matching language so it is highlighted and downloads with the right extension.',
                    'Give it a descriptive name, or hit Random if it is throwaway.',
                    'Set an expiry if the snippet is temporary. Leave "Make Public" unticked unless you want it listed.',
                    'Create the paste - the link is already on your clipboard. Share it.',
                ],
            },
        ],
    },
];

export default howToShareCodeOnline;
