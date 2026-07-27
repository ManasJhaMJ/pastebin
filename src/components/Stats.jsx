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
    // NOTE: "pastes created" is intentionally hidden for now — showing total
    // views instead. To restore it, add the totalPastes stat block back.
    if (!stats || stats.totalViews === 0) {
        return null;
    }

    return (
        <section className="stats-bar" aria-label="BinPaste usage stats">
            <div className="stat">
                <span className="stat-num">{stats.totalViews.toLocaleString()}</span>
                <span className="stat-label">pastes viewed</span>
            </div>
        </section>
    );
}

export default Stats;
