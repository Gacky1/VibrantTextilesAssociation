import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faLeaf, faChartBar, faPalette, faCogs, faGavel, faFileAlt, faBook, faLightbulb, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const Research = () => {
  const researchAreas = [
    { icon: faFlask, title: "Textile Innovation", desc: "Advanced materials and smart textiles research", projects: "15+", color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: faLeaf, title: "Sustainability", desc: "Eco-friendly processes and circular economy", projects: "12+", color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: faChartBar, title: "Market Analysis", desc: "Industry trends and consumer behavior studies", projects: "20+", color: 'text-primary-600', bg: 'bg-primary-50' },
    { icon: faPalette, title: "Design Research", desc: "Traditional crafts and contemporary design fusion", projects: "10+", color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: faCogs, title: "Tech Integration", desc: "Automation and digital transformation", projects: "8+", color: 'text-violet-600', bg: 'bg-violet-50' },
    { icon: faGavel, title: "Policy Studies", desc: "Trade policies and regulatory frameworks", projects: "18+", color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  const publications = [
    { title: "Future of Indian Handloom Industry", year: "2024", type: "Research Paper", icon: faFileAlt, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: "Sustainable Textile Practices in India", year: "2023", type: "White Paper", icon: faBook, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: "Digital Transformation in Textile Sector", year: "2023", type: "Case Study", icon: faLightbulb, color: 'text-primary-600', bg: 'bg-primary-50' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="The Laboratory"
        title="Research & Discovery"
        subtitle="Pioneering the rhythmic interface through evidence-based research."
      />

      <div className="section-container py-24">
        
        {/* ── Section 1: Strategic Focus ── */}
        <div className="mb-32">
          <div className="mb-16">
            <div className="badge">The Inquiry</div>
            <h2 className="section-title">Strategic Focus</h2>
            <p className="section-subtitle">
              Expanding the boundaries of textile civilization through industrial inquiry and deep-tech innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, idx) => (
              <div
                key={idx}
                className="card group hover:border-primary-200 transition-all flex flex-col justify-between"
              >
                <div className="space-y-8">
                  <div className={`w-16 h-16 ${area.bg} ${area.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm`}>
                    <FontAwesomeIcon icon={area.icon} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">{area.title}</h3>
                    <p className="text-gray-600 leading-relaxed italic">"{area.desc}"</p>
                  </div>
                </div>

                <div className="pt-8 flex items-center justify-between border-t border-gray-50 mt-8">
                  <div className="flex items-center gap-3 text-primary-600 font-bold text-[10px] uppercase tracking-widest">
                    <FontAwesomeIcon icon={faFlask} className="opacity-50" />
                    {area.projects} Projects
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className="text-gray-300 group-hover:text-primary-600 group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 2: Scholarship Archive ── */}
        <div className="mb-32">
          <div className="mb-16">
            <div className="badge">The Scholarship</div>
            <h2 className="section-title text-left">Latest Registry</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              Access our latest technical papers, policy frameworks, and industry white papers.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {publications.map((item, idx) => (
              <div
                key={idx}
                className="card group hover:border-primary-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8"
              >
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-6">
                    <span className="px-3 py-1 bg-gray-50 text-primary-600 font-bold text-[10px] uppercase tracking-wider rounded-md border border-gray-100">
                      {item.type}
                    </span>
                    <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">{item.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">
                    {item.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm`}>
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 3: CTA ── */}
        <div className="bg-gray-900 rounded-[40px] px-12 py-24 text-center space-y-12">
          <div className="w-16 h-16 mx-auto bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl">
            <FontAwesomeIcon icon={faLightbulb} />
          </div>
          <div className="space-y-6">
            <div className="badge border-gray-700 bg-gray-800 text-primary-400 inline-block">The Collaborative Threshold</div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Forge <span className="text-primary-500 italic">Discovery</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto italic">
              "Partner with us on pioneering research projects and contribute to the evolution of the global textile industry."
            </p>
          </div>

          <button className="btn-primary inline-flex items-center gap-4 py-6 px-12 text-base">
            Submit Proposal
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Research;
