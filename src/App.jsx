import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutTextile from './pages/AboutTextile';
import Events from './pages/Events';
import MembersPage from './pages/MembersPage';
import SkillDevelopment from './pages/SkillDevelopment';
import Membership from './pages/Membership';
import { Media, Research, Contact } from './pages/OtherPages';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-textile" element={<AboutTextile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/skill-development" element={<SkillDevelopment />} />
        <Route path="/media" element={<Media />} />
        <Route path="/research" element={<Research />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/membership" element={<Membership />} />
      </Routes>
    </Router>
  );
}

export default App;
