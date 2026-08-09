import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimesCircle, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import PortalShell from '../components/PortalShell';

export function MemberVerification() {
  const auth = useAuth();
  const status = auth.memberVerificationStatus || 'pending';

  const config = 
    status === 'verified' ? {
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: faCheckCircle,
      title: 'Your account is verified',
      desc: 'Congratulations! Your organization is fully verified. You can now publish products, receive customer enquiries, and submit commercial quotations.'
    } :
    status === 'rejected' ? {
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      icon: faTimesCircle,
      title: 'Verification unsuccessful',
      desc: 'Unfortunately, your verification request was not successful. Please review your company profile, ensure accurate GSTIN/PAN and legal documentation, and contact support to appeal.'
    } : {
      color: 'text-amber-700 bg-amber-50/50 border-amber-200',
      icon: faClock,
      title: 'Verification is pending review',
      desc: 'Your verification request is currently under review by our administration team. This process typically takes 24-48 business hours. You can continue updating your company profile and drafting products in the meantime.'
    };

  return (
    <PortalShell 
      title="Partner Verification" 
      subtitle="Verify your business credentials to unlock product listing, lead acquisition, and sales features."
      isMember={true}
    >
      <div className="col-span-full max-w-2xl mx-auto w-full">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center relative overflow-hidden">
          <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center border border-slate-200 bg-slate-50 text-slate-400 mb-6">
            <FontAwesomeIcon icon={faShieldAlt} className="text-xl" />
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 leading-tight">Verification Status</h2>
          
          <div className={`mt-6 rounded-2xl border p-5 flex flex-col items-center gap-3 max-w-lg mx-auto ${config.color}`}>
            <FontAwesomeIcon icon={config.icon} className="text-2xl" />
            <h3 className="font-extrabold uppercase tracking-wider text-xs">{config.title}</h3>
            <p className="text-xs font-semibold text-center leading-relaxed max-w-md">
              {config.desc}
            </p>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 flex justify-center gap-3">
            <Link to="/member/profile" className="btn-primary text-xs font-black uppercase tracking-wider px-5 py-3 shadow-[0_4px_12px_rgba(79,70,229,0.15)] bg-indigo-600 hover:bg-indigo-700 text-white">
              Go to Profile
            </Link>
            <Link to="/member" className="rounded-xl border border-slate-250 hover:bg-slate-50 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-700 bg-white shadow-sm transition-all">
              Overview Dashboard
            </Link>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
