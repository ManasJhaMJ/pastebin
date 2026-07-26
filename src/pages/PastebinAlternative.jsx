// src/pages/PastebinAlternative.js
// High-intent landing page targeting "pastebin alternative" searches.
import { Link } from 'react-router-dom';

const COMPARISON = [
    ['Free to use', 'Yes', 'Yes'],
    ['No account required', 'Yes', 'Optional / prompted'],
    ['Custom paste name / link', 'Yes — pick any name', 'Random ID only'],
    ['Random name generator', 'Yes', 'No'],
    ['Syntax highlighting', 'Yes', 'Yes'],
    ['Expiring pastes', 'Yes — 10 min to 1 month', 'Yes'],
    ['Raw view & download', 'Yes', 'Yes'],
    ['QR code to share', 'Yes', 'No'],
    ['Clean, ad-light interface', 'Yes', 'Ad-heavy'],
];

function PastebinAlternative() {
    return (
        <article className="content-section">
            <h1>BinPaste — a better Pastebin alternative</h1>
            <p className="lead">
                Looking for a Pastebin alternative that&apos;s fast, clean, and free? BinPaste lets you
                share code snippets and text online with a custom link, syntax highlighting, expiring
                pastes, and no account — a simpler experience than traditional pastebins.
            </p>

            <h2>BinPaste vs Pastebin.com</h2>
            <div className="table-wrap">
                <table className="compare-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>BinPaste</th>
                            <th>Typical pastebin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {COMPARISON.map(([feature, us, them]) => (
                            <tr key={feature}>
                                <td>{feature}</td>
                                <td>{us}</td>
                                <td>{them}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2>Why developers choose BinPaste</h2>
            <p>
                BinPaste is built for quick, no-friction sharing. Paste your code or text, pick a
                memorable link (or generate a random one), choose whether it should expire, and share.
                There&apos;s no sign-up wall and no clutter — just your content with clean syntax
                highlighting.
            </p>

            <p className="content-links">
                <Link to="/">Create a paste now</Link> · <Link to="/guides">Read the guides</Link>
            </p>
        </article>
    );
}

export default PastebinAlternative;
