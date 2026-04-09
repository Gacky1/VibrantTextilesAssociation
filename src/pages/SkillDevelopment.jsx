import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faChalkboardTeacher, faIndustry, faDollarSign, faHandshake, faBook, faHandHoldingHeart, faPalette, faFlask, faBriefcase, faLeaf, faScissors, faArrowRight, faTrophy } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const SkillDevelopment = () => {
  const programs = [
    {
      title: "Handloom Weaving",
      icon: faHandHoldingHeart,
      duration: "3 Months",
      level: "Elite Legacy",
      desc: "Master traditional handloom techniques and modern weaving patterns with heritage accuracy.",
      features: ["Traditional techniques", "Quality control", "Market linkage"],
      color: 'text-primary-600',
      bg: 'bg-primary-50'
    },
    {
      title: "Textile Design & CAD",
      icon: faPalette,
      duration: "6 Months",
      level: "Intermediate",
      desc: "Learn digital textile design using industry-standard software and color theory foundations.",
      features: ["CAD software", "Color theory", "Portfolio building"],
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: "Quality Control",
      icon: faFlask,
      duration: "2 Months",
      level: "Professional",
      desc: "Understand global textile testing methods and regulatory standards for export.",
      features: ["Lab testing", "Certification", "Documentation"],
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: "Entrepreneurship",
      icon: faBriefcase,
      duration: "1 Month",
      level: "Global Visionary",
      desc: "Build your textile legacy with market insights, financial planning, and global strategies.",
      features: ["Business planning", "Marketing", "Finance"],
      color: 'text-gray-900',
      bg: 'bg-gray-100'
    },
    {
      title: "Natural Dyeing",
      icon: faLeaf,
      duration: "1 Month",
      level: "Sustainable Master",
      desc: "Explore eco-friendly natural dyeing methods and the rhythmic evolution of organic chemistry.",
      features: ["Natural dyes", "Eco-friendly", "Traditional methods"],
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      title: "Garment Construction",
      icon: faScissors,
      duration: "4 Months",
      level: "Architectural Couture",
      desc: "Complete garment making from conceptual pattern drawing to high-end finishing.",
      features: ["Pattern making", "Stitching", "Finishing"],
      color: 'text-primary-600',
      bg: 'bg-primary-50'
    }
  ];

  const benefits = [
    { icon: faCertificate, title: "Certification", desc: "Government recognized certificates", color: 'text-primary-600', bg: 'bg-primary-50' },
    { icon: faChalkboardTeacher, title: "Expert Trainers", desc: "Industry professionals as mentors", color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: faIndustry, title: "Practical Training", desc: "Hands-on experience in workshops", color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: faDollarSign, title: "Financial Support", desc: "Subsidized fees and scholarships", color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: faHandshake, title: "Job Placement", desc: "Industry connections and placements", color: 'text-primary-600', bg: 'bg-primary-50' },
    { icon: faBook, title: "Study Material", desc: "Comprehensive learning resources", color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="Empower Your Rhythm"
        title="Training Verticals"
        subtitle="Empowering artisans and professionals with industry-relevant heritage skills."
      />

      <div className="section-container py-24">
        
        {/* ── Section 1: Flagship Masterclass ── */}
        <div className="mb-32">
          <div className="card p-0 overflow-hidden border-gray-100 shadow-xl">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-2/5 relative min-h-[400px]">
                <img 
                  src="https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?auto=format&fit=crop&q=80&w=1200" 
                  alt="Weaving Masterclass" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 transition-opacity" />
                <div className="absolute top-8 left-8">
                  <span className="badge bg-white shadow-lg text-primary-600 border-none">Elite Protocol</span>
                </div>
              </div>
              
              <div className="w-full lg:w-3/5 p-12 lg:p-20 flex flex-col justify-center bg-gray-50">
                <div className="space-y-8">
                  <div className="badge">The Masterclass Series</div>
                  <h3 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Advanced <span className="text-primary-600 italic">Heritage</span></h3>
                  <p className="text-gray-600 text-xl leading-relaxed italic border-l-4 border-primary-500 pl-6 mx-0">
                    "A definitive journey into the world of traditional Indian handlooms, blended with 21st-century quality output."
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 my-10 border-y border-gray-200">
                  {[
                    { label: 'Protocol', val: 'Advanced' },
                    { label: 'Cycle', val: '24 Weeks' },
                    { label: 'Output', val: 'Global' },
                    { label: 'Standard', val: 'Export' }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-xl font-black text-gray-900">{stat.val}</p>
                    </div>
                  ))}
                </div>

                <button className="btn-primary w-fit px-12 py-5 text-base">
                  Request Syllabus
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 2: Mosaic Feed ── */}
        <div className="mb-32">
          <div className="mb-16">
            <div className="badge">The Learning Feed</div>
            <h2 className="section-title">Mosaic of Skillsets</h2>
            <p className="section-subtitle">
              Specialized tracks decoded for the modern craftsmanship landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="card group hover:border-primary-200 transition-all flex flex-col p-0 overflow-hidden shadow-sm"
              >
                <div className={`p-10 ${program.bg}`}>
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm ${program.color} group-hover:scale-110 transition-transform`}>
                      <FontAwesomeIcon icon={program.icon} />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{program.level}</p>
                      <p className={`text-xl font-black ${program.color}`}>{program.duration}</p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">{program.title}</h3>
                </div>

                <div className="p-10 space-y-8 flex-grow flex flex-col justify-between">
                  <p className="text-gray-600 text-lg leading-relaxed italic mx-0">"{program.desc}"</p>
                  
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {program.features.map((f, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-100 text-[9px] font-bold uppercase tracking-widest text-gray-500 rounded-md">
                          {f}
                        </span>
                      ))}
                    </div>

                    <button className="flex items-center gap-2 text-primary-600 font-bold text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Track Details
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 3: The Standard ── */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="badge">The Industrial Baseline</div>
            <h2 className="section-title mx-auto">The Standard</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="card group hover:border-primary-200 transition-all flex flex-col items-center p-12"
              >
                <div className={`w-16 h-16 mb-8 ${benefit.bg} ${benefit.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform`}>
                  <FontAwesomeIcon icon={benefit.icon} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 4: CTA ── */}
        <div className="bg-gray-900 rounded-[64px] px-12 py-24 text-center space-y-12">
          <div className="w-16 h-16 mx-auto bg-primary-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-xl">
            <FontAwesomeIcon icon={faCertificate} />
          </div>
          <div className="space-y-6">
            <div className="badge border-gray-700 bg-gray-800 text-primary-400 inline-block">The Industrial Threshold</div>
            <h2 className="text-4xl md:text-7xl font-black text-white leading-tight">
              Forge Your <span className="text-primary-500 italic">Legacy</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto italic">
              "Transformative heritage skills decoded for the ambitious revolutionary."
            </p>
          </div>

          <button className="btn-primary inline-flex items-center gap-4 py-6 px-16 text-base shadow-2xl shadow-primary-900/40">
            Apply for Training
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] pt-8">
            Integrated with Global Certification Boards
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SkillDevelopment;
