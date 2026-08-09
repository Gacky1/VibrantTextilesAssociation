import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoRect from '../assets/LogoRectTransparent.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faEnvelope, 
  faFileInvoiceDollar, 
  faHeart, 
  faBoxOpen, 
  faBuilding, 
  faRightFromBracket 
} from '@fortawesome/free-solid-svg-icons';

export default function PortalShell({ title, subtitle, action, isMember = false, children }) {
  const auth = useAuth();
  const location = useLocation();

  const navLinks = isMember
    ? [
        { label: 'Overview', to: '/member', icon: faHome },
        { label: 'Products', to: '/member/products', icon: faBoxOpen },
        { label: 'Enquiries', to: '/member/enquiries', icon: faEnvelope },
        { label: 'Quotations', to: '/member/quotations', icon: faFileInvoiceDollar },
        { label: 'Company Profile', to: '/member/profile', icon: faBuilding }
      ]
    : [
        { label: 'Overview', to: '/account', icon: faHome },
        { label: 'Enquiries', to: '/account/enquiries', icon: faEnvelope },
        { label: 'Quotations', to: '/account/quotations', icon: faFileInvoiceDollar },
        { label: 'Saved Products', to: '/account/saved', icon: faHeart }
      ];

  const isActive = (path) => {
    if (path === '/account' || path === '/member') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <main data-lenis-prevent className="min-h-screen bg-slate-50 text-slate-900 bg-textile-linen transition-colors duration-300">
      {/* Sticky Premium Header with backdrop blur */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-300 ${
        isMember 
          ? 'bg-slate-950/90 border-slate-900 text-white shadow-lg' 
          : 'bg-white/80 border-slate-200/50 text-slate-900 shadow-sm'
      }`}>
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          {/* Logo Brand Link */}
          <Link to="/marketplace" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src={logoRect} alt="VTA Logo" className="h-8 w-auto object-contain" />
            <span className="font-black text-sm tracking-wider uppercase">
              VTA <span className={isMember ? 'text-indigo-400' : 'text-rose-600'}>Market Place</span>
            </span>
          </Link>

          {/* Navigation Pill Container */}
          <nav className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 md:bg-transparent">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    active
                      ? isMember
                        ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10'
                        : 'bg-rose-50 text-rose-700 shadow-sm ring-1 ring-rose-100'
                      : isMember
                        ? 'text-slate-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
                  }`}
                >
                  <FontAwesomeIcon icon={link.icon} className="text-[13px]" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sign Out Button */}
          <button
            onClick={auth.signOut}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 ${
              isMember
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white'
                : 'bg-slate-150/70 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900'
            }`}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>Sign out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="section-container py-10">
        {title && (
          <div className="mb-8 relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/75 backdrop-blur-md p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500 max-w-2xl leading-relaxed">{subtitle}</p>
            </div>
            {action && <div className="shrink-0 relative z-10">{action}</div>}
          </div>
        )}

        {children}
      </section>
    </main>
  );
}
