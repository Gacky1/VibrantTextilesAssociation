import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faShieldHalved, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const loginModes = {
  buyer: { label: 'Buyer', role: 'user', icon: faUser, description: 'Access enquiries, quotations and saved products.', destination: '/account' },
  member: { label: 'Industry Partner', role: 'industry_member', icon: faBuilding, description: 'Manage your company, products, enquiries and quotations.', destination: '/member' },
  admin: { label: 'VTA Administration', role: 'master_admin', icon: faShieldHalved, description: 'Restricted access for authorised VTA administrators.', destination: '/admin/dashboard' },
};

export function AccountLogin() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const modeKey = loginModes[params.get('as')] ? params.get('as') : 'buyer';
  const mode = loginModes[modeKey];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const destination = useMemo(() => location.state?.from || mode.destination, [location.state, mode.destination]);

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const result = await auth.signIn(email.trim(), password);
    if (result.error) {
      setError(result.error.message || 'Unable to sign in.');
      setSubmitting(false);
      return;
    }
    if (!result.profile) {
      await auth.signOut();
      setError('Your account profile is missing. Contact VTA support.');
      setSubmitting(false);
      return;
    }
    if (result.profile.account_status !== 'active') {
      navigate('/account/status', { replace: true });
      return;
    }
    if (result.profile.role !== mode.role) {
      await auth.signOut();
      setError(`This account is not registered as ${mode.label}. Choose the correct sign-in option.`);
      setSubmitting(false);
      return;
    }
    navigate(destination, { replace: true });
  };

  return (
    <main className={`min-h-screen grid place-items-center p-4 relative overflow-hidden transition-colors duration-500 ${
      modeKey === 'admin' 
        ? 'bg-slate-950 bg-textile-linen text-white' 
        : modeKey === 'buyer'
          ? 'bg-gradient-to-tr from-rose-50/50 via-stone-50 to-orange-50/40 bg-textile-linen text-slate-900'
          : 'bg-gradient-to-tr from-indigo-50/50 via-stone-50 to-slate-100/50 bg-textile-linen text-slate-900'
    }`}>
      {/* Decorative background glow/blob for premium look */}
      <div className={`absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500 ${
        modeKey === 'admin' 
          ? 'bg-amber-500' 
          : modeKey === 'buyer'
            ? 'bg-rose-500'
            : 'bg-indigo-500'
      }`} />
      
      <form 
        onSubmit={submit} 
        className={`w-full max-w-md rounded-3xl p-8 shadow-2xl relative transition-all duration-300 ${
          modeKey === 'admin' 
            ? 'border border-slate-800 bg-slate-900/90 backdrop-blur-md text-white border-stitch-gold shadow-[0_10px_50px_rgba(0,0,0,0.5)]' 
            : modeKey === 'buyer'
              ? 'border border-rose-100 bg-white/90 backdrop-blur-md text-slate-900 border-stitch shadow-[0_10px_50px_rgba(225,29,72,0.08)]' 
              : 'border border-indigo-100 bg-white/90 backdrop-blur-md text-slate-900 shadow-[0_10px_50px_rgba(79,70,229,0.08)]'
        }`}
      >
        {/* Absolute sewn-border effect inside the card for non-admin modes */}
        {modeKey !== 'admin' && (
          <div className={`absolute inset-1.5 border-2 border-dashed pointer-events-none rounded-[22px] ${
            modeKey === 'buyer' ? 'border-rose-500/20' : 'border-indigo-500/20'
          }`} />
        )}

        <div className="flex justify-between items-center mb-6">
          <Link 
            to="/" 
            className={`text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-1.5 ${
              modeKey === 'admin' 
                ? 'text-amber-500 hover:text-amber-400' 
                : modeKey === 'buyer'
                  ? 'text-rose-600 hover:text-rose-700'
                  : 'text-indigo-600 hover:text-indigo-700'
            }`}
          >
            ← Back to VTA
          </Link>
          <div className="label-woven text-[9px]">
            SECURE // {mode.role.toUpperCase()}
          </div>
        </div>

        <div className="text-center mb-8">
          <div className={`mx-auto h-14 w-14 rounded-2xl flex items-center justify-center text-xl shadow-inner mb-4 transition-transform duration-500 hover:scale-110 ${
            modeKey === 'admin' 
              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
              : modeKey === 'buyer'
                ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                : 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20'
          }`}>
            <FontAwesomeIcon icon={mode.icon} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            {mode.label} Sign In
          </h1>
          <p className={`mt-2 text-xs font-medium max-w-sm mx-auto leading-relaxed ${
            modeKey === 'admin' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {mode.description}
          </p>
        </div>

        {error && (
          <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50/95 p-3.5 text-xs text-red-700 font-medium flex items-start gap-2">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className={`block text-[10px] font-extrabold uppercase tracking-wider mb-2 ${
              modeKey === 'admin' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Email Address
            </label>
            <input 
              required 
              type="email" 
              autoComplete="email" 
              value={email} 
              onChange={(event) => setEmail(event.target.value)} 
              placeholder="name@company.com"
              className={`w-full rounded-xl border p-3.5 text-sm font-medium outline-none transition-all focus:ring-2 ${
                modeKey === 'admin' 
                  ? 'border-slate-800 bg-slate-950/80 text-white focus:border-amber-500 focus:ring-amber-500/25' 
                  : modeKey === 'buyer'
                    ? 'border-slate-200 bg-white text-slate-900 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 bg-white text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20'
              }`} 
            />
          </div>

          <div>
            <label className={`block text-[10px] font-extrabold uppercase tracking-wider mb-2 ${
              modeKey === 'admin' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Password
            </label>
            <input 
              required 
              type="password" 
              autoComplete="current-password" 
              value={password} 
              onChange={(event) => setPassword(event.target.value)} 
              placeholder="••••••••"
              className={`w-full rounded-xl border p-3.5 text-sm font-medium outline-none transition-all focus:ring-2 ${
                modeKey === 'admin' 
                  ? 'border-slate-800 bg-slate-950/80 text-white focus:border-amber-500 focus:ring-amber-500/25' 
                  : modeKey === 'buyer'
                    ? 'border-slate-200 bg-white text-slate-900 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 bg-white text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20'
              }`} 
            />
          </div>
        </div>

        <button 
          disabled={submitting} 
          className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 transform active:scale-98 disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2 ${
            modeKey === 'admin'
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_4px_20px_rgba(245,158,11,0.25)]'
              : modeKey === 'buyer'
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-[0_4px_20px_rgba(225,29,72,0.25)]'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_4px_20px_rgba(79,70,229,0.25)]'
          }`}
        >
          {submitting ? 'Authenticating...' : `Secure Sign In`}
        </button>

        <div className={`mt-8 border-t pt-6 text-center ${
          modeKey === 'admin' ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <span className={`text-[10px] font-extrabold uppercase tracking-widest block mb-3.5 ${
            modeKey === 'admin' ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Access different portals:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.entries(loginModes).map(([key, item]) => {
              const isCurrent = key === modeKey;
              return (
                <Link
                  key={key}
                  to={`/account/login?as=${key}`}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[9px] font-black uppercase tracking-wider transition-all border ${
                    isCurrent
                      ? key === 'admin'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-[inset_0_1px_3px_rgba(245,158,11,0.1)]'
                        : key === 'buyer'
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                          : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-600'
                      : modeKey === 'admin'
                        ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        : 'bg-slate-550 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="text-[9px]" />
                  {item.label.replace('VTA ', '')}
                </Link>
              );
            })}
          </div>
        </div>
      </form>
    </main>
  );
}

const Tile = ({ to, title, text }) => <Link to={to} className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1"><h2 className="text-lg font-black">{title}</h2><p className="mt-2 text-sm text-slate-500">{text}</p></Link>;
function Shell({ title, subtitle, children }) { const auth = useAuth(); return <main className="min-h-screen bg-slate-50"><header className="border-b bg-white"><div className="section-container flex justify-between py-5"><Link to="/marketplace" className="font-black text-primary-700">VTA Marketplace</Link><button onClick={auth.signOut} className="font-bold">Sign out</button></div></header><section className="section-container py-12"><h1 className="text-3xl font-black">{title}</h1><p className="mt-2 text-slate-500">{subtitle}</p><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{children}</div></section></main>; }
export function AccountHome() { const auth = useAuth(); return <Shell title={`Welcome, ${auth.profile?.full_name || 'buyer'}`} subtitle="Manage your marketplace activity."><Tile to="/account/enquiries" title="Enquiries" text="Track conversations and RFQs." /><Tile to="/account/quotations" title="Quotations" text="Review supplier quotations." /><Tile to="/account/saved" title="Saved products" text="View your shortlist." /></Shell>; }
export function MemberHome() { const auth = useAuth(); return <Shell title={auth.memberProfile?.organization_name || 'Industry partner portal'} subtitle={`Verification: ${auth.memberVerificationStatus || 'pending'}`}><Tile to="/member/products" title="Products" text="Manage marketplace listings." /><Tile to="/member/enquiries" title="Enquiry inbox" text="Respond to buyers." /><Tile to="/member/quotations" title="Quotations" text="Build and send quotations." /><Tile to="/member/profile" title="Company profile" text="Manage capabilities and documents." /></Shell>; }
export const AccountStatus = () => <Shell title="Account unavailable" subtitle="Your account is not active. Contact VTA support." />;
export const Unauthorized = () => <main className="min-h-screen grid place-items-center"><div className="text-center"><h1 className="text-4xl font-black">Access denied</h1><Link className="btn-primary mt-6" to="/">Return home</Link></div></main>;
