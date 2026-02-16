import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Mission from '../components/Mission';
import FocusAreas from '../components/FocusAreas';
import Members from '../components/Members';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Mission />
      <FocusAreas />
      <Members />
      
      {/* Placeholder sections for future development */}
      <section id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Events & Fair</h2>
          <p className="text-gray-600">Coming Soon</p>
        </div>
      </section>

      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Skill Development</h2>
          <p className="text-gray-600">Coming Soon</p>
        </div>
      </section>

      <section id="media" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Media</h2>
          <p className="text-gray-600">Coming Soon</p>
        </div>
      </section>

      <section id="research" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Research</h2>
          <p className="text-gray-600">Coming Soon</p>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600">Coming Soon</p>
        </div>
      </section>

      <section id="membership" className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Become a Member</h2>
          <p className="text-xl mb-8">Join us in empowering India's textile ecosystem</p>
          <button className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow">
            Apply Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
