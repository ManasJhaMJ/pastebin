// src/pages/guides/share-code-job-application.js
// Article body for /guides/share-code-job-application.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const shareCodeJobApplication = [
    {
        blocks: [
            {
                p: 'Sharing code in a hiring process is not the same as sharing it with a colleague. The person opening your link is busy, may not be an engineer, is looking at nine other candidates today, and has formed an impression of you before they have read a single line.',
            },
            {
                p: 'The mechanics matter more than people expect. A zip attachment that a mail filter strips, a repo that asks the reviewer to log in, a Drive link that says "request access" - each one costs you a reviewer who was going to like your code. This guide covers which method fits which situation, and how to present a snippet so it gets read.',
            },
        ],
    },
    {
        h2: 'Pick by what you were asked for',
        blocks: [
            {
                p: 'There is no single right answer here, and anyone who tells you "always use GitHub" has not read many briefs.',
            },
            {
                table: {
                    caption: 'Matching the method to the request.',
                    headers: ['The situation', 'Best option', 'Why'],
                    rows: [
                        ['A full take-home project, publishing allowed', 'Git repo', 'Structure, commit history, and a README are part of what is being judged'],
                        ['A take-home you were asked not to publish', 'Unlisted paste or a private repo invite', 'A public repo breaks the brief and leaks the exercise to other candidates'],
                        ['"Send us a code sample you are proud of"', 'Paste link, one file', 'One click, no account, nothing to clone'],
                        ['A recruiter asking to "see some code"', 'Paste link', 'Non-technical readers should not be handed a Git URL'],
                        ['A follow-up answer after an interview', 'Paste link', 'Fast, and the thread stays readable'],
                        ['A live interview where you must show code', 'Paste link or the shared editor they provide', 'Nothing to install under time pressure'],
                        ['Anything at all', 'Not a zip attachment', 'Mail filters strip archives containing source files'],
                    ],
                },
            },
        ],
    },
    {
        h2: 'Why a public repo is sometimes the wrong answer',
        blocks: [
            {
                p: 'Putting a take-home on a public GitHub profile feels like the professional choice. Read the brief again first, because it frequently is not:',
            },
            {
                ul: [
                    'Many companies explicitly ask you not to publish the exercise. Publishing it anyway hands the next candidate the answer, and reviewers do notice.',
                    'A public repo of a well-known company’s take-home is discoverable by every other applicant, and by the company itself, searching for exactly that.',
                    'A repo with one commit called "initial commit" tells the reviewer less than a clean single file does.',
                    'If the exercise contained anything the company gave you - a dataset, an API spec, a sample payload - that part is theirs, not yours to publish.',
                ],
            },
            {
                p: 'An unlisted paste sidesteps all four. On BinPaste, a paste is unlisted unless you tick "Make Public", every paste page is served with a `noindex` instruction so search engines leave it out of results, and you can set it to expire. The reviewer clicks a link; the internet does not get a copy of the company’s exercise.',
            },
            {
                note: 'This is not the same as secrecy. Anyone with the link can read the paste - that is how the reviewer reads it without an account. It means "not published and not searchable", which is what the brief is usually asking for.',
            },
        ],
    },
    {
        h2: 'How to present a snippet so it gets read',
        blocks: [
            {
                ol: [
                    'One file. If the sample needs three files to make sense, it is a repo, not a sample.',
                    'Choose the language in the dropdown so it arrives highlighted and line-numbered. A reviewer who wants to comment on something can then say "line 34".',
                    'Put a short header comment at the top: what it is, how to run it, what you would do next with more time.',
                    'Name the link with your own name in it. It ends up pasted into an internal thread, and it should be obvious whose it is.',
                    'Set the expiry to Never for anything hiring-related. A link that dies during the review is the worst possible outcome.',
                    'Open the link yourself in a private window before you send it.',
                ],
            },
            {
                p: 'The header comment does more work than anything else on this list. Compare a file that starts straight at `import` with one that starts like this:',
            },
            {
                code: {
                    lang: 'python',
                    text: '"""\nRate limiter - take-home for Acme, submitted by Manas Jha.\n\nSliding-window limiter backed by Redis. Handles the burst case the brief\nasked about by keeping per-key timestamps rather than a fixed counter.\n\nRun:      python -m pytest test_limiter.py\nRuntime:  ~90 minutes\n\nWith more time: I would move the Lua script into a separate file, add a\ncircuit breaker for Redis outages, and benchmark against a token bucket.\n"""',
                },
            },
            {
                p: 'That block answers the reviewer’s first three questions before they have to ask, and the "with more time" paragraph is disproportionately effective: it shows you know what the shortcuts were, which is most of what senior reviewers are actually testing for.',
            },
            {
                cta: {
                    text: 'Sending a code sample? Get a clean, named, highlighted link with no account and nothing for the reviewer to install.',
                    label: 'Create a paste',
                    to: '/',
                },
            },
        ],
    },
    {
        h2: 'Name the link like a professional',
        blocks: [
            {
                p: 'Most pastebins give you a random string. Since you are choosing the name on BinPaste, choose one that survives being forwarded:',
            },
            {
                table: {
                    headers: ['Link', 'Verdict'],
                    rows: [
                        ['`www.binpaste.xyz/test123`', 'Looks like you did it in a hurry'],
                        ['`www.binpaste.xyz/asdfgh`', 'Looks like a random paste from a stranger'],
                        ['`www.binpaste.xyz/manas-jha-rate-limiter`', 'Obvious whose it is and what it is, six weeks later'],
                        ['`www.binpaste.xyz/mj-acme-takehome`', 'Fine, and neatly tied to the specific role'],
                    ],
                },
            },
            {
                p: 'A named link also survives the part of hiring you never see: your reviewer pastes it into a Slack channel, and three days later someone else reads that channel. `manas-jha-rate-limiter` still means something there. A random string does not.',
            },
        ],
    },
    {
        h2: 'Two small features that help more than they should',
        blocks: [
            {
                ul: [
                    '**The raw view.** Every paste is also available as plain text at `/<name>/raw`, and there is a one-click download with the correct file extension. A reviewer who wants to run your code does not have to select-and-copy out of a highlighted page.',
                    '**The view counter.** Each paste page shows how many times it has been opened and when it was created. It does not tell you who - but "opened four times" versus "opened zero times" is genuinely useful information when you are deciding whether to follow up, and it beats guessing.',
                ],
            },
            {
                note: 'Do not mention the view count to the company. Use it to inform your own follow-up timing, and nothing else.',
            },
        ],
    },
    {
        h2: 'What not to do',
        blocks: [
            {
                ul: [
                    '**Do not attach a zip.** Corporate mail filters routinely strip archives containing `.js` or `.py` files, silently. You will think you sent it.',
                    '**Do not send screenshots of code.** Nobody can run it, search it, or paste a fragment back to you in a reply.',
                    '**Do not use a link that expires in an hour.** Reviews happen when the reviewer has time, not when you sent it.',
                    '**Do not send a Drive or Dropbox link without checking sharing permissions.** "Request access" is where applications go to die.',
                    '**Do not include the company’s exercise text in a public paste.** Your solution is yours; their question is theirs.',
                    '**Do not leave real credentials in a sample.** A take-home that leaks an API key is memorable for the wrong reason - see [8 things you should never paste into a pastebin](/guides/things-never-to-paste).',
                ],
            },
        ],
    },
    {
        h2: 'Before you press send',
        blocks: [
            {
                ul: [
                    'The link opens in a private window, on the first try.',
                    'Your name is in the URL or in the header comment. Ideally both.',
                    'The language is set, so it is highlighted and numbered.',
                    'Expiry is Never.',
                    'No keys, no tokens, no customer data, no internal hostnames.',
                    'The brief has been re-read, and you have not published anything it asked you to keep private.',
                    'The email itself says what the link is: "Rate limiter, single file, tests included - www.binpaste.xyz/manas-jha-rate-limiter".',
                ],
            },
            {
                p: 'Then send it and stop editing. The last 5% of polish on a code sample changes almost no hiring decisions; a link that opens instantly and explains itself changes quite a few.',
            },
        ],
    },
];

export default shareCodeJobApplication;
