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
import Marketplace from './pages/Marketplace';
import MarketplaceProduct from './pages/MarketplaceProduct';
import MarketplaceSupplier from './pages/MarketplaceSupplier';
import { AccountHome, AccountLogin, AccountStatus, BuyerVerification, MemberHome, Unauthorized } from './pages/AccountPages';
import { IndustryMemberRoute, RoleProtectedRoute, UserRoute } from './auth/RoleRoutes';
import AdminMarketplace from './admin/AdminMarketplace';
import AdminAccountRegistry from './admin/AdminAccountRegistry';
import AdminTextiles from './admin/AdminTextiles';
import { MemberEnquiries, MemberProducts, MemberProfile, MemberQuotations, MemberVerification } from './pages/MemberPortalPages';
import { BuyerEnquiries, BuyerQuotations, BuyerSavedProducts, NewBuyerEnquiry } from './pages/BuyerMarketplacePages';

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
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/products/:slug" element={<MarketplaceProduct />} />
        <Route path="/marketplace/suppliers/:slug" element={<MarketplaceSupplier />} />
        <Route path="/account/login" element={<AccountLogin />} />
        <Route path="/account/status" element={<AccountStatus />} />
        <Route path="/account/verification" element={<RoleProtectedRoute roles={['user']}><BuyerVerification /></RoleProtectedRoute>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/account" element={<UserRoute><AccountHome /></UserRoute>} />
        <Route path="/account/enquiries" element={<UserRoute><BuyerEnquiries /></UserRoute>} />
        <Route path="/account/enquiries/new" element={<UserRoute><NewBuyerEnquiry /></UserRoute>} />
        <Route path="/account/quotations" element={<UserRoute><BuyerQuotations /></UserRoute>} />
        <Route path="/account/saved" element={<UserRoute><BuyerSavedProducts /></UserRoute>} />
        <Route path="/member" element={<IndustryMemberRoute><MemberHome /></IndustryMemberRoute>} />
        <Route path="/member/products" element={<IndustryMemberRoute><MemberProducts /></IndustryMemberRoute>} />
        <Route path="/member/enquiries" element={<IndustryMemberRoute><MemberEnquiries /></IndustryMemberRoute>} />
        <Route path="/member/quotations" element={<IndustryMemberRoute><MemberQuotations /></IndustryMemberRoute>} />
        <Route path="/member/profile" element={<IndustryMemberRoute><MemberProfile /></IndustryMemberRoute>} />
        <Route path="/member/verification" element={<IndustryMemberRoute><MemberVerification /></IndustryMemberRoute>} />

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
          <Route path="marketplace" element={<AdminMarketplace />} />
          <Route path="textiles" element={<AdminTextiles />} />
          <Route path="members" element={<AdminAccountRegistry />} />
          <Route path="council-members" element={<AdminMembers />} />
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
