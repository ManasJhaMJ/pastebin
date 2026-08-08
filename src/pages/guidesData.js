// src/pages/guidesData.js
// Long-tail SEO guide content. Each guide is an article rendered by Guide.jsx.
// Keep the body as an array of { h2, p } sections so it's easy to extend.

export const GUIDES = [
    {
        slug: 'how-to-share-code-online',
        title: 'How to share code online (the easy way)',
        description:
            'A simple, free way to share code snippets online with a shareable link and syntax highlighting - no account required.',
        sections: [
            {
                p: 'Sharing code should take seconds, not sign-ups. This guide shows how to share a code snippet online with BinPaste - a free pastebin alternative - and get a clean shareable link with syntax highlighting.',
            },
            {
                h2: 'Step 1: Paste your code',
                p: 'Open BinPaste and paste your code into the text box. It handles anything from a one-line command to a full file.',
            },
            {
                h2: 'Step 2: Pick a language and a name',
                p: 'Choose the language (JavaScript, Python, Java, C, C++, HTML, CSS, or plain text) so it\'s highlighted correctly. Then pick a custom name for the link, or click "Random" to generate one.',
            },
            {
                h2: 'Step 3: Share the link',
                p: 'Create the paste - the link is copied to your clipboard automatically. Send it to anyone; they can view, copy, download, or open the raw text without an account.',
            },
        ],
    },
    {
        slug: 'how-to-share-terminal-logs',
        title: 'How to share terminal logs and error messages',
        description:
            'Share long terminal output, stack traces, and error logs online with a link instead of pasting walls of text into chat.',
        sections: [
            {
                p: 'Pasting a giant stack trace into a chat window is painful for everyone. Instead, drop your logs into BinPaste and share a single link.',
            },
            {
                h2: 'Paste the full output',
                p: 'Copy your terminal output or error log and paste it in. Leave the language as "Plain Text" for raw logs, or pick a language if you\'re sharing source.',
            },
            {
                h2: 'Set an expiry (optional)',
                p: 'Logs are often only relevant for a short while. Set the paste to expire after 10 minutes, an hour, a day, a week, or a month so it cleans up automatically.',
            },
            {
                h2: 'Share and let others download',
                p: 'Send the link. Viewers can copy the text, download it as a file, or open the raw view to grep through it.',
            },
        ],
    },
    {
        slug: 'copy-paste-text-between-devices',
        title: 'How to copy and paste text between devices',
        description:
            'Copy and paste text or code between your phone, laptop, and any other device using a link - no app, no cable, and no account.',
        sections: [
            {
                p: 'Getting a block of text from your phone to your laptop (or the other way round) is more annoying than it should be. Emailing yourself works, but it clutters your inbox. This guide shows how to copy and paste text between devices using BinPaste as a simple online clipboard - free, and with nothing to install.',
            },
            {
                h2: 'Why not just email or message yourself?',
                p: 'Self-messaging mangles formatting, wraps long lines, and sometimes turns things into links. It is also awkward for code and impossible on a device you are not signed in on. A paste link keeps the text exactly as you typed it and opens anywhere with a browser.',
            },
            {
                h2: 'Step 1: Paste the text on the first device',
                p: 'Open BinPaste, paste your text or code into the box, and pick a language if it is code (or leave it as Plain Text). Everything is preserved as-is, including line breaks and indentation.',
            },
            {
                h2: 'Step 2: Give it a name you can type from memory',
                p: 'This is the trick that makes cross-device copying painless. Choose a short custom name like "mynotes" and your paste lives at binpaste.xyz/mynotes. On the other device you just type that URL - no need to send a link anywhere at all.',
            },
            {
                h2: 'Step 3: Open it on the other device',
                p: 'On your phone, tablet, or another computer, open the link and tap Copy to put the whole thing on that device\'s clipboard. You can also use the Raw view for plain text, or Download to save it as a file with the right extension.',
            },
            {
                h2: 'Skip the typing with a QR code',
                p: 'If you are moving text from a computer to a phone, press the QR button on the paste page and scan it with your camera. The paste opens on your phone instantly - no typing and no cable.',
            },
            {
                h2: 'Clean up after yourself',
                p: 'For anything you only need once, set an expiry when you create the paste - from 10 minutes up to a month - and it stops being accessible on its own. Handy for one-off transfers you would rather not leave lying around.',
            },
            {
                h2: 'A note on sensitive text',
                p: 'A paste link is accessible to anyone who has it, so treat it like a shared clipboard rather than a private vault. Do not use it for passwords, API keys, or personal data, and leave "Make Public" unchecked unless you actually want the paste listed publicly.',
            },
        ],
    },
    {
        slug: 'best-pastebin-alternative',
        title: 'The best free pastebin alternative in 2026',
        description:
            'What to look for in a pastebin alternative - and why BinPaste is a fast, free, no-account option for sharing code and text.',
        sections: [
            {
                p: 'Not all pastebins are equal. A good pastebin alternative should be free, fast, and get out of your way. Here\'s what matters and how BinPaste compares.',
            },
            {
                h2: 'No account, no clutter',
                p: 'The best tools let you paste and share immediately. BinPaste needs no sign-up and keeps the interface clean and ad-light.',
            },
            {
                h2: 'Custom links you\'ll remember',
                p: 'Instead of a random string of characters, BinPaste lets you name your paste - so the link is easy to share and recall.',
            },
            {
                h2: 'Expiry, raw view, download, and QR',
                p: 'Modern sharing means more than a text box: expiring pastes, a raw view for embedding, one-click download, and a QR code to open a paste on your phone.',
            },
        ],
    },
];

export function getGuide(slug) {
    return GUIDES.find((g) => g.slug === slug);
}
