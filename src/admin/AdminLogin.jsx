import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-700 rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary-900">
              <span className="text-white text-xl font-black">VT</span>
            </div>
            <h1 className="text-white text-2xl font-bold">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-1">Vibrant Textiles CMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary-900/40 hover:shadow-primary-900/60 disabled:opacity-60 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs mt-6">
            Create an admin account in Supabase → Authentication → Users
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
