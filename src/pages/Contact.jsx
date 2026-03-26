import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone, faClock, faPaperPlane, faUser, faMessage } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

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

const inputClass = 'w-full px-6 py-4 bg-white/50 border border-white/60 rounded-2xl text-gray-800 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-300 focus:bg-white transition-all duration-300 backdrop-blur-sm';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Get in touch with the Vibrant Textiles Association — we'd love to hear from you."
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 relative overflow-hidden">
        {/* Ambient Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-50/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-40 left-0 w-80 h-80 bg-accent-50/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-start">
          {/* Contact Info: Professional Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="mb-12 space-y-4">
              <span className="text-primary-600 font-black text-[11px] uppercase tracking-[0.4em]">Connect</span>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-gray-900 leading-tight font-black">
                How can we <br />
                <span className="text-gradient italic font-medium">help you?</span>
              </h2>
            </div>

            <div className="grid gap-4">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-start gap-6 p-6 bg-white/40 rounded-2xl border border-white/60 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)]"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${info.grad} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:rotate-6 transition-transform`}>
                    <FontAwesomeIcon icon={info.icon} className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-widest mb-1.5">{info.title}</h3>
                    {info.content.map((line, j) => (
                      <p key={j} className="text-gray-500 text-sm font-medium leading-relaxed">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form: Premium Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-[48px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative glass-ultra rounded-[40px] border border-white/60 p-10 md:p-16 shadow-[0_32px_80px_rgba(0,0,0,0.06)]">
              <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-[1px] bg-primary-200" />
                  <span className="text-[11px] font-black text-primary-600 uppercase tracking-[0.4em]">Inquiry Form</span>
                </div>

                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <input type="text" placeholder="Enter your full name" className={inputClass} required />
                        <FontAwesomeIcon icon={faUser} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <input type="email" placeholder="Enter your email address" className={inputClass} required />
                        <FontAwesomeIcon icon={faEnvelope} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative">
                      <input type="tel" placeholder="Enter your phone number" className={inputClass} required />
                      <FontAwesomeIcon icon={faPhone} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                    <div className="relative">
                      <textarea rows="5" placeholder="Write your message here..." className={`${inputClass} resize-none`} required />
                      <FontAwesomeIcon icon={faMessage} className="absolute right-6 top-8 text-gray-300" />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-4 py-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl overflow-hidden group/btn relative"
                  >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 opacity-10 transition-transform duration-500" />
                    <FontAwesomeIcon icon={faPaperPlane} className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Office Location: Interactive Map Overlay */}
        <div className="mt-32 relative">
          <div className="mb-16 space-y-4">
            <span className="text-accent-500 font-black text-[11px] uppercase tracking-[0.4em]">Our Headquarters</span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
              Visit us in <span className="text-gradient italic font-medium">New Delhi</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[48px] overflow-hidden border border-white/60 shadow-[0_40px_100px_rgba(0,0,0,0.08)] relative h-[600px] group"
          >
            <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none z-10" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9746146598793!2d77.21787931508076!3d28.631447982422374!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371d9e0d07%3A0x7e2c8c0b6b6b6b6b!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000"
            />
            {/* Map Overlay Card */}
            <div className="absolute bottom-10 left-10 p-8 glass-premium rounded-3xl border border-white/20 shadow-2xl max-w-sm pointer-events-none backdrop-blur-xl">
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg">
                   <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white" />
                 </div>
                 <h4 className="font-serif text-lg font-black text-white">Central Hub</h4>
               </div>
               <p className="text-white/70 text-sm font-medium leading-relaxed">
                 Vibrant Textiles Association<br />
                 123 Textile Hub, Connaught Place<br />
                 New Delhi - 110001, India
               </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
