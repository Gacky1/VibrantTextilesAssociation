import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import logoRect from '../assets/LogoRectTransparent.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faBuilding, faGlobe, faTag, faPlus } from '@fortawesome/free-solid-svg-icons';

const links = [['Overview', '/member'], ['Products', '/member/products'], ['Enquiries', '/member/enquiries'], ['Quotations', '/member/quotations'], ['Company profile', '/member/profile']];
const listFields = ['product_categories', 'materials', 'techniques', 'certifications', 'manufacturing_capabilities'];
const acceptedLogoTypes = ['image/jpeg', 'image/png', 'image/webp'];

const organizationTypeOptions = [
  'Manufacturer / Weaver',
  'Exporter & Wholesaler',
  'Handloom Artisan Co-operative',
  'Textile Mill',
  'Fabric Converter & Processor',
  'Design House & Trader',
  'Government Textile Body',
  'Other'
];

const indianStates = [
  'Uttar Pradesh',
  'Gujarat',
  'Tamil Nadu',
  'Maharashtra',
  'Rajasthan',
  'West Bengal',
  'Karnataka',
  'Telangana',
  'Punjab',
  'Madhya Pradesh',
  'Bihar',
  'Assam',
  'Odisha',
  'Haryana',
  'Kerala'
];

const presetChips = {
  materials: ['Banarasi Silk', 'Katan Silk', 'Cotton', 'Khadi', 'Zari', 'Linen', 'Dupion Silk', 'Organza', 'Mulberry Silk', 'Chanderi'],
  techniques: ['Handloom Weaving', 'Jacquard Brocade', 'Block Printing', 'Tie & Dye (Bandhani)', 'Embroidery', 'Screen Printing', 'Kantha Work'],
  certifications: ['Silk Mark', 'Handloom Mark', 'GI Tagged', 'ISO 9001', 'OEKO-TEX', 'GOTS Certified', 'Fair Trade Certified'],
  manufacturing_capabilities: ['Custom Weaving', 'Bulk Manufacturing', 'Sample Development', 'Export Quality Packaging', 'Private Labeling', 'Dyeing & Finishing']
};

