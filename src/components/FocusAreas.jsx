import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faIndustry, faLandmark, faSeedling, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const focusAreas = [
  {
    id: 1,
    title: 'Skill Development & Training',
    icon: faGraduationCap,
    desc: 'Empowering artisans with government-aligned vocational courses and heritage mastery.',
    points: ['Artisan Workshops', 'Modern Tech Integration', 'Vocational Certification'],
  },
  {
    id: 2,
    title: 'Industry Support',
    icon: faIndustry,
    desc: 'Strategic resources and market linkages for MSMEs and textile vendors.',
    points: ['Market Linkage', 'Strategic Mentorship'],
  },
  {
    id: 3,
    title: 'Policy Collaboration',
    icon: faLandmark,
    desc: 'Representing stakeholder interests in national policy-making and regulatory compliance.',
    points: ['Grants Support', 'Trade Policy Advocacy'],
  },
  {
    id: 4,
    title: 'Heritage Preservation',
    icon: faSeedling,
    desc: 'Sustainable innovation while preserving traditional handloom and weaving techniques.',
    points: ['Eco-friendly Dyeing', 'Craft Revival'],
  }
];

const FocusAreas = () => {
  return (
    <section id="focus" className="py-24 bg-white">
      <div className="section-container">
        
        <div className="mb-16">
          <div className="badge">The Strategic Core</div>
          <h2 className="section-title">Focus Verticals</h2>
          <p className="section-subtitle">
            Architecting the path where ancient craftsmanship meets industrial precision and sustainable global growth to redefine the industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {focusAreas.map((area) => (
            <div
              key={area.id}
              className="card group flex flex-col hover:border-primary-200 transition-all"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 text-2xl group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={area.icon} />
                </div>
                <div className="text-gray-300 group-hover:text-primary-500 transition-colors">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
              
              <div className="space-y-4 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                  {area.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed italic">
                  "{area.desc}"
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  {area.points.map((pt, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
