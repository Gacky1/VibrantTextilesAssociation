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
    <section id="about" className="py-24 bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="badge">Our Purpose</div>
              <h2 className="section-title">Redefining the Textile Paradigm</h2>
              <p className="text-xl text-gray-600 leading-relaxed italic">
                Vibrant Textiles is a non-profit catalyst dedicated to local modernization and the global expansion of India's heritage.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              We bridge the gap between ancient rhythm and technological depth, fostering a sustainable ecosystem for the progressive artisan. Our mission is to preserve the legacy while embracing the future of manufacturing and craft.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {pillars.map((p, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                    <FontAwesomeIcon icon={p.icon} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{p.label}</h3>
                    <p className="text-sm text-gray-500">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link to="/about-textile">
                <button className="btn-secondary">
                  Our Full Journey
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </Link>
            </div>
          </div>

          {/* Visual / Abstract Representation */}
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200 p-12 flex items-center justify-center">
              <div className="text-center space-y-4">
                <img src={vtcLogo} alt="VTA Logo" className="h-48 mx-auto opacity-80" />
                <div className="text-sm font-bold uppercase tracking-widest text-gray-400">Established 1998</div>
                <p className="text-gray-500 max-w-xs mx-auto text-sm italic">
                  "India's textiles are not just industry; they are the rhythmic pulse of our civilization's heartbeat."
                </p>
              </div>
            </div>
            
            {/* Minimal Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-600 rounded-2xl -z-10 opacity-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
