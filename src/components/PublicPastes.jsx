// src/components/PublicPastes.js
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function PublicPastes() {
    const [pastes, setPastes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const pastesRef = ref(db, 'pastes');
        const unsubscribe = onValue(pastesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const publicPastes = Object.entries(data)
                    .filter(([key, value]) => value.isPublic)
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
                            <button onClick={() => navigate(`/${paste.slug}`)}>View</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PublicPastes;