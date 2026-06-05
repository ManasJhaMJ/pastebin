// src/components/ViewPaste.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { logEvent } from 'firebase/analytics';
import { db, analytics } from '../firebase';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaRegCopy } from "react-icons/fa";
import { BiSolidError } from "react-icons/bi";

function ViewPaste() {
    const { slug } = useParams();
    const [paste, setPaste] = useState('');
    const [language, setLanguage] = useState('plaintext');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [copySuccess, setCopySuccess] = useState('');

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
                    <button className='copy-btn' onClick={handleCopy}>
                        <FaRegCopy size={15} />
                        Copy
                    </button>
                    {copySuccess && <span className="copy-success">{copySuccess}</span>}
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
