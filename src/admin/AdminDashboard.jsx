import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const StatCard = ({ icon, label, value, color }) => (
  <div className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${color}`}>
      {icon}
    </div>
    <p className="text-3xl font-bold text-gray-900">{value ?? '—'}</p>
    <p className="text-gray-500 text-sm font-medium mt-1">{label}</p>
  </div>
);

const AdminDashboard = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      const [members, events, media, press] = await Promise.all([
        supabase.from('members').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('media').select('id', { count: 'exact', head: true }),
        supabase.from('press_releases').select('id', { count: 'exact', head: true }),
      ]);
      setCounts({
        members: members.count,
        events: events.count,
        media: media.count,
        press: press.count,
      });
      setLoading(false);
    };
    fetchCounts();
  }, []);

  const stats = [
    { icon: '👥', label: 'Total Members', value: counts.members, color: 'bg-blue-50' },
    { icon: '📅', label: 'Events', value: counts.events, color: 'bg-green-50' },
    { icon: '🖼️', label: 'Gallery Images', value: counts.media, color: 'bg-purple-50' },
    { icon: '📰', label: 'Press Releases', value: counts.press, color: 'bg-amber-50' },
  ];

  const quickLinks = [
    { href: '/admin/members', label: 'Add New Member', emoji: '➕' },
    { href: '/admin/events', label: 'Add New Event', emoji: '📅' },
    { href: '/admin/media', label: 'Upload Media', emoji: '📷' },
    { href: '/admin/content', label: 'Edit Site Content', emoji: '✏️' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back — here's an overview of your site content.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} value={loading ? '…' : s.value} />
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {quickLinks.map(({ href, label, emoji }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all group"
            >
              <span className="text-2xl">{emoji}</span>
              <span className="font-medium text-gray-700 group-hover:text-primary-700 text-sm">{label}</span>
              <span className="ml-auto text-gray-300 group-hover:text-primary-400">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
