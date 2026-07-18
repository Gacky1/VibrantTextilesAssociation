import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Mission from '../components/Mission';
import FocusAreas from '../components/FocusAreas';
import Members from '../components/Members';
import JoinOptions from '../components/JoinOptions';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-textile-linen flex flex-col">
      <Navbar />
      <Hero />
      <div className="fringe-divider" />
      <JoinOptions />
      <div className="fringe-divider" />
      <About />
      {/* <Mission /> */}
      {/* <FocusAreas /> */}
      {/* <Members /> */}
    
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
