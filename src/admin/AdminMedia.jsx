import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

const AdminMedia = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: '', image_url: '', category: 'Gallery' });
  const [imgFile, setImgFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setForm({ title: '', image_url: '', category: 'Gallery' }); setImgFile(null); setModal(true); };

  const handleFileUpload = async (files) => {
    if (!files?.length) return;
    setUploading(true);
    for (const file of files) {
      const ext = file.name.split('.').pop();
      const path = `media/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from('cms-images').upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from('cms-images').getPublicUrl(path);
        await supabase.from('media').insert({ title: file.name.replace(/\.[^.]+$/, ''), image_url: data.publicUrl, category: 'Gallery' });
      }
    }
    setUploading(false);
    fetch();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    let image_url = form.image_url;
    if (imgFile) {
      const ext = imgFile.name.split('.').pop();
      const path = `media/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('cms-images').upload(path, imgFile);
      if (!error) {
        const { data } = supabase.storage.from('cms-images').getPublicUrl(path);
        image_url = data.publicUrl;
      }
    }
    if (form.id) {
      await supabase.from('media').update({ ...form, image_url }).eq('id', form.id);
    } else {
      await supabase.from('media').insert({ ...form, image_url });
    }
    setSaving(false);
    setModal(false);
    fetch();
  };

  const handleDelete = async (item) => {
    if (!confirm('Delete this image?')) return;
    await supabase.from('media').delete().eq('id', item.id);
    fetch();
  };

  const inp = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Gallery</h1>
          <p className="text-gray-500 text-sm mt-0.5">Upload and manage site images</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => fileRef.current.click()}
            disabled={uploading}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            {uploading ? 'Uploading…' : '⬆ Quick Upload'}
          </button>
          <button onClick={openAdd} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm">
            + Add Image
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFileUpload(e.target.files)} />
      </div>

      {/* Drag-drop zone */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFileUpload(e.dataTransfer.files); }}
        className="mb-6 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer"
        onClick={() => fileRef.current.click()}
      >
        <p className="text-3xl mb-2">🖼️</p>
        <p className="text-gray-600 font-medium text-sm">Drag & drop images here, or click to upload</p>
        <p className="text-gray-400 text-xs mt-1">Supports JPG, PNG, WebP</p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-400 py-12">No images yet — upload one above!</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => { setForm(item); setImgFile(null); setModal(true); }}
                  className="w-7 h-7 bg-white rounded-lg shadow text-xs hover:bg-blue-50 transition-colors"
                >✏️</button>
                <button
                  onClick={() => handleDelete(item)}
                  className="w-7 h-7 bg-white rounded-lg shadow text-xs hover:bg-red-50 transition-colors"
                >🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{form.id ? 'Edit Image' : 'Add Image'}</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Handloom Workshop 2024" className={inp} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
                <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Gallery, Events" className={inp} />
              </div>
              {form.image_url && <img src={form.image_url} className="w-full h-32 object-cover rounded-xl" alt="preview" />}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Upload New Image</label>
                <input type="file" accept="image/*" onChange={e => setImgFile(e.target.files[0])} className="text-sm text-gray-600" />
                <p className="text-xs text-gray-400 mb-1 mt-2">Or paste image URL:</p>
                <input value={form.image_url || ''} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." className={inp} />
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

export default AdminMedia;
