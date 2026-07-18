import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Guard({ children, roles, verified = false, verifiedBuyer = false }) {
  const auth = useAuth();
  const location = useLocation();
  if (auth.loading) return <div className="min-h-screen grid place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" /></div>;
  const loginPath = roles?.includes('master_admin')
    ? '/account/login?as=admin'
    : roles?.includes('industry_member')
      ? '/account/login?as=member'
      : '/account/login?as=buyer';
  if (!auth.user) return <Navigate to={loginPath} state={{ from: location.pathname }} replace />;
  if (auth.accountStatus !== 'active') return <Navigate to="/account/status" replace />;
  if (roles && !roles.includes(auth.role)) return <Navigate to="/unauthorized" replace />;
  if (verified && !auth.isVerifiedIndustryMember) return <Navigate to="/member/verification" replace />;
  if (verifiedBuyer && !auth.isVerifiedBuyer) return <Navigate to="/account/verification" replace />;
  return children;
}

export const ProtectedRoute = ({ children }) => <Guard>{children}</Guard>;
export const RoleProtectedRoute = ({ roles, children }) => <Guard roles={roles}>{children}</Guard>;
export const MasterAdminRoute = ({ children }) => <Guard roles={['master_admin']}>{children}</Guard>;
export const IndustryMemberRoute = ({ children }) => <Guard roles={['industry_member']}>{children}</Guard>;
export const VerifiedMemberRoute = ({ children }) => <Guard roles={['industry_member']} verified>{children}</Guard>;
export const UserRoute = ({ children }) => <Guard roles={['user']} verifiedBuyer>{children}</Guard>;
