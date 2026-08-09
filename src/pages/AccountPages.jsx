import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, faShieldHalved, faUser, faEnvelope, 
  faFileInvoiceDollar, faHeart, faGlobe, faBoxOpen, 
  faCheckCircle, faClock, faExclamationTriangle, faLandmark 
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import favicon from '../assets/Favicon.png';
import PortalShell from '../components/PortalShell';

const loginModes = {
  buyer: { label: 'Buyer', role: 'user', icon: faUser, description: 'Access enquiries, quotations and saved products.', destination: '/account' },
  member: { label: 'Industry Partner', role: 'industry_member', icon: faBuilding, description: 'Manage your company, products, enquiries and quotations.', destination: '/member' },
  admin: { label: 'VTA Administration', role: 'master_admin', icon: faShieldHalved, description: 'Restricted access for authorised VTA administrators.', destination: '/admin/dashboard' },
  stakeholder: { label: 'Government Stakeholder', role: 'state_stakeholder', icon: faLandmark, description: 'State-scoped textile intelligence for authorised ministries and departments.', destination: '/stakeholder' },
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
          <img src={favicon} alt="VTA Favicon" className="mx-auto h-16 w-16 mb-4 object-contain" />
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

const Tile = ({ to, title, text, icon, badge, isMember = false }) => (
  <Link 
    to={to} 
    className={`group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[190px] ${
      isMember 
        ? 'border-slate-200/80 hover:border-indigo-300/50 shadow-[0_4px_12px_rgba(79,70,229,0.01)] hover:shadow-[0_12px_32px_rgba(79,70,229,0.08)]' 
        : 'border-slate-200/80 hover:border-rose-350/50 shadow-[0_4px_12px_rgba(225,29,72,0.01)] hover:shadow-[0_12px_32px_rgba(225,29,72,0.08)]'
    }`}
  >
    {/* Micro-glow backdrop overlay */}
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-all duration-500 pointer-events-none ${
      isMember ? 'bg-indigo-500' : 'bg-rose-500'
    }`} />
    
    <div>
      <div className="flex justify-between items-start">
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform duration-300 border ${
          isMember 
            ? 'bg-indigo-50/70 text-indigo-600 border-indigo-100/60' 
            : 'bg-rose-50/70 text-rose-600 border-rose-100/60'
        }`}>
          <FontAwesomeIcon icon={icon} />
        </div>
        {badge && (
          <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider border ${
            isMember 
              ? 'bg-indigo-50/70 border-indigo-100 text-indigo-700' 
              : 'bg-rose-50/70 border-rose-100 text-rose-700'
          }`}>
            {badge}
          </span>
        )}
      </div>
      <h2 className="mt-4 text-base font-extrabold text-slate-800 group-hover:text-slate-950 transition-colors leading-tight">{title}</h2>
      <p className="mt-2 text-xs font-semibold text-slate-500 leading-relaxed">{text}</p>
    </div>
    
    <div className={`mt-4 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest group-hover:gap-2.5 transition-all ${
      isMember ? 'text-indigo-600 group-hover:text-indigo-700' : 'text-rose-600 group-hover:text-rose-750'
    }`}>
      <span>Access Panel</span>
      <span>→</span>
    </div>
  </Link>
);

export function AccountHome() { 
  const auth = useAuth(); 
  return (
    <PortalShell 
      title={`✨ Welcome back, ${auth.profile?.full_name || 'Buyer'}`} 
      subtitle="Overview of your buyer activity, active sourcing enquiries, and vendor quotation requests."
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
          title="Saved Products" 
          text="Browse your shortlist of saved marketplace items." 
          icon={faHeart} 
        />
      </div>
    </PortalShell>
  ); 
}

export function MemberHome() { 
  const auth = useAuth(); 
  const completion = auth.memberProfile?.profile_completion || 0;
  const verification = auth.memberVerificationStatus || 'pending';
  
  return (
    <PortalShell 
      title={`👋 ${auth.memberProfile?.organization_name || 'Industry Partner Portal'}`} 
      subtitle="Complete your supplier verification, manage your products catalog, and reply to buyers."
      isMember={true}
    >
      <div className="space-y-6 w-full col-span-full">
        {/* Verification Status Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 relative z-10">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
              verification === 'verified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
              verification === 'rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
              'bg-amber-50 text-amber-600 border border-amber-100'
            }`}>
              <FontAwesomeIcon 
                icon={verification === 'verified' ? faCheckCircle : verification === 'rejected' ? faExclamationTriangle : faClock} 
                className="text-lg" 
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Account Status</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider border ${
                  verification === 'verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  verification === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                  'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {verification}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {verification === 'verified' 
                  ? 'Your company profile is verified' 
                  : 'Verification is currently pending review'}
              </h3>
              <p className="text-xs font-semibold text-slate-500 max-w-xl leading-relaxed">
                {verification === 'verified'
                  ? 'You can publish new products directly to the public B2B marketplace and send formal quotations to active buyers.'
                  : 'VTA administrators are currently reviewing your partner registration. You can still modify your profile details and create draft products.'}
              </p>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-2 relative z-10">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Profile Completion</span>
              <span>{completion}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
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
            icon={faBoxOpen} 
            isMember={true}
          />
          <Tile 
            to="/member/enquiries" 
            title="Enquiry Inbox" 
            text="Review buyer RFQs and start sending quotes." 
            icon={faEnvelope} 
            isMember={true}
          />
          <Tile 
            to="/member/quotations" 
            title="Quotations" 
            text="Build, revise, and track sent price proposals." 
            icon={faFileInvoiceDollar} 
            isMember={true}
          />
          <Tile 
            to="/member/profile" 
            title="Company Profile" 
            text="Manage public branding, address, and certifications." 
            icon={faBuilding} 
            badge={`${completion}% Complete`}
            isMember={true}
          />
        </div>
      </div>
    </PortalShell>
  ); 
}

export const AccountStatus = () => (
  <PortalShell title="Account unavailable" subtitle="Your account is not active. Contact VTA support.">
    <div className="rounded-3xl border border-red-200 bg-red-50/50 p-6 text-sm font-semibold text-red-700 max-w-lg">
      Your account status is currently set to inactive. Please reach out to Vibrant Textiles Association support to reactivate your credentials.
    </div>
  </PortalShell>
);

export function BuyerVerification() {
  const auth = useAuth();
  return (
    <PortalShell 
      title="Buyer Verification" 
      subtitle={`Your verification status is currently: ${auth.buyerVerificationStatus || 'pending'}`}
    >
      <div className="grid gap-6 max-w-2xl">
        <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-6 text-xs text-amber-850 font-semibold space-y-2">
          <h4 className="font-extrabold text-sm text-amber-900">Verification Pending</h4>
          <p className="leading-relaxed">
            VTA administrators will review your account before marketplace enquiries and quotations are enabled.
            In the meantime, you are welcome to browse the public marketplace directory.
          </p>
        </div>
        <Tile 
          to="/marketplace" 
          title="Browse Marketplace" 
          text="You may continue exploring verified products while your account is reviewed." 
          icon={faGlobe} 
        />
      </div>
    </PortalShell>
  );
}

export const Unauthorized = () => <main className="min-h-screen grid place-items-center"><div className="text-center"><h1 className="text-4xl font-black">Access denied</h1><Link className="btn-primary mt-6" to="/">Return home</Link></div></main>;
