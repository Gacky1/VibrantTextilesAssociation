import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Members = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // TODO: Backend Integration - Fetch board members from API
  // This is placeholder data - replace with API call
  const placeholderMembers = [
    { id: 1, name: "Member Name", designation: "Chairperson" },
    { id: 2, name: "Member Name", designation: "Vice Chairperson" },
    { id: 3, name: "Member Name", designation: "Secretary" },
    { id: 4, name: "Member Name", designation: "Treasurer" },
    { id: 5, name: "Member Name", designation: "Board Member" },
    { id: 6, name: "Member Name", designation: "Board Member" },
  ];

  return (
    <section id="members" className="py-24 md:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea1c8f7f?w=1920')] bg-cover bg-center"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent-300 rounded-full blur-3xl opacity-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg border border-white/30"
          >
            OUR LEADERSHIP
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Board of <span className="text-accent-300">Members</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Leadership driving excellence in India's textile sector
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {placeholderMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group"
            >
              {/* Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all shadow-xl hover:shadow-2xl">
                {/* Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-accent-400/20"></div>
                  <div className="relative w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon icon={faUserTie} className="text-white text-6xl" />
                  </div>
                </div>
                
                {/* Member Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-accent-300 font-medium">{member.designation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <Link to="/members">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-600 rounded-full font-bold text-lg shadow-2xl transition-all"
            >
              View All Members
              <FontAwesomeIcon icon={faArrowRight} className="text-sm group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Members;
