import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const Media = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Media</h1>
          <p className="text-lg text-gray-600">Coming Soon</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const Research = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Research</h1>
          <p className="text-lg text-gray-600">Coming Soon</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16 mb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-300 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
            <p className="text-lg opacity-90">Get in touch with Vibrant Textiles Association</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input type="text" placeholder="Enter your full name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email ID</label>
                  <input type="email" placeholder="Enter your email address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input type="tel" placeholder="Enter your phone number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea rows="6" placeholder="Write your message here..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none" required></textarea>
              </div>
              <button type="submit" className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
                Send Message
              </button>
            </form>
          </div>

          {/* Address and Map Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📍</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Address</h3>
                    <p className="text-gray-600">Vibrant Textiles Association<br />123 Textile Hub, Connaught Place<br />New Delhi - 110001, India</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📧</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Email</h3>
                    <p className="text-gray-600">info@vibranttextiles.org<br />support@vibranttextiles.org</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📞</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Phone</h3>
                    <p className="text-gray-600">+91 11 1234 5678<br />+91 98765 43210</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🕐</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Working Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full min-h-[500px]">
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const Membership = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Membership</h1>
          <p className="text-lg text-gray-600">Coming Soon</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
