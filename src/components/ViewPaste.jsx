// src/components/ViewPaste.js
import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ref, get, remove, runTransaction } from 'firebase/database';
import { logEvent } from 'firebase/analytics';
import { QRCodeSVG } from 'qrcode.react';
import { db, analytics } from '../firebase';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaRegCopy, FaDownload, FaFileAlt, FaQrcode, FaEye, FaFlag } from "react-icons/fa";
import { BiSolidError } from "react-icons/bi";

// Map language keys to sensible download file extensions.
const EXTENSIONS = {
    plaintext: 'txt',
    javascript: 'js',
    python: 'py',
    java: 'java',
    css: 'css',
    html: 'html',
    cpp: 'cpp',
    c: 'c',
};

// Format a millisecond timestamp as a readable date + time in the
// viewer's local timezone, including the timezone abbreviation.
function formatCreatedAt(ts) {
    try {
        return new Date(ts).toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
        });
    } catch {
        return '';
    }
}

function ViewPaste() {
    const { slug } = useParams();
    const location = useLocation();
    const [paste, setPaste] = useState('');
    const [language, setLanguage] = useState('plaintext');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [copySuccess, setCopySuccess] = useState('');
    const [views, setViews] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    const [showQr, setShowQr] = useState(false);
    const [showReport, setShowReport] = useState(false);
    // Set from the create flow so we can confirm the link was copied.
    const [justCreated] = useState(() => Boolean(location.state && location.state.justCreated));

    useEffect(() => {
        let cancelled = false;
        const fetchPaste = async () => {
            setLoading(true);
            setError('');
            const pasteRef = ref(db, `pastes/${slug}`);
            try {
                const snapshot = await get(pasteRef);
                if (cancelled) return;
                if (snapshot.exists()) {
                    const data = snapshot.val();

                    // Enforce expiry: if past expiresAt, treat as gone and clean up.
                    if (data.expiresAt && Date.now() > data.expiresAt) {
                        logEvent(analytics, 'paste_expired', { slug });
                        remove(pasteRef).catch(() => { });
                        setError('This paste has expired and is no longer available.');
                        return;
                    }

                    setPaste(data.text);
                    setLanguage(data.language || 'plaintext');
                    setCreatedAt(data.createdAt || null);
                    logEvent(analytics, 'paste_view', {
                        slug,
                        language: data.language || 'plaintext',
                    });

                    // Increment a persistent view counter (best-effort).
                    runTransaction(ref(db, `pastes/${slug}/views`), (current) => (current || 0) + 1)
                        .then((res) => {
                            if (!cancelled && res.committed) {
                                setViews(res.snapshot.val());
                            }
                        })
                        .catch(() => {
                            if (!cancelled) setViews((data.views || 0) + 1);
                        });
                } else {
                    logEvent(analytics, 'paste_not_found', { slug });
                    setError('Paste not found / deleted.');
                }
            } catch {
                if (!cancelled) setError('Could not load paste. Please try again.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchPaste();
        return () => { cancelled = true; };
    }, [slug]);

    const handleCopy = () => {
        navigator.clipboard.writeText(paste)
            .then(() => {
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 3000);
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
                setCopySuccess('Failed to copy');
            });
    };

    const handleDownload = () => {
        const ext = EXTENSIONS[language] || 'txt';
        const blob = new Blob([paste], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slug}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div id='viewPaste'>
            {loading ? (
                <div className='loading'>
                    <span className='spinner' />
                    <p>Loading paste...</p>
                </div>
            ) : error ? (
                <div className='error-div'>
                    <BiSolidError size={30} />
                    <p> {error}</p>
                </div>
            ) : (
                <div>
                    {justCreated && (
                        <div className='created-banner'>
                            Paste created! The shareable link has been copied to your clipboard.
                        </div>
                    )}
                    <div className='paste-actions'>
                        <button className='copy-btn' onClick={handleCopy}>
                            <FaRegCopy size={15} />
                            Copy
                        </button>
                        <button className='copy-btn' onClick={handleDownload}>
                            <FaDownload size={15} />
                            Download
                        </button>
                        <Link className='raw-link' to={`/${slug}/raw`}>
                            <FaFileAlt size={15} />
                            Raw
                        </Link>
                        <button className='copy-btn' onClick={() => setShowQr((v) => !v)}>
                            <FaQrcode size={15} />
                            QR
                        </button>
                        <button className='copy-btn report-btn' onClick={() => setShowReport((v) => !v)}>
                            <FaFlag size={13} />
                            Report
                        </button>
                        {views != null && (
                            <span className='view-count'>
                                <FaEye size={14} /> {views.toLocaleString()}
                            </span>
                        )}
                        {copySuccess && <span className="copy-success">{copySuccess}</span>}
                    </div>
                    {showReport && (
                        <div className='report-note'>
                            <FaFlag size={14} />
                            <p>
                                To report or request removal of this paste, please email{' '}
                                <a href={`mailto:work4manasjha@gmail.com?subject=${encodeURIComponent(`Report paste: ${slug}`)}&body=${encodeURIComponent(`I'd like to report the paste at ${window.location.origin}/${slug} for the following reason:\n\n`)}`}>
                                    work4manasjha@gmail.com
                                </a>{' '}
                                with the paste link. We review every request.
                            </p>
                        </div>
                    )}
                    {showQr && (
                        <div className='qr-panel'>
                            <QRCodeSVG
                                value={window.location.origin + '/' + slug}
                                size={160}
                                bgColor='#ffffff'
                                fgColor='#000000'
                                level='M'
                                includeMargin={true}
                            />
                            <p>Scan to open this paste on another device.</p>
                        </div>
                    )}
                    <SyntaxHighlighter
                        style={atomDark}
                        language={language}
                        PreTag="div"
                        wrapLines={true}
                        showLineNumbers={true}
                    >
                        {paste}
                    </SyntaxHighlighter>
                    {createdAt && (
                        <p className='paste-created'>
                            Created on {formatCreatedAt(createdAt)} (your local time)
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ViewPaste;
