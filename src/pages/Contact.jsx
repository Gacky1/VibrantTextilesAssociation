import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone, faClock, faPaperPlane, faUser, faMessage } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const contactInfo = [
  {
    icon: faMapMarkerAlt,
    title: 'Address',
    content: ['Vibrant Textiles Association', '123 Textile Hub, Connaught Place', 'New Delhi - 110001, India'],
    accent: '#3b82f6',
    grad: 'from-blue-500 to-blue-600',
  },
  {
    icon: faEnvelope,
    title: 'Email',
    content: ['info@vibranttextiles.org', 'support@vibranttextiles.org'],
    accent: '#10b981',
    grad: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: faPhone,
    title: 'Phone',
    content: ['+91 11 1234 5678', '+91 98765 43210'],
    accent: '#8b5cf6',
    grad: 'from-violet-500 to-violet-600',
  },
  {
    icon: faClock,
    title: 'Working Hours',
    content: ['Mon – Fri: 9:00 AM – 6:00 PM', 'Saturday: 10:00 AM – 4:00 PM', 'Sunday: Closed'],
    accent: '#e52e22',
    grad: 'from-primary-500 to-primary-700',
  },
];

const inputClass = 'w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:bg-white transition-all duration-200 hover:border-gray-300';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* === HERO === */}
      <div className="relative bg-[#0d0d1a] text-white py-40 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-800 rounded-full blur-[120px] opacity-25" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-700 rounded-full blur-[100px] opacity-15" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-white/70 border border-white/15 bg-white/8">
              Get In Touch
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="section-heading text-[clamp(3rem,7vw,5.5rem)] text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/55 text-lg max-w-2xl mx-auto"
          >
            Get in touch with the Vibrant Textiles Association — we'd love to hear from you.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_60px_rgba(0,0,0,0.08)] p-8 md:p-14 mb-12"
        >
          <div className="text-center mb-10">
            <span className="section-badge mb-4">Send Message</span>
            <h2 className="section-heading text-[clamp(1.8rem,4vw,3rem)] text-gray-900">Drop Us a Line</h2>
          </div>

          <form className="space-y-5 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} className="text-primary-500 text-xs" />
                  Full Name
                </label>
                <input type="text" placeholder="Enter your full name" className={inputClass} required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="text-primary-500 text-xs" />
                  Email Address
                </label>
                <input type="email" placeholder="Enter your email address" className={inputClass} required />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="text-primary-500 text-xs" />
                Phone Number
              </label>
              <input type="tel" placeholder="Enter your phone number" className={inputClass} required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faMessage} className="text-primary-500 text-xs" />
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className={`${inputClass} resize-none`}
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold text-[15px] shadow-[0_8px_30px_rgba(229,46,34,0.3)] hover:shadow-[0_14px_40px_rgba(229,46,34,0.4)] transition-all duration-300"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Info + Map */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] transition-all cursor-default"
              >
                <div className={`w-11 h-11 bg-gradient-to-br ${info.grad} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={info.icon} className="text-white text-sm" />
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{info.title}</h3>
                {info.content.map((line, j) => (
                  <p key={j} className="text-gray-500 text-sm leading-relaxed">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[24px] overflow-hidden border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.08)] min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9746146598793!2d77.21787931508076!3d28.631447982422374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371d9e0d07%3A0x7e2c8c0b6b6b6b6b!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
