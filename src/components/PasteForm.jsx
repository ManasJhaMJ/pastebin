// src/components/PasteForm.js
import { useState, useRef, useEffect } from 'react';
import { ref, set, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { MdCreate } from "react-icons/md";
import { GiInfo } from "react-icons/gi";
import { FaDice } from "react-icons/fa";

// Expiry options in milliseconds (null = never expires).
const EXPIRY_OPTIONS = [
    { label: 'Never', value: 'never' },
    { label: '10 minutes', value: String(10 * 60 * 1000) },
    { label: '1 hour', value: String(60 * 60 * 1000) },
    { label: '1 day', value: String(24 * 60 * 60 * 1000) },
    { label: '1 week', value: String(7 * 24 * 60 * 60 * 1000) },
    { label: '1 month', value: String(30 * 24 * 60 * 60 * 1000) },
];

// Characters used for auto-generated slugs (letters only, per request).
const SLUG_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Maximum paste size (characters). Keeps documents small and Firebase happy.
const MAX_CHARS = 400000;

function randomSlug() {
    // 8-10 characters.
    const length = 8 + Math.floor(Math.random() * 3);
    let out = '';
    const values = new Uint32Array(length);
    (crypto.getRandomValues ? crypto : { getRandomValues: (a) => a.map(() => Math.floor(Math.random() * 4294967296)) })
        .getRandomValues(values);
    for (let i = 0; i < length; i++) {
        out += SLUG_CHARS[values[i] % SLUG_CHARS.length];
    }
    return out;
}

function PasteForm() {
    const [slug, setSlug] = useState('');
    const [text, setText] = useState('');
    const [language, setLanguage] = useState('plaintext');
    const [isPublic, setIsPublic] = useState(false); // New state for public option
    const [expiry, setExpiry] = useState('never');
    const [error, setError] = useState('');
    const [generating, setGenerating] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const textareaRef = useRef(null);
    const navigate = useNavigate();

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [text]);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    // Generate a unique random slug that isn't already taken.
    const handleGenerateSlug = async () => {
        setGenerating(true);
        setError('');
        try {
            for (let attempt = 0; attempt < 8; attempt++) {
                const candidate = randomSlug();
                const snapshot = await get(ref(db, `pastes/${candidate}`));
                if (!snapshot.exists()) {
                    setSlug(candidate);
                    setGenerating(false);
                    return;
                }
            }
            setError('Could not generate a free name. Please try again.');
        } catch {
            setError('Could not generate a name. Please try again.');
        } finally {
            setGenerating(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (text.length > MAX_CHARS) {
            setError(`Paste is too large (${text.length.toLocaleString()} / ${MAX_CHARS.toLocaleString()} characters). Please shorten it.`);
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const slugRef = ref(db, `pastes/${slug}`);
            const snapshot = await get(slugRef);
            if (snapshot.exists()) {
                setError('Slug already taken. Please choose another one.');
                setSubmitting(false);
                return;
            }

            const createdAt = Date.now();
            const expiresAt = expiry === 'never' ? null : createdAt + Number(expiry);

            // Save the paste with public visibility status and optional expiry.
            await set(slugRef, { text, language, isPublic, createdAt, expiresAt });

            const createdSlug = slug;

            // Copy the shareable link to the clipboard (best-effort).
            try {
                await navigator.clipboard.writeText(`${window.location.origin}/${createdSlug}`);
            } catch {
                // Clipboard may be unavailable; the redirect still works.
            }

            // Reset the form and redirect to the newly created paste.
            setSlug('');
            setText('');
            setLanguage('plaintext');
            setIsPublic(false);
            setExpiry('never');
            navigate(`/${createdSlug}`, { state: { justCreated: true } });
        } catch {
            setError('Could not create the paste. Please try again.');
            setSubmitting(false);
        }
    };

    const handleSlugChange = (e) => {
        const newSlug = e.target.value.replace(/[^A-Za-z0-9_-]/g, '');
        setSlug(newSlug);
    };

    return (
        <section id='form-area'>
            <form className='paste-form' onSubmit={handleSubmit}>
                <h1>New Paste</h1>
                <textarea
                    ref={textareaRef}
                    placeholder="Enter your text here"
                    value={text}
                    onChange={handleTextChange}
                    style={{
                        minHeight: '400px',
                        resize: 'none',
                        overflow: 'hidden',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                    required
                />
                <div className={`paste-stats${text.length > MAX_CHARS ? ' over-limit' : ''}`}>
                    <span>{text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters</span>
                    <span>{text ? text.split('\n').length.toLocaleString() : 0} lines</span>
                </div>
                <div className="slug-row">
                    <label htmlFor="input">Paste Name : </label>
                    <input
                        id="input"
                        type="text"
                        placeholder="Enter a unique name"
                        value={slug}
                        onChange={handleSlugChange}
                        required
                    />
                    <button
                        type="button"
                        className="generate-btn"
                        onClick={handleGenerateSlug}
                        disabled={generating}
                        title="Generate a random unused name"
                    >
                        <FaDice size={16} />
                        {generating ? 'Generating…' : 'Random'}
                    </button>
                </div>
                <p>This paste name will be used for the paste link!</p>
                <label htmlFor="language">Code or Text : </label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                >
                    <option value="plaintext">Plain Text</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                </select>
                <br />
                <label htmlFor="expiry">Expires after : </label>
                <select
                    id="expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                >
                    {EXPIRY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <br />
                <label className="public-toggle">
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={() => setIsPublic(!isPublic)}
                    />
                    Make Public
                </label>

                <br />

                {error && <p style={{ color: 'red' }} className="error">{error}</p>}
                <button type="submit" disabled={submitting}>
                    <MdCreate size={18} />
                    {submitting ? 'Creating…' : 'Create Paste'}
                </button>
            </form>

            <span className='note'>
                <GiInfo size={20} />
                <p>
                    A paste can&apos;t be edited once created. If you set an expiry, it stops being
                    accessible after that time. Want a paste removed sooner? Email{' '}
                    <a href="mailto:work4manasjha@gmail.com">work4manasjha@gmail.com</a> with the
                    paste link and we&apos;ll delete it.
                </p>
            </span>
        </section>
    );
}

export default PasteForm;
