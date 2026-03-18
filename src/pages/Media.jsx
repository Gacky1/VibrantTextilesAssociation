import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faNewspaper, faCalendarAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Media = () => {
  const mediaGallery = [
    { type: "image", url: "https://images.unsplash.com/photo-1766065447157-6e7c6dd83e52?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Handloom Workshop" },
    { type: "image", url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600", title: "Textile Exhibition" },
    { type: "image", url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600", title: "Artisan Training" },
    { type: "image", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", title: "Trade Fair 2023" },
    { type: "image", url: "https://images.unsplash.com/photo-1730382625230-3756013c515c?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Skill Development" },
    { type: "image", url: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Industry Meet" }
  ];

  const pressReleases = [
    { date: "15 Jan 2024", title: "Vibrant Textiles launches new skill development program", category: "Press Release", gradient: 'from-blue-500 to-blue-600' },
    { date: "10 Jan 2024", title: "Partnership with National Handloom Board announced", category: "News", gradient: 'from-green-500 to-green-600' },
    { date: "5 Jan 2024", title: "Annual Textile Expo 2024 dates revealed", category: "Announcement", gradient: 'from-purple-500 to-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-400 rounded-full blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg"
          >
            <span className="text-white text-sm font-bold tracking-widest uppercase">Media Center</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          >
            Media Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90"
          >
            Explore our events, activities, and achievements
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Photo Gallery */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              PHOTO GALLERY
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Our Moments</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mediaGallery.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <FontAwesomeIcon icon={faImage} className="text-accent-400" />
                      <span className="text-white/80 text-sm">Gallery</span>
                    </div>
                    <p className="text-white font-bold text-xl">{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              PRESS & NEWS
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Latest Updates</h2>
          </div>
          
          <div className="space-y-6">
            {pressReleases.map((press, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 10 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`px-4 py-2 bg-gradient-to-r ${press.gradient} text-white rounded-full text-sm font-bold flex items-center gap-2`}>
                        <FontAwesomeIcon icon={faTag} />
                        {press.category}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        {press.date}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{press.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faNewspaper} className="text-primary-500 text-2xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Media;
