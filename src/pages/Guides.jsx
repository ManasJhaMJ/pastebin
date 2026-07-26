// src/pages/Guides.js
import { Link } from 'react-router-dom';
import { GUIDES } from './guidesData';

function Guides() {
    return (
        <section className="content-section">
            <h1>BinPaste guides</h1>
            <p className="lead">
                Tips and how-tos for sharing code, text, logs, and snippets online - free and without
                an account.
            </p>
            <ul className="guide-index">
                {GUIDES.map((g) => (
                    <li key={g.slug}>
                        <Link to={`/guides/${g.slug}`}>{g.title}</Link>
                        <p>{g.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Guides;
