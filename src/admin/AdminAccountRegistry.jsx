import { useCallback, useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, faCheck, faEye, faPlus, faRotate, faSearch, 
  faUser, faXmark, faTrash, faLandmark 
} from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../lib/supabase';
import AccountCreateModal from './AccountCreateModal';

const badge = { 
  verified: 'bg-emerald-100 text-emerald-700', 
  pending: 'bg-amber-100 text-amber-700', 
  under_review: 'bg-blue-100 text-blue-700', 
  rejected: 'bg-red-100 text-red-700', 
  suspended: 'bg-slate-200 text-slate-700' 
};

export default function AdminAccountRegistry() {
  const [tab, setTab] = useState('industry'); // 'industry', 'buyers', 'stakeholders'
  const [members, setMembers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [
        { data: memberData, error: memberError },
        { data: buyerData, error: buyerError },
        { data: stakeholderData, error: stakeholderError }
      ] = await Promise.all([
        supabase.from('industry_members').select('*,industry_member_documents(*)').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*').eq('role', 'user').order('created_at', { ascending: false }),
        supabase.from('state_stakeholders').select('*').order('created_at', { ascending: false })
      ]);

      if (memberError) throw memberError;
      if (buyerError) throw buyerError;
      if (stakeholderError) throw stakeholderError;

      const ids = [
        ...(memberData || []).map(m => m.user_id),
        ...(stakeholderData || []).map(s => s.user_id)
      ];

      let profiles = [];
      if (ids.length) {
        const { data, error: profilesError } = await supabase.from('profiles').select('*').in('id', ids);
        if (profilesError) throw profilesError;
        profiles = data || [];
      }

      setMembers((memberData || []).map(m => ({
        ...m,
        profile: profiles.find(p => p.id === m.user_id)
      })));

      setStakeholders((stakeholderData || []).map(s => ({
        ...s,
        profile: profiles.find(p => p.id === s.user_id)
      })));

      setBuyers(buyerData || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const rows = useMemo(() => {
    const source = tab === 'industry' ? members : tab === 'buyers' ? buyers : stakeholders;
    const term = search.toLowerCase();
    return source.filter(row => JSON.stringify(row).toLowerCase().includes(term));
  }, [tab, members, buyers, stakeholders, search]);

  const review = async (status) => {
    let reason = null;
    if (['rejected', 'suspended'].includes(status) && tab !== 'stakeholders') {
      reason = window.prompt(`Reason for ${status}:`);
      if (!reason?.trim()) return;
    }
    setBusy(true);
    try {
      if (tab === 'stakeholders') {
        const isActive = status === 'verified' || status === 'active';
        const { error: stakeholderError } = await supabase
          .from('state_stakeholders')
          .update({ is_active: isActive })
          .eq('user_id', selected.user_id);
        if (stakeholderError) throw stakeholderError;

        const { error: profileError } = await supabase
          .from('profiles')
          .update({ account_status: isActive ? 'active' : 'suspended' })
          .eq('id', selected.user_id);
        if (profileError) throw profileError;
      } else {
        const rpc = tab === 'industry' ? 'admin_review_industry_member' : 'admin_review_buyer';
        const args = tab === 'industry' 
          ? { target_member_id: selected.id, next_status: status, review_reason: reason } 
          : { target_user_id: selected.id, next_status: status, review_reason: reason };
        
        const { error: rpcError } = await supabase.rpc(rpc, args);
        if (rpcError) throw rpcError;
      }
      setSelected(null);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (row) => {
    const label = tab === 'industry' 
      ? row.organization_name 
      : tab === 'buyers' 
        ? row.full_name || row.email 
        : row.profile?.full_name || row.profile?.email;

    if (!window.confirm(`Are you absolutely sure you want to delete ${label}?`)) return;
    setBusy(true);
    try {
      if (tab === 'industry') {
        await supabase.from('marketplace_quotations').update({ parent_quotation_id: null }).eq('industry_member_id', row.id);
        await supabase.from('marketplace_quotations').delete().eq('industry_member_id', row.id);
        await supabase.from('marketplace_enquiries').delete().eq('industry_member_id', row.id);
        await supabase.from('marketplace_products').delete().eq('industry_member_id', row.id);
        const { error: deleteError } = await supabase.from('industry_members').delete().eq('id', row.id);
        if (deleteError) throw deleteError;
      } else if (tab === 'buyers') {
        await supabase.from('marketplace_quotations').delete().eq('user_id', row.id);
        await supabase.from('marketplace_enquiries').delete().eq('user_id', row.id);
        const { error: deleteError } = await supabase.from('profiles').delete().eq('id', row.id);
        if (deleteError) throw deleteError;
      } else {
        // Stakeholders
        const userId = row.user_id;
        await supabase.from('state_stakeholders').delete().eq('user_id', userId);
        const { error: deleteError } = await supabase.from('profiles').delete().eq('id', userId);
        if (deleteError) throw deleteError;
      }
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Member & Buyer Registry</h1>
          <p className="mt-1 text-sm text-slate-500">Verify identities, review applications, and control platform access.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="rounded-xl border bg-white px-4 py-2 text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
            <FontAwesomeIcon icon={faRotate} /> Refresh
          </button>
          <button onClick={() => setCreateOpen(true)} className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary-700 transition-colors">
            <FontAwesomeIcon icon={faPlus} /> Create account
          </button>
        </div>
      </div>

      {createOpen && <AccountCreateModal onClose={() => setCreateOpen(false)} onCreated={load} />}

      {/* Tabs list navigation */}
      <div className="mt-7 flex gap-2 border-b overflow-x-auto">
        <button 
          onClick={() => setTab('industry')} 
          className={`px-5 py-3 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            tab === 'industry' ? 'border-primary-600 text-primary-700' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FontAwesomeIcon icon={faBuilding} /> 
          <span>Industry Partners</span> 
          <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{members.length}</span>
        </button>

        <button 
          onClick={() => setTab('buyers')} 
          className={`px-5 py-3 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            tab === 'buyers' ? 'border-primary-600 text-primary-700' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FontAwesomeIcon icon={faUser} /> 
          <span>Buyers</span> 
          <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{buyers.length}</span>
        </button>

        <button 
          onClick={() => setTab('stakeholders')} 
          className={`px-5 py-3 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
            tab === 'stakeholders' ? 'border-primary-600 text-primary-700' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FontAwesomeIcon icon={faLandmark} /> 
          <span>Stakeholders</span> 
          <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{stakeholders.length}</span>
        </button>
      </div>

      <label className="mt-5 flex max-w-md items-center gap-3 rounded-xl border bg-white px-4 shadow-sm">
        <FontAwesomeIcon icon={faSearch} className="text-slate-400" />
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          className="w-full py-3 outline-none text-sm font-medium" 
          placeholder={
            tab === 'industry' ? "Search name, email, state or organization..." :
            tab === 'buyers' ? "Search name, email or company..." :
            "Search ministry, name, state or designation..."
          }
        />
      </label>

      {error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-100 font-semibold">{error}</p>}

      <div className="mt-5 overflow-hidden rounded-2xl border bg-white shadow-sm">
        {loading ? (
          <p className="p-10 text-center text-slate-500 font-medium animate-pulse">Loading registry…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500 border-b">
                <tr>
                  <th className="px-5 py-4">Identity</th>
                  <th className="px-5 py-4">Location / Scope</th>
                  <th className="px-5 py-4">Submitted</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map(row => {
                  const status = tab === 'industry' 
                    ? row.verification_status 
                    : tab === 'buyers' 
                      ? row.buyer_verification_status 
                      : (row.is_active ? 'verified' : 'suspended');

                  const statusText = tab === 'stakeholders' 
                    ? (row.is_active ? 'active' : 'suspended') 
                    : (status || 'pending');

                  const badgeClass = tab === 'stakeholders' 
                    ? (row.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700') 
                    : (badge[status] || badge.pending);

                  return (
                    <tr key={row.id || row.user_id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <b className="block text-slate-900 font-bold">
                          {tab === 'industry' 
                            ? row.organization_name 
                            : tab === 'buyers' 
                              ? row.full_name || 'Unnamed buyer' 
                              : row.profile?.full_name || 'Unnamed stakeholder'}
                        </b>
                        <span className="text-slate-500 text-xs font-semibold">
                          {tab === 'industry' ? row.profile?.email : tab === 'buyers' ? row.email : row.profile?.email}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-655 font-medium">
                        {tab === 'industry' 
                          ? [row.city, row.state].filter(Boolean).join(', ') || '—' 
                          : tab === 'buyers' 
                            ? row.company_name || 'Individual buyer' 
                            : `${row.ministry_name} (${row.state})`}
                      </td>
                      <td className="px-5 py-4 text-slate-500 font-semibold">
                        {new Date(row.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${badgeClass}`}>
                          {statusText.replaceAll('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right flex justify-end items-center gap-2">
                        <button onClick={() => setSelected(row)} className="rounded-lg border px-3 py-2 font-bold text-primary-700 hover:bg-slate-50 transition-colors text-xs">
                          <FontAwesomeIcon icon={faEye} /> Review
                        </button>
                        <button disabled={busy} onClick={() => handleDelete(row)} className="rounded-lg border border-red-200 hover:bg-red-50 px-3 py-2 font-bold text-red-600 disabled:opacity-50 transition-all text-xs">
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!loading && !rows.length && (
              <p className="p-10 text-center text-slate-500 font-bold text-sm">No records found matching segment filters.</p>
            )}
          </div>
        )}
      </div>

      {/* Review details modal dialog */}
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl relative">
            <div className="flex justify-between border-b pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary-600">
                  {tab === 'industry' ? 'Industry partner review' : tab === 'buyers' ? 'Buyer verification' : 'Government stakeholder review'}
                </p>
                <h2 className="mt-1 text-2xl font-black text-slate-900 leading-tight">
                  {tab === 'industry' 
                    ? selected.organization_name 
                    : tab === 'buyers' 
                      ? selected.full_name || selected.email 
                      : selected.profile?.full_name || selected.profile?.email}
                </h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 border border-slate-200/50 p-5 sm:grid-cols-2">
              {Object.entries(
                tab === 'industry' ? {
                  Email: selected.profile?.email,
                  Phone: selected.business_phone,
                  Type: selected.organization_type,
                  Location: [selected.city, selected.state].filter(Boolean).join(', '),
                  GST: selected.gst_number,
                  Udyam: selected.udyam_number,
                  'Profile completion': `${selected.profile_completion || 0}%`,
                  'Documents': selected.industry_member_documents?.length || 0
                } : tab === 'buyers' ? {
                  Email: selected.email,
                  Phone: selected.phone,
                  Company: selected.company_name,
                  Location: [selected.city, selected.state].filter(Boolean).join(', '),
                  'Account status': selected.account_status,
                  'Registered': new Date(selected.created_at).toLocaleString('en-IN')
                } : {
                  Email: selected.profile?.email,
                  Phone: selected.profile?.phone || '—',
                  Ministry: selected.ministry_name,
                  Designation: selected.designation || '—',
                  'Assigned State Scope': selected.state,
                  Access: selected.is_active ? 'Active' : 'Suspended',
                  'Registered': new Date(selected.created_at).toLocaleString('en-IN')
                }
              ).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-xs font-bold uppercase text-slate-400 tracking-wider">{key}</dt>
                  <dd className="mt-1 font-semibold text-slate-800 text-sm">{value || '—'}</dd>
                </div>
              ))}
            </div>

            {tab === 'industry' && (
              <>
                <h3 className="mt-6 font-black text-slate-900 text-sm uppercase tracking-wider">Capabilities</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[...(selected.product_categories || []), ...(selected.materials || []), ...(selected.techniques || [])].map(x => (
                    <span key={x} className="rounded-full bg-primary-50 border px-3 py-1 text-xs font-bold text-primary-700">
                      {x}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Modal action control panel */}
            <div className="mt-7 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-5">
              {tab === 'stakeholders' ? (
                <>
                  {selected.is_active ? (
                    <button disabled={busy} onClick={() => review('suspended')} className="rounded-xl bg-slate-800 hover:bg-slate-900 px-5 py-2.5 font-bold text-xs uppercase tracking-wider text-white shadow-sm transition-all">
                      Suspend Access
                    </button>
                  ) : (
                    <button disabled={busy} onClick={() => review('verified')} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 font-bold text-xs uppercase tracking-wider text-white shadow-sm transition-all">
                      <FontAwesomeIcon icon={faCheck} className="mr-1" /> Activate Access
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button disabled={busy} onClick={() => review('under_review')} className="rounded-xl border border-slate-250 hover:bg-slate-50 px-4 py-2.5 font-bold text-xs uppercase tracking-wider text-slate-700 bg-white transition-all">
                    Mark under review
                  </button>
                  <button disabled={busy} onClick={() => review('rejected')} className="rounded-xl border border-red-200 hover:bg-red-50 px-4 py-2.5 font-bold text-xs uppercase tracking-wider text-red-600 bg-white transition-all">
                    Reject
                  </button>
                  <button disabled={busy} onClick={() => review('suspended')} className="rounded-xl bg-slate-800 hover:bg-slate-900 px-4 py-2.5 font-bold text-xs uppercase tracking-wider text-white transition-all">
                    Suspend
                  </button>
                  <button disabled={busy} onClick={() => review('verified')} className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 font-bold text-xs uppercase tracking-wider text-white transition-all">
                    <FontAwesomeIcon icon={faCheck} /> Verify
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
