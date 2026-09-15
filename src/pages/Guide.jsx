// src/pages/Guide.js
// Renders one long-form guide: metadata from guidesData.js, body from
// guideContent.js (which pulls one file per guide out of src/pages/guides/).
import { useParams, Link } from 'react-router-dom';
import { getGuide, getRelatedGuides } from './guidesData';
import { GUIDE_SECTIONS } from './guideContent';

const SITE = 'https://www.binpaste.xyz';

// One shared illustration at the top of every guide. Swap the file to change it
// everywhere; it is in public/ so it is served as-is and cached.
const HERO = '/guide-hero.svg';
const HERO_ALT =
    'Illustration of a code snippet being turned into a short shareable binpaste.xyz link and opened on a phone';

function formatDate(iso) {
    // Parse as a plain date so the rendered day never shifts by timezone.
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
}

// Minimal inline markup for guide text, so article prose can carry links
// without every string turning into an array of React nodes:
//   [label](/path)  -> internal <Link>, or <a target="_blank"> for http(s)
//   `text`          -> <code>
//   **text**        -> <strong>
// Deliberately not Markdown: three constructs are all the prose needs, and a
// parser dependency would land in this route's chunk.
const INLINE = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;

function inline(text) {
    if (typeof text !== 'string') return text;
    const out = [];
    let last = 0;
    let match;
    let k = 0;
    INLINE.lastIndex = 0;
    while ((match = INLINE.exec(text)) !== null) {
        if (match.index > last) out.push(text.slice(last, match.index));
        const [, linkText, href, code, bold] = match;
        if (href) {
            out.push(
                href.startsWith('/') ? (
                    <Link to={href} key={k++}>
                        {linkText}
                    </Link>
                ) : (
                    <a href={href} target="_blank" rel="noopener noreferrer" key={k++}>
                        {linkText}
                    </a>
                )
            );
        } else if (code) {
            out.push(<code key={k++}>{code}</code>);
        } else {
            out.push(<strong key={k++}>{bold}</strong>);
        }
        last = match.index + match[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out.length === 1 ? out[0] : out;
}

// A plain render function rather than a component: the block shapes are defined
// in the guide data files, so there is nothing useful for prop validation to check.
function renderBlock(block, key) {
    if (block.p) return <p key={key}>{inline(block.p)}</p>;
    if (block.h3) return <h3 key={key}>{inline(block.h3)}</h3>;
    if (block.note) return <p className="guide-note" key={key}>{inline(block.note)}</p>;
    if (block.code) {
        return (
            <div className="guide-code-wrap" key={key}>
                {block.code.lang && <span className="guide-code-lang">{block.code.lang}</span>}
                <pre className="guide-code">
                    <code>{block.code.text}</code>
                </pre>
            </div>
        );
    }
    if (block.ul) {
        return (
            <ul className="guide-list" key={key}>
                {block.ul.map((item, i) => (
                    <li key={i}>{inline(item)}</li>
                ))}
            </ul>
        );
    }
    if (block.ol) {
        return (
            <ol className="guide-list" key={key}>
                {block.ol.map((item, i) => (
                    <li key={i}>{inline(item)}</li>
                ))}
            </ol>
        );
    }
    if (block.table) {
        const { caption, headers, rows } = block.table;
        return (
            // The wrapper scrolls horizontally instead of the whole page when a
            // wide comparison table meets a narrow phone.
            <div className="guide-table-wrap" key={key}>
                <table className="guide-table">
                    {caption && <caption>{inline(caption)}</caption>}
                    <thead>
                        <tr>
                            {headers.map((h, i) => (
                                <th scope="col" key={i}>
                                    {inline(h)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr key={i}>
                                {row.map((cell, j) =>
                                    // First cell of each row labels the row.
                                    j === 0 ? (
                                        <th scope="row" key={j}>
                                            {inline(cell)}
                                        </th>
                                    ) : (
                                        <td key={j}>{inline(cell)}</td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    if (block.cta) {
        return (
            <div className="guide-cta" key={key}>
                <p>{inline(block.cta.text)}</p>
                <Link className="guide-cta-btn" to={block.cta.to || '/'}>
                    {block.cta.label}
                </Link>
            </div>
        );
    }
    return null;
}

// Article structured data, so search engines see a dated, authored article
// rather than an untyped page.
function articleSchema(guide) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        image: `${SITE}${HERO}`,
        author: { '@type': 'Person', name: guide.author },
        publisher: {
            '@type': 'Organization',
            name: 'BinPaste',
            logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
        },
        datePublished: guide.published,
        dateModified: guide.updated,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE}/guides/${guide.slug}`,
        },
    };
}

function Guide() {
    const { guideSlug } = useParams();
    const guide = getGuide(guideSlug);
    const sections = GUIDE_SECTIONS[guideSlug];

    if (!guide || !sections) {
        return (
            <section className="content-section">
                <h1>Guide not found</h1>
                <p>
                    That guide doesn&apos;t exist. <Link to="/guides">Browse all guides</Link>.
                </p>
            </section>
        );
    }

    const related = getRelatedGuides(guide.slug);

    return (
        <article className="content-section">
            <script type="application/ld+json">{JSON.stringify(articleSchema(guide))}</script>

            <p className="breadcrumb">
                <Link to="/guides">← All guides</Link>
            </p>
            <h1>{guide.title}</h1>
            <p className="guide-byline">
                By {guide.author} · Published {formatDate(guide.published)}
                {guide.updated !== guide.published && <> · Updated {formatDate(guide.updated)}</>}
                {guide.readingTime && <> · {guide.readingTime}</>}
            </p>

            {/* Width and height are set so the text below does not jump once the
                illustration loads. */}
            <img
                className="guide-hero"
                src={HERO}
                alt={HERO_ALT}
                width="1200"
                height="500"
                decoding="async"
            />

            {sections.map((section, i) => (
                <section key={i}>
                    {section.h2 && <h2>{section.h2}</h2>}
                    {section.blocks.map((block, j) => renderBlock(block, j))}
                </section>
            ))}

            {related.length > 0 && (
                <>
                    <h2>Keep reading</h2>
                    <div className="blog-grid">
                        {related.map((g) => (
                            <Link className="blog-card" to={`/guides/${g.slug}`} key={g.slug}>
                                <h3>{g.title}</h3>
                                <p>{g.description}</p>
                                <span className="blog-read">Read guide →</span>
                            </Link>
                        ))}
                    </div>
                </>
            )}

            <p className="content-links">
                <Link to="/">Create a paste now</Link> ·{' '}
                <Link to="/pastebin-alternative">Why BinPaste</Link> ·{' '}
                <Link to="/guides">All guides</Link>
            </p>
        </article>
    );
}

export default Guide;
