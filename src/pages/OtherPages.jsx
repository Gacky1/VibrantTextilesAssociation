import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const Media = () => {
  const mediaGallery = [
    { type: "image", url: "https://images.unsplash.com/photo-1558769132-cb1aea1c8f7f?w=600", title: "Handloom Workshop" },
    { type: "image", url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600", title: "Textile Exhibition" },
    { type: "image", url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600", title: "Artisan Training" },
    { type: "image", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", title: "Trade Fair 2023" },
    { type: "image", url: "https://images.unsplash.com/photo-1558769132-cb1aea1c8f7f?w=600", title: "Skill Development" },
    { type: "image", url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600", title: "Industry Meet" }
  ];

  const pressReleases = [
    { date: "15 Jan 2024", title: "Vibrant Textiles launches new skill development program", category: "Press Release" },
    { date: "10 Jan 2024", title: "Partnership with National Handloom Board announced", category: "News" },
    { date: "5 Jan 2024", title: "Annual Textile Expo 2024 dates revealed", category: "Announcement" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="relative bg-gradient-to-br from-accent-600 via-primary-700 to-primary-800 text-white py-16 mb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-300 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Media Gallery</h1>
            <p className="text-lg opacity-90">Explore our events, activities, and achievements</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Photo Gallery</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mediaGallery.map((item, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                  <img src={item.url} alt={item.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <p className="text-white font-semibold p-4">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Press Releases & News</h2>
            <div className="space-y-4">
              {pressReleases.map((press, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold mb-2">{press.category}</span>
                      <h3 className="text-xl font-bold text-gray-900">{press.title}</h3>
                    </div>
                    <div className="text-gray-500 text-sm">{press.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const Research = () => {
  const researchAreas = [
    { icon: "🔬", title: "Textile Innovation", desc: "Advanced materials and smart textiles research", projects: "15+" },
    { icon: "🌿", title: "Sustainability", desc: "Eco-friendly processes and circular economy", projects: "12+" },
    { icon: "📊", title: "Market Analysis", desc: "Industry trends and consumer behavior studies", projects: "20+" },
    { icon: "🎨", title: "Design Research", desc: "Traditional crafts and contemporary design fusion", projects: "10+" },
    { icon: "⚙️", title: "Technology Integration", desc: "Automation and digital transformation", projects: "8+" },
    { icon: "📈", title: "Policy Studies", desc: "Trade policies and regulatory frameworks", projects: "18+" }
  ];

  const publications = [
    { title: "Future of Indian Handloom Industry", year: "2024", type: "Research Paper" },
    { title: "Sustainable Textile Practices in India", year: "2023", type: "White Paper" },
    { title: "Digital Transformation in Textile Sector", year: "2023", type: "Case Study" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="relative bg-gradient-to-br from-primary-700 via-accent-700 to-primary-800 text-white py-16 mb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-300 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Research & Innovation</h1>
            <p className="text-lg opacity-90">Driving textile sector growth through evidence-based insights</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Research Focus Areas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchAreas.map((area, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-5xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{area.title}</h3>
                  <p className="text-gray-600 mb-4">{area.desc}</p>
                  <div className="text-primary-600 font-semibold">{area.projects} Active Projects</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Recent Publications</h2>
            <div className="space-y-4">
              {publications.map((pub, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex justify-between items-center">
                  <div>
                    <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-semibold mb-2">{pub.type}</span>
                    <h3 className="text-xl font-bold text-gray-900">{pub.title}</h3>
                  </div>
                  <div className="text-gray-500">{pub.year}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-serif font-bold mb-4">Collaborate With Us</h2>
            <p className="text-lg mb-8 opacity-90">Partner in research projects and contribute to textile innovation</p>
            <button className="px-8 py-4 bg-white text-primary-700 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Submit Research Proposal
            </button>
          </div>
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

          <div className="grid md:grid-cols-2 gap-8">
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
