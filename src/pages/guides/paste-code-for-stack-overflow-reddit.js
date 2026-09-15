// src/pages/guides/paste-code-for-stack-overflow-reddit.js
// Article body for /guides/paste-code-for-stack-overflow-reddit.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const pasteCodeForStackOverflowReddit = [
    {
        blocks: [
            {
                p: 'You have a bug, you have written the question, and now you have to show the code. This is where a lot of otherwise good questions fall apart: the code arrives as a screenshot, or as forty lines with the indentation flattened, and the people who could have answered in thirty seconds scroll past instead.',
            },
            {
                p: 'The rules are different on Stack Overflow and Reddit, and getting them backwards is a reliable way to get downvoted on one or ignored on the other. Here is what belongs in the post itself, what belongs behind a link, and how to make that link one that still works when someone finds the thread two years from now.',
            },
        ],
    },
    {
        h2: 'The short answer',
        blocks: [
            {
                table: {
                    caption: 'Where each part of a question should live.',
                    headers: ['What you have', 'Stack Overflow', 'Reddit'],
                    rows: [
                        ['A 5-30 line repro', 'In the question, in a code block', 'In the post, in a code block'],
                        ['A 200-line file', 'Link it, quote the relevant part', 'Link it'],
                        ['A full stack trace', 'Trim to the top frames, quote those', 'Link it, quote the first few lines'],
                        ['A config or env file', 'Link it, redacted', 'Link it, redacted'],
                        ['A database schema', 'Link it, quote the two tables involved', 'Link it'],
                        ['A screenshot of code', 'Never', 'Never'],
                    ],
                },
            },
            {
                p: 'The pattern is the same on both sites: the minimum that demonstrates the problem goes in the post, and everything bulky goes behind a link. What differs is how strict each place is about that line.',
            },
        ],
    },
    {
        h2: 'Stack Overflow wants the code in the question',
        blocks: [
            {
                p: 'Stack Overflow is trying to be a permanent reference, not a chat log. It treats a dependency on an outside link as a defect, and it is right to:',
            },
            {
                ul: [
                    'A question that is a link plus "any ideas?" gets closed or downvoted quickly, and often before anyone has clicked the link.',
                    'Links die. When a paste expires or a host shuts down, the question becomes useless to the next thousand people who find it from Google.',
                    'Nobody wants to open a tab to work out whether your question is worth answering.',
                ],
            },
            {
                p: 'So the rule on Stack Overflow is: the **minimal reproducible example goes inline**, in a code block. A link is for the one bulky artefact a determined answerer might want to dig through - the complete log, the whole file, the full schema.',
            },
            {
                note: 'If a link genuinely is the only way to show the problem - a 2,000-line log, a schema with forty tables - say in the question what is behind it and why it is too long to inline. That sentence is the difference between a link people click and a link that earns you a close vote.',
            },
            {
                h3: 'What to inline, in order',
            },
            {
                ol: [
                    'The shortest code that still reproduces the problem. Delete everything that can be deleted while the bug survives.',
                    'The exact error, copied as text - not retyped from memory, and not cropped from a screenshot.',
                    'The versions that matter: language, framework, operating system.',
                    'What you expected to happen, and what happened instead.',
                    'Then, and only then, the long artefact as a link.',
                ],
            },
        ],
    },
    {
        h2: 'Reddit has the opposite problem',
        blocks: [
            {
                p: 'Reddit has no objection to links. Its problem is that its editor mangles code in at least four distinct ways, and which ways depends on how the reader is browsing.',
            },
            {
                ul: [
                    'Old Reddit expects four-space indentation to make a code block. New Reddit accepts triple backticks. Each renders the other badly, and you cannot tell which one your reader is using.',
                    'The official mobile app has a long history of collapsing single line breaks, turning a function into one long paragraph.',
                    'In prose mode, Markdown quietly edits your identifiers: underscores become italics and asterisks become bold, so `my_var_name` arrives as *myvarname* with the underscores gone.',
                    'Long lines wrap with no horizontal scroll, so a 120-character line becomes a zigzag.',
                    'Nothing is syntax highlighted and there are no line numbers, so "the error is on line 31" means somebody has to count.',
                ],
            },
            {
                p: 'That last one is worse than it sounds. Here is what a reader is supposed to see:',
            },
            {
                code: {
                    lang: 'python',
                    text: 'def get_user(uid):\n    row = db.query(\n        "SELECT * FROM users WHERE id = ?", uid\n    )\n    return row.to_dict()',
                },
            },
            {
                p: 'And here is the same snippet after a round trip through a chat box or a prose-mode Reddit comment:',
            },
            {
                code: {
                    lang: 'python',
                    text: 'def get_user(uid): row = db.query( "SELECT * FROM users WHERE id = ?", uid ) return row.to_dict()',
                },
            },
            {
                p: 'In Python, that is not a formatting nitpick - the indentation was the code. The snippet no longer runs, so nobody can test it, and the first three replies will be people asking you to repost it properly.',
            },
            {
                h3: 'If you post code on Reddit anyway',
            },
            {
                ul: [
                    'Use triple backticks and then actually look at the preview before posting.',
                    'Indent by four spaces in your editor before you copy, not in the Reddit box.',
                    'Do not paste code from the mobile app. Wait for a keyboard.',
                    'Keep it under about thirty lines. Past that, no formatting trick saves you.',
                ],
            },
        ],
    },
    {
        h2: 'The workflow that works on both',
        blocks: [
            {
                ol: [
                    'Open [BinPaste](/) and paste the whole thing - the full file, the full log, the entire query.',
                    'Pick the language from the dropdown so it comes out highlighted and line-numbered. The line numbers are what let you write "it throws on line 42" and have that mean something exact.',
                    'Name the paste after the problem rather than after yourself: `next-auth-jwt-null` beats `test123`.',
                    'Choose an expiry that outlives the thread (see below).',
                    'Post the minimal repro inline, then add one line: "Full file: www.binpaste.xyz/next-auth-jwt-null - it throws on line 42."',
                ],
            },
            {
                p: 'That last sentence is doing real work. It tells the reader what is behind the link, that it is safe to open, and exactly where to look once they get there.',
            },
            {
                cta: {
                    text: 'Have a question to post? Put the long version behind a link you can name, and keep the question itself readable.',
                    label: 'Create a paste',
                    to: '/',
                },
            },
        ],
    },
    {
        h2: 'Name the link so the thread still makes sense later',
        blocks: [
            {
                p: 'Most pastebins hand you a random string. That string is why experienced readers hesitate over paste links - an opaque URL from a stranger in a bug thread could be anything.',
            },
            {
                table: {
                    headers: ['The link in your post', 'What a reader thinks'],
                    rows: [
                        ['`pastebin.com/xY7kQ2mZ`', 'No idea what that is. Could be dead, could be malware.'],
                        ['`www.binpaste.xyz/next-auth-jwt-null`', 'That is the file for this exact problem.'],
                    ],
                },
            },
            {
                p: 'On BinPaste you type the name yourself, so the URL describes its own contents. It also means someone reading the thread on a phone can type the link into a laptop without hunting for the tab - which is the same trick covered in [how to copy and paste text between devices](/guides/copy-paste-text-between-devices).',
            },
        ],
    },
    {
        h2: 'Match the expiry to the lifetime of the question',
        blocks: [
            {
                table: {
                    headers: ['Expiry', 'Right for'],
                    rows: [
                        ['10 minutes to 1 hour', 'A live help channel where someone is looking right now'],
                        ['1 day to 1 week', 'A Reddit post that will be forgotten by the weekend'],
                        ['1 month', 'A question you expect to keep referring back to'],
                        ['Never', 'Anything on Stack Overflow'],
                    ],
                },
            },
            {
                note: 'On Stack Overflow, choose Never. An expiring paste is precisely the link rot the site is trying to prevent, and it is why paste links get treated with suspicion there in the first place.',
            },
        ],
    },
    {
        h2: 'A five-point check before you post',
        blocks: [
            {
                ul: [
                    'Read the paste back as a stranger would. Does it contain a key, a token, a password, a customer name, or an internal hostname? If you are unsure, see [8 things you should never paste into a pastebin](/guides/things-never-to-paste).',
                    'Is the inline repro genuinely minimal, or is it just your file with the imports removed?',
                    'Would the question still make sense if the link vanished tomorrow?',
                    'Does the link open in a private window? Paste it there and check, rather than assuming.',
                    'Is the error text copied as text, so it can be searched?',
                ],
            },
            {
                p: 'Do those five things and your question stops being work to read. That is the whole trick - you are not competing for attention against other questions so much as against the reader deciding it is easier to skip yours.',
            },
        ],
    },
];

export default pasteCodeForStackOverflowReddit;
