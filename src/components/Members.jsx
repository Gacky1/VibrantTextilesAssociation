import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const placeholderMembers = [
  { id: 1, name: 'Member Name', designation: 'Chairperson' },
  { id: 2, name: 'Member Name', designation: 'Vice Chairperson' },
  { id: 3, name: 'Member Name', designation: 'Secretary' },
  { id: 4, name: 'Member Name', designation: 'Treasurer' },
  { id: 5, name: 'Member Name', designation: 'Board Member' },
  { id: 6, name: 'Member Name', designation: 'Board Member' },
];

const Members = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="members" className="relative py-28 md:py-36 bg-[#0d0d1a] overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-800 rounded-full blur-[120px] opacity-25" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-700 rounded-full blur-[100px] opacity-15" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-accent-300 border border-accent-500/30 bg-accent-500/10">
              <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
              Our Leadership
            </span>
          </motion.div>
          <h2 className="section-heading text-[clamp(2.2rem,5vw,3.8rem)] text-white mb-5">
            Board of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-primary-300">
              Members
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Leadership driving excellence in India's textile sector
          </p>
        </motion.div>

        {/* Member Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {placeholderMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative rounded-[20px] overflow-hidden cursor-default border border-white/8 hover:border-white/20 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {/* Avatar area */}
              <div className="aspect-[4/3] flex items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(229,46,34,0.1), rgba(245,158,11,0.05))' }}>
                {/* Radial gradient bg */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at center, rgba(229,46,34,0.15), transparent 70%)' }} />
                {/* Avatar circle */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="w-28 h-28 rounded-full border-2 border-white/15 group-hover:border-primary-500/40 transition-all duration-300 flex items-center justify-center relative z-10"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <FontAwesomeIcon icon={faUserTie} className="text-5xl text-white/40 group-hover:text-white/60 transition-colors duration-300" />
                </motion.div>
              </div>

              {/* Info */}
              <div className="p-5 text-center">
                <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-accent-400 font-medium text-sm">{member.designation}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <Link to="/members">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-base shadow-2xl hover:shadow-white/20 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              View All Members
              <FontAwesomeIcon icon={faArrowRight} className="text-sm text-primary-600" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Members;
