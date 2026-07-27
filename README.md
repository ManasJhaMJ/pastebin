# BinPaste

**The better pastebin alternative.** A free, fast way to share **code snippets** and **text** online. Create a paste with a custom name, get a shareable link, and share temporary text or code with friends and teammates — no account required.

🔗 **Live:** https://www.binpaste.xyz/

## Features

- **Custom paste names** — pick your own slug, your paste lives at `www.binpaste.xyz/<your-name>`.
- **Random name generator** — one click generates a unique, unused slug for you.
- **Syntax highlighting** — Plain Text, JavaScript, Python, Java, C, C++, HTML, CSS via [`react-syntax-highlighter`](https://github.com/react-syntax-highlighter/react-syntax-highlighter).
- **Expiring pastes** — optionally set a paste to expire after 10 minutes, 1 hour, 1 day, 1 week, or 1 month (default: never).
- **Public pastes feed** — opt-in to showcase a paste on the `/public` page (sorted newest first).
- **One-click copy** — copy the entire paste content to your clipboard; the share link is auto-copied on creation.
- **Download & raw view** — download a paste as a file with the right extension, or open the plain-text `/:slug/raw` view.
- **QR codes** — every paste gets a scannable QR code for quick sharing to phones.
- **Rich link previews** — shared links get paste-specific Open Graph / Twitter cards, including an auto-generated preview image.
- **Lifetime usage stats** — homepage shows all-time totals for pastes created and views.
- **No account required** — just open the site and paste.
- **Anonymous analytics** — visitor-level tracking via Firebase Analytics with per-route `page_view` and `paste_view` events.

## Tech Stack

- **React 18** + **Vite** (route-level code splitting via `React.lazy`)
- **React Router v6** for client-side routing
- **Firebase Realtime Database** for paste storage and lifetime counters
- **Firebase Analytics** for usage tracking
- **react-syntax-highlighter** for code rendering
- **qrcode.react** for QR codes
- **react-markdown** for guide/article content
- **@vercel/og** for on-the-fly Open Graph preview images
- **react-icons**

## Routes

| Path                     | Page                                                      |
| ------------------------ | --------------------------------------------------------- |
| `/`                      | Create a new paste (+ stats, how-to, why-BinPaste)        |
| `/find`                  | Look up a paste by name                                   |
| `/public`                | Browse all public pastes (newest first)                   |
| `/pastebin-alternative`  | Landing page — BinPaste as a pastebin alternative         |
| `/guides`                | Index of how-to guides                                    |
| `/guides/:guideSlug`     | An individual how-to guide                                |
| `/terms`                 | Terms of Service                                          |
| `/:slug`                 | View a paste by its slug                                  |
| `/:slug/raw`             | Raw plain-text view of a paste                            |

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with **Realtime Database** and **Analytics** enabled

### Setup

```bash
git clone https://github.com/ManasJhaMJ/pastebin.git
cd pastebin
npm install
```

Create a `.env` file at the project root:

```
FIREBASE_API_KEY=your_api_key
AUTH_DOMAIN=your_project.firebaseapp.com
DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
PROJECT_ID=your_project
STORAGE_BUCKET=your_project.appspot.com
MESSAGING_SENDER_ID=000000000000
APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxxxxxxxx
MEASUREMENT_ID=G-XXXXXXXXXX
```

> **Note:** `DATABASE_URL` must also be set in your deployment environment (e.g. Vercel project settings) — the `/api/paste-meta` serverless function reads it to build rich link previews.

### Scripts

```bash
npm run dev       # start the Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project Structure

```
api/
├── og.jsx                      # @vercel/og — generates preview images
└── paste-meta.js               # injects paste-specific OG/Twitter meta into index.html
src/
├── App.jsx                     # Routes (with lazy-loaded pages)
├── firebase.js                 # Firebase init (db + analytics)
├── stats.js                    # Lifetime paste/view counters (Firebase transactions)
├── main.jsx
├── index.css
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HowToUse.jsx
│   ├── WhyBinPaste.jsx
│   ├── Stats.jsx               # Lifetime usage stats on the homepage
│   ├── PasteForm.jsx           # New paste form (/)
│   ├── ViewPaste.jsx           # Paste viewer (/:slug) — copy, download, QR, raw
│   ├── RawPaste.jsx            # Raw plain-text view (/:slug/raw)
│   ├── PublicPastes.jsx        # Public feed (/public)
│   └── RouteTracker.jsx        # Per-route analytics + meta tags
└── pages/
    ├── FindPaste.jsx           # Find by slug (/find)
    ├── PastebinAlternative.jsx # Landing page
    ├── Guides.jsx              # Guide index (/guides)
    ├── Guide.jsx               # Single guide (/guides/:guideSlug)
    ├── guidesData.js           # Guide article content
    └── Terms.jsx               # Terms of Service
```

## How It Works

1. The user types text, picks a language, picks a custom slug (or generates a random one), optionally sets an expiry, and optionally marks the paste public.
2. The paste is written to Firebase Realtime Database under `pastes/<slug>` with `{ text, language, isPublic, createdAt, expiresAt }`, and the lifetime paste counter is bumped.
3. The paste is then accessible at `/<slug>`; viewing it bumps the lifetime view counter.
4. If `expiresAt` is set and has passed, the paste is treated as gone and cleaned up on next view.
5. If `isPublic` is true, it shows up in `/public` sorted by `createdAt` (newest first).

Slugs are restricted to `A-Z`, `a-z`, `0-9`, `_`, and `-` so they're URL-safe and Firebase-key-safe.

## Deployment

The project is configured for **Vercel**:

- `vercel.json` rewrites `/:slug` requests to the `/api/paste-meta` serverless function so shared links get rich, paste-specific previews, while known static routes (`/find`, `/public`, `/guides`, etc.) fall through to the SPA.
- It also redirects the apex domain `binpaste.xyz` to `www.binpaste.xyz`.
- `/api/og` generates Open Graph preview images on the fly with `@vercel/og`.

## License

All rights reserved &copy; 2024–2026 — Manas Jha
