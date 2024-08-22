import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PasteForm from './components/PasteForm';
import ViewPaste from './components/ViewPaste';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PasteForm />} />
        <Route path="/:slug" element={<ViewPaste />} />
      </Routes>
    </Router>
  );
}

export default App;
