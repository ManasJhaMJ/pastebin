// src/pages/Contact.js
// A real contact page rather than a bare mailto in the footer. Pre-filled
// mailto subjects keep incoming mail sorted by reason.
import { Link } from 'react-router-dom';

const CONTACT_EMAIL = 'work4manasjha@gmail.com';

function mailto(subject) {
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

const REASONS = [
    {
        title: 'Report or remove a paste',
        subject: 'BinPaste: content removal request',
        body: 'The fastest route is the Report button on the paste page itself, which pre-fills the link for you. If you email instead, include the full paste URL and a one-line reason. Removal requests are prioritised over everything else.',
    },
    {
        title: 'Report a bug',
        subject: 'BinPaste: bug report',
        body: 'Tell me what you did, what you expected, and what happened instead. Your browser and device help a lot, and a paste link that reproduces the problem helps even more.',
    },
    {
        title: 'Request a feature',
        subject: 'BinPaste: feature request',
        body: 'Language support, expiry options, and sharing shortcuts are the most common requests. Say what you are trying to do rather than just the feature - it often turns out there is a simpler answer.',
    },
    {
        title: 'Privacy or data questions',
        subject: 'BinPaste: privacy question',
        body: 'Anything about what is stored, what is deleted, or what analytics and advertising involve. The Privacy Policy covers most of it, but ask if something is unclear.',
    },
    {
        title: 'Anything else',
        subject: 'BinPaste: general enquiry',
        body: 'Questions about the project, corrections to a guide, or general feedback are all welcome.',
    },
];

function Contact() {
    return (
        <article className="content-section">
            <h1>Contact</h1>
            <p className="page-meta">Last updated: 15 September 2026</p>
            <p className="lead">
                BinPaste is run by one developer, Manas Jha. There is no support desk and no ticket
                system - email reaches me directly at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Everything gets read; replies
                usually take one to three days, and content removal requests are handled first.
            </p>

            <h2>What are you getting in touch about?</h2>
            <p>
                Use whichever link matches - it pre-fills the subject so your message lands in the
                right place.
            </p>
            <div className="contact-grid">
                {REASONS.map((r) => (
                    <div className="contact-card" key={r.title}>
                        <h3>{r.title}</h3>
                        <p>{r.body}</p>
                        <a className="contact-action" href={mailto(r.subject)}>
                            Email about this →
                        </a>
                    </div>
                ))}
            </div>

            <h2>Removing a paste</h2>
            <p>
                Because BinPaste has no accounts, I cannot verify who created a given paste. Content
                is removed on request regardless - if you send a paste link and a reason, it gets
                reviewed and, where it breaches the{' '}
                <Link to="/terms">Terms of Service</Link> or exposes someone&apos;s personal
                information, deleted.
            </p>
            <p>Please include:</p>
            <ul>
                <li>
                    The full paste URL, for example{' '}
                    <code>https://www.binpaste.xyz/example-name</code>.
                </li>
                <li>Why it should be removed, in a sentence.</li>
                <li>
                    Whether it contains credentials or personal data, so it can be prioritised.
                </li>
            </ul>
            <p>
                If a paste has exposed a live credential of yours, rotate it immediately rather than
                waiting for the deletion - assume anything that has been publicly reachable has been
                read.
            </p>

            <h2>Before you email</h2>
            <p>
                A few things that come up often and are already answered elsewhere on the site:
            </p>
            <ul>
                <li>
                    <strong>Can I edit a paste?</strong> No - pastes are immutable once created.
                    Create a new one.
                </li>
                <li>
                    <strong>Where did my paste go?</strong> If you set an expiry, it was deleted when
                    the expiry passed. Expired pastes cannot be recovered.
                </li>
                <li>
                    <strong>Can I password-protect a paste?</strong> Not currently. Anyone with the
                    link can read it.
                </li>
                <li>
                    <strong>What is stored about me?</strong> See the{' '}
                    <Link to="/privacy">Privacy Policy</Link>.
                </li>
                <li>
                    <strong>How do I use a particular feature?</strong> The{' '}
                    <Link to="/guides">guides</Link> and the FAQ on the{' '}
                    <Link to="/">homepage</Link> cover most of it.
                </li>
            </ul>

            <h2>Elsewhere</h2>
            <p>
                Code and other projects:{' '}
                <a href="https://github.com/manasjhamj" target="_blank" rel="noopener noreferrer">
                    github.com/manasjhamj
                </a>
                .
            </p>

            <p className="content-links">
                <Link to="/">Create a paste</Link> · <Link to="/about">About</Link> ·{' '}
                <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link>
            </p>
        </article>
    );
}

export default Contact;
