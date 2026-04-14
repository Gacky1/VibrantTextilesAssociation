import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faIndustry, faLandmark, faSeedling, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const focusAreas = [
  {
    id: 1,
    title: 'Skill Development & Training',
    icon: faGraduationCap,
    desc: 'Empowering the workforce by bridging tradition with technology.',
    points: [
      'Conduct workshops and training programs for artisans, vendors, and industry professionals',
      'Bridge gaps between traditional handloom skills and modern textile technologies',
      'Support vocational courses aligned with government skill initiatives'
    ],
  },
  {
    id: 2,
    title: 'Vendor & Industry Support',
    icon: faIndustry,
    desc: 'Facilitating growth through mentorship, resources, and market connections.',
    points: [
      'Facilitate resources, mentorship, and guidance for textile vendors and MSMEs',
      'Enable market linkages and industry collaborations for business growth',
      'Support adoption of modern production and quality standards'
    ],
  },
  {
    id: 3,
    title: 'Government & Policy Collaboration',
    icon: faLandmark,
    desc: 'Advocating for stakeholder interests and streamlining compliance.',
    points: [
      'Represent stakeholder interests in policy-making and scheme implementation',
      'Facilitate awareness and adoption of government initiatives, grants, and subsidies',
      'Help streamline compliance, certifications, and industry regulations'
    ],
  },
  {
    id: 4,
    title: 'Sustainability & Heritage Preservation',
    icon: faSeedling,
    desc: 'Preserving our rich cultural DNA through eco-friendly innovation.',
    points: [
      'Promote eco-friendly and ethical textile practices',
      'Preserve and revive traditional handloom and craft techniques',
      'Encourage innovation while respecting cultural heritage'
    ],
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
                
                <ul className="space-y-3 pt-6">
                  {area.points.map((pt, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-500 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
