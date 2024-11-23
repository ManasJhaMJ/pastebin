// src/components/PublicPastes.js
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function PublicPastes() {
    const [pastes, setPastes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const pastesRef = ref(db, 'pastes');
        const unsubscribe = onValue(pastesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const publicPastes = Object.entries(data)
                    .filter(([key, value]) => value.isPublic)
                    .map(([key, value]) => ({ slug: key, ...value }));
                setPastes(publicPastes);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className='public'>
            <h1>Public Pastes</h1>
            <div className="pastes-grid">
                {pastes.map((paste) => (
                    <div key={paste.slug} className="paste-card">
                        <h3>{paste.slug}</h3>
                        <p>{paste.text.substring(0, 150)}...</p>
                        <button onClick={() => navigate(`/${paste.slug}`)}>View</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PublicPastes;