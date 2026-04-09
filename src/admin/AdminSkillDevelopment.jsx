import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const empty = { 
  title: '', 
  category: 'Heritage', 
  icon: 'faGraduationCap',
  duration: '', 
  level: '', 
  desc: '', 
  features: '', 
  sort_order: 0,
  is_active: true
};

const AdminSkillDevelopment = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('skill_programs').select('*').order('sort_order');
    setPrograms(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setForm(empty); setModal(true); };
  const openEdit = (p) => { 
    setForm({ 
      ...p, 
      features: Array.isArray(p.features) ? p.features.join('\n') : (p.features || '') 
    }); 
    setModal(true); 
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      ...form,
      features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
    };

    if (form.id) {
      const { error } = await supabase.from('skill_programs').update(payload).eq('id', form.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('skill_programs').insert(payload);
      if (error) alert(error.message);
    }
    
    setSaving(false);
    setModal(false);
    fetch();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this training program?')) return;
    await supabase.from('skill_programs').delete().eq('id', id);
    fetch();
  };

  const inp = 'w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skill Development</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage industrial training modules and certifications</p>
        </div>
        <button onClick={openAdd} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm">
          + Add Program
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-sm">
        {loading ? (
          <div className="p-16 text-center text-gray-400 font-medium italic">Accessing curriculum nodes…</div>
        ) : programs.length === 0 ? (
          <div className="p-16 text-center text-gray-300 space-y-4">
             <p className="text-6xl">🎓</p>
             <p className="font-bold uppercase tracking-widest text-xs">The curriculum registry is empty.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100 uppercase tracking-widest text-[10px] font-black text-gray-400">
              <tr>
                <th className="text-left px-8 py-4">Program Title</th>
                <th className="text-left px-8 py-4">Category</th>
                <th className="text-left px-8 py-4">Duration</th>
                <th className="text-left px-8 py-4">Level</th>
                <th className="text-left px-8 py-4">Status</th>
                <th className="px-8 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {programs.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5 font-bold text-gray-900">{p.title}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                       {p.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-gray-600 font-medium italic">{p.duration}</td>
                  <td className="px-8 py-5 text-gray-500">{p.level}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                      {p.is_active ? 'Live' : 'Archived'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <button onClick={() => openEdit(p)} className="text-primary-600 font-black uppercase tracking-widest text-[10px] hover:underline">Edit</button>
                    <span className="text-gray-200">|</span>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 font-black uppercase tracking-widest text-[10px] hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-10 border-b border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">{form.id ? 'Modify Curriculum' : 'Initialize Program'}</h2>
              <button onClick={() => setModal(false)} className="text-gray-300 hover:text-gray-900 text-2xl transition-all">✕</button>
            </div>
            
            <form onSubmit={handleSave} className="p-10 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Program Title *</label>
                  <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Advanced Weaving Protocol" className={inp} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">FA Icon Name</label>
                  <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="e.g. faFlask" className={inp} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Registry Category *</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inp}>
                      {['Heritage', 'Design', 'Tech', 'Management'].map(c => <option key={c}>{c}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Cycle Duration *</label>
                    <input required value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 3 Months" className={inp} />
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Expertise Level *</label>
                    <input required value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} placeholder="e.g. Professional / Master" className={inp} />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Sequence Order</label>
                    <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: +e.target.value })} className={inp} />
                 </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Abstract / Description *</label>
                <textarea rows="3" required value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Curriculum summary…" className={`${inp} resize-none italic`} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Core Features (one per line)</label>
                <textarea rows="4" value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} placeholder={"Material Science\nHandloom Precision\nDigital Integration"} className={`${inp} resize-none`} />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-5 h-5 accent-primary-600 rounded-lg" />
                <label htmlFor="active" className="text-[10px] font-black uppercase tracking-widest text-gray-700">Publish to live registry</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-4 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-4 bg-primary-600 rounded-2xl shadow-xl shadow-primary-500/20 text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary-700 disabled:opacity-60 transition-all">
                  {saving ? 'Synchronizing…' : (form.id ? 'Commit Changes' : 'Initialize Protocol')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSkillDevelopment;
