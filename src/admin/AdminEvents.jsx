import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const empty = { title: '', date: '', location: '', type: 'Exhibition', image_url: '', description: '', highlights: '', is_upcoming: true };

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setForm(empty); setModal(true); };
  const openEdit = (e) => { setForm({ ...e, highlights: (e.highlights || []).join('\n') }); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      highlights: form.highlights.split('\n').map(s => s.trim()).filter(Boolean),
    };
    if (form.id) {
      await supabase.from('events').update(payload).eq('id', form.id);
    } else {
      await supabase.from('events').insert(payload);
    }
    setSaving(false);
    setModal(false);
    fetch();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    fetch();
  };

  const inp = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage upcoming and past events</p>
        </div>
        <button onClick={openAdd} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm">
          + Add Event
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading…</div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-4xl mb-3">📅</p>
            <p className="font-medium">No events yet</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Title</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Date</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Location</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Type</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Status</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {events.map(ev => (
                <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{ev.title}</td>
                  <td className="px-5 py-3.5 text-gray-600">{ev.date}</td>
                  <td className="px-5 py-3.5 text-gray-600">{ev.location}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">{ev.type}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${ev.is_upcoming ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {ev.is_upcoming ? 'Upcoming' : 'Past'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(ev)} className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Edit</button>
                      <button onClick={() => handleDelete(ev.id)} className="px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{form.id ? 'Edit Event' : 'Add Event'}</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Event Title *</label>
                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. National Textile Expo 2025" className={inp} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Date *</label>
                  <input required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="15-18 March 2025" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Type *</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inp}>
                    {['Exhibition', 'Fair', 'Conference', 'Workshop', 'Summit'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Location *</label>
                <input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Pragati Maidan, New Delhi" className={inp} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Image URL</label>
                <input value={form.image_url || ''} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." className={inp} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                <textarea rows="3" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} className={`${inp} resize-none`} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Highlights (one per line)</label>
                <textarea rows="4" value={form.highlights || ''} onChange={e => setForm({ ...form, highlights: e.target.value })} placeholder={"500+ Exhibitors\nInternational Buyers\nLive Demos"} className={`${inp} resize-none`} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="upcoming" checked={form.is_upcoming} onChange={e => setForm({ ...form, is_upcoming: e.target.checked })} className="w-4 h-4 accent-primary-600" />
                <label htmlFor="upcoming" className="text-sm text-gray-700 font-medium">Mark as Upcoming</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-primary-600 rounded-xl text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60 transition-colors">
                  {saving ? 'Saving…' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
