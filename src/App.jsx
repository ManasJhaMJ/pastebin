import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PasteForm from './components/PasteForm';
import ViewPaste from './components/ViewPaste';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FindPaste from './pages/FindPaste';
import HowToUse from './components/HowToUse';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PasteForm />} />
        <Route path="/:slug" element={<ViewPaste />} />
        <Route path="/find" element={<FindPaste />} />
      </Routes>
      <HowToUse />
      <Footer />
    </Router>
  );
}

export default App;
