import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const links = [['Overview', '/member'], ['Products', '/member/products'], ['Enquiries', '/member/enquiries'], ['Quotations', '/member/quotations'], ['Company profile', '/member/profile']];
const listFields = ['product_categories', 'materials', 'techniques', 'certifications', 'manufacturing_capabilities'];
const acceptedLogoTypes = ['image/jpeg', 'image/png', 'image/webp'];

function MemberShell({ children }) {
  const auth = useAuth();
  return <main data-lenis-prevent className="min-h-screen bg-slate-50">
    <header className="border-b bg-slate-950 text-white">
      <div className="section-container flex flex-wrap items-center justify-between gap-4 py-5">
        <Link to="/member" className="font-black">VTA <span className="text-primary-400">Partner Portal</span></Link>
        <nav className="flex flex-wrap gap-4 text-sm">{links.map(([label, to]) => <Link key={to} to={to} className="font-bold text-slate-300 hover:text-white">{label}</Link>)}</nav>
        <button type="button" onClick={auth.signOut} className="text-sm font-bold text-slate-300">Sign out</button>
      </div>
    </header>
    <section className="section-container py-10">{children}</section>
  </main>;
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
        organization_name: form.organization_name.trim(), organization_type: form.organization_type || null,
        short_description: form.short_description || null, full_description: form.full_description || null,
        logo_url: logoUrl || null, website: normalizeUrl(form.website, 'Website'),
        business_email: form.business_email || null, business_phone: form.business_phone || null,
        alternate_phone: form.alternate_phone || null, address_line_1: form.address_line_1 || null,
        address_line_2: form.address_line_2 || null, city: form.city || null, district: form.district || null,
        state: form.state || null, postal_code: form.postal_code || null, country: form.country || 'India',
        year_established: form.year_established ? Number(form.year_established) : null, profile_completion: completion,
      };
      listFields.forEach((key) => { payload[key] = String(form[key] || '').split(',').map((item) => item.trim()).filter(Boolean); });
      const { error: updateError } = await supabase.from('industry_members').update(payload).eq('id', auth.memberProfile.id);
      if (updateError) throw updateError;
      setLogoFile(null);
      setMessage('Company profile saved. Your logo and website are now available on the public supplier profile.');
      await auth.refreshProfile();
    } catch (saveError) { setError(saveError.message || 'Unable to save the company profile.'); }
    finally { setSaving(false); }
  };

  if (!form) return <MemberShell><p className="p-10 text-center text-slate-500">Loading company profile…</p></MemberShell>;
  const displayedLogo = logoPreview || form.logo_url;

  return <MemberShell>
    <h1 className="text-3xl font-black">Company profile</h1>
    <p className="mt-2 text-slate-500">Manage the company information buyers see on your public supplier page.</p>
    <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-emerald-500" style={{ width: `${completion}%` }} /></div>
    <p className="mt-2 text-sm font-bold text-slate-600">{completion}% profile completion · Verification: {auth.memberVerificationStatus}</p>
    {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
    {message && <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-emerald-700">{message}</p>}

    <form onSubmit={save} className="mt-6 grid gap-5 rounded-3xl border bg-white p-6 sm:grid-cols-2">
      <section className="sm:col-span-2 rounded-2xl border bg-slate-50 p-5">
        <h2 className="text-lg font-black">Company logo</h2>
        <p className="mt-1 text-sm text-slate-600">Upload a JPG, PNG, or WebP logo (maximum 5 MB), or provide a public image URL.</p>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-2xl border bg-white text-3xl font-black text-slate-400">
            {displayedLogo ? <img src={displayedLogo} alt="Company logo preview" className="h-full w-full object-contain p-2" /> : (form.organization_name?.[0] || 'V')}
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold uppercase text-slate-500">Upload logo<input type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseLogo} className="mt-1 block w-full rounded-xl border bg-white p-2.5 text-sm normal-case" /></label>
            <label className="text-xs font-bold uppercase text-slate-500">Or logo image URL<input type="url" placeholder="https://example.com/logo.png" value={form.logo_url || ''} onChange={(event) => update('logo_url', event.target.value)} className="mt-1 w-full rounded-xl border bg-white p-3 text-sm normal-case" /></label>
          </div>
        </div>
      </section>

      {[['Organization name', 'organization_name'], ['Organization type', 'organization_type'], ['Business email', 'business_email'], ['Business phone', 'business_phone'], ['Alternate phone', 'alternate_phone'], ['Website', 'website'], ['Address', 'address_line_1'], ['Address line 2', 'address_line_2'], ['City', 'city'], ['District', 'district'], ['State', 'state'], ['Postal code', 'postal_code'], ['Country', 'country'], ['Year established', 'year_established'], ['Product categories', 'product_categories'], ['Materials', 'materials'], ['Techniques', 'techniques'], ['Certifications', 'certifications'], ['Manufacturing capabilities', 'manufacturing_capabilities']].map(([label, key]) => <label key={key} className="text-xs font-bold uppercase text-slate-500">{label}<input required={key === 'organization_name'} type={key === 'website' ? 'url' : key === 'year_established' ? 'number' : 'text'} placeholder={key === 'website' ? 'https://yourcompany.com' : listFields.includes(key) ? 'Comma-separated values' : ''} value={form[key] || ''} onChange={(event) => update(key, event.target.value)} className="mt-1 w-full rounded-xl border p-3 text-sm normal-case" /></label>)}
      <label className="text-xs font-bold uppercase text-slate-500 sm:col-span-2">Short description<textarea rows="3" value={form.short_description || ''} onChange={(event) => update('short_description', event.target.value)} className="mt-1 w-full rounded-xl border p-3 text-sm normal-case" /></label>
      <label className="text-xs font-bold uppercase text-slate-500 sm:col-span-2">Full company description<textarea rows="6" value={form.full_description || ''} onChange={(event) => update('full_description', event.target.value)} className="mt-1 w-full rounded-xl border p-3 text-sm normal-case" /></label>
      <div className="sm:col-span-2 flex justify-end"><button disabled={saving} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving…' : 'Save profile'}</button></div>
    </form>
  </MemberShell>;
}
