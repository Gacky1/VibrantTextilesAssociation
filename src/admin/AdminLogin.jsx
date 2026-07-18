import { Navigate } from 'react-router-dom';

export default function AdminLogin() {
  return <Navigate to="/account/login?as=admin" replace />;
}
