import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Membership = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const formRef = useRef(null);

  const categories = [
    {
      id: 'government',
      name: 'Government & Policy Bodies',
      icon: '🏛️',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      description: 'Government departments, policy makers, and regulatory bodies',
      members: [
        { name: 'Ministry of Textiles', logo: '🏛️', type: 'Government' },
        { name: 'Textile Commissioner Office', logo: '📋', type: 'Regulatory' },
        { name: 'National Handloom Board', logo: '🧵', type: 'Board' }
      ]
    },
    {
      id: 'industry',
      name: 'Industry & Corporate Partners',
      icon: '🏭',
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100',
      description: 'Textile manufacturers, exporters, and corporate entities',
      members: [
        { name: 'Textile Mills Association', logo: '⚙️', type: 'Association' },
        { name: 'Export Promotion Council', logo: '🌍', type: 'Council' },
        { name: 'Fabric Manufacturers Ltd', logo: '🏭', type: 'Corporate' }
      ]
    },
    {
      id: 'support',
      name: 'Support Organizations',
      icon: '🤝',
      gradient: 'from-accent-500 to-accent-600',
      bgGradient: 'from-accent-50 to-accent-100',
      description: 'NGOs, training institutes, and support organizations',
      members: [
        { name: 'Artisan Welfare Society', logo: '❤️', type: 'NGO' },
        { name: 'Textile Training Institute', logo: '🎓', type: 'Education' },
        { name: 'Handloom Development Corp', logo: '🤝', type: 'Support' }
      ]
    }
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.observe-animation').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedCategory, activeFilter]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setFormData({});
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({});
    setSelectedCategory(null);
    setTimeout(() => setShowSuccess(false), 5000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setSelectedCategory(null);
    setFormData({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCategories = activeFilter === 'all' 
    ? categories 
    : categories.filter(cat => cat.id === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea1c8f7f?w=1920" 
            alt="Textiles" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50"></div>
        </div>

        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary-500/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-40 w-48 h-48 bg-accent-500/30 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-primary-400/30 rounded-full blur-xl animate-ping"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="backdrop-blur-md bg-white/10 rounded-2xl p-12 max-w-4xl text-center border border-white/20"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
              Join Our Community
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg">
              Become a part of India's leading textile association and transform the industry together
            </p>
          </motion.div>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl"
        >
          ✓ Application submitted successfully!
        </motion.div>
      )}

      {/* Active Members Section */}
      <div className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 observe-animation opacity-0">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Our Active Members
            </h2>
            <p className="text-lg text-gray-600">
              Join a diverse community of industry leaders and changemakers
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 observe-animation opacity-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              All Members
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeFilter === cat.id
                    ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Members Grid */}
          <div className="space-y-16">
            {filteredCategories.map((category, idx) => (
              <div key={category.id} className="observe-animation opacity-0" style={{ transitionDelay: `${idx * 200}ms` }}>
                <div className={`bg-gradient-to-r ${category.bgGradient} rounded-2xl p-8 mb-6`}>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-5xl">{category.icon}</span>
                    <h3 className="text-3xl font-bold text-gray-900">{category.name}</h3>
                  </div>
                  <p className="text-gray-700 ml-16">{category.description}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.members.map((member, mIdx) => (
                    <motion.div
                      key={mIdx}
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                    >
                      <div className="text-5xl mb-4">{member.logo}</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${category.gradient} text-white`}>
                        {member.type}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Selection */}
      {!selectedCategory && (
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 observe-animation opacity-0">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Choose Your Membership Category
              </h2>
              <p className="text-lg text-gray-600">
                Select the category that best describes your organization
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((category, idx) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="observe-animation opacity-0 text-left"
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className={`bg-gradient-to-br ${category.bgGradient} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-primary-300`}>
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
                    <p className="text-gray-700 mb-6">{category.description}</p>
                    <div className={`inline-block px-6 py-3 bg-gradient-to-r ${category.gradient} text-white rounded-full font-semibold shadow-lg`}>
                      Apply Now →
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Application Form */}
      {selectedCategory && (
        <div ref={formRef} className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-md bg-white/80 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/50"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {categories.find(c => c.id === selectedCategory)?.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">Fill in the details to complete your application</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Government & Policy Bodies Form */}
                {selectedCategory === 'government' && (
                  <>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Organization Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                        placeholder="Enter organization name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Organization Address *</label>
                      <textarea
                        required
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Enter complete address"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">State *</label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      >
                        <option value="">Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Decision Maker Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                        placeholder="Enter decision maker name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Contact Number *</label>
                        <input
                          type="tel"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Additional Information</label>
                      <textarea
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Any additional details you'd like to share"
                      ></textarea>
                    </div>
                  </>
                )}

                {/* Industry & Corporate Partners Form */}
                {selectedCategory === 'industry' && (
                  <>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Company Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                        placeholder="Enter company name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Sub-Sector *</label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      >
                        <option value="">Select Sub-Sector</option>
                        <option>Handloom & Traditional Textiles</option>
                        <option>Powerloom & Mechanized Textiles</option>
                        <option>Apparel & Garments</option>
                        <option>Home Textiles & Furnishings</option>
                        <option>Technical & Industrial Textiles</option>
                        <option>Natural Fibres & Yarn</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Head Office Address *</label>
                      <textarea
                        required
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Enter head office address"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Partnering Interest *</label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      >
                        <option value="">Select Interest Area</option>
                        <option>Skill Development</option>
                        <option>Market Linkage</option>
                        <option>Technology Transfer</option>
                        <option>Export Promotion</option>
                        <option>Research & Innovation</option>
                        <option>Policy Advocacy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Decision Maker Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                        placeholder="Enter decision maker name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Decision Maker Designation *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                        placeholder="Enter designation"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Contact Number *</label>
                        <input
                          type="tel"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Additional Information</label>
                      <textarea
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Any additional details you'd like to share"
                      ></textarea>
                    </div>
                  </>
                )}

                {/* Support Organizations Form */}
                {selectedCategory === 'support' && (
                  <>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Organization Type *</label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      >
                        <option value="">Select Type</option>
                        <option>NGO</option>
                        <option>Training Institute</option>
                        <option>Research Organization</option>
                        <option>Development Agency</option>
                        <option>Cooperative Society</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Organization Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                        placeholder="Enter organization name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Organization Address *</label>
                      <textarea
                        required
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Enter complete address"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">State *</label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      >
                        <option value="">Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Decision Maker Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                        placeholder="Enter decision maker name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Contact Number *</label>
                        <input
                          type="tel"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Additional Information</label>
                      <textarea
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                        placeholder="Any additional details you'd like to share"
                      ></textarea>
                    </div>
                  </>
                )}

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-8 py-4 bg-gray-200 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Membership;
