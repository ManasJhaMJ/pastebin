// One-time migration: builds `publicIndex/` from the existing `pastes/` node.
//
// /public reads only publicIndex, so pastes created before that node existed
// would vanish from the list until this runs. Run it once after deploying:
//
//   node scripts/backfill-public-index.mjs
//
// It needs to list all of pastes/, so run it BEFORE tightening the read rule
// on that node. Safe to re-run: it rewrites the same cards.
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, update } from 'firebase/database';

dotenv.config();

// Must match PREVIEW_CHARS in PasteForm.jsx / PublicPastes.jsx.
const PREVIEW_CHARS = 150;

const app = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    appId: process.env.APP_ID,
});
const db = getDatabase(app);

const snapshot = await get(ref(db, 'pastes'));
const pastes = snapshot.val() || {};

const now = Date.now();
const updates = {};
let skipped = 0;

for (const [slug, paste] of Object.entries(pastes)) {
    if (!paste?.isPublic) { skipped += 1; continue; }
    // Already-expired pastes are left out; they would never be rendered.
    if (paste.expiresAt && paste.expiresAt <= now) { skipped += 1; continue; }

    updates[`publicIndex/${slug}`] = {
        preview: (paste.text || '').slice(0, PREVIEW_CHARS),
        language: paste.language || 'plaintext',
        createdAt: paste.createdAt || 0,
        expiresAt: paste.expiresAt ?? null,
    };
}

const count = Object.keys(updates).length;
if (count) await update(ref(db), updates);

console.log(`Indexed ${count} public paste(s); skipped ${skipped} private/expired.`);
process.exit(0);
