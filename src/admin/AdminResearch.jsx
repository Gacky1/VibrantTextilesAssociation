import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const emptyArea = { title: '', desc: '', projects: '', tag: '', icon: 'faFlask' };
const emptyPub = { title: '', year: new Date().getFullYear().toString(), type: 'Research Paper', category: 'General' };

const AdminResearch = () => {
  const [areas, setAreas] = useState([]);
  const [pubs, setPubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('areas'); // 'areas' or 'publications'
  
  const [modal, setModal] = useState(null); // 'area' or 'pub'
  const [areaForm, setAreaForm] = useState(emptyArea);
  const [pubForm, setPubForm] = useState(emptyPub);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const { data: a } = await supabase.from('research_areas').select('*').order('title');
    const { data: p } = await supabase.from('research_publications').select('*').order('year', { ascending: false });
    setAreas(a || []);
    setPubs(p || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openAddArea = () => { setAreaForm(emptyArea); setModal('area'); };
  const openEditArea = (a) => { setAreaForm(a); setModal('area'); };
  const openAddPub = () => { setPubForm(emptyPub); setModal('pub'); };
  const openEditPub = (p) => { setPubForm(p); setModal('pub'); };

  const handleSaveArea = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (areaForm.id) {
      await supabase.from('research_areas').update(areaForm).eq('id', areaForm.id);
    } else {
      await supabase.from('research_areas').insert(areaForm);
    }
    setSaving(false);
    setModal(null);
    fetch();
  };

  const handleSavePub = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (pubForm.id) {
      await supabase.from('research_publications').update(pubForm).eq('id', pubForm.id);
    } else {
      await supabase.from('research_publications').insert(pubForm);
    }
    setSaving(false);
    setModal(null);
    fetch();
  };

  const handleDelete = async (table, id) => {
    if (!confirm('Delete this entry?')) return;
    await supabase.from(table).delete().eq('id', id);
    fetch();
  };

  const inp = 'w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Research Registry</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage inquiry areas and scholarly publications</p>
        </div>
        <button 
          onClick={activeTab === 'areas' ? openAddArea : openAddPub} 
          className="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 shadow-sm"
        >
          + Add {activeTab === 'areas' ? 'Inquiry Node' : 'Publication'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button onClick={() => setActiveTab('areas')} className={`px-6 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'areas' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>Research Nodes</button>
        <button onClick={() => setActiveTab('publications')} className={`px-6 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'publications' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>Digital library</button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden text-sm">
        {loading ? (
          <div className="p-16 text-center text-gray-400 italic font-medium">Synchronizing knowledge nodes…</div>
        ) : activeTab === 'areas' ? (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <tr>
                <th className="text-left px-8 py-4">Title</th>
                <th className="text-left px-8 py-4">Tag</th>
                <th className="text-left px-8 py-4">Projects</th>
                <th className="px-8 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {areas.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-8 py-5 font-bold text-gray-900">{a.title}</td>
                  <td className="px-8 py-5"><span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-[10px] font-black uppercase tracking-widest">{a.tag}</span></td>
                  <td className="px-8 py-5 text-gray-500 font-mono">{a.projects}</td>
                  <td className="px-8 py-5 text-right space-x-3">
                    <button onClick={() => openEditArea(a)} className="text-primary-600 font-bold hover:underline uppercase text-[10px] tracking-widest">Edit</button>
                    <button onClick={() => handleDelete('research_areas', a.id)} className="text-red-400 font-bold hover:underline uppercase text-[10px] tracking-widest">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <tr>
                <th className="text-left px-8 py-4">Publication Title</th>
                <th className="text-left px-8 py-4">Year</th>
                <th className="text-left px-8 py-4">Type</th>
                <th className="px-8 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pubs.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-8 py-5 font-bold text-gray-900">{p.title}</td>
                  <td className="px-8 py-5 text-gray-500 font-mono">{p.year}</td>
                  <td className="px-8 py-5 text-gray-400">{p.type}</td>
                  <td className="px-8 py-5 text-right space-x-3">
                    <button onClick={() => openEditPub(p)} className="text-primary-600 font-bold hover:underline uppercase text-[10px] tracking-widest">Edit</button>
                    <button onClick={() => handleDelete('research_publications', p.id)} className="text-red-400 font-bold hover:underline uppercase text-[10px] tracking-widest">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Area Modal */}
      {modal === 'area' && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg p-10 space-y-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{areaForm.id ? 'Modify Inquiry Node' : 'Initialize Node'}</h2>
            <form onSubmit={handleSaveArea} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Subject Title *</label>
                <input required value={areaForm.title} onChange={e => setAreaForm({ ...areaForm, title: e.target.value })} className={inp} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Registry Tag *</label>
                  <input required value={areaForm.tag} onChange={e => setAreaForm({ ...areaForm, tag: e.target.value })} placeholder="e.g. Innovation" className={inp} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Project Count</label>
                  <input value={areaForm.projects} onChange={e => setAreaForm({ ...areaForm, projects: e.target.value })} placeholder="e.g. 15+" className={inp} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Abstract / Description</label>
                <textarea rows="3" value={areaForm.desc} onChange={e => setAreaForm({ ...areaForm, desc: e.target.value })} className={`${inp} resize-none italic`} />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setModal(null)} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 rounded-2xl border border-gray-100">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-4 bg-primary-600 text-[10px] font-black uppercase tracking-widest text-white rounded-2xl hover:bg-primary-700 shadow-xl shadow-primary-500/20">
                  {saving ? 'Synchronizing…' : 'Establish Node'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pub Modal */}
      {modal === 'pub' && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg p-10 space-y-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{pubForm.id ? 'Update Publication' : 'Log scholarship'}</h2>
            <form onSubmit={handleSavePub} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Publication Title *</label>
                <input required value={pubForm.title} onChange={e => setPubForm({ ...pubForm, title: e.target.value })} className={inp} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Scholarly Year *</label>
                  <input required value={pubForm.year} onChange={e => setPubForm({ ...pubForm, year: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Publication Type *</label>
                  <select value={pubForm.type} onChange={e => setPubForm({ ...pubForm, type: e.target.value })} className={inp}>
                    {['Research Paper', 'Whitepaper', 'Case Study', 'Policy Proposal', 'Economic Brief'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setModal(null)} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 rounded-2xl border border-gray-100">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-4 bg-primary-600 text-[10px] font-black uppercase tracking-widest text-white rounded-2xl hover:bg-primary-700 shadow-xl shadow-primary-500/20">
                  {saving ? 'Recording…' : 'Publish Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResearch;
