// src/components/WhyBinPaste.js
// Visible homepage content - mirrors the FAQ/SoftwareApplication structured
// data in index.html so search engines and AI assistants have crawlable text.
import { Link } from 'react-router-dom';
import { GUIDES } from '../pages/guidesData';
import { UPDATES } from './changelog';

const FEATURES = [
    ['Custom links', 'Pick your own name so your paste lives at a clean URL like www.binpaste.xyz/my-notes - or generate a random one.'],
    ['Syntax highlighting', 'Code is highlighted with line numbers for Plain Text, JavaScript, Python, Java, C, C++, HTML, and CSS.'],
    ['No account needed', 'No sign-up, no login. Open the site, paste, and share the link instantly.'],
    ['Expiring pastes', 'Set a paste to auto-expire after 10 minutes, an hour, a day, a week, or a month.'],
    ['Raw & download', 'View any paste as raw plain text or download it as a file with one click.'],
    ['QR sharing', 'Show a QR code for any paste to open it instantly on a phone or another device.'],
    ['View counter', 'See how many times a paste has been viewed.'],
    ['Public feed', 'Optionally share a paste on the public feed for anyone to discover.'],
];

const FAQ = [
    ['What is BinPaste?', 'BinPaste is a free, fast pastebin alternative for sharing code snippets and text online. Create a paste with a custom name, get an instant shareable link, and view it with syntax highlighting - no account required.'],
    ['Is BinPaste free to use?', 'Yes. BinPaste is completely free. You can create and share pastes without signing up or creating an account.'],
    ['How is BinPaste a better pastebin alternative?', 'BinPaste lets you pick your own custom link for each paste, offers syntax highlighting for many languages, has a public pastes feed for discovery, supports one-click copy and download, and requires no account - a cleaner, faster experience than traditional pastebins.'],
    ['Do I need an account to use BinPaste?', 'No. BinPaste requires no account or sign-up. Just open the site, paste your code or text, choose a custom name, and share the link.'],
    ['Can I make a paste expire automatically?', 'Yes. When creating a paste you can choose an expiry - from 10 minutes up to a month - after which the paste is no longer accessible.'],
    ['Can I view or download a paste as raw text?', 'Yes. Every paste has a raw plain-text view at /<name>/raw, and you can download the paste as a file with the correct extension in one click.'],
    ['Can I share a paste with a QR code?', 'Yes. Each paste page has a QR button that shows a scannable QR code, so you can open the paste on a phone or another device instantly.'],
    ['Can I use BinPaste to copy and paste text between devices?', 'Yes. BinPaste works well as a simple online clipboard: paste your text on one device, give it a short custom name, then open that link on your phone or another computer and tap Copy. You can also scan the QR code instead of typing the link. Avoid pasting passwords or other sensitive data, since anyone with the link can open it.'],
    ['What languages does BinPaste highlight?', 'BinPaste highlights Plain Text, JavaScript, Python, Java, C, C++, HTML, and CSS, with line numbers for easy reading.'],
    ['How do I request removal of a paste?', 'Use the Report button on any paste, or email work4manasjha@gmail.com with the paste link, and it will be reviewed and removed.'],
];

function WhyBinPaste() {
    return (
        <section className="content-section">
            <h2>Why BinPaste is a better pastebin alternative</h2>
            <p className="lead">
                BinPaste is a free, fast way to share code snippets and text online. Unlike cluttered,
                ad-heavy pastebins, BinPaste keeps things clean: pick a custom link, get syntax
                highlighting, and share instantly - no account required.
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

            <h2 id="blogs">Helpful blogs</h2>
            <div className="blog-grid">
                {GUIDES.map((g) => (
                    <Link className="blog-card" to={`/guides/${g.slug}`} key={g.slug}>
                        <h3>{g.title}</h3>
                        <p>{g.description}</p>
                        <span className="blog-read">Read guide →</span>
                    </Link>
                ))}
            </div>
            <h2 id="updates">Dev updates</h2>
            <ul className="updates-list">
                {UPDATES.map((u, i) => (
                    <li className="update-item" key={i}>
                        <span className="update-date">{u.date}</span>
                        <span className="update-text">{u.text}</span>
                    </li>
                ))}
            </ul>

            <p className="content-links">
                <Link to="/guides">Browse all guides</Link> ·{' '}
                <Link to="/pastebin-alternative">BinPaste vs Pastebin.com</Link> ·{' '}
                <Link to="/public">Public pastes</Link>
            </p>
        </section>
    );
}

export default WhyBinPaste;
