// src/pages/guides/how-to-share-terminal-logs.js
// Article body for /guides/how-to-share-terminal-logs.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const howToShareTerminalLogs = [
    {
        blocks: [
            {
                p: 'When something breaks, the log is the evidence. But sharing it badly is one of the fastest ways to not get help: a screenshot of a terminal, a single line ripped out of a 400-line trace, or a wall of text dumped into a channel that nobody wants to scroll through.',
            },
            {
                p: 'This guide covers how to share terminal output and error messages in a way that gets you an answer - and how to use a paste link so the log is complete and readable without taking over the conversation.',
            },
        ],
    },
    {
        h2: 'Why a link beats a wall of text',
        blocks: [
            {
                p: 'Logs are long, and their length is the point - the useful information is often thirty lines above the line you noticed. That creates a bind: paste the whole thing and you flood the channel, paste a fragment and you have thrown away the context that would have identified the cause.',
            },
            {
                p: 'A link resolves it. The reader gets the full log if they want it, the channel keeps one tidy line, and the output arrives with its original line breaks and alignment intact - which matters, because tabular output and indented tracebacks become unreadable the moment something rewraps them.',
            },
            {
                p: 'It also means the log is still there tomorrow. Chat history scrolls away and screenshots get lost; a named link can be dropped into the bug ticket and referred to for as long as it matters.',
            },
        ],
    },
    {
        h2: 'Never share a screenshot of a terminal',
        blocks: [
            {
                p: 'This deserves its own section because it is so common. A screenshot of an error message cannot be searched, cannot be copied, and cannot be pasted into a search engine or a compiler by the person trying to help you. It also usually crops off the top of the trace, which is where the actual cause tends to be.',
            },
            {
                p: 'Your terminal already lets you select and copy text. Use it. If the output has already scrolled past, re-run the command and capture it:',
            },
            {
                code: {
                    lang: 'bash',
                    text: '# capture stdout and stderr together into a file\nnpm run build > build.log 2>&1\n\n# or watch it and save it at the same time\nnpm run build 2>&1 | tee build.log',
                },
            },
            {
                p: 'Then open build.log, select all, and paste it. The 2>&1 matters - errors go to stderr, and redirecting only stdout is how people end up sharing a log with the error missing from it.',
            },
        ],
    },
    {
        h2: 'What to include',
        blocks: [
            {
                p: 'A log without context is a puzzle. Include these and you will usually skip an entire round of back-and-forth:',
            },
            {
                ul: [
                    'The full error, from the first line to the last. Stack traces read bottom-up in some languages and top-down in others; the part you think is irrelevant may be the only part that identifies the source.',
                    'The exact command you ran, copied rather than retyped from memory.',
                    'Relevant versions - language runtime, framework, package manager, and OS. Half of all "works on my machine" problems are a version mismatch.',
                    'What you expected to happen, in one sentence.',
                    'What you already tried, so nobody wastes time suggesting it again.',
                ],
            },
            {
                p: 'A useful trick for long output: paste the full log, and in your message point at the specific line numbers you want people to look at. Because every BinPaste page shows line numbers, "the exception starts at line 212" is unambiguous.',
            },
        ],
    },
    {
        h2: 'What to strip out first',
        blocks: [
            {
                p: 'Logs leak. Verbose and debug output in particular has a habit of printing exactly the things you would never deliberately share. Before you paste, scan for:',
            },
            {
                ul: [
                    'Authorization headers, bearer tokens, session cookies, and API keys - extremely common in HTTP debug logs.',
                    'Database connection strings, which usually carry a username and password inline.',
                    'Environment variable dumps. Many crash handlers print the whole environment.',
                    'Internal hostnames, private IP ranges, and S3 bucket names, if your organisation treats infrastructure layout as sensitive.',
                    'Customer data - email addresses, names, order details - that appears in request or query logs.',
                    'Absolute paths containing your real name, if you would rather not publish it.',
                ],
            },
            {
                p: 'Replace anything sensitive with an obvious placeholder rather than deleting the line, so the structure of the log stays intact:',
            },
            {
                code: {
                    lang: 'text',
                    text: 'Authorization: Bearer <REDACTED>\nDATABASE_URL=postgres://user:<REDACTED>@db.internal:5432/app',
                },
            },
            {
                note: 'Redact before you create the paste, not after. A paste cannot be edited once created - if a secret goes in, your only options are to let it expire or to email for removal, and by then the link may already have been read. If you do publish a live credential by accident, rotate it; treat it as compromised.',
            },
        ],
    },
    {
        h2: 'Creating the paste',
        blocks: [
            {
                p: 'Paste the log into BinPaste and leave the language as Plain Text. Raw logs are not source code, and syntax highlighting applied to them tends to colour random words in a way that actively hurts readability.',
            },
            {
                p: 'Give it a name that will still make sense in the ticket - something like ci-build-fail-oom rather than log2. Then set an expiry appropriate to how long the log stays relevant: an hour for something you are debugging live in a call, a day or a week for something attached to an open issue, never for a log you are archiving as evidence of a resolved incident.',
            },
            {
                p: 'Leave "Make Public" unticked. Logs are a poor fit for a public feed, and unlisted pastes are kept out of search results.',
            },
        ],
    },
    {
        h2: 'What the reader can do with it',
        blocks: [
            {
                p: 'Once you share the link, whoever is helping you can work with the log properly rather than squinting at it:',
            },
            {
                ul: [
                    'Read it with line numbers, so you can both refer to specific lines.',
                    'Copy the whole log to their clipboard in one click.',
                    'Download it as a file and open it in their own editor.',
                    'Open the raw view at /your-name/raw for plain text with no interface - which they can fetch straight from a terminal.',
                ],
            },
            {
                p: 'That last one is genuinely useful for large logs. The raw view is plain text over HTTP, so it can be piped into the usual tools:',
            },
            {
                code: {
                    lang: 'bash',
                    text: 'curl -s https://www.binpaste.xyz/ci-build-fail-oom/raw | grep -i "error"',
                },
            },
        ],
    },
    {
        h2: 'Asking the question well',
        blocks: [
            {
                p: 'The log is evidence, not a question. A link on its own puts the burden of working out what you want onto the reader, and it is the main reason well-intentioned help requests get ignored.',
            },
            {
                p: 'A message that works looks roughly like this: one sentence on what you were trying to do, one sentence on what happened instead, the versions involved, what you have already ruled out, and then the link with a pointer to the interesting lines. That is thirty seconds of writing that reliably saves an hour of waiting.',
            },
        ],
    },
];

export default howToShareTerminalLogs;