function MemberShell({ children }) {
  const auth = useAuth();
  return (
    <main data-lenis-prevent className="min-h-screen bg-slate-50 text-slate-900 bg-textile-linen">
      <header className="border-b bg-slate-950 border-slate-900 text-white">
        <div className="section-container flex flex-wrap items-center justify-between gap-4 py-4">
          <Link to="/marketplace" className="flex items-center gap-3">
            <img src={logoRect} alt="VTA Logo" className="h-8 w-auto object-contain" />
            <span className="font-black text-base tracking-tight uppercase">
              VTA <span className="text-primary-400">Partner Portal</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-5 text-xs font-black uppercase tracking-wider">
            {links.map(([label, to]) => (
              <Link key={to} to={to} className="text-slate-300 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </nav>
          <button 
            type="button" 
            onClick={auth.signOut} 
            className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white transition-all"
          >
            Sign out
          </button>
        </div>
      </header>
      
      <section className="section-container py-12">
        {children}
      </section>
    </main>
  );
}

function normalizeUrl(value, label) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return '';
  try {
    const parsed = new URL(trimmed);
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error();
    return parsed.href;
  } catch {
    throw new Error(`${label} must be a complete http:// or https:// URL.`);
  }
}

export default function MemberCompanyProfile() {
  const auth = useAuth();
  const [form, setForm] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth.memberProfile) return;
    const next = { ...auth.memberProfile };
    listFields.forEach((key) => { next[key] = (next[key] || []).join(', '); });
    setForm(next);
  }, [auth.memberProfile]);

  useEffect(() => {
    if (!logoFile) { setLogoPreview(''); return undefined; }
    const objectUrl = URL.createObjectURL(logoFile);
    setLogoPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [logoFile]);

  const completion = useMemo(() => {
    if (!form) return 0;
    const keys = ['organization_name', 'short_description', 'business_email', 'business_phone', 'address_line_1', 'city', 'state', 'postal_code', 'materials', 'techniques', 'logo_url'];
    const completed = keys.filter((key) => (key === 'logo_url' && logoFile) || String(form[key] || '').trim()).length;
    return Math.round((completed / keys.length) * 100);
  }, [form, logoFile]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const toggleChip = (key, item) => {
    const currentList = String(form[key] || '').split(',').map(s => s.trim()).filter(Boolean);
    let nextList;
    if (currentList.includes(item)) {
      nextList = currentList.filter(s => s !== item);
    } else {
      nextList = [...currentList, item];
    }
    update(key, nextList.join(', '));
  };

  const chooseLogo = (event) => {
    const file = event.target.files?.[0] || null;
    setError('');
    if (!file) { setLogoFile(null); return; }
    if (!acceptedLogoTypes.includes(file.type)) { setError('Logo must be a JPG, PNG, or WebP image.'); event.target.value = ''; return; }
    if (file.size > 5 * 1024 * 1024) { setError('Logo image must be 5 MB or smaller.'); event.target.value = ''; return; }
    setLogoFile(file);
  };

  const uploadLogo = async () => {
    if (!logoFile) return normalizeUrl(form.logo_url, 'Logo URL');
    const extension = logoFile.name.split('.').pop()?.toLowerCase() || 'jpg';
    const path = `${auth.user.id}/branding/logo-${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from('member-branding').upload(path, logoFile, { contentType: logoFile.type, upsert: false });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('member-branding').getPublicUrl(path);
    return data.publicUrl;
  };

  const save = async (event) => {
    event.preventDefault();
    setSaving(true); setError(''); setMessage('');
    try {
      const logoUrl = await uploadLogo();
      const payload = {
        organization_name: form.organization_name.trim(),
        organization_type: form.organization_type || null,
        short_description: form.short_description || null,
        full_description: form.full_description || null,
        logo_url: logoUrl || null,
        website: normalizeUrl(form.website, 'Website'),
        business_email: form.business_email || null,
        business_phone: form.business_phone || null,
        alternate_phone: form.alternate_phone || null,
        address_line_1: form.address_line_1 || null,
        address_line_2: form.address_line_2 || null,
        city: form.city || null,
        district: form.district || null,
        state: form.state || null,
        postal_code: form.postal_code || null,
        country: form.country || 'India',
        year_established: form.year_established ? Number(form.year_established) : null,
        profile_completion: completion,
      };
      listFields.forEach((key) => { payload[key] = String(form[key] || '').split(',').map((item) => item.trim()).filter(Boolean); });
      const { error: updateError } = await supabase.from('industry_members').update(payload).eq('id', auth.memberProfile.id);
      if (updateError) throw updateError;
      setLogoFile(null);
      setMessage('Company profile saved successfully! Your logo and website are now updated on your public supplier page.');
      await auth.refreshProfile();
    } catch (saveError) { setError(saveError.message || 'Unable to save the company profile.'); }
    finally { setSaving(false); }
  };

  if (!form) return <MemberShell><p className="p-10 text-center text-slate-500">Loading company profile…</p></MemberShell>;
  const displayedLogo = logoPreview || form.logo_url;
  const inputStyle = "mt-1 w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-600 transition-all";

  return (
    <MemberShell>
      <div className="mb-10 relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm">
        <div className="absolute inset-1 border border-dashed border-slate-150 pointer-events-none rounded-[20px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Company Profile</h1>
            <p className="mt-2 text-sm font-medium text-slate-500 max-w-xl leading-relaxed">Manage your organization details, logo, certifications, and capabilities visible on the B2B directory.</p>
          </div>

          <div className="w-full md:w-72 space-y-2 shrink-0">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Profile Completion</span>
              <span>{completion}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden border">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  completion >= 80 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                  completion >= 50 ? 'bg-gradient-to-r from-amber-500 to-indigo-600' :
                  'bg-gradient-to-r from-rose-500 to-amber-500'
                }`} 
                style={{ width: `${completion}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {error && <p className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-xs font-bold text-red-700">{error}</p>}
      {message && <p className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-700">{message}</p>}

      <form onSubmit={save} className="grid gap-6 rounded-3xl border border-slate-200/80 bg-white p-7 md:p-8 shadow-sm sm:grid-cols-2 relative overflow-hidden">
        <div className="absolute inset-1 border border-dashed border-slate-100 pointer-events-none rounded-[22px]" />

        {/* Company Logo Section */}
        <section className="sm:col-span-2 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 relative z-10 space-y-4">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">Company Logo & Branding</h2>
          <p className="text-xs text-slate-500">Upload a high-res logo (JPG, PNG, WebP up to 5 MB) or specify a public image URL.</p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center pt-2">
            <div className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-white text-4xl font-black text-slate-400 shadow-sm">
              {displayedLogo ? <img src={displayedLogo} alt="Company logo preview" className="h-full w-full object-contain p-2" /> : (form.organization_name?.[0] || 'V')}
            </div>
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                Upload Logo File
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseLogo} className={`${inputStyle} normal-case`} />
              </label>
              <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                Or Public Logo URL
                <input type="url" placeholder="https://yourdomain.com/logo.png" value={form.logo_url || ''} onChange={(event) => update('logo_url', event.target.value)} className={`${inputStyle} normal-case`} />
              </label>
            </div>
          </div>
        </section>

        {/* Basic Details */}
        <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          Organization Name *
          <input required type="text" value={form.organization_name || ''} onChange={(event) => update('organization_name', event.target.value)} className={inputStyle} placeholder="e.g. Banarasi Weavers Association" />
        </label>

        {/* Preset Dropdown: Organization Type */}
        <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          Organization Type
          <select value={form.organization_type || ''} onChange={(event) => update('organization_type', event.target.value)} className={inputStyle}>
            <option value="">Select Organization Type</option>
            {organizationTypeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>

        <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          Business Email
          <input type="email" value={form.business_email || ''} onChange={(event) => update('business_email', event.target.value)} className={inputStyle} placeholder="sales@yourcompany.com" />
        </label>

        <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          Business Phone
          <input type="tel" value={form.business_phone || ''} onChange={(event) => update('business_phone', event.target.value)} className={inputStyle} placeholder="+91 98765 43210" />
        </label>

        <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          Website Link
          <input type="url" placeholder="https://yourcompany.com (leave blank if none)" value={form.website || ''} onChange={(event) => update('website', event.target.value)} className={inputStyle} />
        </label>

        <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          Year Established
          <input type="number" placeholder="e.g. 1994" value={form.year_established || ''} onChange={(event) => update('year_established', event.target.value)} className={inputStyle} />
        </label>

        {/* Address */}
        <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          Address Line 1
          <input type="text" value={form.address_line_1 || ''} onChange={(event) => update('address_line_1', event.target.value)} className={inputStyle} placeholder="Factory / Office Street Address" />
        </label>

        <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          City
          <input type="text" value={form.city || ''} onChange={(event) => update('city', event.target.value)} className={inputStyle} placeholder="Varanasi" />
        </label>

        {/* Preset Dropdown: State */}
        <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          State
          <select value={indianStates.includes(form.state) ? form.state : 'custom'} onChange={(event) => {
            if (event.target.value !== 'custom') update('state', event.target.value);
          }} className={inputStyle}>
            <option value="">Select State</option>
            {indianStates.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
            <option value="custom">Other / International</option>
          </select>
          {!indianStates.includes(form.state) && (
            <input type="text" value={form.state || ''} onChange={(event) => update('state', event.target.value)} className={`${inputStyle} mt-2`} placeholder="Specify custom state" />
          )}
        </label>

        <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          Postal Code
          <input type="text" value={form.postal_code || ''} onChange={(event) => update('postal_code', event.target.value)} className={inputStyle} placeholder="221001" />
        </label>

        <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          Country
          <input type="text" value={form.country || 'India'} onChange={(event) => update('country', event.target.value)} className={inputStyle} />
        </label>

        {/* Interactive Preset Chips Sections */}
        {Object.entries(presetChips).map(([key, presets]) => {
          const label = key.replaceAll('_', ' ');
          const currentList = String(form[key] || '').split(',').map(s => s.trim()).filter(Boolean);

          return (
            <div key={key} className="sm:col-span-2 rounded-2xl border border-slate-200/80 bg-slate-50/30 p-5 space-y-3 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-black uppercase text-slate-700 tracking-wider">{label}</span>
                <span className="text-[10px] text-slate-400 font-medium">Click chips to toggle or edit text below</span>
              </div>

              {/* Preset Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {presets.map(chip => {
                  const selected = currentList.includes(chip);
                  return (
                    <button
                      type="button"
                      key={chip}
                      onClick={() => toggleChip(key, chip)}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all border ${
                        selected 
                          ? 'bg-primary-700 text-white border-primary-700 shadow-sm' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {selected && <FontAwesomeIcon icon={faCheckCircle} className="text-[10px]" />}
                      {chip}
                    </button>
                  );
                })}
              </div>

              {/* Editable Comma Separated Text Input */}
              <input 
                type="text" 
                value={form[key] || ''} 
                onChange={(event) => update(key, event.target.value)} 
                className={inputStyle} 
                placeholder="Comma-separated values..." 
              />
            </div>
          );
        })}

        <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          Short Description
          <textarea rows="3" value={form.short_description || ''} onChange={(event) => update('short_description', event.target.value)} className={inputStyle} placeholder="Summary statement displayed on supplier search directory..." />
        </label>

        <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
          Full Company Description
          <textarea rows="6" value={form.full_description || ''} onChange={(event) => update('full_description', event.target.value)} className={inputStyle} placeholder="Detailed overview of heritage, weaving machinery, export capacity, and client portfolio..." />
        </label>

        <div className="sm:col-span-2 flex justify-end gap-3 border-t border-slate-100 pt-6 relative z-10">
          <button disabled={saving} className="btn-primary text-xs font-black uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? 'Saving…' : 'Save Profile'}
          </button>
        </div>
      </form>
    </MemberShell>
  );
}
