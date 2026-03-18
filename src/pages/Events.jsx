import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faUsers, faHandshake, faTrophy, faChartLine, faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const Events = () => {
  const upcomingEvents = [
    {
      title: "National Textile Expo 2024",
      date: "15-18 March 2024",
      location: "Pragati Maidan, New Delhi",
      type: "Exhibition",
      image: "https://images.unsplash.com/photo-1719154717749-0d05f61a0588?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "India's largest textile exhibition showcasing traditional and modern textiles",
      highlights: ["500+ Exhibitors", "International Buyers", "Live Demonstrations", "B2B Meetings"],
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      title: "Handloom Artisan Fair",
      date: "5-7 April 2024",
      location: "India Habitat Centre, Delhi",
      type: "Fair",
      image: "https://images.unsplash.com/photo-1627296345489-faf81a8f15ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Celebrating India's rich handloom heritage with artisan showcases",
      highlights: ["100+ Artisans", "Traditional Crafts", "Cultural Programs", "Direct Sales"],
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      title: "Textile Innovation Summit",
      date: "20-21 May 2024",
      location: "Virtual + Mumbai",
      type: "Conference",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
      desc: "Exploring future of textiles with technology and sustainability",
      highlights: ["Expert Speakers", "Tech Demos", "Networking", "Workshops"],
      gradient: 'from-blue-500 to-blue-600'
    }
  ];

  const pastEvents = [
    { title: "Textile Trade Fair 2023", icon: faUsers, stat1: "10,000+", label1: "Attendees", stat2: "300+", label2: "Exhibitors", gradient: 'from-purple-500 to-purple-600' },
    { title: "Skill Development Workshop", icon: faTrophy, stat1: "500+", label1: "Participants", stat2: "3 Days", label2: "Duration", gradient: 'from-blue-500 to-blue-600' },
    { title: "Sustainability Conference", icon: faChartLine, stat1: "50+", label1: "Speakers", stat2: "15+", label2: "Countries", gradient: 'from-green-500 to-green-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="Connect & Collaborate"
        title="Events & Fairs"
        subtitle="Connect, collaborate, and celebrate India's vibrant textile ecosystem"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Upcoming Events */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              UPCOMING EVENTS
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Join Our Next Events</h2>
          </div>
          
          <div className="space-y-8">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="relative md:col-span-2 h-80 md:h-auto overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute top-6 left-6 px-5 py-2 bg-gradient-to-r ${event.gradient} text-white rounded-full font-bold text-sm shadow-lg`}>
                      {event.type}
                    </div>
                  </div>
                  <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">{event.title}</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-600" />
                        </div>
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-600" />
                        </div>
                        <span className="font-medium">{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">{event.desc}</p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {event.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                          <span className="text-gray-700 text-sm font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${event.gradient} text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
                    >
                      Register Now
                      <FontAwesomeIcon icon={faArrowRight} className="group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Events Stats */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              PAST EVENTS
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Our Success Stories</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pastEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${event.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <FontAwesomeIcon icon={event.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{event.title}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">{event.label1}</span>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent`}>{event.stat1}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">{event.label2}</span>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent`}>{event.stat2}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 rounded-full blur-3xl opacity-20"></div>
          </div>
          
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={faHandshake} className="text-white text-4xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Want to Exhibit or Sponsor?</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">Partner with us to showcase your products and reach thousands of buyers</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Become an Exhibitor
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Sponsorship Opportunities
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
