// src/components/PasteForm.js
import { useState, useRef, useEffect } from 'react';
import { ref, set, get } from 'firebase/database';
import { db } from '../firebase';
import { MdCreate } from "react-icons/md";
import { GiInfo } from "react-icons/gi";

function PasteForm() {
    const [slug, setSlug] = useState('');
    const [text, setText] = useState('');
    const [language, setLanguage] = useState('plaintext');
    const [isPublic, setIsPublic] = useState(false); // New state for public option
    const [error, setError] = useState('');
    const textareaRef = useRef(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const slugRef = ref(db, `pastes/${slug}`);
        const snapshot = await get(slugRef);
        if (snapshot.exists()) {
            setError('Slug already taken. Please choose another one.');
            return;
        }

        // Save the paste with public visibility status
        set(slugRef, { text, language, isPublic });

        setSlug('');
        setText('');
        setLanguage('plaintext');
        setIsPublic(false); // Reset public status
        setError('');
        alert(`Paste created! Go to Find Paste and enter: ${slug}`);
    };

    const handleSlugChange = (e) => {
        const newSlug = e.target.value.replace(/\s+/g, '');
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
                <label htmlFor="input">Paste Name : </label>
                <input
                    type="text"
                    placeholder="Enter a unique name"
                    value={slug}
                    onChange={handleSlugChange}
                    required
                />
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
                <label>
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={() => setIsPublic(!isPublic)}
                    />
                    Make Public
                </label>

                <br />

                {error && <p style={{ color: 'red' }} className="error">{error}</p>}
                <button type="submit">
                    <MdCreate size={18} />
                    Create Paste
                </button>
            </form>

            <span className='note'>
                <GiInfo size={20} />
                <p>
                    The paste can not be edited once created. It will be deleted after a certain period of time.
                </p>
            </span>
        </section>
    );
}

export default PasteForm;