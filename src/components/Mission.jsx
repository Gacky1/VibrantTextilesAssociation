import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faHandshake, faLightbulb, faChartLine, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const missions = [
  {
    icon: faBullseye,
    title: 'Empower',
    text: "Empower India's textile sector by supporting vendors, artisans, and industry stakeholders with skills and resources.",
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    icon: faHandshake,
    title: 'Connect',
    text: "Act as a platform for collaboration between government, industry, and grassroots communities.",
    color: 'text-primary-600',
    bg: 'bg-primary-50'
  },
  {
    icon: faLightbulb,
    title: 'Innovate',
    text: "Promote innovation and sustainability while preserving traditional textile knowledge.",
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  },
  {
    icon: faChartLine,
    title: 'Grow',
    text: "Contribute towards employment generation and long-term sector growth across India.",
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
];

const Mission = () => {
  return (
    <section id="mission" className="py-24 bg-gray-50 overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16 space-y-4">
          <div className="badge">Our Vision</div>
          <h2 className="section-title">Driving Sustainable Growth</h2>
          <p className="section-subtitle mx-auto">
            Our mission is to build a resilient and innovative textile ecosystem that honors tradition while embracing modern excellence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((m, i) => (
            <div
              key={i}
              className="card group flex flex-col h-full hover:border-primary-200 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${m.bg} ${m.color} flex items-center justify-center text-xl mb-6 flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <FontAwesomeIcon icon={m.icon} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {m.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {m.text}
              </p>

              <div className="mt-auto flex items-center gap-2 text-primary-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More
                <FontAwesomeIcon icon={faArrowRight} size="xs" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
