import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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
    <section id="members" className="py-20 md:py-32 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Board of <span className="text-gradient">Members</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leadership driving excellence in India's textile sector
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {placeholderMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              {/* Placeholder Image */}
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-accent-200 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-6xl">👤</span>
                </div>
              </div>
              
              {/* Member Info */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium">{member.designation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Members;
