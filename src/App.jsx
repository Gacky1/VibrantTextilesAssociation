import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Public pages
import Home from './pages/Home';
import AboutTextile from './pages/AboutTextile';
import Events from './pages/Events';
import MembersPage from './pages/MembersPage';
import SkillDevelopment from './pages/SkillDevelopment';
import Membership from './pages/Membership';
import { Media, Research, Contact } from './pages/OtherPages';
import TextileExplorer from './pages/TextileExplorer';
import TextileDetail from './pages/TextileDetail';

// Admin
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminMembers from './admin/AdminMembers';
import AdminEvents from './admin/AdminEvents';
import AdminMedia from './admin/AdminMedia';
import AdminPress from './admin/AdminPress';
import AdminContent from './admin/AdminContent';
import AdminApplications from './admin/AdminApplications';
import AdminSkillDevelopment from './admin/AdminSkillDevelopment';
import AdminResearch from './admin/AdminResearch';
import ProtectedRoute from './admin/ProtectedRoute';
import SmoothScroll from './components/SmoothScroll';
import { PortalProvider } from './context/PortalContext';

function App() {
  return (
    <PortalProvider>
      <Router>
        <SmoothScroll>
          <ScrollToTop />
          <Routes>
        {/* ── Public Routes ── */}
        <Route path="/" element={<Home />} />
        <Route path="/about-textile" element={<AboutTextile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/skill-development" element={<SkillDevelopment />} />
        <Route path="/media" element={<Media />} />
        <Route path="/research" element={<Research />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/textile-explorer" element={<TextileExplorer />} />
        <Route path="/textile-explorer/:slug" element={<TextileDetail />} />

        {/* ── Admin Routes ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="press" element={<AdminPress />} />
          <Route path="skill-dev" element={<AdminSkillDevelopment />} />
          <Route path="research" element={<AdminResearch />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="content" element={<AdminContent />} />
        </Route>
        </Routes>
      </SmoothScroll>
      </Router>
    </PortalProvider>
  );
}

export default App;
