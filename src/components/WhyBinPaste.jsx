// src/components/WhyBinPaste.js
// Visible homepage content — mirrors the FAQ/SoftwareApplication structured
// data in index.html so search engines and AI assistants have crawlable text.
import { Link } from 'react-router-dom';

const FEATURES = [
    ['Custom links', 'Pick your own name so your paste lives at a clean URL like binpaste.xyz/my-notes — or generate a random one.'],
    ['Syntax highlighting', 'Code is highlighted for JavaScript, Python, Java, C, C++, HTML, CSS and more.'],
    ['No account needed', 'No sign-up, no login. Open the site, paste, and share the link instantly.'],
    ['Expiring pastes', 'Set a paste to auto-expire after 10 minutes, an hour, a day, a week, or a month.'],
    ['Raw & download', 'View any paste as raw plain text or download it as a file with one click.'],
    ['Public feed', 'Optionally share a paste on the public feed for anyone to discover.'],
];

const FAQ = [
    ['What is BinPaste?', 'BinPaste is a free, fast pastebin alternative for sharing code snippets and text online. Create a paste with a custom name, get an instant shareable link, and view it with syntax highlighting — no account required.'],
    ['Is BinPaste free to use?', 'Yes. BinPaste is completely free. You can create and share pastes without signing up or creating an account.'],
    ['How is BinPaste a better pastebin alternative?', 'BinPaste lets you pick your own custom link for each paste, offers syntax highlighting for many languages, has a public pastes feed for discovery, supports one-click copy and download, and requires no account — a cleaner, faster experience than traditional pastebins.'],
    ['Do I need an account to use BinPaste?', 'No. BinPaste requires no account or sign-up. Just open the site, paste your code or text, choose a custom name, and share the link.'],
    ['Can I make a paste expire automatically?', 'Yes. When creating a paste you can choose an expiry — from 10 minutes up to a month — after which the paste is no longer accessible.'],
];

function WhyBinPaste() {
    return (
        <section className="content-section">
            <h2>Why BinPaste is a better pastebin alternative</h2>
            <p className="lead">
                BinPaste is a free, fast way to share code snippets and text online. Unlike cluttered,
                ad-heavy pastebins, BinPaste keeps things clean: pick a custom link, get syntax
                highlighting, and share instantly — no account required.
            </p>

            <div className="feature-grid">
                {FEATURES.map(([title, desc]) => (
                    <div className="feature-card" key={title}>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                    </div>
                ))}
            </div>

            <h2 id="faq">Frequently asked questions</h2>
            <div className="faq-list">
                {FAQ.map(([q, a]) => (
                    <details className="faq-item" key={q}>
                        <summary>{q}</summary>
                        <p>{a}</p>
                    </details>
                ))}
            </div>

            <p className="content-links">
                Learn more: <Link to="/pastebin-alternative">BinPaste vs Pastebin.com</Link> ·{' '}
                <Link to="/guides">Guides</Link> · <Link to="/public">Public pastes</Link>
            </p>
        </section>
    );
}

export default WhyBinPaste;
