import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/admin/members', label: 'Members', icon: '👥' },
  { to: '/admin/events', label: 'Events', icon: '📅' },
  { to: '/admin/media', label: 'Media Gallery', icon: '🖼️' },
  { to: '/admin/press', label: 'Press & News', icon: '📰' },
  { to: '/admin/content', label: 'Site Content', icon: '✏️' },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 bg-gray-900 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-gray-700">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">VT</span>
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white text-sm font-bold leading-tight">Vibrant Textiles</p>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              <span className="text-base flex-shrink-0">{icon}</span>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 text-sm transition-all"
          >
            <span>🌐</span>
            {sidebarOpen && <span>View Site</span>}
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 text-sm transition-all"
          >
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            ☰
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
