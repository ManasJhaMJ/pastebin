// src/pages/Guide.js
import { useParams, Link } from 'react-router-dom';
import { getGuide } from './guidesData';

function Guide() {
    const { guideSlug } = useParams();
    const guide = getGuide(guideSlug);

    if (!guide) {
        return (
            <section className="content-section">
                <h1>Guide not found</h1>
                <p>
                    That guide doesn&apos;t exist. <Link to="/guides">Browse all guides</Link>.
                </p>
            </section>
        );
    }

    return (
        <article className="content-section">
            <p className="breadcrumb">
                <Link to="/guides">← All guides</Link>
            </p>
            <h1>{guide.title}</h1>
            {guide.sections.map((section, i) => (
                <div key={i}>
                    {section.h2 && <h2>{section.h2}</h2>}
                    {section.p && <p>{section.p}</p>}
                </div>
            ))}
            <p className="content-links">
                <Link to="/">Create a paste now</Link> ·{' '}
                <Link to="/pastebin-alternative">Why BinPaste</Link>
            </p>
        </article>
    );
}

export default Guide;
