import { MasterAdminRoute } from '../auth/RoleRoutes';
const ProtectedRoute = ({ children }) => <MasterAdminRoute>{children}</MasterAdminRoute>;
export default ProtectedRoute;
