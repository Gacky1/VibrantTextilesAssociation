import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import heroImg from '../assets/hero_showcase.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gray-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Textile Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="max-w-3xl">
          <div className="badge">Global Textile Pioneer</div>
          
          <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Weaving the <span className="text-primary-500">Future</span> of Indian Industry
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl font-medium mb-10 leading-relaxed">
            A collective vision uniting artisans, manufacturers, and policymakers to define the global standard of sustainability and excellence in textiles.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/membership">
              <button className="btn-primary py-4 px-10 text-lg">
                Become a Member
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
            
            <Link to="/about-textile">
              <button className="btn-secondary text-white border-white/20 hover:bg-white/10 py-4 px-10 text-lg">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative side element */}
      <div className="absolute right-0 bottom-0 hidden lg:block p-12">
        <div className="text-white/5 font-black text-[20vw] select-none leading-none">
          VTA
        </div>
      </div>
    </section>
  );
};

export default Hero;
