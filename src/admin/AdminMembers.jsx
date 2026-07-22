import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const empty = { 
  name: '', 
  designation: '', 
  bio: '', 
  image_url: '', 
  sort_order: 0, 
  is_active: true,
  category: 'academic' 
};

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [activeTab, setActiveTab] = useState('academic'); // 'academic', 'industry', 'stakeholder', or 'buyer'

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('members').select('*').order('sort_order');
    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { 
    setForm({ ...empty, category: activeTab }); 
    setImgFile(null); 
    setModal(true); 
  };
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
      const { error } = await supabase.from('members').update(payload).eq('id', form.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('members').insert(payload);
      if (error) alert(error.message);
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

  const filteredMembers = members.filter(m => m.category === activeTab);

  const inp = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all';

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Member Registry</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage partner classifications and buyers</p>
        </div>
        <button onClick={openAdd} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm">
          + Add New Entry
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('academic')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'academic' 
            ? 'border-primary-600 text-primary-600' 
            : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Academic Partners
        </button>
        <button
          onClick={() => setActiveTab('industry')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'industry' 
            ? 'border-primary-600 text-primary-600' 
            : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Industry Partners
        </button>
        <button
          onClick={() => setActiveTab('stakeholder')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'stakeholder' 
            ? 'border-primary-600 text-primary-600' 
            : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Stakeholders
        </button>
        <button
          onClick={() => setActiveTab('buyer')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'buyer' 
            ? 'border-primary-600 text-primary-600' 
            : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Buyers
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 font-medium">Synchronizing registry…</div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-4xl mb-3">👥</p>
            <p className="font-semibold">No entries in this segment</p>
            <p className="text-sm mt-1">Switch tabs or add a new entry to the active registry category.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 font-bold uppercase tracking-wider text-[10px] text-gray-400">
              <tr>
                <th className="text-left px-6 py-4">Identity</th>
                <th className="text-left px-6 py-4">Designation</th>
                <th className="text-left px-6 py-4">Category</th>
                <th className="text-left px-6 py-4">Order</th>
                <th className="text-left px-6 py-4">Visibility</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMembers.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {m.image_url ? (
                        <img src={m.image_url} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">
                          {m.name?.[0]}
                        </div>
                      )}
                      <span className="font-bold text-gray-900">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 italic">"{m.designation}"</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500">
                      {m.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-mono">{m.sort_order}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${m.is_active ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}`}>
                      {m.is_active ? 'Public' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(m)} className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">Modify</button>
                      <button onClick={() => handleDelete(m.id)} className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-red-500 rounded-lg transition-colors">Delete</button>
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
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{form.id ? 'Edit Entry' : 'New Entry'}</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-900 text-xl transition-colors">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Legal Identity *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className={inp} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Official Designation *</label>
                  <input required value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} placeholder="Position" className={inp} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Category Segment *</label>
                <select 
                  required 
                  value={form.category} 
                  onChange={e => setForm({ ...form, category: e.target.value })} 
                  className={inp}
                >
                  <option value="academic">Academic Partnership</option>
                  <option value="industry">Industry Partnership</option>
                  <option value="stakeholder">Stakeholder</option>
                  <option value="buyer">Buyer</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Narrative / Bio</label>
                <textarea rows="3" value={form.bio || ''} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Short professional summary…" className={`${inp} resize-none`} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Digital Portrait</label>
                <div className="flex items-center gap-4 mb-4">
                  {form.image_url && <img src={form.image_url} className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-100" alt="current" />}
                  <div className="flex-1">
                    <input type="file" accept="image/*" onChange={e => setImgFile(e.target.files[0])} className="text-xs text-gray-500 w-full" />
                    <p className="text-[10px] text-gray-300 mt-2 font-medium italic">High-res portrait recommended.</p>
                  </div>
                </div>
                <input value={form.image_url || ''} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="Or paste external URL (https://…)" className={inp} />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Sequence Order</label>
                  <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: +e.target.value })} className={inp} />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input type="checkbox" id="active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-5 h-5 accent-primary-600 rounded-lg cursor-pointer" />
                  <label htmlFor="active" className="text-xs text-gray-700 font-bold uppercase tracking-widest cursor-pointer">Live Registry</label>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-4 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-4 bg-primary-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary-700 disabled:opacity-60 transition-all shadow-lg shadow-primary-500/20">
                  {saving ? 'Synchronizing…' : (form.id ? 'Push Update' : 'Initialize Entry')}
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
