import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PasteForm from './components/PasteForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HowToUse from './components/HowToUse';
import WhyBinPaste from './components/WhyBinPaste';
import RouteTracker from './components/RouteTracker';
import SiteAds from './components/ads/SiteAds';
import AdSlot from './components/ads/AdSlot';

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
const Privacy = lazy(() => import('./pages/Privacy'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function Home() {
  return (
    <>
      <PasteForm />
      <HowToUse />
      <WhyBinPaste />
    </>
  );
}

// Editorial / policy pages share one placement: a banner above the article and
// a native widget below it. Feed and paste pages place their own slots.
// eslint-disable-next-line react/prop-types -- plain JS project, no PropTypes in use
function WithAds({ children }) {
  return (
    <>
      <AdSlot type="banner" className="ad-slot-page-top" />
      {children}
      <AdSlot type="native" lazy className="ad-slot-page-bottom" />
    </>
  );
}

function App() {
  return (
    <Router>
      <RouteTracker />
      <SiteAds />
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/find" element={<FindPaste />} />
              <Route path="/public" element={<PublicPastes />} />
              <Route path="/pastebin-alternative" element={<WithAds><PastebinAlternative /></WithAds>} />
              <Route path="/guides" element={<WithAds><Guides /></WithAds>} />
              <Route path="/guides/:guideSlug" element={<WithAds><Guide /></WithAds>} />
              <Route path="/terms" element={<WithAds><Terms /></WithAds>} />
              <Route path="/privacy" element={<WithAds><Privacy /></WithAds>} />
              <Route path="/about" element={<WithAds><About /></WithAds>} />
              <Route path="/contact" element={<WithAds><Contact /></WithAds>} />
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
