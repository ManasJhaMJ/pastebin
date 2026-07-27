// src/components/Stats.js
// Shows lifetime global counters (all-time pastes created & viewed) to users.
import { useEffect, useState } from 'react';
import { getStats } from '../stats';

function Stats() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        let cancelled = false;
        getStats().then((s) => {
            if (!cancelled) setStats(s);
        });
        return () => { cancelled = true; };
    }, []);

    // Don't render anything until we have a real number to show.
    if (!stats || stats.totalPastes === 0) {
        return null;
    }

    return (
        <section className="stats-bar" aria-label="BinPaste usage stats">
            <div className="stat">
                <span className="stat-num">{stats.totalPastes.toLocaleString()}</span>
                <span className="stat-label">pastes created</span>
            </div>
        </section>
    );
}

export default Stats;
