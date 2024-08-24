import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FindPaste() {
    const [slug, setSlug] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSlug(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (slug.trim()) {
            navigate(`/${slug}`);
        }
    };

    return (
        <section id='findPaste'>
            <h2>Find a Paste</h2>
            <p>Enter the slug of the paste you want to find:</p>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Enter the slug/name here'
                    value={slug}
                    onChange={handleInputChange}
                />
                <button type='submit'>Find</button>
            </form>
        </section>
    );
}

export default FindPaste;
