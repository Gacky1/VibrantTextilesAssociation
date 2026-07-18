import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faIndustry, faLeaf, faUsers, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import vtcLogo from '../assets/VTC TRANSPARENT.svg';

const pillars = [
  { icon: faHandshake, label: 'Collaboration', description: 'Working together to build a stronger industry.' },
  { icon: faIndustry, label: 'Scale', description: 'Expanding our reach to global markets.' },
  { icon: faLeaf, label: 'Heritage', description: 'Preserving the rich history of Indian textiles.' },
  { icon: faUsers, label: 'Impact', description: 'Creating meaningful change for artisans.' },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-white/40 dark:bg-slate-950/20 backdrop-blur-md border-y border-slate-100/50 dark:border-slate-900/50">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="label-woven mb-4">Our Purpose</div>
              <h2 className="section-title text-slate-900 dark:text-white">Redefining the Textile Paradigm</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed italic">
                Vibrant Textiles is a non-profit association committed to the growth, development, and enrichment of India’s textile
and handloom ecosystem. 
              </p>
            </div>

            <p className="text-slate-600 dark:text-slate-350 leading-relaxed text-lg">
              The organization works as a facilitator, supporter, and bridge between artisans, vendors,
MSMEs, industry stakeholders, academic institutions, and government bodies.
Vibrant Textiles focuses on capacity building, skill development, policy support, industry collaboration, and
sustainable growth, while preserving India’s rich textile heritage. By connecting traditional craftsmanship with modern
industry needs, it aims to strengthen the entire textile value chain and position India competitively in domestic and
global markets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {pillars.map((p, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center text-rose-600 dark:text-rose-400 flex-shrink-0">
                    <FontAwesomeIcon icon={p.icon} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 dark:text-slate-200">{p.label}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-450">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link to="/about-textile">
                <button className="btn-secondary dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:hover:bg-slate-850">
                  Our Full Journey
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </Link>
            </div>
          </div>

          {/* Visual / Abstract Representation */}
          <div className="relative">
            <div className="aspect-square bg-white/70 dark:bg-slate-900/60 rounded-[32px] overflow-hidden shadow-2xl p-12 flex items-center justify-center border-stitch-gold backdrop-blur-md">
              <div className="text-center space-y-4">
                <img src={vtcLogo} alt="VTA Logo" className="h-48 mx-auto opacity-80 dark:invert-[0.1]" />
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-450 dark:text-slate-500">Established 1998</div>
                <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto text-sm italic">
                  "India's textiles are not just industry; they are the rhythmic pulse of our civilization's heartbeat."
                </p>
              </div>
            </div>
            
            {/* Minimal Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-600 rounded-3xl -z-10 opacity-10 dark:opacity-20 animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
