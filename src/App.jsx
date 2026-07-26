import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PasteForm from './components/PasteForm';
import ViewPaste from './components/ViewPaste';
import RawPaste from './components/RawPaste';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FindPaste from './pages/FindPaste';
import HowToUse from './components/HowToUse';
import WhyBinPaste from './components/WhyBinPaste';
import PublicPastes from './components/PublicPastes';
import PastebinAlternative from './pages/PastebinAlternative';
import Guides from './pages/Guides';
import Guide from './pages/Guide';
import Terms from './pages/Terms';
import RouteTracker from './components/RouteTracker';

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
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
