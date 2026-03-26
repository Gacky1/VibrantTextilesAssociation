import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const sections = [
  {
    key: 'hero',
    label: '🚀 Hero Section',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow Text', placeholder: 'e.g. Empowering India\'s Textile Industry' },
      { key: 'headline_line1', label: 'Headline Line 1', placeholder: 'e.g. Weaving the Future of' },
      { key: 'headline_line2', label: 'Headline Line 2', placeholder: 'e.g. Indian Textiles' },
      { key: 'subtitle', label: 'Subtitle', placeholder: 'Short description under the headline', textarea: true },
      { key: 'stat1_value', label: 'Stat 1 – Value', placeholder: 'e.g. 7,500+' },
      { key: 'stat1_label', label: 'Stat 1 – Label', placeholder: 'e.g. Members' },
      { key: 'stat2_value', label: 'Stat 2 – Value', placeholder: 'e.g. 28+' },
      { key: 'stat2_label', label: 'Stat 2 – Label', placeholder: 'e.g. States' },
      { key: 'stat3_value', label: 'Stat 3 – Value', placeholder: 'e.g. 25+' },
      { key: 'stat3_label', label: 'Stat 3 – Label', placeholder: 'e.g. Years' },
      { key: 'stat4_value', label: 'Stat 4 – Value', placeholder: 'e.g. ₹2.4T' },
      { key: 'stat4_label', label: 'Stat 4 – Label', placeholder: 'e.g. Industry Value' },
    ],
  },
  {
    key: 'about',
    label: '🏛️ About Section',
    fields: [
      { key: 'badge', label: 'Badge Text', placeholder: 'e.g. Who We Are' },
      { key: 'heading', label: 'Heading', placeholder: 'e.g. Empowering India\'s Textile Ecosystem' },
      { key: 'paragraph1', label: 'Paragraph 1', textarea: true },
      { key: 'paragraph2', label: 'Paragraph 2', textarea: true },
    ],
  },
  {
    key: 'contact',
    label: '📞 Contact Info',
    fields: [
      { key: 'address', label: 'Address', textarea: true },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'hours', label: 'Working Hours', placeholder: 'e.g. Mon–Fri: 9AM–6PM' },
    ],
  },
  {
    key: 'members',
    label: '👥 Members Page Info',
    fields: [
      { key: 'page_eyebrow', label: 'Page Eyebrow', placeholder: 'e.g. Our Leadership' },
      { key: 'page_title', label: 'Page Title', placeholder: 'e.g. Our Members' },
      { key: 'page_subtitle', label: 'Page Subtitle', placeholder: 'e.g. Meet the dedicated team...' },
      { key: 'board_badge', label: 'Board Badge Text', placeholder: 'e.g. BOARD OF DIRECTORS' },
      { key: 'board_heading', label: 'Board Heading', placeholder: 'e.g. Leadership Team' },
      { key: 'exec_badge', label: 'Executive Badge Text', placeholder: 'e.g. EXECUTIVE TEAM' },
      { key: 'exec_heading', label: 'Executive Heading', placeholder: 'e.g. Department Heads' },
    ],
  },
];

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('site_content').select('*');
    const mapped = {};
    (data || []).forEach(row => {
      if (!mapped[row.section]) mapped[row.section] = {};
      mapped[row.section][row.key] = row.value;
    });
    setContent(mapped);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleChange = (section, key, value) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [key]: value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const section = activeTab;
    const sectionData = content[section] || {};
    const upserts = Object.entries(sectionData).map(([key, value]) => ({
      section, key, value, updated_at: new Date().toISOString(),
    }));
    await supabase.from('site_content').upsert(upserts, { onConflict: 'section,key' });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const currentSection = sections.find(s => s.key === activeTab);
  const inp = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all bg-white';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Content</h1>
          <p className="text-gray-500 text-sm mt-0.5">Edit text content displayed on the website</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60'
          }`}
        >
          {saved ? '✓ Saved!' : saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Tab sidebar */}
        <div className="flex-shrink-0 w-48 space-y-1">
          {sections.map(s => (
            <button
              key={s.key}
              onClick={() => setActiveTab(s.key)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === s.key
                  ? 'bg-primary-50 text-primary-700 border border-primary-100'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="font-bold text-gray-800 text-base mb-4">{currentSection?.label}</h2>
          {currentSection?.fields.map(field => (
            <div key={field.key}>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}</label>
              {field.textarea ? (
                <textarea
                  rows="3"
                  value={content[activeTab]?.[field.key] || ''}
                  onChange={e => handleChange(activeTab, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={`${inp} resize-none`}
                />
              ) : (
                <input
                  type="text"
                  value={content[activeTab]?.[field.key] || ''}
                  onChange={e => handleChange(activeTab, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={inp}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
