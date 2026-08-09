import { useState } from 'react';
import { supabase } from '../lib/supabase';

const initial = { accountType:'industry_member', email:'', password:'', fullName:'', phone:'', companyName:'', city:'', state:'', organizationName:'', organizationType:'Manufacturer', ministryName:'', designation:'', verificationStatus:'verified' };

async function readFunctionError(error) {
  try {
    const response = error?.context;
    if (response instanceof Response) {
      const payload = await response.clone().json();
      if (payload?.error) return payload.code ? `${payload.error} (${payload.code})` : payload.error;
    }
  } catch { /* fall through to SDK message */ }
  if (error?.name === 'FunctionsFetchError') return 'Could not reach the account-creation function. Check its deployment and CORS configuration.';
  if (error?.name === 'FunctionsRelayError') return 'Supabase could not relay the Edge Function request. Check the function logs.';
  return error?.message || 'Unable to create account';
}

export default function AccountCreateModal({ onClose, onCreated, initialAccountType = 'industry_member' }) {
  const [form,setForm] = useState({ ...initial, accountType: initialAccountType }), [busy,setBusy] = useState(false), [error,setError] = useState(''), [created,setCreated] = useState(null);
  const input = 'mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-400';
  const update = (key, value) => setForm(current => ({ ...current, [key]: value }));
  const field = (label,key,type='text',required=false) => <label className="text-xs font-bold uppercase text-slate-500">{label}<input required={required || ['email','password','fullName'].includes(key)} minLength={key==='password'?8:undefined} type={type} value={form[key]} onChange={event=>update(key,event.target.value)} className={input}/></label>;
  const submit = async event => { event.preventDefault(); setBusy(true); setError(''); try { const {data,error:invokeError}=await supabase.functions.invoke('admin-create-account',{body:form}); if(invokeError)throw invokeError; if(data?.error)throw new Error(data.error); setCreated(data.user); await onCreated(); } catch(caught) { setError(await readFunctionError(caught)); } finally { setBusy(false); } };

  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4"><div data-lenis-prevent className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
    <div className="sticky top-0 z-10 flex justify-between border-b bg-white p-6"><div><p className="text-xs font-bold uppercase tracking-widest text-primary-600">Master Admin operation</p><h2 className="text-2xl font-black">Create account</h2></div><button onClick={onClose} className="text-2xl">×</button></div>
    {created ? <div className="p-8 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-2xl text-emerald-700">✓</div><h3 className="mt-4 text-xl font-black">Account created</h3><p className="mt-2 text-slate-500">{created.email} can now use the appropriate sign-in portal.</p><button onClick={onClose} className="mt-6 rounded-xl bg-primary-600 px-6 py-3 font-bold text-white">Done</button></div>
      : <form onSubmit={submit} className="grid gap-4 p-6 sm:grid-cols-2">
        <label className="text-xs font-bold uppercase text-slate-500">Account type<select value={form.accountType} onChange={event=>update('accountType',event.target.value)} className={input}><option value="industry_member">Industry Partner</option><option value="buyer">Buyer</option><option value="state_stakeholder">Government Stakeholder</option></select></label>
        {form.accountType !== 'state_stakeholder' && <label className="text-xs font-bold uppercase text-slate-500">Verification<select value={form.verificationStatus} onChange={event=>update('verificationStatus',event.target.value)} className={input}><option value="verified">Verified</option><option value="under_review">Under review</option><option value="pending">Pending</option></select></label>}
        {field('Full name *','fullName')}{field('Email *','email','email')}{field('Temporary password *','password','password')}{field('Phone','phone')}
        {form.accountType === 'industry_member' ? <>{field('Organization name *','organizationName','text',true)}{field('Organization type','organizationType')}</>
          : form.accountType === 'state_stakeholder' ? <><label className="text-xs font-bold uppercase text-slate-500 sm:col-span-2">Ministry / Department *<input required value={form.ministryName} onChange={event=>update('ministryName',event.target.value)} className={input}/></label>{field('Designation','designation')}</>
          : <label className="text-xs font-bold uppercase text-slate-500 sm:col-span-2">Company name<input value={form.companyName} onChange={event=>update('companyName',event.target.value)} className={input}/></label>}
        {field('City','city')}
        <label className="text-xs font-bold uppercase text-slate-500">{form.accountType === 'state_stakeholder' ? 'Assigned state *' : 'State'}<input required={form.accountType === 'state_stakeholder'} value={form.state} onChange={event=>update('state',event.target.value)} className={input}/></label>
        {error && <div className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 p-4"><p className="text-sm font-bold text-red-800">Account creation failed</p><p className="mt-1 text-sm text-red-700">{error}</p><p className="mt-2 text-xs text-red-600">Use a unique email. If the Auth user appears in Supabase despite this error, delete that partial user before retrying.</p></div>}
        <p className="sm:col-span-2 text-xs text-slate-500">The email is confirmed automatically. Share the temporary password securely. Stakeholder state scope is enforced by the database.</p>
        <div className="sm:col-span-2 flex justify-end gap-3 border-t pt-4"><button type="button" onClick={onClose} className="rounded-xl border px-5 py-3 font-bold">Cancel</button><button disabled={busy} className="rounded-xl bg-primary-600 px-6 py-3 font-bold text-white disabled:opacity-60">{busy?'Creating…':'Create account'}</button></div>
      </form>}
  </div></div>;
}
