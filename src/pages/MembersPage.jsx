import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Members = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Members</h1>
          <p className="text-lg text-gray-600">Coming Soon</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Members;
