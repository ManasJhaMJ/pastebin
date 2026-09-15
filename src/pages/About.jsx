// src/pages/About.js
// Who runs BinPaste, why it exists, and how it works. Establishes ownership and
// accountability for the site.
import { Link } from 'react-router-dom';

const CONTACT_EMAIL = 'work4manasjha@gmail.com';

function About() {
    return (
        <article className="content-section">
            <h1>About BinPaste</h1>
            <p className="page-meta">Last updated: 15 September 2026</p>
            <p className="lead">
                BinPaste is a free tool for sharing code snippets and text online. You paste
                something, give it a name, and get a link anyone can open - no account, no install,
                no sign-up wall. It is built and maintained by one developer, and this page explains
                who that is, why the project exists, and how it works.
            </p>

            <h2>Who builds it</h2>
            <p>
                BinPaste is an independent side project by <strong>Manas Jha</strong>, a web developer
                working with React and the JavaScript ecosystem. It is not a company or a funded
                product - it is one person&apos;s tool that turned out to be useful enough to put
                online properly. You can find my other work on{' '}
                <a
                    href="https://github.com/manasjhamj"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
                , and reach me at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <p>
                Everything on this site - the tool, the <Link to="/guides">guides</Link>, and these
                pages - is written and maintained by me. There is no content team and nothing here is
                syndicated from elsewhere.
            </p>

            <h2>Why it exists</h2>
            <p>
                It started with a specific annoyance. Sharing a block of code with someone means
                choosing between bad options: a screenshot they cannot copy from, a chat message that
                destroys the indentation, or a file attachment they have to download before they can
                read it. Existing pastebins solve the technical problem but had accumulated a lot of
                friction - interstitials, sign-up prompts, and random URL IDs that are painful to
                type on a phone.
            </p>
            <p>
                So BinPaste was built around two decisions. First, no account, ever - not to create a
                paste and not to read one. Second, you choose the name, so the link is{' '}
                <code>www.binpaste.xyz/whatever-you-typed</code> rather than an eight-character
                string. That second one turned out to be the feature people notice most: a link you
                can remember is a link you can type on another device without sending it anywhere.
            </p>

            <h2>What it does</h2>
            <ul>
                <li>
                    <strong>Custom links.</strong> Pick your own name, or generate a random unused one
                    in a click.
                </li>
                <li>
                    <strong>Syntax highlighting with line numbers</strong> for Plain Text, JavaScript,
                    Python, Java, C, C++, HTML, and CSS.
                </li>
                <li>
                    <strong>Expiring pastes.</strong> Auto-delete after 10 minutes, an hour, a day, a
                    week, or a month - or never.
                </li>
                <li>
                    <strong>Raw view and download.</strong> Plain text at{' '}
                    <code>/name/raw</code> for scripting, or a one-click download with the correct
                    file extension.
                </li>
                <li>
                    <strong>QR codes.</strong> Open any paste on a phone by scanning, without typing a
                    URL.
                </li>
                <li>
                    <strong>View counter and creation time,</strong> so you can tell whether the person
                    you sent it to has opened it.
                </li>
                <li>
                    <strong>Unlisted by default.</strong> Pastes stay off the public feed and out of
                    search results unless you tick &quot;Make Public&quot;.
                </li>
            </ul>

            <h2>What it deliberately does not do</h2>
            <p>
                Being clear about the limits is more useful than pretending there are none:
            </p>
            <ul>
                <li>
                    <strong>Pastes cannot be edited after creation.</strong> This is intentional - a
                    link you shared yesterday still shows what you shared yesterday. If you need a
                    change, create a new paste.
                </li>
                <li>
                    <strong>There is no encryption and no password protection.</strong> Anyone with the
                    link can read the paste. It is not a place for passwords, API keys, or personal
                    data.
                </li>
                <li>
                    <strong>There is no history.</strong> With no accounts, there is no list of
                    everything you have posted. Keep your own copy of anything that matters.
                </li>
                <li>
                    <strong>Size is capped at roughly 400,000 characters.</strong> Generous for
                    snippets and logs, not intended for large files.
                </li>
                <li>
                    <strong>No durability guarantee.</strong> The service is free and provided as-is.
                    Never treat a paste as your only copy.
                </li>
            </ul>

            <h2>How it is built</h2>
            <p>
                BinPaste is a React single-page application built with Vite, using Firebase Realtime
                Database for storage and deployed on Vercel. Paste pages are served through a small
                serverless function that injects per-paste titles and link previews, so a shared link
                shows something meaningful in chat apps. Syntax highlighting is code-split out of the
                initial load so the homepage stays fast.
            </p>
            <p>
                Recent changes are listed under <em>Dev updates</em> on the{' '}
                <Link to="/">homepage</Link>.
            </p>

            <h2>Moderation and abuse</h2>
            <p>
                Pastes are created by users, and every paste page has a Report button. Reports go
                straight to me and I review them. Content that breaks the{' '}
                <Link to="/terms">Terms of Service</Link> - illegal material, credentials, personal
                data, malware, spam, harassment - is removed. If you have found something that needs
                taking down, email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the link and it will be
                dealt with.
            </p>

            <h2>Disclaimer</h2>
            <p>
                BinPaste is a hosting tool, not a publisher. Pastes are created and shared by users,
                and nothing is reviewed or approved before it goes live - a paste becomes readable the
                moment someone creates it. A paste may also link to external sites I have no control
                over. Nothing you find in a paste here is written, checked, or endorsed by me.
            </p>
            <p>
                The developer of this website is not responsible for any content posted, shared, or
                linked by users, or for any misuse, loss, or damage arising from the use of this
                service. Content is provided &quot;as is&quot; without warranty of any kind.
            </p>
            <p>
                In practice that cuts both ways: I will remove anything that breaks the rules as soon
                as I know about it (see above), but I cannot promise a paste will still be there
                tomorrow, and I cannot vouch for a paste someone else wrote. The full wording is in
                section 6 of the <Link to="/terms">Terms of Service</Link>, and the{' '}
                <Link to="/privacy">Privacy Policy</Link> covers what is stored and how to get it
                deleted.
            </p>

            <h2>How it is funded</h2>
            <p>
                BinPaste is free to use and there is no paid tier. Hosting and database costs are
                covered by advertising, which is why you may see ads on some pages. Ads are not shown
                on paste pages themselves. What data is involved is set out in the{' '}
                <Link to="/privacy">Privacy Policy</Link>.
            </p>

            <h2>Get in touch</h2>
            <p>
                Feature requests, bug reports, and takedown requests are all welcome - see the{' '}
                <Link to="/contact">Contact page</Link>. It is a one-person project, so replies may
                take a few days, but everything gets read.
            </p>

            <p className="content-links">
                <Link to="/">Create a paste</Link> · <Link to="/guides">Guides</Link> ·{' '}
                <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link> ·{' '}
                <Link to="/contact">Contact</Link>
            </p>
        </article>
    );
}

export default About;
