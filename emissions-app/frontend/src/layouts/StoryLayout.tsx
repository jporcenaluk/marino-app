import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ProgressBar from '../contexts/StoryProgressContext';
import Footer from '../components/Footer';
import StoryProgressProvider from '../contexts/StoryProgressContext';

const StoryLayout = () => (
  <div className="font-sans bg-gray-100 p-6">
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <Header />
      <Outlet />
      <ProgressBar />
      <Footer />
    </div>
  </div>
);

export default StoryLayout;
