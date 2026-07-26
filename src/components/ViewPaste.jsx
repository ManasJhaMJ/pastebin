// src/components/ViewPaste.js
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ref, get, remove } from 'firebase/database';
import { logEvent } from 'firebase/analytics';
import { db, analytics } from '../firebase';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaRegCopy, FaDownload, FaFileAlt } from "react-icons/fa";
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

function ViewPaste() {
    const { slug } = useParams();
    const location = useLocation();
    const [paste, setPaste] = useState('');
    const [language, setLanguage] = useState('plaintext');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [copySuccess, setCopySuccess] = useState('');
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
                    logEvent(analytics, 'paste_view', {
                        slug,
                        language: data.language || 'plaintext',
                    });
                } else {
                    logEvent(analytics, 'paste_not_found', { slug });
                    setError('Paste not found / deleted.');
                }
            } catch (err) {
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
                        {copySuccess && <span className="copy-success">{copySuccess}</span>}
                    </div>
                    <SyntaxHighlighter
                        style={atomDark}
                        language={language}
                        PreTag="div"
                        wrapLines={true}
                        showLineNumbers={true}
                    >
                        {paste}
                    </SyntaxHighlighter>
                </div>
            )}
        </div>
    );
}

export default ViewPaste;
