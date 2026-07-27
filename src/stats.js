// Global, lifetime counters stored in Firebase Realtime DB under `stats/`.
// These persist even after individual pastes are deleted or expire, so they
// reflect all-time activity, not just currently-stored pastes.
import { ref, runTransaction, get } from 'firebase/database';
import { db } from './firebase';

// Atomically increment a stats counter. Best-effort: never throws so it can't
// break paste creation or viewing.
function bump(name) {
    return runTransaction(ref(db, `stats/${name}`), (current) => (current || 0) + 1)
        .catch(() => { });
}

export function incrementTotalPastes() {
    return bump('totalPastes');
}

export function incrementTotalViews() {
    return bump('totalViews');
}

// Read the current global stats. Returns { totalPastes, totalViews }.
export async function getStats() {
    try {
        const snapshot = await get(ref(db, 'stats'));
        const data = snapshot.val() || {};
        return {
            totalPastes: data.totalPastes || 0,
            totalViews: data.totalViews || 0,
        };
    } catch {
        return { totalPastes: 0, totalViews: 0 };
    }
}
