// src/pages/Guides.js
// Index of every guide, grouped under the topic headings from guidesData.js.
import { Link } from 'react-router-dom';
import { GUIDES, getGuidesByTopic } from './guidesData';

function formatDate(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    });
}

function Guides() {
    const groups = getGuidesByTopic();

    return (
        <section className="content-section">
            <h1>BinPaste guides</h1>
            <p className="lead">
                {GUIDES.length} in-depth how-tos on sharing code, text, logs, and snippets online -
                what to include, what to strip out, where each platform breaks, and which tool fits
                the job. Written by the developer of BinPaste.
            </p>

            {groups.map((group) => (
                <div key={group.topic}>
                    <h2>{group.topic}</h2>
                    <ul className="guide-index">
                        {group.guides.map((g) => (
                            <li key={g.slug}>
                                <Link to={`/guides/${g.slug}`}>{g.title}</Link>
                                <p>{g.description}</p>
                                <p className="guide-index-meta">
                                    Updated {formatDate(g.updated)}
                                    {g.readingTime && <> · {g.readingTime}</>}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <p className="content-links">
                <Link to="/">Create a paste</Link> ·{' '}
                <Link to="/pastebin-alternative">Why BinPaste</Link> · <Link to="/about">About</Link>
            </p>
        </section>
    );
}

export default Guides;
