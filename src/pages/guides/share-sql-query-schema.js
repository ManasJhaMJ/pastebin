// src/pages/guides/share-sql-query-schema.js
// Article body for /guides/share-sql-query-schema.
// Block keys and the renderer are documented in src/pages/Guide.jsx.

const shareSqlQuerySchema = [
    {
        blocks: [
            {
                p: 'SQL survives a trip through a chat box worse than almost any other kind of code. Queries are wide rather than tall, so every line wraps. Schemas are long. And SQL is the one language where a chat client’s autocorrect can silently rewrite your code into something that no longer runs.',
            },
            {
                p: 'This guide covers how to format a query before you share it, how to cut a schema down to the part that matters, and what to include so the person helping you does not have to ask three follow-up questions first.',
            },
        ],
    },
    {
        h2: 'The failure mode nobody warns you about',
        blocks: [
            {
                p: 'Paste a query into a chat app, a document, or a comment box, and let the other person copy it back out. Frequently they get this:',
            },
            {
                code: {
                    lang: 'sql',
                    text: 'SELECT id, email FROM users WHERE status = ‘active’;',
                },
            },
            {
                p: 'Those are not apostrophes. Word, Slack, Google Docs, and most email clients convert straight quotes into typographic ones automatically, and your database does not accept them. The person you asked for help now gets a syntax error on a character they cannot see is wrong, and spends ten minutes debugging your chat client instead of your query.',
            },
            {
                p: 'On top of that:',
            },
            {
                ul: [
                    'A 180-character `SELECT` wraps into a paragraph with no indentation, so nobody can see the clause structure.',
                    'There are no line numbers, so "the join on line 12" becomes "the join, you know, the second one".',
                    'Autocorrect capitalises table names and helpfully italicises anything between underscores.',
                    'Nothing is highlighted, so keywords, strings, and column names all look identical.',
                ],
            },
            {
                p: 'A paste link fixes all of it at once: monospaced text, exact characters, line numbers to point at, and nothing between you and the person reading it.',
            },
        ],
    },
    {
        h2: 'Format the query before you share it',
        blocks: [
            {
                p: 'Do not paste the one-liner your ORM logged. Nobody can read this:',
            },
            {
                code: {
                    lang: 'sql',
                    text: 'select o.id,o.total,c.email,count(li.id) as items from orders o join customers c on c.id=o.customer_id left join line_items li on li.order_id=o.id where o.created_at>=\'2026-01-01\' and o.status in (\'paid\',\'shipped\') group by o.id,o.total,c.email having count(li.id)>3 order by o.total desc limit 50;',
                },
            },
            {
                p: 'Ninety seconds of formatting turns it into something a stranger can actually diagnose:',
            },
            {
                code: {
                    lang: 'sql',
                    text: "SELECT o.id,\n       o.total,\n       c.email,\n       COUNT(li.id) AS items\nFROM orders o\nJOIN customers c\n  ON c.id = o.customer_id\nLEFT JOIN line_items li\n  ON li.order_id = o.id\nWHERE o.created_at >= '2026-01-01'\n  AND o.status IN ('paid', 'shipped')\nGROUP BY o.id, o.total, c.email\nHAVING COUNT(li.id) > 3\nORDER BY o.total DESC\nLIMIT 50;",
                },
            },
            {
                ol: [
                    'Uppercase the keywords. It is convention, and it makes the shape of the query scannable.',
                    'One clause per line: `SELECT`, `FROM`, each `JOIN`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT`.',
                    'Put each `ON` on its own indented line under its join. This is where most join bugs live, and putting them on their own line is often how you find your own bug.',
                    'Alias every table, and use the same alias consistently.',
                    'Break long `IN` lists across lines rather than letting them run to 300 characters.',
                ],
            },
            {
                note: 'If the query came out of an ORM, share both: the SQL the ORM generated and the few lines of application code that produced it. Half the time the answer is about the ORM call, not the SQL.',
            },
        ],
    },
    {
        h2: 'What to include with a query question',
        blocks: [
            {
                table: {
                    caption: 'Include these and you will usually skip a whole round of follow-up questions.',
                    headers: ['Include', 'Why it matters'],
                    rows: [
                        ['The database and version', 'Window functions, CTEs, and `LIMIT` syntax all differ between engines'],
                        ['The `CREATE TABLE` for each table involved', 'Types and nullability change the answer, and often are the answer'],
                        ['Indexes on those tables', 'Nearly every "why is this slow" question is answered here'],
                        ['Approximate row counts', '1,000 rows and 40 million rows need different queries'],
                        ['The exact error, verbatim', 'Error codes are searchable; paraphrases are not'],
                        ['`EXPLAIN` or `EXPLAIN ANALYZE` output', 'For performance questions this is the single most useful artefact'],
                        ['A few fake sample rows', 'Lets someone reproduce the problem instead of reasoning about it'],
                        ['What you expected to get back', 'Surprisingly often the query is correct and the expectation is not'],
                    ],
                },
            },
            {
                p: '`EXPLAIN ANALYZE` output in particular is exactly the sort of thing that must go behind a link: it is wide, it is deeply indented, and chat will destroy it. Same for a query plan from a GUI client.',
            },
        ],
    },
    {
        h2: 'Sharing a schema without dumping the database',
        blocks: [
            {
                p: 'When someone asks to see your schema, they do not want `pg_dump` output. They want the smallest set of definitions that makes your question answerable.',
            },
            {
                ol: [
                    'Include only the tables in the query, plus anything they have a foreign key to.',
                    'Share `CREATE TABLE` statements, not a dump with data. Most clients will generate these for you (`\\d+ table` in psql, `SHOW CREATE TABLE` in MySQL).',
                    'Keep the indexes and the constraints. They are the interesting part.',
                    'Add row counts as a comment on each table.',
                    'Rename any column that leaks a business secret, and say that you renamed it.',
                    'Never include the data. A schema plus five invented rows beats a dump every time.',
                ],
            },
            {
                code: {
                    lang: 'sql',
                    text: '-- orders: ~4.2M rows, growing ~15k/day\nCREATE TABLE orders (\n  id          BIGSERIAL PRIMARY KEY,\n  customer_id BIGINT      NOT NULL REFERENCES customers(id),\n  status      TEXT        NOT NULL,\n  total       NUMERIC(10,2) NOT NULL,\n  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()\n);\nCREATE INDEX orders_customer_idx ON orders (customer_id);\nCREATE INDEX orders_created_idx  ON orders (created_at DESC);\n\n-- customers: ~380k rows\nCREATE TABLE customers (\n  id    BIGSERIAL PRIMARY KEY,\n  email TEXT NOT NULL UNIQUE\n);',
                },
            },
            {
                p: 'That is about twenty lines, and it contains everything needed to answer most questions about the query above - including the fact that there is no index on `status`, which is probably the answer.',
            },
            {
                cta: {
                    text: 'Formatted your query and trimmed the schema? Put them in one paste and share a link that keeps every character intact.',
                    label: 'Create a paste',
                    to: '/',
                },
            },
        ],
    },
    {
        h2: 'Choosing the language on BinPaste',
        blocks: [
            {
                p: 'Worth being straight about this: the language dropdown on BinPaste covers Plain Text, JavaScript, Python, Java, C, C++, HTML, and CSS. There is no SQL option yet, so **choose Plain Text for SQL**.',
            },
            {
                p: 'In practice that costs you keyword colouring and nothing else. You still get a monospaced view, exact characters with no autocorrect, line numbers to point at, a raw view at `/<name>/raw`, and a one-click download. For diagnosing a query, the line numbers and the untouched characters are doing almost all of the work - colour is a nicety.',
            },
            {
                note: 'Sharing a JSON payload alongside the query? Pick JavaScript for that one. JSON is valid JavaScript object-literal syntax, so the highlighter colours keys and strings correctly. That trick and a few others are in [how to share JSON so it stays readable](/guides/share-json-readable).',
            },
        ],
    },
    {
        h2: 'Redact before you paste',
        blocks: [
            {
                p: 'A query is more revealing than it looks. Table and column names are usually fine to share. These are not:',
            },
            {
                ul: [
                    '**Literal values in `WHERE` clauses.** `WHERE email = \'jane.doe@acme.com\'` is a real person’s address. Use `WHERE email = \'user@example.com\'`.',
                    '**Connection strings.** They contain a host, a database name, a username, and often a password. See [how to share a config file safely](/guides/share-config-file-safely).',
                    '**Result sets.** The output of a query against production is production data. Invent the rows you show.',
                    '**Internal hostnames in `EXPLAIN` or log output.** Query plans and slow-query logs often carry the server name.',
                    '**Anything from a healthcare, financial, or government dataset.** Not redacted - not shared at all.',
                ],
            },
            {
                p: 'The full list of things that should never reach a paste is in [8 things you should never paste into a pastebin](/guides/things-never-to-paste).',
            },
        ],
    },
    {
        h2: 'Naming, expiry, and size',
        blocks: [
            {
                table: {
                    headers: ['Setting', 'Suggestion'],
                    rows: [
                        ['Name', 'Describe the problem: `slow-orders-join`, `schema-orders-customers`'],
                        ['Expiry', '1 day for a live debugging session, 1 week for a forum question, Never for reference'],
                        ['Visibility', 'Leave "Make Public" unticked unless you want it on the public feed'],
                        ['Size', '400,000 characters, which is roughly a 10,000-line schema'],
                    ],
                },
            },
            {
                p: 'If you are hitting the size limit with a single query, that is worth noticing on its own: a 400,000-character query is almost always generated SQL, and the real question is about whatever generated it.',
            },
            {
                p: 'One last habit worth forming: put the query, the schema, and the `EXPLAIN` output in **one** paste, separated by comments, rather than three links. One link gets opened. Three links get one opened and two ignored.',
            },
        ],
    },
];

export default shareSqlQuerySchema;
