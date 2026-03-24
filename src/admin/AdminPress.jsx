import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const empty = { title: '', date: '', category: 'Press Release' };

const AdminPress = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('press_releases').select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (form.id) {
      await supabase.from('press_releases').update(form).eq('id', form.id);
    } else {
      await supabase.from('press_releases').insert(form);
    }
    setSaving(false);
    setModal(false);
    fetch();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this press release?')) return;
    await supabase.from('press_releases').delete().eq('id', id);
    fetch();
  };

  const inp = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Press & News</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage press releases and news items</p>
        </div>
        <button onClick={() => { setForm(empty); setModal(true); }} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm">
          + Add Article
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-4xl mb-3">📰</p>
            <p className="font-medium">No press releases yet</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Title</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Date</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Category</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{item.title}</td>
                  <td className="px-5 py-3.5 text-gray-600">{item.date}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">{item.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => { setForm(item); setModal(true); }} className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors">Delete</button>
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{form.id ? 'Edit Article' : 'Add Article'}</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. VTA launches new skill program" className={inp} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Date *</label>
                  <input required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="15 Jan 2025" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inp}>
                    {['Press Release', 'News', 'Announcement', 'Blog'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-primary-600 rounded-xl text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60">
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPress;
