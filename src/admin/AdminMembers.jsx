import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const empty = { name: '', designation: '', bio: '', image_url: '', sort_order: 0, is_active: true };

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [imgFile, setImgFile] = useState(null);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('members').select('*').order('sort_order');
    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setForm(empty); setImgFile(null); setModal(true); };
  const openEdit = (m) => { setForm(m); setImgFile(null); setModal(true); };

  const uploadImage = async () => {
    if (!imgFile) return form.image_url;
    const ext = imgFile.name.split('.').pop();
    const path = `members/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('cms-images').upload(path, imgFile);
    if (error) { alert('Image upload failed: ' + error.message); return null; }
    const { data } = supabase.storage.from('cms-images').getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const image_url = await uploadImage();
    if (image_url === null) { setSaving(false); return; }
    const payload = { ...form, image_url };
    if (form.id) {
      await supabase.from('members').update(payload).eq('id', form.id);
    } else {
      await supabase.from('members').insert(payload);
    }
    setSaving(false);
    setModal(false);
    fetch();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this member?')) return;
    await supabase.from('members').delete().eq('id', id);
    fetch();
  };

  const inp = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage leadership and board members</p>
        </div>
        <button onClick={openAdd} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm">
          + Add Member
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading…</div>
        ) : members.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-4xl mb-3">👥</p>
            <p className="font-medium">No members yet</p>
            <p className="text-sm mt-1">Click "Add Member" to get started</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Member</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Designation</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Order</th>
                <th className="text-left px-5 py-3.5 text-gray-500 font-semibold">Status</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {members.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {m.image_url ? (
                        <img src={m.image_url} alt={m.name} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">
                          {m.name?.[0]}
                        </div>
                      )}
                      <span className="font-semibold text-gray-900">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{m.designation}</td>
                  <td className="px-5 py-3.5 text-gray-500">{m.sort_order}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${m.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {m.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(m)} className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Edit</button>
                      <button onClick={() => handleDelete(m.id)} className="px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{form.id ? 'Edit Member' : 'Add Member'}</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Dr. Rajesh Kumar" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Designation *</label>
                  <input required value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} placeholder="e.g. Chairperson" className={inp} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Bio</label>
                <textarea rows="3" value={form.bio || ''} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Short biography…" className={`${inp} resize-none`} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Profile Photo</label>
                {form.image_url && <img src={form.image_url} className="w-16 h-16 rounded-full object-cover mb-2 border" alt="current" />}
                <input type="file" accept="image/*" onChange={e => setImgFile(e.target.files[0])} className="text-sm text-gray-600" />
                <p className="text-xs text-gray-400 mt-1">Or paste a URL below</p>
                <input value={form.image_url || ''} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." className={`${inp} mt-1`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Display Order</label>
                  <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: +e.target.value })} className={inp} />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input type="checkbox" id="active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 accent-primary-600" />
                  <label htmlFor="active" className="text-sm text-gray-700 font-medium">Show on site</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-primary-600 rounded-xl text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60 transition-colors">
                  {saving ? 'Saving…' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMembers;
