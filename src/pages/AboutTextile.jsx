import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutTextile = () => {
  const segments = [
    { title: "Handloom & Traditional", icon: "🧵", desc: "Fabrics created manually by artisans", examples: "Khadi, Banarasi Silk, Ikat, Jamdani, Pashmina" },
    { title: "Powerloom & Mechanized", icon: "⚙️", desc: "Mechanized looms for mass production", examples: "Cotton fabrics, polyester, denim" },
    { title: "Apparel & Garments", icon: "👔", desc: "Ready-to-wear clothing", examples: "Fashion wear, uniforms, casual clothing" },
    { title: "Home Textiles", icon: "🏠", desc: "Fabrics for interiors and décor", examples: "Bedsheets, curtains, carpets" },
    { title: "Technical & Industrial", icon: "🔬", desc: "Functional applications", examples: "Medical textiles, protective fabrics" },
    { title: "Natural Fibres", icon: "🌾", desc: "Raw materials", examples: "Cotton, silk, wool, jute, hemp" }
  ];

  const states = [
    { name: "Andhra Pradesh", textiles: "Pochampally Ikat, Gadwal Sarees", emoji: "🎨" },
    { name: "Assam", textiles: "Muga Silk, Eri Silk", emoji: "✨" },
    { name: "Bihar", textiles: "Bhagalpuri (Tussar) Silk", emoji: "🌟" },
    { name: "Gujarat", textiles: "Bandhani, Cotton, Denim", emoji: "🎭" },
    { name: "Karnataka", textiles: "Mysore Silk, Ilkal Sarees", emoji: "👑" },
    { name: "Kerala", textiles: "Kasavu Sarees", emoji: "🌴" },
    { name: "Madhya Pradesh", textiles: "Chanderi, Maheshwari", emoji: "💫" },
    { name: "Maharashtra", textiles: "Denim, Cotton Fabrics", emoji: "🏭" },
    { name: "Odisha", textiles: "Sambalpuri Ikat, Bomkai", emoji: "🎪" },
    { name: "Rajasthan", textiles: "Block-prints, Leheriya", emoji: "🎨" },
    { name: "Tamil Nadu", textiles: "Cotton, Technical Textiles", emoji: "🏗️" },
    { name: "Uttar Pradesh", textiles: "Banarasi Silk, Chikankari", emoji: "🕌" },
    { name: "West Bengal", textiles: "Jamdani, Baluchari, Tangail", emoji: "🎭" },
    { name: "Himachal Pradesh", textiles: "Kullu Woolens, Chamba Rumals", emoji: "🏔️" },
    { name: "Punjab", textiles: "Cotton, Jute Yarn", emoji: "🌾" },
    { name: "Delhi", textiles: "Fashion Clothing", emoji: "🌆" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 mb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-300 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-serif font-bold mb-6">
              About Indian Textiles
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
              One of India's oldest and most diverse sectors, spanning traditional handlooms to modern industrial textiles
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-3xl font-bold text-primary-700 mb-2">2.3%</h3>
              <p className="text-gray-700">of India's GDP</p>
              <p className="text-sm text-gray-600 mt-2">45M+ direct employment</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-3xl font-bold text-accent-700 mb-2">$225B</h3>
              <p className="text-gray-700">Market Size (2025)</p>
              <p className="text-sm text-gray-600 mt-2">$350B by 2030</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-3xl font-bold text-green-700 mb-2">$35-36B</h3>
              <p className="text-gray-700">Annual Exports</p>
              <p className="text-sm text-gray-600 mt-2">Leading global exporter</p>
            </motion.div>
          </div>

          {/* Ecosystem */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 text-center">India's Textile Ecosystem</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["🧵 Fibres, yarn, and fabrics", "👕 Garments and apparel", "🎨 Handloom and artisanal textiles", "🏠 Home textiles and furnishings", "🔬 Technical and industrial textiles", "🌾 Natural and sustainable materials"].map((item, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-primary-50 rounded-xl">
                  <span className="text-2xl">{item.split(' ')[0]}</span>
                  <span className="text-gray-700 font-medium">{item.split(' ').slice(1).join(' ')}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Segments */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Key Segments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {segments.map((segment, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -8 }} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-t-4 border-primary-500">
                  <div className="text-5xl mb-4">{segment.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{segment.title}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{segment.desc}</p>
                  <p className="text-xs text-primary-600 font-medium">{segment.examples}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* States */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Textiles Across India</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {states.map((state, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + idx * 0.03 }} whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-white to-primary-50 rounded-xl p-5 shadow-md hover:shadow-xl transition-all">
                  <div className="text-3xl mb-2">{state.emoji}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{state.name}</h3>
                  <p className="text-sm text-gray-600">{state.textiles}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutTextile;
