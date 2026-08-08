// src/components/PublicPastes.js
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

function PublicPastes() {
    const [pastes, setPastes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pastesRef = ref(db, 'pastes');
        const unsubscribe = onValue(pastesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const now = Date.now();
                const publicPastes = Object.entries(data)
                    .filter(([, value]) => value.isPublic)
                    .filter(([, value]) => !value.expiresAt || value.expiresAt > now)
                    .map(([key, value]) => ({ slug: key, ...value }))
                    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                setPastes(publicPastes);
            } else {
                setPastes([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className='public'>
            <h1>Public Pastes</h1>
            {loading ? (
                <div className='loading'>
                    <span className='spinner' />
                    <p>Loading public pastes...</p>
                </div>
            ) : pastes.length === 0 ? (
                <p className='empty'>No public pastes yet. Create one and mark it public!</p>
            ) : (
                <div className="pastes-grid">
                    {pastes.map((paste) => (
                        <div key={paste.slug} className="paste-card">
                            <h3>{paste.slug}</h3>
                            <p>{paste.text.substring(0, 150)}...</p>
                            {/* A real <a href> (not navigate()) so crawlers can
                                discover and follow public paste pages. */}
                            <Link to={`/${paste.slug}`}>View</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PublicPastes;