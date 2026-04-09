import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane, faGlobe, faClock } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const Contact = () => {
  const contactInfo = [
    { icon: faPhone, label: 'Voice Transmission', val: '+91 123 456 7890', sub: 'Available 10AM - 6PM IST' },
    { icon: faEnvelope, label: 'Digital Registry', val: 'contact@vibranttextiles.org', sub: 'Global Inquiries' },
    { icon: faMapMarkerAlt, label: 'Central Hub', val: 'New Delhi, India', sub: 'Strategic Headquarters' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="The Nexus"
        title="Connect & Collaborate"
        subtitle="Establishing direct transmission protocols with the association."
      />

      <div className="section-container py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-32 items-start">
          
          {/* ── Left Column: Contact Form ── */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <div className="badge">The Protocol</div>
              <h2 className="section-title text-left">Send Signal</h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl italic border-l-4 border-primary-500 pl-6 my-8">
                "Initiate direct communication with our technical and administrative councils."
              </p>
            </div>

            <div className="card shadow-2xl p-10 lg:p-16 border-gray-100">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-gray-400 font-bold text-[10px] uppercase tracking-widest ml-1">Identify</label>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-gray-400 font-bold text-[10px] uppercase tracking-widest ml-1">Channel</label>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-gray-400 font-bold text-[10px] uppercase tracking-widest ml-1">Transmission Body</label>
                  <textarea 
                    rows="5" 
                    placeholder="Your Message" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                  ></textarea>
                </div>

                <button className="btn-primary w-full py-5 text-base flex items-center justify-center gap-4">
                  Send Signal
                  <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
                </button>
              </form>
            </div>
          </div>

          {/* ── Right Column: Hub Coordinates ── */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-12">
              <div>
                <div className="badge">The Nexus</div>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Transmission <span className="text-primary-600 italic">Hub</span></h2>
              </div>

              <div className="space-y-10">
                {contactInfo.map((info, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-8"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-600 text-xl border border-gray-100 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <FontAwesomeIcon icon={info.icon} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">{info.label}</p>
                      <p className="text-gray-900 text-2xl font-black tracking-tight">{info.val}</p>
                      <p className="text-gray-500 text-[11px] italic font-medium">{info.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Clock */}
            <div className="card p-10 bg-gray-900 border-none shadow-xl flex items-center gap-8">
              <div className="w-16 h-16 rounded-full border-2 border-primary-500/30 flex items-center justify-center relative">
                <FontAwesomeIcon icon={faClock} className="text-primary-500 text-xl" />
                <div className="absolute inset-[-4px] border-2 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <div>
                <p className="text-white font-black text-xl tracking-tight">Global Uptime</p>
                <p className="text-gray-400 text-sm italic">Industrial Processing Active</p>
              </div>
            </div>
            
            <div className="p-10 border-2 border-dashed border-gray-100 rounded-[40px] text-center space-y-4">
              <FontAwesomeIcon icon={faGlobe} className="text-gray-300 text-4xl mb-2" />
              <p className="text-gray-600 font-medium italic">"Connecting the rhythmic threads of the global textile civilization."</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
