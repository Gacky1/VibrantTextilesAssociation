import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone, faClock, faPaperPlane, faUser, faMessage } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const contactInfo = [
    {
      icon: faMapMarkerAlt,
      title: "Address",
      content: ["Vibrant Textiles Association", "123 Textile Hub, Connaught Place", "New Delhi - 110001, India"],
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: faEnvelope,
      title: "Email",
      content: ["info@vibranttextiles.org", "support@vibranttextiles.org"],
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: faPhone,
      title: "Phone",
      content: ["+91 11 1234 5678", "+91 98765 43210"],
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: faClock,
      title: "Working Hours",
      content: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"],
      gradient: 'from-primary-500 to-primary-600'
    }
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
            <span className="text-white text-sm font-bold tracking-widest uppercase">Get In Touch</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90"
          >
            Get in touch with Vibrant Textiles Association
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16"
        >
          <div className="text-center mb-10">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              SEND MESSAGE
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Drop Us a Line</h2>
          </div>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-3 flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} className="text-primary-500" />
                  Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition hover:border-primary-300" 
                  required 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-3 flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="text-primary-500" />
                  Email Address
                </label>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition hover:border-primary-300" 
                  required 
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="text-primary-500" />
                Phone Number
              </label>
              <input 
                type="tel" 
                placeholder="Enter your phone number" 
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition hover:border-primary-300" 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faMessage} className="text-primary-500" />
                Message
              </label>
              <textarea 
                rows="6" 
                placeholder="Write your message here..." 
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none hover:border-primary-300" 
                required
              ></textarea>
            </div>
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Message
              <FontAwesomeIcon icon={faPaperPlane} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info & Map */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 10 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                    <FontAwesomeIcon icon={info.icon} className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-3">{info.title}</h3>
                    {info.content.map((line, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full min-h-[600px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9746146598793!2d77.21787931508076!3d28.631447982422374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371d9e0d07%3A0x7e2c8c0b6b6b6b6b!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
