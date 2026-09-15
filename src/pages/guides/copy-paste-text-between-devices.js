// src/pages/guides/copy-paste-text-between-devices.js
// Article body for /guides/copy-paste-text-between-devices.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const copyPasteTextBetweenDevices = [
    {
        blocks: [
            {
                p: 'Getting a block of text from your phone to your laptop, or the other way round, is more annoying than it has any right to be. The built-in options all come with conditions attached: same account, same ecosystem, same network, or an app installed on both ends.',
            },
            {
                p: 'A paste link sidesteps all of that. Anything with a browser can open it, which includes a work laptop you cannot install software on, a friend\'s computer, or a machine you are signed out of. This guide covers using BinPaste as a simple cross-device clipboard, and where that approach stops being appropriate.',
            },
        ],
    },
    {
        h2: 'Why the obvious options fall short',
        blocks: [
            {
                p: 'Most people reach for one of four things first, and each has a real limitation:',
            },
            {
                ul: [
                    'Messaging yourself. Works, but it mangles formatting, wraps long lines, turns things into links, and clutters the one inbox you actually need to keep clean.',
                    'AirDrop or Nearby Share. Genuinely good - when both devices are the same platform, physically close, and have the right radios enabled. That is a lot of conditions.',
                    'Cloud clipboard sync. Excellent within one ecosystem and one signed-in account. Useless the moment you cross between Apple, Windows, and Android, or use a device that is not yours.',
                    'Cloud notes apps. Reliable, but that means an app installed and an account signed in on both ends - which is exactly what you do not have on a locked-down or borrowed machine.',
                ],
            },
            {
                p: 'A paste link needs none of that. The only requirement on the receiving device is a web browser.',
            },
        ],
    },
    {
        h2: 'Step 1: Paste the text on the first device',
        blocks: [
            {
                p: 'Open BinPaste and paste your text or code into the box. Everything is preserved exactly as you typed it - line breaks, indentation, and spacing all survive, which is the main thing that self-messaging gets wrong.',
            },
            {
                p: 'If you are moving code, pick the matching language so it is highlighted on the other end and downloads with the right file extension. For notes, addresses, a list of links, or anything else that is not source code, leave it as Plain Text.',
            },
        ],
    },
    {
        h2: 'Step 2: Give it a name you can type from memory',
        blocks: [
            {
                p: 'This is the trick that makes the whole thing painless, and it is the part people miss. Because BinPaste lets you choose the name, you can pick something short and memorable - "mynotes", say - and the paste lives at www.binpaste.xyz/mynotes.',
            },
            {
                p: 'That means you do not have to send the link anywhere at all. You just type the URL on the other device. No message to yourself, no QR code, no cable - you carry the address in your head. For a random pastebin ID like a7Kd92Lp, typing it accurately on a phone keyboard is genuinely unpleasant; for "mynotes" it takes three seconds.',
            },
            {
                p: 'Names can use letters, numbers, hyphens, and underscores. If the one you want is taken, you will be told before the paste is created rather than overwriting anyone.',
            },
        ],
    },
    {
        h2: 'Step 3: Open it on the other device',
        blocks: [
            {
                p: 'On the phone, tablet, or second computer, open the link and press Copy - the entire contents go onto that device\'s clipboard in one tap, ready to paste wherever you need it.',
            },
            {
                p: 'Two alternatives, depending on what you are moving:',
            },
            {
                ul: [
                    'Download saves the paste as a file with the correct extension for the language you chose - useful when the destination is an editor rather than a text field.',
                    'The raw view at /your-name/raw serves the text with no interface around it, which is the cleanest option if you want to select part of it, or fetch it from a script.',
                ],
            },
        ],
    },
    {
        h2: 'Skip the typing with a QR code',
        blocks: [
            {
                p: 'Going from a computer to a phone, there is an even faster route. Press the QR button on the paste page and point your phone camera at the code - the paste opens on the phone immediately. No typing, no cable, no app.',
            },
            {
                p: 'This is the fastest way to move a long URL, a wifi setup instruction, a serial number, or a block of configuration onto a phone. It is also the most reliable, because there is no chance of mistyping a character in a long string.',
            },
        ],
    },
    {
        h2: 'Reusing one name as a scratchpad',
        blocks: [
            {
                p: 'A natural next thought is to keep a single paste as a permanent scratchpad and update it whenever you need to move something. That does not work on BinPaste, and it is worth knowing why: a paste cannot be edited after it is created, and a name stays taken as long as the paste exists.',
            },
            {
                p: 'The practical workaround is to lean on expiry. Set a short expiry - 10 minutes or an hour - on a scratchpad name you use often. Once it expires, the paste is gone and the name is free again, so you can reuse the same easy-to-type address next time you need it. It keeps the muscle memory of one short URL without accumulating a pile of old snippets.',
            },
        ],
    },
    {
        h2: 'What not to send this way',
        blocks: [
            {
                p: 'A paste link is a shared clipboard, not a private vault. Anyone who has the link can open it, and short memorable names are, by design, easy for someone else to guess. That makes some things a bad fit:',
            },
            {
                ul: [
                    'Passwords, recovery codes, and API keys. Use a password manager - most have a proper cross-device sharing feature built in.',
                    'Anything covered by a privacy obligation - customer records, medical or financial details, government ID numbers.',
                    'Documents you would be uncomfortable seeing indexed. Unlisted pastes are kept out of search results, but the link itself is still all that stands between the content and a reader.',
                    'Anything you cannot afford to lose. Pastes expire, and the service makes no durability guarantee. Keep your own copy.',
                ],
            },
            {
                note: 'Leave "Make Public" unticked unless you actually want the paste listed on the public feed. It is off by default, and unlisted pastes stay out of search engines.',
            },
        ],
    },
    {
        h2: 'Clean up after yourself',
        blocks: [
            {
                p: 'For a one-off transfer, set an expiry when you create the paste - anywhere from 10 minutes to a month - and it stops being accessible on its own. This is the single habit that makes a shared-clipboard workflow feel tidy rather than careless: the text is available exactly as long as you need it, and no longer.',
            },
            {
                p: 'If you need something removed before it expires, email the address in the footer with the paste link and it will be deleted.',
            },
        ],
    },
];

export default copyPasteTextBetweenDevices;
