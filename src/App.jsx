import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PasteForm from './components/PasteForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HowToUse from './components/HowToUse';
import WhyBinPaste from './components/WhyBinPaste';
import RouteTracker from './components/RouteTracker';

// Route-level code splitting: keep heavy deps (syntax highlighter, QR, etc.)
// out of the initial homepage bundle.
const ViewPaste = lazy(() => import('./components/ViewPaste'));
const RawPaste = lazy(() => import('./components/RawPaste'));
const FindPaste = lazy(() => import('./pages/FindPaste'));
const PublicPastes = lazy(() => import('./components/PublicPastes'));
const PastebinAlternative = lazy(() => import('./pages/PastebinAlternative'));
const Guides = lazy(() => import('./pages/Guides'));
const Guide = lazy(() => import('./pages/Guide'));
const Terms = lazy(() => import('./pages/Terms'));

function Home() {
  return (
    <>
      <PasteForm />
      <HowToUse />
      <WhyBinPaste />
    </>
  );
}

function App() {
  return (
    <Router>
      <RouteTracker />
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/find" element={<FindPaste />} />
              <Route path="/public" element={<PublicPastes />} />
              <Route path="/pastebin-alternative" element={<PastebinAlternative />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/guides/:guideSlug" element={<Guide />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/:slug/raw" element={<RawPaste />} />
              <Route path="/:slug" element={<ViewPaste />} />
              <Route path="*" element={<ViewPaste />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
