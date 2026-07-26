// src/components/RawPaste.js
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, get, remove } from 'firebase/database';
import { db } from '../firebase';

// Renders a paste as plain text only - no chrome, no highlighting.
// Served at /:slug/raw so links can be shared/embedded as raw content.
function RawPaste() {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        let cancelled = false;
        const fetchPaste = async () => {
            const pasteRef = ref(db, `pastes/${slug}`);
            try {
                const snapshot = await get(pasteRef);
                if (cancelled) return;
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    if (data.expiresAt && Date.now() > data.expiresAt) {
                        remove(pasteRef).catch(() => { });
                        setContent('This paste has expired and is no longer available.');
                        setStatus('error');
                        return;
                    }
                    setContent(data.text || '');
                    setStatus('ok');
                } else {
                    setContent('Paste not found / deleted.');
                    setStatus('error');
                }
            } catch {
                if (!cancelled) {
                    setContent('Could not load paste. Please try again.');
                    setStatus('error');
                }
            }
        };
        fetchPaste();
        return () => { cancelled = true; };
    }, [slug]);

    return (
        <div className='raw-wrap'>
            <Link className='raw-back' to={`/${slug}`}>← Back to paste</Link>
            <pre className='raw-view'>{status === 'loading' ? 'Loading…' : content}</pre>
        </div>
    );
}

export default RawPaste;
