# BinPaste

**The better pastebin alternative.** A free, fast way to share **code snippets** and **text** online. Create a paste with a custom name, get a shareable link, and share temporary text or code with friends and teammates — no account required.

Live: https://www.binpaste.xyz/

## Features

- **Custom paste names** — pick your own slug, your paste lives at `www.binpaste.xyz/<your-name>`.
- **Syntax highlighting** — Plain Text, JavaScript, Python, Java, C, C++, HTML, CSS via [`react-syntax-highlighter`](https://github.com/react-syntax-highlighter/react-syntax-highlighter).
- **Public pastes feed** — opt-in to showcase a paste on the `/public` page (sorted newest first).
- **One-click copy** — copy the entire paste content to your clipboard.
- **No account required** — just open the site and paste.
- **Anonymous analytics** — visitor-level tracking via Firebase Analytics with per-route `page_view` and `paste_view` events.

## Tech Stack

- **React 18** + **Vite**
- **React Router v6** for client-side routing
- **Firebase Realtime Database** for storage
- **Firebase Analytics** for usage tracking
- **react-syntax-highlighter** for code rendering
- **react-icons**

## Routes

| Path        | Page                                                   |
| ----------- | ------------------------------------------------------ |
| `/`         | Create a new paste                                     |
| `/find`     | Look up a paste by name                                |
| `/public`   | Browse all public pastes (newest first)                |
| `/:slug`    | View a paste by its slug                               |

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

### Scripts

```bash
npm run dev       # start the Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project Structure

```
src/
├── App.jsx                     # Routes
├── firebase.js                 # Firebase init (db + analytics)
├── main.jsx
├── index.css
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HowToUse.jsx
│   ├── PasteForm.jsx           # New paste form (/)
│   ├── ViewPaste.jsx           # Paste viewer (/:slug)
│   ├── PublicPastes.jsx        # Public feed (/public)
│   └── RouteTracker.jsx        # Per-route analytics + meta tags
└── pages/
    └── FindPaste.jsx           # Find by slug (/find)
```

## How It Works

1. The user types text, picks a language, picks a custom slug, and optionally marks the paste public.
2. The paste is written to Firebase Realtime Database under `pastes/<slug>` with `{ text, language, isPublic, createdAt }`.
3. The paste is then accessible at `/<slug>`.
4. If `isPublic` is true, it shows up in `/public` sorted by `createdAt` (newest first).

Slugs are restricted to `A-Z`, `a-z`, `0-9`, `_`, and `-` so they're URL-safe and Firebase-key-safe.

## Deployment

The project is configured for Vercel. A `vercel.json`-style SPA redirect is handled by `public/404.html` (which redirects unknown paths back to `/` so React Router can resolve them).

## License

All rights reserved &copy; 2024 — Manas Jha
