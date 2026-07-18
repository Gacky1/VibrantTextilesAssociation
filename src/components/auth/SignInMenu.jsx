import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChevronDown, faRightFromBracket, faShieldHalved, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const entries = [
  { label: 'Buyer', description: 'Enquiries and quotations', to: '/account/login?as=buyer', icon: faUser },
  { label: 'Industry Partner', description: 'Products and supplier portal', to: '/account/login?as=member', icon: faBuilding },
  { label: 'Administration', description: 'Authorised VTA team only', to: '/account/login?as=admin', icon: faShieldHalved },
];

export default function SignInMenu({ mobile = false, onNavigate }) {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const close = (event) => { if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const dashboard = auth.role === 'master_admin' ? '/admin/dashboard' : auth.role === 'industry_member' ? '/member' : '/account';
  if (auth.user) return <div className={mobile ? 'space-y-3' : 'flex items-center gap-2'}><Link onClick={onNavigate} to={dashboard} className={mobile ? 'block rounded-xl bg-white p-4 font-black text-slate-800' : 'whitespace-nowrap rounded-full border border-slate-200 px-4 py-2 text-xs font-extrabold text-slate-700'}>My dashboard</Link>{mobile && <button onClick={() => auth.signOut()} className="flex items-center gap-2 text-sm font-bold text-red-600"><FontAwesomeIcon icon={faRightFromBracket} /> Sign out</button>}</div>;

  if (mobile) return <div><p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Sign in</p><div className="grid gap-2">{entries.map((entry) => <Link key={entry.label} to={entry.to} onClick={onNavigate} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-50 text-primary-700"><FontAwesomeIcon icon={entry.icon} /></span><span><b className="block text-sm text-slate-900">{entry.label}</b><span className="text-xs text-slate-500">{entry.description}</span></span></Link>)}</div></div>;

  return <div className="relative" ref={menuRef}><button onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex whitespace-nowrap items-center gap-1.5 rounded-full border border-slate-200 bg-white !px-2.5 xl:!px-3.5 2xl:!px-4 !py-1.5 xl:!py-2 2xl:!py-2.5 text-[10px] xl:text-[11px] 2xl:text-xs font-extrabold text-slate-700 shadow-sm transition hover:border-primary-200 hover:text-primary-700"><FontAwesomeIcon icon={faUser} /> Sign in <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition ${open ? 'rotate-180' : ''}`} /></button>{open && <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">{entries.map((entry) => <Link key={entry.label} to={entry.to} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-50 text-primary-700"><FontAwesomeIcon icon={entry.icon} /></span><span><b className="block text-sm text-slate-900">{entry.label}</b><span className="text-xs text-slate-500">{entry.description}</span></span></Link>)}</div>}</div>;
}
