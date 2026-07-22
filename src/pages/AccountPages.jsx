import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faShieldHalved, faUser, faEnvelope, faFileInvoiceDollar, faHeart, faGlobe, faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
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

const Tile = ({ to, title, text, icon, badge }) => (
  <Link 
    to={to} 
    className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg flex flex-col justify-between min-h-[180px]"
  >
    <div className="absolute inset-1.5 border border-dashed border-transparent group-hover:border-slate-200 pointer-events-none rounded-[18px] transition-colors duration-300" />
    
    <div>
      <div className="flex justify-between items-start">
        <div className="h-11 w-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-base font-bold group-hover:scale-110 transition-transform duration-300 border border-indigo-100">
          <FontAwesomeIcon icon={icon} />
        </div>
        {badge && (
          <span className="rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-[9px] font-extrabold uppercase text-indigo-700 tracking-wider">
            {badge}
          </span>
        )}
      </div>
      <h2 className="mt-4 text-base font-black text-slate-900 group-hover:text-primary-700 transition-colors leading-tight">{title}</h2>
      <p className="mt-2 text-xs font-medium text-slate-500 leading-relaxed">{text}</p>
    </div>
    
    <div className="mt-4 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-primary-700 group-hover:gap-2 transition-all">
      <span>Access Panel</span>
      <span>→</span>
    </div>
  </Link>
);

function Shell({ title, subtitle, isMember = false, children }) { 
  const auth = useAuth(); 
  const navLinks = isMember 
    ? [
        { label: 'Overview', to: '/member' },
        { label: 'Products', to: '/member/products' },
        { label: 'Enquiries', to: '/member/enquiries' },
        { label: 'Quotations', to: '/member/quotations' },
        { label: 'Company Profile', to: '/member/profile' }
      ]
    : [
        { label: 'Overview', to: '/account' },
        { label: 'Enquiries', to: '/account/enquiries' },
        { label: 'Quotations', to: '/account/quotations' },
        { label: 'Saved Products', to: '/account/saved' }
      ];

  return (
    <main data-lenis-prevent className="min-h-screen bg-slate-50 text-slate-900 bg-textile-linen">
      <header className={`border-b ${isMember ? 'bg-slate-950 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
        <div className="section-container flex flex-wrap items-center justify-between gap-4 py-4">
          <Link to="/marketplace" className="flex items-center gap-2">
            <span className="font-black text-base tracking-tight uppercase">
              VTA <span className={isMember ? 'text-primary-400' : 'text-primary-700'}>Marketplace</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-5 text-xs font-black uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`transition-colors ${
                  isMember 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button 
            onClick={auth.signOut} 
            className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
              isMember 
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Sign out
          </button>
        </div>
      </header>
      
      <section className="section-container py-12">
        <div className="mb-10 relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm">
          <div className="absolute inset-1 border border-dashed border-slate-150 pointer-events-none rounded-[20px]" />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm font-medium text-slate-500 max-w-2xl leading-relaxed">{subtitle}</p>
          </div>
        </div>

        {children}
      </section>
    </main>
  ); 
}

export function AccountHome() { 
  const auth = useAuth(); 
  return (
    <Shell 
      title={`Welcome, ${auth.profile?.full_name || 'buyer'}`} 
      subtitle="Manage your marketplace enquiries, track received supplier quotations, and view saved B2B products."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Tile 
          to="/account/enquiries" 
          title="My Enquiries" 
          text="Track discussions and RFQs sent to suppliers." 
          icon={faEnvelope} 
        />
        <Tile 
          to="/account/quotations" 
          title="Quotations" 
          text="Review received supplier quotes and terms." 
          icon={faFileInvoiceDollar} 
        />
        <Tile 
          to="/account/saved" 
          title="Saved products" 
          text="Browse your shortlist of saved marketplace items." 
          icon={faHeart} 
        />
      </div>
    </Shell>
  ); 
}

export function MemberHome() { 
  const auth = useAuth(); 
  const completion = auth.memberProfile?.profile_completion || 0;
  const verification = auth.memberVerificationStatus || 'pending';
  
  return (
    <Shell 
      title={auth.memberProfile?.organization_name || 'Industry partner portal'} 
      subtitle="Complete your supplier profile, update your B2B products catalog, and reply to buyer enquiries."
      isMember={true}
    >
      <div className="space-y-6 w-full col-span-full">
        {/* Verification Status Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute inset-1 border border-dashed border-slate-100 pointer-events-none rounded-[22px]" />
          
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Account Status</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider border ${
                verification === 'verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                verification === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {verification}
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              {verification === 'verified' 
                ? 'Your company profile is verified' 
                : 'Verification is currently pending review'}
            </h3>
            <p className="text-xs font-medium text-slate-500 max-w-xl leading-relaxed">
              {verification === 'verified'
                ? 'You can publish new products directly to the public B2B marketplace and send formal quotations to active buyers.'
                : 'VTA administrators are currently reviewing your partner registration. You can still modify your profile details and create draft products.'}
            </p>
          </div>

          <div className="w-full md:w-64 space-y-2 relative z-10">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Tile 
            to="/member/products" 
            title="Products" 
            text="Manage public B2B marketplace listings and drafts." 
            icon={faBuilding} 
          />
          <Tile 
            to="/member/enquiries" 
            title="Enquiry Inbox" 
            text="Review buyer RFQs and start sending quotes." 
            icon={faEnvelope} 
          />
          <Tile 
            to="/member/quotations" 
            title="Quotations" 
            text="Build, revise, and track sent price proposals." 
            icon={faFileInvoiceDollar} 
          />
          <Tile 
            to="/member/profile" 
            title="Company Profile" 
            text="Manage public branding, address, and certifications." 
            icon={faGlobe} 
            badge={`${completion}% Complete`}
          />
        </div>
      </div>
    </Shell>
  ); 
}

export const AccountStatus = () => <Shell title="Account unavailable" subtitle="Your account is not active. Contact VTA support." />;

export function BuyerVerification(){
  const auth = useAuth();
  return (
    <Shell 
      title="Buyer verification" 
      subtitle={`Your verification status is ${auth.buyerVerificationStatus || 'pending'}. VTA administrators will review your account before marketplace enquiries and quotations are enabled.`}
    >
      <div className="col-span-full">
        <Tile to="/marketplace" title="Browse marketplace" text="You may continue exploring verified products while your account is reviewed." icon={faGlobe} />
      </div>
    </Shell>
  );
}

export const Unauthorized = () => <main className="min-h-screen grid place-items-center"><div className="text-center"><h1 className="text-4xl font-black">Access denied</h1><Link className="btn-primary mt-6" to="/">Return home</Link></div></main>;
