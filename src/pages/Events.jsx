import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Events = () => {
  const upcomingEvents = [
    {
      title: "National Textile Expo 2024",
      date: "15-18 March 2024",
      location: "Pragati Maidan, New Delhi",
      type: "Exhibition",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
      desc: "India's largest textile exhibition showcasing traditional and modern textiles",
      highlights: ["500+ Exhibitors", "International Buyers", "Live Demonstrations", "B2B Meetings"]
    },
    {
      title: "Handloom Artisan Fair",
      date: "5-7 April 2024",
      location: "India Habitat Centre, Delhi",
      type: "Fair",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea1c8f7f?w=600",
      desc: "Celebrating India's rich handloom heritage with artisan showcases",
      highlights: ["100+ Artisans", "Traditional Crafts", "Cultural Programs", "Direct Sales"]
    },
    {
      title: "Textile Innovation Summit",
      date: "20-21 May 2024",
      location: "Virtual + Mumbai",
      type: "Conference",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
      desc: "Exploring future of textiles with technology and sustainability",
      highlights: ["Expert Speakers", "Tech Demos", "Networking", "Workshops"]
    }
  ];

  const pastEvents = [
    { title: "Textile Trade Fair 2023", attendees: "10,000+", exhibitors: "300+" },
    { title: "Skill Development Workshop", participants: "500+", duration: "3 Days" },
    { title: "Sustainability Conference", speakers: "50+", countries: "15+" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-accent-600 via-accent-700 to-primary-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Events & Fairs
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Connect, collaborate, and celebrate India's vibrant textile ecosystem
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-900 mb-12">Upcoming Events</h2>
          <div className="space-y-8">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 px-4 py-2 bg-primary-600 text-white rounded-full font-semibold text-sm">
                      {event.type}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{event.title}</h3>
                    <div className="space-y-2 mb-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="text-primary-600">📅</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary-600">📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">{event.desc}</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {event.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="text-accent-600">✓</span>
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                      Register Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Events Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-900 mb-12">Past Events Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8 shadow-lg text-center"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
                <div className="space-y-2">
                  {Object.entries(event).slice(1).map(([key, value], i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="text-primary-700 font-bold text-lg">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Want to Exhibit or Sponsor?</h2>
          <p className="text-lg mb-8 opacity-90">Partner with us to showcase your products and reach thousands of buyers</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-primary-700 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Become an Exhibitor
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-primary-700 transition-all">
              Sponsorship Opportunities
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
