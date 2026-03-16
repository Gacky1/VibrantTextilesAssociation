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
    
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
