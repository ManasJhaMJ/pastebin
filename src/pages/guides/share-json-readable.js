// src/pages/guides/share-json-readable.js
// Article body for /guides/share-json-readable.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const shareJsonReadable = [
    {
        blocks: [
            {
                p: 'JSON has a particular way of being unhelpful when shared. It arrives minified as a single 4,000-character line, wraps into a grey brick in whatever window it lands in, and the field you are asking about is somewhere in the middle of it. Everybody says "can you format that?" and the conversation restarts.',
            },
            {
                p: 'Fixing this takes about fifteen seconds. Here is how to pretty-print it, how to trim it to the part that matters, how to redact it without making it invalid, and how to get it in front of someone with the structure intact.',
            },
        ],
    },
    {
        h2: 'Pretty-print it before you share it',
        blocks: [
            {
                p: 'Never share minified JSON with a human. Every platform has a one-liner for this and you almost certainly have one installed already:',
            },
            {
                table: {
                    caption: 'Pick whichever is already on your machine.',
                    headers: ['Tool', 'Command'],
                    rows: [
                        ['jq', '`jq . payload.json`'],
                        ['Python', '`python -m json.tool payload.json`'],
                        ['Node', '`node -e "console.log(JSON.stringify(require(\'./payload.json\'),null,2))"`'],
                        ['curl straight into jq', '`curl -s https://api.example.com/v2/orders | jq .`'],
                        ['macOS clipboard', '`pbpaste | jq . | pbcopy`'],
                        ['Windows PowerShell', '`Get-Content payload.json | ConvertFrom-Json | ConvertTo-Json -Depth 20`'],
                        ['VS Code', 'Open the file and press Shift+Alt+F'],
                    ],
                },
            },
            {
                p: 'So instead of sending this:',
            },
            {
                code: {
                    lang: 'json',
                    text: '{"status":"error","code":422,"data":{"user":{"id":8814,"email":"jane@example.com","roles":["admin","billing"],"verified":false},"attempts":3},"errors":[{"field":"card.expiry","message":"must be in the future"}]}',
                },
            },
            {
                p: 'You send this:',
            },
            {
                code: {
                    lang: 'json',
                    text: '{\n  "status": "error",\n  "code": 422,\n  "data": {\n    "user": {\n      "id": 8814,\n      "email": "jane@example.com",\n      "roles": ["admin", "billing"],\n      "verified": false\n    },\n    "attempts": 3\n  },\n  "errors": [\n    {\n      "field": "card.expiry",\n      "message": "must be in the future"\n    }\n  ]\n}',
                },
            },
            {
                p: 'Same bytes of information, and now the nesting is visible - which matters, because a large share of "why is my JSON wrong" questions are answered purely by being able to see one level of nesting you did not expect.',
            },
            {
                note: 'The macOS clipboard trick is the one to memorise: `pbpaste | jq . | pbcopy` reformats whatever you just copied, in place. On Linux the equivalent with xclip is `xclip -o | jq . | xclip -sel clip`.',
            },
        ],
    },
    {
        h2: 'Choose JavaScript for the highlighting',
        blocks: [
            {
                p: 'A useful trick when pasting JSON on BinPaste: the language dropdown has no JSON entry, so **pick JavaScript**. JSON is valid JavaScript object-literal syntax, so the highlighter colours keys, strings, numbers, and booleans correctly, and you get line numbers with it.',
            },
            {
                p: 'Those line numbers are the practical payoff. "The `verified` flag on line 9 is false but the user confirmed their email" is a precise sentence. Without line numbers, you write "the verified flag, in the user object, in data" and hope.',
            },
        ],
    },
    {
        h2: 'Trim it, do not dump it',
        blocks: [
            {
                p: 'A 12,000-line API response is not a question, it is homework. Cut it down first:',
            },
            {
                ol: [
                    'Keep the object that is failing, in full. Do not summarise it - the bug is often in a field you assumed was fine.',
                    'For arrays, keep one representative element, not two hundred. `jq \'.items[0]\'` does this in one command.',
                    'Keep the surrounding structure, so the reader can see where the object sits. An object with no context is a puzzle.',
                    'Keep `null` values and empty arrays. These are frequently the actual bug, and they are the first thing people delete when tidying up.',
                    'Do not change types while trimming. If a field is the number `0`, leave it as `0`, not `"0"` - you would be inventing a different bug.',
                    'If you cut something out, say so in a note above the JSON, not inside it.',
                ],
            },
            {
                p: 'That last point is worth spelling out, because it trips people up: **JSON does not support comments.** Adding `// trimmed here` makes the payload invalid, so the person helping you cannot parse it to test anything. Put your notes in the paste above the JSON block, or use a real key like `"_note"` if it must live inside.',
            },
            {
                code: {
                    lang: 'bash',
                    text: '# one element out of a big array, pretty-printed\njq \'.items[0]\' response.json\n\n# drop the fields you must not share, keep everything else\njq \'del(.access_token, .refresh_token, .data.user.phone)\' response.json\n\n# just the shape, no values - useful for "why does this not deserialise"\njq \'[paths(scalars)] | map(join("."))\' response.json',
                },
            },
        ],
    },
    {
        h2: 'Redact without making it invalid',
        blocks: [
            {
                p: 'Redaction that breaks parsing defeats the purpose. The rule is: replace the value, keep the type, keep the shape.',
            },
            {
                table: {
                    headers: ['Original', 'Good redaction', 'Bad redaction'],
                    rows: [
                        ['`"email": "jane@acme.com"`', '`"email": "user@example.com"`', '`"email": "REDACTED"` - fine, but no longer looks like an email'],
                        ['`"balance": 4021.55`', '`"balance": 1000.00`', '`"balance": "REDACTED"` - changed number to string, invents a type error'],
                        ['`"token": "eyJhbGciOi..."`', '`"token": "REDACTED_JWT"`', 'Deleting the key - now the reader cannot tell if it was missing'],
                        ['`"verified": false`', '`"verified": false`', 'Changing it to `true` because it looks tidier'],
                        ['`"customer_id": 8814`', '`"customer_id": 1`', '`"customer_id": null` - null means something different'],
                    ],
                },
            },
            {
                p: 'And after redacting, validate. `jq . redacted.json` will fail loudly if you have left a trailing comma or an unbalanced brace. Sending invalid JSON to someone who is trying to help you debug your JSON is a specific kind of frustrating.',
            },
            {
                note: 'Access tokens, bearer tokens, and session cookies are extremely common in API payloads, and pasting a live one is handing over an authenticated session. See [8 things you should never paste into a pastebin](/guides/things-never-to-paste).',
            },
        ],
    },
    {
        h2: 'Sharing a request and response together',
        blocks: [
            {
                p: 'Most JSON questions are really questions about an exchange, not a document. Put the whole exchange in one paste with plain-text separators, and you will usually get answered in one round:',
            },
            {
                code: {
                    lang: 'text',
                    text: '=== REQUEST ===\nPOST /v2/subscriptions HTTP/1.1\nHost: api.example.com\nContent-Type: application/json\nAuthorization: Bearer REDACTED\n\n{\n  "plan": "pro_monthly",\n  "customer_id": 1,\n  "trial_days": 0\n}\n\n=== RESPONSE (422) ===\n{\n  "status": "error",\n  "errors": [\n    { "field": "trial_days", "message": "must be greater than 0" }\n  ]\n}\n\n=== EXPECTED ===\n201 with the subscription object. The docs say trial_days is optional,\nand 0 should mean no trial.\n\n=== VERSIONS ===\nstripe-node 14.2.0, Node 20.11, API version 2026-03-01',
                },
            },
            {
                p: 'Four labelled blocks, one link, no follow-up questions. This is the same principle as sharing a stack trace with its command and versions, covered in [how to share terminal logs and error messages](/guides/how-to-share-terminal-logs).',
            },
            {
                cta: {
                    text: 'Formatted and redacted? Paste it, pick JavaScript for the highlighting, and share one link that keeps every brace where it was.',
                    label: 'Create a paste',
                    to: '/',
                },
            },
        ],
    },
    {
        h2: 'The things that quietly corrupt JSON in transit',
        blocks: [
            {
                ul: [
                    '**Smart quotes.** Chat apps, email clients, and word processors convert `"` into typographic quotes. The result is not parseable, and the difference is invisible at a glance.',
                    '**Message length limits.** Discord cuts off at 2,000 characters, so a payload arrives truncated with no warning and the reader debugs a "malformed" document that was fine when you sent it.',
                    '**Line-break collapsing.** Some mobile chat clients strip single newlines, flattening your carefully indented payload back into a brick.',
                    '**Autocorrect on keys.** Underscores get eaten by Markdown italics, so `customer_id` and `created_at` arrive as `customerid` and `createdat`.',
                    '**A BOM at the start of the file.** Invisible, and it makes some parsers reject the first character.',
                    '**Screenshots.** Nobody can parse an image, and the crop always cuts off the closing brace.',
                ],
            },
            {
                p: 'A paste link avoids all six, because the text is stored and served as text and never passes through anything that thinks it is being helpful.',
            },
        ],
    },
    {
        h2: 'Size, naming, and expiry',
        blocks: [
            {
                table: {
                    headers: ['Setting', 'Suggestion'],
                    rows: [
                        ['Size limit', '400,000 characters - roughly a 12,000-line pretty-printed payload'],
                        ['Language', 'JavaScript, for JSON highlighting'],
                        ['Name', 'Describe the exchange: `stripe-422-trial-days`'],
                        ['Expiry', '1 hour for live debugging, 1 week for a forum thread, Never for documentation'],
                    ],
                },
            },
            {
                p: 'If you are over the character limit, do not truncate randomly in the middle - that produces invalid JSON and wastes the reader’s time. Take one array element with `jq` and say how many there were in total. One valid element plus "there are 40,000 of these" answers more questions than half a document.',
            },
            {
                p: 'For newline-delimited JSON logs, the same applies: share a handful of representative lines rather than the whole stream, and mention the total volume.',
            },
        ],
    },
];

export default shareJsonReadable;
